"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"

interface Complaint {
  id: string
  title: string
  description: string
  category: string
  status: string
  createdAt: string
}

export default function ComplaintDetailPage() {
  const { id } = useParams()
  const [complaint, setComplaint] = useState<Complaint | null>(null)

  useEffect(() => {
    const fetchComplaint = async () => {
      const response = await fetch(`/api/complaints/${id}`)
      if (response.ok) {
        const data = await response.json()
        setComplaint(data)
      }
    }
    fetchComplaint()
  }, [id])

  const shareUrl = `https://vozdotrabalhador.com/reclamacoes/${id}`

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(complaint?.title)}&url=${encodeURIComponent(shareUrl)}`,
      "_blank",
    )
  }

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank")
  }

  if (!complaint) {
    return <div>Carregando...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>{complaint.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{complaint.description}</p>
          <p className="text-sm text-gray-500">Categoria: {complaint.category}</p>
          <p className="text-sm text-gray-500">Status: {complaint.status}</p>
          <p className="text-sm text-gray-500">Data: {new Date(complaint.createdAt).toLocaleDateString()}</p>
          <div className="mt-4 flex space-x-2">
            <Button onClick={shareOnTwitter} className="flex items-center">
              <Share2 className="mr-2 h-4 w-4" /> Compartilhar no Twitter
            </Button>
            <Button onClick={shareOnFacebook} className="flex items-center">
              <Share2 className="mr-2 h-4 w-4" /> Compartilhar no Facebook
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

