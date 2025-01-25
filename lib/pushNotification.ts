import webpush from "web-push"
import prisma from "@/lib/prisma"

webpush.setVapidDetails(
  "mailto:luccasvnz@gmail.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!,
)

export async function sendPushNotification(userId: string, title: string, body: string, url: string) {
  const subscriptions = await prisma.pushSubscription.findMany({
    where: { userId },
  })

  const notifications = subscriptions.map((subscription) => {
    return webpush.sendNotification(
      {
        endpoint: subscription.endpoint,
        keys: {
          p256dh: subscription.p256dh,
          auth: subscription.auth,
        },
      },
      JSON.stringify({ title, body, url }),
    )
  })

  return Promise.all(notifications)
}

export async function sendNewReviewNotification(companyId: string, companyName: string) {
  const subscriptions = await prisma.pushSubscription.findMany({
    where: {
      user: {
        notificationPreferences: {
          newReviews: true,
        },
      },
    },
  })

  const notifications = subscriptions.map((subscription) => {
    return webpush.sendNotification(
      {
        endpoint: subscription.endpoint,
        keys: {
          p256dh: subscription.p256dh,
          auth: subscription.auth,
        },
      },
      JSON.stringify({
        title: "Nova Avaliação de Empresa",
        body: `Uma nova avaliação foi adicionada para ${companyName}`,
        url: `/empresas/${companyId}`,
      }),
    )
  })

  return Promise.all(notifications)
}

export async function sendNewResourceNotification(resourceId: string, resourceTitle: string) {
  const subscriptions = await prisma.pushSubscription.findMany({
    where: {
      user: {
        notificationPreferences: {
          newResources: true,
        },
      },
    },
  })

  const notifications = subscriptions.map((subscription) => {
    return webpush.sendNotification(
      {
        endpoint: subscription.endpoint,
        keys: {
          p256dh: subscription.p256dh,
          auth: subscription.auth,
        },
      },
      JSON.stringify({
        title: "Novo Recurso Educacional",
        body: `Um novo recurso foi adicionado: ${resourceTitle}`,
        url: `/recursos/${resourceId}`,
      }),
    )
  })

  return Promise.all(notifications)
}

