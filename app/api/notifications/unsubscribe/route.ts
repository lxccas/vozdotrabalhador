import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  const subscription = await req.json()

  try {
    await prisma.pushSubscription.deleteMany({
      where: {
        userId: session.user.id,
        endpoint: subscription.endpoint,
      },
    })

    return NextResponse.json({ message: "Subscription removed successfully" })
  } catch (error) {
    console.error("Error removing subscription:", error)
    return NextResponse.json({ error: "Failed to remove subscription" }, { status: 500 })
  }
}

