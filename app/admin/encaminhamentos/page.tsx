"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Forwarding {
  id: string
  complaintId: string
  status: string
  assignedTo: string | null
  createdAt: string
}

export default function EncaminhamentosPage() {
  const [forwardings, setForwardings] = useState<Forwarding[]>([])

  useEffect(() => {
    // Fetch forwardings from API
    // This is a placeholder and should be replaced with actual API call
    setForwardings([
      { id: "1", complaintId: "123", status: "pending", assignedTo: null, createdAt: new Date().toISOString() },
      // Add more mock data as needed
    ])
  }, [])

  const handleStatusChange = async (forwardingId: string, newStatus: string) => {
    // Update forwarding status via API
    console.log(`Updating status of ${forwardingId} to ${newStatus}`)
    // After successful API call, update local state
    setForwardings(forwardings.map((f) => (f.id === forwardingId ? { ...f, status: newStatus } : f)))
  }

  const handleAssign = async (forwardingId: string, employeeId: string) => {
    // Assign forwarding to employee via API
    console.log(`Assigning ${forwardingId} to employee ${employeeId}`)
    // After successful API call, update local state
    setForwardings(forwardings.map((f) => (f.id === forwardingId ? { ...f, assignedTo: employeeId } : f)))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Gerenciar Encaminhamentos</h1>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Encaminhamentos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID da Reclamação</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Atribuído a</TableHead>
                <TableHead>Data de Criação</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {forwardings.map((forwarding) => (
                <TableRow key={forwarding.id}>
                  <TableCell>{forwarding.complaintId}</TableCell>
                  <TableCell>{forwarding.status}</TableCell>
                  <TableCell>{forwarding.assignedTo || "Não atribuído"}</TableCell>
                  <TableCell>{new Date(forwarding.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Select onValueChange={(value) => handleStatusChange(forwarding.id, value)}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Alterar status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pendente</SelectItem>
                        <SelectItem value="in_progress">Em Progresso</SelectItem>
                        <SelectItem value="completed">Concluído</SelectItem>
                        <SelectItem value="rejected">Rejeitado</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button onClick={() => handleAssign(forwarding.id, "employee123")} className="ml-2">
                      Atribuir
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

