import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

interface ResourceLayoutProps {
  children: React.ReactNode
  params: {
    categoria: string
  }
}

export default function ResourceLayout({ children, params }: ResourceLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue={params.categoria} className="mb-8">
          <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 h-auto gap-2">
            <TabsTrigger value="direitos-trabalhistas" asChild>
              <Link href="/recursos/direitos-trabalhistas">Direitos Trabalhistas</Link>
            </TabsTrigger>
            <TabsTrigger value="protecao-no-trabalho" asChild>
              <Link href="/recursos/protecao-no-trabalho">Proteção no Trabalho</Link>
            </TabsTrigger>
            <TabsTrigger value="jornada-de-trabalho" asChild>
              <Link href="/recursos/jornada-de-trabalho">Jornada de Trabalho</Link>
            </TabsTrigger>
            <TabsTrigger value="beneficios" asChild>
              <Link href="/recursos/beneficios">Benefícios</Link>
            </TabsTrigger>
            <TabsTrigger value="rescisao-e-demissao" asChild>
              <Link href="/recursos/rescisao-e-demissao">Rescisão e Demissão</Link>
            </TabsTrigger>
            <TabsTrigger value="direitos-especiais" asChild>
              <Link href="/recursos/direitos-especiais">Direitos Especiais</Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        {children}
      </div>
    </div>
  )
}

