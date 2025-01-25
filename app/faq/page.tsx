import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "Como faço para registrar uma reclamação?",
    answer:
      "Para registrar uma reclamação, faça login na sua conta e clique em 'Nova Reclamação' no seu painel. Preencha o formulário com os detalhes da sua reclamação e envie.",
  },
  {
    question: "Minhas reclamações são anônimas?",
    answer:
      "Sim, todas as reclamações são tratadas de forma anônima. Seu nome e informações pessoais não serão divulgados publicamente.",
  },
  {
    question: "Como posso avaliar uma empresa?",
    answer:
      "Para avaliar uma empresa, vá para a página 'Avaliar Empresa', digite o nome da empresa, sua avaliação e comentários. Sua avaliação será revisada antes de ser publicada.",
  },
  {
    question: "O que acontece depois que eu envio uma reclamação?",
    answer:
      "Após enviar uma reclamação, ela será revisada por nossa equipe. Você receberá atualizações sobre o status da sua reclamação através do seu painel e notificações.",
  },
  {
    question: "Como posso entrar em contato com o suporte?",
    answer:
      "Você pode entrar em contato com nosso suporte através do e-mail suporte@vozdotrabalhador.com ou pelo formulário de contato em nosso site.",
  },
]

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Perguntas Frequentes</h1>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

