import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/lib/prisma"
import { sendEmail } from "@/lib/email"
import { sendPushNotification } from "@/lib/pushNotification"

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  const { id } = params
  const { status } = await req.json()

  try {
    const updatedComplaint = await prisma.complaint.update({
      where: { id },
      data: { status },
      include: { user: true },
    })

    // Send email notification
    await sendEmail(
      updatedComplaint.user.email,
      "Atualização da sua reclamação",
      `<p>O status da sua reclamação "${updatedComplaint.title}" foi atualizado para ${status}.</p>`,
    )

    // Send push notification
    await sendPushNotification(
      updatedComplaint.user.id,
      "Atualização de Reclamação",
      `O status da sua reclamação "${updatedComplaint.title}" foi atualizado para ${status}.`,
      `/reclamacoes/${updatedComplaint.id}`,
    )

    return NextResponse.json(updatedComplaint)
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar reclamação" }, { status: 500 })
  }
}

