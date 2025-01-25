"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { addDays } from "date-fns"

export default function AdminReports() {
  const [reportType, setReportType] = useState("users")
  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: addDays(new Date(), 7),
  })

  const generateReport = async () => {
    // Implement report generation logic here
    console.log("Generating report:", reportType, dateRange)
    // You would typically make an API call here to generate the report
    // and then either download it or display it on the page
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Relatórios</h1>
      <Card>
        <CardHeader>
          <CardTitle>Gerar Relatório</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="reportType" className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Relatório
            </label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger id="reportType" className="w-[200px]">
                <SelectValue placeholder="Selecione o tipo de relatório" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="users">Usuários</SelectItem>
                <SelectItem value="complaints">Reclamações</SelectItem>
                <SelectItem value="activity">Atividade do Site</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 mb-1">
              Intervalo de Datas
            </label>
            <DatePickerWithRange id="dateRange" selected={dateRange} onSelect={setDateRange} />
          </div>
          <Button onClick={generateReport}>Gerar Relatório</Button>
        </CardContent>
      </Card>
    </div>
  )
}

