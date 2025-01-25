import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/lib/prisma"

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  try {
    const notifications = await prisma.notification.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(notifications)
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar notificações" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  const { id } = await req.json()

  try {
    await prisma.notification.update({
      where: {
        id,
        userId: session.user.id,
      },
      data: {
        read: true,
      },
    })

    return NextResponse.json({ message: "Notificação marcada como lida" })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar notificação" }, { status: 500 })
  }
}

