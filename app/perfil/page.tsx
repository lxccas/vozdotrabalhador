"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { NotificationManager } from "@/components/NotificationManager"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface UserProfile {
  name: string
  email: string
  image: string
  createdAt: string
  notificationPreferences: {
    complaints: boolean
    newReviews: boolean
    newResources: boolean
  }
}

export default function ProfilePage() {
  const { data: session } = useSession()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const fetchProfile = async () => {
      if (session?.user?.id) {
        const response = await fetch(`/api/users/${session.user.id}`)
        if (response.ok) {
          const data = await response.json()
          setProfile(data)
        }
      }
    }
    fetchProfile()
  }, [session])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = async () => {
    if (profile && session?.user?.id) {
      const response = await fetch(`/api/users/${session.user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      })
      if (response.ok) {
        setIsEditing(false)
      }
    }
  }

  const handleNotificationPreferenceChange = async (key: keyof UserProfile["notificationPreferences"]) => {
    if (profile && session?.user?.id) {
      const updatedPreferences = {
        ...profile.notificationPreferences,
        [key]: !profile.notificationPreferences[key],
      }
      const response = await fetch(`/api/users/${session.user.id}/notification-preferences`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPreferences),
      })
      if (response.ok) {
        setProfile({
          ...profile,
          notificationPreferences: updatedPreferences,
        })
      }
    }
  }

  if (!profile) {
    return <div>Carregando...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Seu Perfil</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={profile.image} alt={profile.name} />
              <AvatarFallback>{profile.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              {isEditing ? (
                <Input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
              ) : (
                <h2 className="text-2xl font-bold">{profile.name}</h2>
              )}
              <p className="text-gray-500">{profile.email}</p>
            </div>
          </div>
          <div className="space-y-2">
            <p>Membro desde: {new Date(profile.createdAt).toLocaleDateString()}</p>
            {isEditing ? (
              <Button onClick={handleSave}>Salvar</Button>
            ) : (
              <Button onClick={handleEdit}>Editar Perfil</Button>
            )}
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Notificações Push</h3>
            <NotificationManager />
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Preferências de Notificação</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="complaints-notifications"
                  checked={profile.notificationPreferences.complaints}
                  onCheckedChange={() => handleNotificationPreferenceChange("complaints")}
                />
                <Label htmlFor="complaints-notifications">Atualizações de Reclamações</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="new-reviews-notifications"
                  checked={profile.notificationPreferences.newReviews}
                  onCheckedChange={() => handleNotificationPreferenceChange("newReviews")}
                />
                <Label htmlFor="new-reviews-notifications">Novas Avaliações de Empresas</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="new-resources-notifications"
                  checked={profile.notificationPreferences.newResources}
                  onCheckedChange={() => handleNotificationPreferenceChange("newResources")}
                />
                <Label htmlFor="new-resources-notifications">Novos Recursos Educacionais</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

