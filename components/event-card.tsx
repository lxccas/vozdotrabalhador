"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface EventCardProps {
  id: number
  title: string
  date: string
  time: string
  location: string
  description: string
  type: "palestra" | "workshop" | "seminario"
}

export function EventCard({ id, title, date, time, location, description, type }: EventCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const typeColors = {
    palestra: "bg-blue-100 text-blue-800",
    workshop: "bg-green-100 text-green-800",
    seminario: "bg-purple-100 text-purple-800",
  }

  const handleInscricao = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/inscricao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventoId: id,
          userId: 1, // Substitua isso pelo ID do usuário logado
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Inscrição realizada com sucesso!",
          description: `Você está inscrito no evento: ${title}`,
        })
      } else {
        throw new Error(data.error || "Falha ao processar inscrição")
      }
    } catch (error) {
      console.error("Erro ao processar inscrição:", error)
      toast({
        title: "Erro na inscrição",
        description: "Não foi possível processar sua inscrição. Tente novamente mais tarde.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className={`${typeColors[type]} py-2`}>
        <CardTitle className="text-lg capitalize">{type}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{time}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm mt-2">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 p-4">
        <Button className="w-full" onClick={handleInscricao} disabled={isLoading}>
          {isLoading ? "Processando..." : "Inscrever-se"}
        </Button>
      </CardFooter>
    </Card>
  )
}

