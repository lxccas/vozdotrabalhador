import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { VideoCard } from "@/components/video-card"
import { ContentSection } from "@/components/content-section"
import { Shield, AlertTriangle, HeartPulse, Scale, UserX } from "lucide-react"

export default function ProtecaoNoTrabalho() {
  return (
    <div className="space-y-8 animate-in fade-in-50">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Proteção no Trabalho</h1>
        <p className="text-lg text-muted-foreground">
          Saiba como se proteger de situações de assédio, discriminação e riscos à saúde no ambiente de trabalho.
        </p>
      </div>

      <Alert className="max-w-3xl mx-auto">
        <Shield className="h-4 w-4" />
        <AlertTitle>Importante</AlertTitle>
        <AlertDescription>
          Todos os trabalhadores têm direito a um ambiente de trabalho seguro e livre de assédio.
        </AlertDescription>
      </Alert>

      <div className="grid gap-8">
        <ContentSection title="Assédio Moral" icon={<AlertTriangle className="h-5 w-5 text-primary" />}>
          <ul>
            <li>Humilhações constantes ou isolamento do trabalhador</li>
            <li>Atribuição de tarefas impossíveis ou humilhantes</li>
            <li>Críticas excessivas ou injustificadas</li>
            <li>Boicote de informações necessárias ao trabalho</li>
            <li>Ridicularização pública do trabalhador</li>
          </ul>
          <p className="mt-2 font-semibold">
            Dica: Mantenha um registro detalhado de todas as situações de assédio, incluindo datas e testemunhas.
          </p>
        </ContentSection>

        <div className="grid md:grid-cols-2 gap-6">
          <VideoCard
            title="Como identificar o assédio moral"
            description="Aprenda a reconhecer situações de assédio no trabalho"
            videoUrl="https://www.youtube.com/embed/JK_6JKjyWig?si=vEHlXGomFAqvTVsG"
            thumbnail="/placeholder.svg?height=200&width=400"
          />
          <VideoCard
            title="Canais de denúncia"
            description="Saiba como e onde denunciar casos de assédio"
            videoUrl="https://www.youtube.com/embed/SFQSA_OL8q8?si=gW4wbyxykL5Jt6ec"
            thumbnail="/placeholder.svg?height=200&width=400"
          />
        </div>

        <ContentSection title="Assédio Sexual" icon={<UserX className="h-5 w-5 text-primary" />}>
          <ul>
            <li>Propostas ou insinuações sexuais indesejadas</li>
            <li>Contato físico não consentido</li>
            <li>Chantagem para manutenção do emprego</li>
            <li>Exibição de material pornográfico</li>
            <li>Comentários de natureza sexual ofensivos</li>
          </ul>
          <p className="mt-2 font-semibold">
            Dica: Comunique imediatamente ao RH ou à ouvidoria da empresa. Se necessário, procure ajuda legal.
          </p>
        </ContentSection>

        <ContentSection title="Saúde e Segurança" icon={<HeartPulse className="h-5 w-5 text-primary" />}>
          <ul>
            <li>Fornecimento de Equipamentos de Proteção Individual (EPIs)</li>
            <li>Ambiente de trabalho seguro e higienizado</li>
            <li>Treinamentos de segurança regulares</li>
            <li>Exames médicos periódicos</li>
            <li>CIPA (Comissão Interna de Prevenção de Acidentes)</li>
          </ul>
          <p className="mt-2 font-semibold">
            Dica: Nunca deixe de usar os equipamentos de proteção fornecidos pela empresa.
          </p>
        </ContentSection>

        <ContentSection title="Discriminação" icon={<Scale className="h-5 w-5 text-primary" />}>
          <ul>
            <li>Proibição de discriminação por raça, cor, sexo, idade, etc.</li>
            <li>Igualdade de oportunidades e tratamento</li>
            <li>Proibição de testes de gravidez ou esterilização</li>
            <li>Proteção contra demissão discriminatória</li>
            <li>Direito à adaptação razoável para pessoas com deficiência</li>
          </ul>
          <p className="mt-2 font-semibold">
            Dica: Se você sofrer discriminação, documente o ocorrido e procure o sindicato ou um advogado trabalhista.
          </p>
        </ContentSection>
      </div>
    </div>
  )
}

