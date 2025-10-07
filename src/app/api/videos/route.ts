import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET /api/videos - Fetch user's videos
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user has active subscription
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { subscriptionStatus: true }
    })

    if (!user || user.subscriptionStatus !== 'active') {
      return NextResponse.json(
        { error: 'Active subscription required' },
        { status: 403 }
      )
    }

    const videos = await prisma.video.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ videos })
  } catch (error) {
    console.error('Videos fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/videos - Add new video
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user has active subscription
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { subscriptionStatus: true }
    })

    if (!user || user.subscriptionStatus !== 'active') {
      return NextResponse.json(
        { error: 'Active subscription required' },
        { status: 403 }
      )
    }

    const { youtubeUrl } = await request.json()

    if (!youtubeUrl) {
      return NextResponse.json(
        { error: 'YouTube URL is required' },
        { status: 400 }
      )
    }

    // Validate YouTube URL and extract video ID
    const youtubeId = extractYouTubeId(youtubeUrl)
    if (!youtubeId) {
      return NextResponse.json(
        { error: 'Invalid YouTube URL' },
        { status: 400 }
      )
    }

    // Check if video already exists
    const existingVideo = await prisma.video.findUnique({
      where: { youtubeId }
    })

    if (existingVideo) {
      return NextResponse.json(
        { error: 'Video already exists in the library' },
        { status: 400 }
      )
    }

    // Fetch video metadata from YouTube
    const videoData = await fetchYouTubeMetadata(youtubeId)
    if (!videoData) {
      return NextResponse.json(
        { error: 'Failed to fetch video metadata' },
        { status: 400 }
      )
    }

    // Create video
    const video = await prisma.video.create({
      data: {
        title: videoData.title,
        youtubeUrl,
        youtubeId,
        description: videoData.description,
        thumbnail: videoData.thumbnail,
        userId: session.user.id
      }
    })

    return NextResponse.json({ video })
  } catch (error) {
    console.error('Video creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) {
      return match[1]
    }
  }

  return null
}

async function fetchYouTubeMetadata(videoId: string) {
  try {
    // For demo purposes, we'll create mock metadata
    // In production, you'd use YouTube Data API
    return {
      title: `Video ${videoId}`,
      description: `Description for video ${videoId}`,
      thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    }
  } catch (error) {
    console.error('YouTube metadata fetch error:', error)
    return null
  }
}


