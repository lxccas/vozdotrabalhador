'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ComplaintForm() {
  const [isAnonymous, setIsAnonymous] = useState(true)

  return (
    <form className="grid gap-4">
      <div>
        <label className="block mb-2">Tipo de Reclamação</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o tipo de reclamação" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="harassment">Assédio</SelectItem>
            <SelectItem value="overwork">Sobrecarga de Trabalho</SelectItem>
            <SelectItem value="safety">Condições de Segurança</SelectItem>
            <SelectItem value="discrimination">Discriminação</SelectItem>
            <SelectItem value="other">Outro</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Textarea placeholder="Descreva sua reclamação em detalhes" />
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
            className="mr-2"
          />
          Manter reclamação anônima
        </label>
      </div>
      {!isAnonymous && (
        <>
          <Input placeholder="Seu nome" />
          <Input type="email" placeholder="Seu e-mail" />
        </>
      )}
      <Button type="submit">Enviar Reclamação</Button>
    </form>
  )
}

