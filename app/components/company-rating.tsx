'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Star } from 'lucide-react'

export function CompanyRating() {
  const [rating, setRating] = useState(0)

  return (
    <form className="grid gap-4">
      <Input placeholder="Nome da Empresa" />
      <div>
        <label className="block mb-2">Avaliação Geral</label>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
            >
              <Star className="w-8 h-8" />
            </button>
          ))}
        </div>
      </div>
      <Textarea placeholder="Compartilhe sua experiência trabalhando nesta empresa" />
      <Button type="submit">Enviar Avaliação</Button>
    </form>
  )
}

