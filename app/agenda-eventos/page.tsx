"use client"

import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EventCard } from "@/components/event-card"
import { CalendarDays, Filter } from "lucide-react"
import { Toaster } from "@/components/ui/toaster"

const eventos = [
  {
    id: 1,
    title: "Direitos Trabalhistas na Era Digital",
    date: "2023-07-15",
    time: "14:00 - 16:00",
    location: "Centro de Convenções, São Paulo",
    description:
      "Palestra sobre os desafios e direitos dos trabalhadores no contexto do trabalho remoto e plataformas digitais.",
    type: "palestra",
  },
  {
    id: 2,
    title: "Workshop de Negociação Coletiva",
    date: "2023-07-20",
    time: "09:00 - 17:00",
    location: "Sindicato dos Metalúrgicos, Belo Horizonte",
    description: "Aprenda técnicas eficazes de negociação para acordos coletivos de trabalho.",
    type: "workshop",
  },
  {
    id: 3,
    title: "Seminário: Reforma Trabalhista - 5 Anos Depois",
    date: "2023-08-05",
    time: "10:00 - 18:00",
    location: "Universidade Federal do Rio de Janeiro",
    description: "Análise dos impactos da reforma trabalhista cinco anos após sua implementação.",
    type: "seminario",
  },
  {
    id: 4,
    title: "Saúde Mental no Ambiente de Trabalho",
    date: "2023-08-12",
    time: "15:00 - 17:00",
    location: "Online - Zoom",
    description: "Palestra sobre a importância da saúde mental no trabalho e os direitos dos trabalhadores.",
    type: "palestra",
  },
  {
    id: 5,
    title: "Workshop: Elaboração de Currículos e Entrevistas",
    date: "2023-08-18",
    time: "13:00 - 18:00",
    location: "Centro de Apoio ao Trabalhador, Porto Alegre",
    description: "Aprenda a criar currículos eficazes e a se preparar para entrevistas de emprego.",
    type: "workshop",
  },
]

export default function AgendaEventos() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [filteredEvents, setFilteredEvents] = useState(eventos)
  const [selectedType, setSelectedType] = useState<string>("todos")

  const filterEvents = (selectedDate: Date | undefined, type: string) => {
    let filtered = eventos
    if (selectedDate) {
      filtered = filtered.filter((evento) => new Date(evento.date).toDateString() === selectedDate.toDateString())
    }
    if (type !== "todos") {
      filtered = filtered.filter((evento) => evento.type === type)
    }
    setFilteredEvents(filtered)
  }

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    filterEvents(selectedDate, selectedType)
  }

  const handleTypeSelect = (type: string) => {
    setSelectedType(type)
    filterEvents(date, type)
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 animate-in fade-in-50">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Agenda de Eventos</h1>
        <p className="text-lg text-muted-foreground">
          Fique por dentro dos próximos eventos, palestras e workshops sobre direitos trabalhistas.
        </p>
      </div>

      <Alert className="max-w-3xl mx-auto">
        <CalendarDays className="h-4 w-4" />
        <AlertTitle>Mantenha-se atualizado!</AlertTitle>
        <AlertDescription>
          Participe de nossos eventos para aprimorar seus conhecimentos sobre direitos trabalhistas.
        </AlertDescription>
      </Alert>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 space-y-4">
          <Calendar mode="single" selected={date} onSelect={handleDateSelect} className="rounded-md border shadow" />
          <Select onValueChange={handleTypeSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os eventos</SelectItem>
              <SelectItem value="palestra">Palestras</SelectItem>
              <SelectItem value="workshop">Workshops</SelectItem>
              <SelectItem value="seminario">Seminários</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              setDate(undefined)
              setSelectedType("todos")
              setFilteredEvents(eventos)
            }}
          >
            <Filter className="mr-2 h-4 w-4" /> Limpar Filtros
          </Button>
        </div>
        <div className="md:w-2/3">
          {filteredEvents.length > 0 ? (
            <div className="grid gap-6">
              {filteredEvents.map((evento) => (
                <EventCard key={evento.id} {...evento} type={evento.type as "palestra" | "workshop" | "seminario"} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">Nenhum evento encontrado para os filtros selecionados.</p>
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  )
}

