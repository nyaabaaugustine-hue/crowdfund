// Campaign API Routes
import type { VercelRequest, VercelResponse } from '@vercel/node'
import prisma from '../../lib/prisma'

// GET /api/campaigns - List all campaigns
export async function getCampaigns(req: VercelRequest, res: VercelResponse) {
  try {
    const { status, category, featured, limit = 20, offset = 0 } = req.query

    const where: any = {}
    
    if (status) {
      where.status = status
    } else {
      where.status = 'ACTIVE'
    }
    
    if (category) {
      where.category = category
    }
    
    if (featured === 'true') {
      where.featured = true
    }

    const campaigns = await prisma.campaign.findMany({
      where,
      include: {
        organizer: {
          select: {
            id: true,
            name: true,
            avatar: true,
            verified: true,
          },
        },
        _count: {
          select: { donations: true },
        },
      },
      orderBy: [
        { featured: 'desc' },
        { createdAt: 'desc' },
      ],
      take: Number(limit),
      skip: Number(offset),
    })

    const total = await prisma.campaign.count({ where })

    return res.status(200).json({
      success: true,
      data: campaigns,
      pagination: {
        total,
        limit: Number(limit),
        offset: Number(offset),
      },
    })
  } catch (error) {
    console.error('Error fetching campaigns:', error)
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch campaigns',
    })
  }
}

// GET /api/campaigns/:id - Get single campaign
export async function getCampaign(req: VercelRequest, res: VercelResponse) {
  try {
    const { id } = req.query

    const campaign = await prisma.campaign.findUnique({
      where: { id: id as string },
      include: {
        organizer: {
          select: {
            id: true,
            name: true,
            avatar: true,
            verified: true,
            role: true,
          },
        },
        donations: {
          where: { status: 'COMPLETED', anonymous: false },
          orderBy: { createdAt: 'desc' },
          take: 10,
          select: {
            id: true,
            amount: true,
            donorName: true,
            createdAt: true,
            message: true,
          },
        },
        updates: {
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: { donations: true },
        },
      },
    })

    if (!campaign) {
      return res.status(404).json({
        success: false,
        error: 'Campaign not found',
      })
    }

    return res.status(200).json({
      success: true,
      data: campaign,
    })
  } catch (error) {
    console.error('Error fetching campaign:', error)
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch campaign',
    })
  }
}

// POST /api/campaigns - Create campaign
export async function createCampaign(req: VercelRequest, res: VercelResponse) {
  try {
    const { title, story, summary, image, category, target, deadline, organizerId } = req.body

    if (!title || !story || !image || !category || !target || !organizerId) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
      })
    }

    const campaign = await prisma.campaign.create({
      data: {
        title,
        story,
        summary,
        image,
        category,
        target: Number(target),
        deadline: deadline ? new Date(deadline) : null,
        organizerId,
        status: 'DRAFT',
      },
      include: {
        organizer: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    return res.status(201).json({
      success: true,
      data: campaign,
    })
  } catch (error) {
    console.error('Error creating campaign:', error)
    return res.status(500).json({
      success: false,
      error: 'Failed to create campaign',
    })
  }
}

// PUT /api/campaigns/:id - Update campaign
export async function updateCampaign(req: VercelRequest, res: VercelResponse) {
  try {
    const { id } = req.query
    const updates = req.body

    const campaign = await prisma.campaign.update({
      where: { id: id as string },
      data: {
        ...updates,
        deadline: updates.deadline ? new Date(updates.deadline) : undefined,
      },
    })

    return res.status(200).json({
      success: true,
      data: campaign,
    })
  } catch (error) {
    console.error('Error updating campaign:', error)
    return res.status(500).json({
      success: false,
      error: 'Failed to update campaign',
    })
  }
}

// DELETE /api/campaigns/:id - Delete campaign
export async function deleteCampaign(req: VercelRequest, res: VercelResponse) {
  try {
    const { id } = req.query

    await prisma.campaign.delete({
      where: { id: id as string },
    })

    return res.status(200).json({
      success: true,
      message: 'Campaign deleted',
    })
  } catch (error) {
    console.error('Error deleting campaign:', error)
    return res.status(500).json({
      success: false,
      error: 'Failed to delete campaign',
    })
  }
}
