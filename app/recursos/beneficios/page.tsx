import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { VideoCard } from "@/components/video-card"
import { ContentSection } from "@/components/content-section"
import { Package, Bus, Utensils, Heart, Baby } from "lucide-react"

export default function Beneficios() {
  return (
    <div className="space-y-8 animate-in fade-in-50">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Benefícios Trabalhistas</h1>
        <p className="text-lg text-muted-foreground">
          Conheça todos os benefícios aos quais você tem direito como trabalhador.
        </p>
      </div>

      <Alert variant="default" className="max-w-3xl mx-auto">
        <Package className="h-4 w-4" />
        <AlertTitle>Dica importante</AlertTitle>
        <AlertDescription>
          Mantenha-se informado sobre seus benefícios e como utilizá-los adequadamente.
        </AlertDescription>
      </Alert>

      <div className="grid gap-8">
        <ContentSection title="Vale Transporte" icon={<Bus className="h-5 w-5 text-primary" />}>
          <ul>
            <li>Direito garantido por lei para deslocamento casa-trabalho</li>
            <li>Desconto máximo de 6% do salário base</li>
            <li>Obrigatório para empresas de todos os tamanhos</li>
            <li>Pode ser fornecido em dinheiro em algumas situações</li>
          </ul>
        </ContentSection>

        <div className="grid md:grid-cols-2 gap-6">
          <VideoCard
            title="Como funciona o Vale Transporte"
            description="Entenda seus direitos e como calcular o benefício"
            videoUrl="https://www.youtube.com/embed/WE7m8ByXr0I?si=zV8vwSvWxxQP2PDJ"
            thumbnail="/placeholder.svg?height=200&width=400"
          />
          <VideoCard
            title="Vale Transporte em Dinheiro"
            description="Quando é permitido receber em dinheiro?"
            videoUrl="https://www.youtube.com/embed/EOGvh3Til3o?si=4eFVillH2okLwGos"
            thumbnail="/placeholder.svg?height=200&width=400"
          />
        </div>

        <ContentSection title="Vale Alimentação" icon={<Utensils className="h-5 w-5 text-primary" />}>
          <ul>
            <li>Benefício para alimentação durante o trabalho</li>
            <li>Valor varia conforme acordo coletivo</li>
            <li>Não pode ser descontado nas férias</li>
            <li>Aceito em restaurantes e supermercados</li>
          </ul>
        </ContentSection>

        <ContentSection title="Plano de Saúde" icon={<Heart className="h-5 w-5 text-primary" />}>
          <ul>
            <li>Cobertura médica e odontológica</li>
            <li>Extensível para dependentes</li>
            <li>Coparticipação opcional</li>
            <li>Mantido durante afastamento</li>
          </ul>
        </ContentSection>

        <ContentSection title="Auxílio Creche" icon={<Baby className="h-5 w-5 text-primary" />}>
          <ul>
            <li>Para filhos até 5 anos de idade</li>
            <li>Reembolso de despesas com creche</li>
            <li>Valor definido em convenção coletiva</li>
            <li>Direito para mães trabalhadoras</li>
          </ul>
        </ContentSection>
      </div>
    </div>
  )
}

