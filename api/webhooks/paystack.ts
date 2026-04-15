// Paystack Webhook Handler
import type { VercelRequest, VercelResponse } from '@vercel/node'
import prisma from '../../lib/prisma'

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY

export async function handlePaystackWebhook(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const signature = req.headers['x-paystack-signature']

  if (signature !== PAYSTACK_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const event = req.body

    switch (event.event) {
      case 'charge.success':
        await handleSuccessfulCharge(event.data)
        break
      
      case 'transfer.success':
        await handleSuccessfulTransfer(event.data)
        break
      
      case 'transfer.failed':
        await handleFailedTransfer(event.data)
        break

      default:
        console.log(`Unhandled event: ${event.event}`)
    }

    return res.status(200).json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return res.status(500).json({ error: 'Webhook processing failed' })
  }
}

async function handleSuccessfulCharge(data: any) {
  const { reference, amount, customer, metadata } = data

  const donation = await prisma.donation.findUnique({
    where: { reference },
    include: { campaign: true },
  })

  if (!donation) {
    console.log('Donation not found for reference:', reference)
    return
  }

  if (donation.status === 'COMPLETED') {
    console.log('Donation already processed:', reference)
    return
  }

  // Update donation
  await prisma.donation.update({
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
      reference,
      completedAt: new Date(),
    },
  })

  // TODO: Send confirmation email
  console.log(`Donation confirmed: ${donation.id} - GHS ${donation.amount}`)
}

async function handleSuccessfulTransfer(data: any) {
  const { reference } = data

  await prisma.withdrawal.updateMany({
    where: { id: reference },
    data: {
      status: 'COMPLETED',
      processedAt: new Date(),
    },
  })
}

async function handleFailedTransfer(data: any) {
  const { reference } = data

  await prisma.withdrawal.updateMany({
    where: { id: reference },
    data: {
      status: 'REJECTED',
      notes: 'Transfer failed',
    },
  })
}
