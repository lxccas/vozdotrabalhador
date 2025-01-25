import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Book, Shield, Clock, Briefcase, Scale, HeartHandshake } from "lucide-react"
import Link from "next/link"

const categorias = [
  {
    icon: <Book className="h-8 w-8" />,
    title: "Direitos Trabalhistas",
    description: "Guia completo sobre seus direitos fundamentais como trabalhador.",
    slug: "direitos-trabalhistas",
    recursos: ["Carteira de Trabalho", "Salário Mínimo", "13º Salário", "Férias", "FGTS"],
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Proteção no Trabalho",
    description: "Aprenda a identificar e lidar com situações de assédio e discriminação.",
    slug: "protecao-no-trabalho",
    recursos: ["Assédio Moral", "Assédio Sexual", "Discriminação", "Saúde e Segurança"],
  },
  {
    icon: <Clock className="h-8 w-8" />,
    title: "Jornada de Trabalho",
    description: "Informações sobre horários, horas extras e descanso.",
    slug: "jornada-de-trabalho",
    recursos: ["Horas Extras", "Intervalos", "Trabalho Noturno", "Banco de Horas"],
  },
  {
    icon: <Briefcase className="h-8 w-8" />,
    title: "Benefícios",
    description: "Conheça seus direitos a benefícios trabalhistas.",
    slug: "beneficios",
    recursos: ["Vale Transporte", "Vale Alimentação", "Plano de Saúde", "Auxílio Creche"],
  },
  {
    icon: <Scale className="h-8 w-8" />,
    title: "Rescisão e Demissão",
    description: "Entenda seus direitos em caso de demissão.",
    slug: "rescisao-e-demissao",
    recursos: ["Aviso Prévio", "Verbas Rescisórias", "Seguro Desemprego", "Homologação"],
  },
  {
    icon: <HeartHandshake className="h-8 w-8" />,
    title: "Direitos Especiais",
    description: "Direitos específicos para grupos de trabalhadores.",
    slug: "direitos-especiais",
    recursos: ["Gestantes", "PCD", "Aprendizes", "Terceirizados"],
  },
]

export default function TodosRecursosPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Recursos Educacionais</h1>
        <p className="text-lg text-gray-600">
          Explore nossa biblioteca completa de recursos educacionais sobre direitos trabalhistas e proteção no trabalho.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categorias.map((categoria) => (
          <Link key={categoria.slug} href={`/recursos/${categoria.slug}`}>
            <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">{categoria.icon}</div>
                  <CardTitle className="text-xl">{categoria.title}</CardTitle>
                </div>
                <CardDescription>{categoria.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {categoria.recursos.map((recurso) => (
                    <li key={recurso}>{recurso}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

