import {NextResponse} from 'next/server'
import {prisma} from '@/lib/prisma'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string
      phone?: string
      email?: string
      targetBand?: number | string
      message?: string
    }

    const name = body.name?.trim() ?? ''
    const phone = body.phone?.trim() ?? ''
    const email = body.email?.trim().toLowerCase() ?? ''
    const message = body.message?.trim() ?? ''
    const targetBandValue = typeof body.targetBand === 'string' ? Number(body.targetBand) : body.targetBand

    if (!name || name.length > 70) {
      return NextResponse.json({message: 'Name is required and must be 70 characters or fewer.'}, {status: 400})
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({message: 'Please provide a valid email address.'}, {status: 400})
    }

    if (!phone) {
      return NextResponse.json({message: 'Phone is required.'}, {status: 400})
    }

    if (typeof targetBandValue !== 'number' || Number.isNaN(targetBandValue) || targetBandValue < 0 || targetBandValue > 9) {
      return NextResponse.json({message: 'Target band must be a valid score between 0 and 9.'}, {status: 400})
    }

    if (!message) {
      return NextResponse.json({message: 'Message is required.'}, {status: 400})
    }

    const lead = await prisma.lead.create({
      data: {
        studentName: name,
        phone,
        email,
        targetBandScore: targetBandValue,
        message,
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Lead captured successfully.',
        leadId: lead.id,
      },
      {status: 201},
    )
  } catch {
    return NextResponse.json({message: 'Unexpected server error while processing inquiry.'}, {status: 500})
  }
}
