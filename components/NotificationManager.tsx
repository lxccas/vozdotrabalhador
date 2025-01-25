"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"

export function NotificationManager() {
  const { data: session } = useSession()
  const [isSubscribed, setIsSubscribed] = useState(false)

  useEffect(() => {
    if (session) {
      checkSubscription()
    }
  }, [session])

  const checkSubscription = async () => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      const registration = await navigator.serviceWorker.ready
      const subscription = await registration.pushManager.getSubscription()
      setIsSubscribed(!!subscription)
    }
  }

  const subscribe = async () => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      try {
        const registration = await navigator.serviceWorker.ready
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
        })

        await fetch("/api/notifications/subscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(subscription),
        })

        setIsSubscribed(true)
        console.log("Subscribed to push notifications")
      } catch (error) {
        console.error("Failed to subscribe to push notifications:", error)
      }
    }
  }

  const unsubscribe = async () => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      try {
        const registration = await navigator.serviceWorker.ready
        const subscription = await registration.pushManager.getSubscription()
        if (subscription) {
          await subscription.unsubscribe()
          await fetch("/api/notifications/unsubscribe", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(subscription),
          })
          setIsSubscribed(false)
          console.log("Unsubscribed from push notifications")
        }
      } catch (error) {
        console.error("Failed to unsubscribe from push notifications:", error)
      }
    }
  }

  if (!session) {
    return null
  }

  return (
    <div>
      {isSubscribed ? (
        <Button onClick={unsubscribe}>Desativar Notificações Push</Button>
      ) : (
        <Button onClick={subscribe}>Ativar Notificações Push</Button>
      )}
    </div>
  )
}

