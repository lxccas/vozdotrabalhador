"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface Statistics {
  totalComplaints: number
  totalCompanies: number
  complaintsByCategory: { name: string; value: number }[]
  complaintsByStatus: { name: string; value: number }[]
}

export default function StatisticsPage() {
  const [statistics, setStatistics] = useState<Statistics | null>(null)

  useEffect(() => {
    const fetchStatistics = async () => {
      const response = await fetch("/api/statistics")
      if (response.ok) {
        const data = await response.json()
        setStatistics(data)
      }
    }
    fetchStatistics()
  }, [])

  if (!statistics) {
    return <div>Carregando...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Estatísticas e Relatórios</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total de Reclamações</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{statistics.totalComplaints}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total de Empresas Avaliadas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{statistics.totalCompanies}</p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Reclamações por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statistics.complaintsByCategory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Reclamações por Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statistics.complaintsByStatus}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

