import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Mock webhook for testing - call this manually after a successful checkout
export async function POST(request: NextRequest) {
  try {
    const { userId, subscriptionId } = await request.json()

    if (!userId || !subscriptionId) {
      return NextResponse.json(
        { error: 'userId and subscriptionId are required' },
        { status: 400 }
      )
    }

    // Update user subscription status
    await prisma.user.update({
      where: { id: userId },
      data: {
        subscriptionStatus: 'active',
        subscriptionId: subscriptionId
      }
    })

    return NextResponse.json({ 
      message: 'Subscription activated successfully',
      userId,
      subscriptionId 
    })
  } catch (error) {
    console.error('Mock webhook error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
