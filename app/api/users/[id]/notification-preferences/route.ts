import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/lib/prisma"

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.id !== params.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  const { complaints, newReviews, newResources } = await req.json()

  try {
    const updatedPreferences = await prisma.notificationPreferences.upsert({
      where: { userId: params.id },
      update: { complaints, newReviews, newResources },
      create: {
        userId: params.id,
        complaints,
        newReviews,
        newResources,
      },
    })

    return NextResponse.json(updatedPreferences)
  } catch (error) {
    console.error("Erro ao atualizar preferências de notificação:", error)
    return NextResponse.json({ error: "Erro ao atualizar preferências de notificação" }, { status: 500 })
  }
}

