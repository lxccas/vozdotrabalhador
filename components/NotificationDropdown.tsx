"use client"

import { useState, useEffect } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useSession } from "next-auth/react"

interface Notification {
  id: string
  message: string
  read: boolean
  createdAt: string
}

export function NotificationDropdown() {
  const { data: session } = useSession()
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await fetch("/api/notifications")
      if (response.ok) {
        const data = await response.json()
        setNotifications(data)
      }
    }

    if (session) {
      fetchNotifications()
    }
  }, [session])

  const handleMarkAsRead = async (id: string) => {
    const response = await fetch("/api/notifications", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })

    if (response.ok) {
      setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        {notifications.length === 0 ? (
          <DropdownMenuItem>Nenhuma notificação</DropdownMenuItem>
        ) : (
          notifications.map((notification) => (
            <DropdownMenuItem key={notification.id} className="flex flex-col items-start">
              <span className={`text-sm ${notification.read ? "text-gray-500" : "font-bold"}`}>
                {notification.message}
              </span>
              <span className="text-xs text-gray-400">{new Date(notification.createdAt).toLocaleString()}</span>
              {!notification.read && (
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => handleMarkAsRead(notification.id)}
                  className="mt-1 p-0 h-auto"
                >
                  Marcar como lida
                </Button>
              )}
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

