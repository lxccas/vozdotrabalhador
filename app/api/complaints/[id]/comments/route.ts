import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/lib/prisma"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const complaintId = params.id

  try {
    const comments = await prisma.comment.findMany({
      where: { complaintId },
      include: { user: { select: { name: true, image: true } } },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(comments)
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar comentários" }, { status: 500 })
  }
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  const complaintId = params.id
  const { content } = await req.json()

  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        userId: session.user.id,
        complaintId,
      },
      include: { user: { select: { name: true, image: true } } },
    })

    return NextResponse.json(comment)
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar comentário" }, { status: 500 })
  }
}

