"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

interface Complaint {
  id: string
  title: string
  description: string
  category: string
  status: string
  createdAt: string
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [editingComplaint, setEditingComplaint] = useState<Complaint | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [deletingComplaintId, setDeletingComplaintId] = useState<string | null>(null)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  useEffect(() => {
    const fetchComplaints = async () => {
      const response = await fetch(`/api/complaints?page=${currentPage}&limit=10`)
      if (response.ok) {
        const data = await response.json()
        setComplaints(data.complaints)
        setTotalPages(data.totalPages)
      }
    }

    if (session) {
      fetchComplaints()
    }
  }, [session, currentPage])

  const handleEdit = (complaint: Complaint) => {
    setEditingComplaint(complaint)
    setIsEditDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setDeletingComplaintId(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (deletingComplaintId) {
      const response = await fetch(`/api/complaints?id=${deletingComplaintId}`, {
        method: "DELETE",
      })
      if (response.ok) {
        setComplaints(complaints.filter((c) => c.id !== deletingComplaintId))
        setIsDeleteDialogOpen(false)
        setDeletingComplaintId(null)
      }
    }
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editingComplaint) {
      const response = await fetch("/api/complaints", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingComplaint),
      })
      if (response.ok) {
        setComplaints(complaints.map((c) => (c.id === editingComplaint.id ? editingComplaint : c)))
        setIsEditDialogOpen(false)
        setEditingComplaint(null)
      }
    }
  }

  if (status === "loading") {
    return <div>Carregando...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Bem-vindo, {session?.user?.name}!</CardTitle>
            <CardDescription>Aqui está um resumo das suas atividades recentes</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Total de reclamações: {complaints.length}</p>
            <Button asChild className="mt-4">
              <Link href="/reclamacoes/nova">Nova Reclamação</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Suas Reclamações Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            {complaints.length > 0 ? (
              <ul className="space-y-2">
                {complaints.slice(0, 5).map((complaint) => (
                  <li key={complaint.id} className="flex justify-between items-center">
                    <span>{complaint.title}</span>
                    <span className="text-sm text-gray-500">{complaint.status}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Você ainda não tem reclamações registradas.</p>
            )}
          </CardContent>
        </Card>
      </div>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Todas as Reclamações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Título</th>
                  <th className="text-left p-2">Categoria</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Data</th>
                  <th className="text-left p-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((complaint) => (
                  <tr key={complaint.id} className="border-b">
                    <td className="p-2">{complaint.title}</td>
                    <td className="p-2">{complaint.category}</td>
                    <td className="p-2">{complaint.status}</td>
                    <td className="p-2">{new Date(complaint.createdAt).toLocaleDateString()}</td>
                    <td className="p-2">
                      <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEdit(complaint)}>
                        Editar
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(complaint.id)}>
                        Excluir
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
              Anterior
            </Button>
            <span>
              Página {currentPage} de {totalPages}
            </span>
            <Button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Próxima
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Reclamação</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Título
                </label>
                <Input
                  id="title"
                  value={editingComplaint?.title || ""}
                  onChange={(e) => setEditingComplaint((prev) => (prev ? { ...prev, title: e.target.value } : null))}
                  required
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Categoria
                </label>
                <Select
                  value={editingComplaint?.category || ""}
                  onValueChange={(value) => setEditingComplaint((prev) => (prev ? { ...prev, category: value } : null))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="assedio">Assédio</SelectItem>
                    <SelectItem value="discriminacao">Discriminação</SelectItem>
                    <SelectItem value="condicoes_trabalho">Condições de Trabalho</SelectItem>
                    <SelectItem value="salario">Salário</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Descrição
                </label>
                <Textarea
                  id="description"
                  value={editingComplaint?.description || ""}
                  onChange={(e) =>
                    setEditingComplaint((prev) => (prev ? { ...prev, description: e.target.value } : null))
                  }
                  rows={5}
                  required
                />
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button type="submit">Salvar Alterações</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir esta reclamação? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

