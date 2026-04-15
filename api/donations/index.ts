// Donations API with Paystack Integration
import type { VercelRequest, VercelResponse } from '@vercel/node'
import prisma from '../../lib/prisma'
import { initializeTransaction, verifyTransaction } from '../../lib/paystack'

// POST /api/donations/initialize - Initialize payment
export async function initializeDonation(req: VercelRequest, res: VercelResponse) {
  try {
    const { campaignId, amount, email, donorName, donorPhone, method, anonymous, message } = req.body

    if (!campaignId || !amount || !email) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: campaignId, amount, email',
      })
    }

    const campaign = await prisma.campaign.findUnique({
      where: { id: campaignId },
    })

    if (!campaign) {
      return res.status(404).json({
        success: false,
        error: 'Campaign not found',
      })
    }

    if (campaign.status !== 'ACTIVE') {
      return res.status(400).json({
        success: false,
        error: 'Campaign is not accepting donations',
      })
    }

    // Create pending donation
    const donation = await prisma.donation.create({
      data: {
        campaignId,
        amount: Number(amount),
        donorEmail: email,
        donorName: donorName,
        donorPhone: donorPhone,
        method: method || 'CARD',
        status: 'PENDING',
        anonymous: anonymous || false,
        message: message,
      },
    })

    // Initialize Paystack transaction
    const reference = `DON_${donation.id}_${Date.now()}`
    const callbackUrl = `${process.env.VITE_APP_URL}/campaign/${campaignId}?donation=success`

    const paystackResponse = await initializeTransaction({
      email,
      amount: Math.round(Number(amount) * 100), // Convert to kobo
      reference,
      currency: campaign.currency || 'GHS',
      callback_url: callbackUrl,
      metadata: {
        donationId: donation.id,
        campaignId,
        donorName,
        anonymous: anonymous || false,
        message: message || '',
      },
    })

    // Update donation with reference
    await prisma.donation.update({
      where: { id: donation.id },
      data: { reference: paystackResponse.data.reference },
    })

    return res.status(200).json({
      success: true,
      data: {
        donationId: donation.id,
        reference: paystackResponse.data.reference,
        authorizationUrl: paystackResponse.data.authorization_url,
      },
    })
  } catch (error: any) {
    console.error('Error initializing donation:', error)
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to initialize donation',
    })
  }
}

// GET /api/donations/verify - Verify payment
export async function verifyDonation(req: VercelRequest, res: VercelResponse) {
  try {
    const { reference } = req.query

    if (!reference) {
      return res.status(400).json({
        success: false,
        error: 'Reference is required',
      })
    }

    const paystackData = await verifyTransaction(reference as string)

    if (paystackData.data.status !== 'success') {
      return res.status(400).json({
        success: false,
        error: 'Payment not successful',
      })
    }

    // Find donation by reference
    const donation = await prisma.donation.findUnique({
      where: { reference: reference as string },
      include: { campaign: true },
    })

    if (!donation) {
      return res.status(404).json({
        success: false,
        error: 'Donation not found',
      })
    }

    if (donation.status === 'COMPLETED') {
      return res.status(200).json({
        success: true,
        data: donation,
        message: 'Donation already confirmed',
      })
    }

    // Update donation status
    const updatedDonation = await prisma.donation.update({
      where: { id: donation.id },
      data: {
        status: 'COMPLETED',
        confirmedAt: new Date(),
      },
    })

    // Update campaign raised amount
    await prisma.campaign.update({
      where: { id: donation.campaignId },
      data: {
        raised: {
          increment: donation.amount,
        },
      },
    })

    // Create transaction record
    await prisma.transaction.create({
      data: {
        campaignId: donation.campaignId,
        type: 'DONATION',
        amount: donation.amount,
        status: 'COMPLETED',
        reference: reference as string,
        completedAt: new Date(),
      },
    })

    return res.status(200).json({
      success: true,
      data: updatedDonation,
    })
  } catch (error: any) {
    console.error('Error verifying donation:', error)
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to verify donation',
    })
  }
}

// GET /api/donations - List donations
export async function getDonations(req: VercelRequest, res: VercelResponse) {
  try {
    const { campaignId, donorId, status, limit = 50, offset = 0 } = req.query

    const where: any = {}
    if (campaignId) where.campaignId = campaignId
    if (donorId) where.donorId = donorId
    if (status) where.status = status

    const donations = await prisma.donation.findMany({
      where,
      include: {
        campaign: {
          select: { id: true, title: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: Number(limit),
      skip: Number(offset),
    })

    return res.status(200).json({
      success: true,
      data: donations,
    })
  } catch (error) {
    console.error('Error fetching donations:', error)
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch donations',
    })
  }
}
