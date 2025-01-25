export const chatbotResponses = {
  default: "Desculpe, não entendi. Pode reformular sua pergunta?",
  greeting: "Olá! Como posso ajudar você hoje?",
  farewell: "Obrigado por usar nosso chatbot. Tenha um ótimo dia!",
  rights:
    "Seus direitos trabalhistas incluem salário mínimo, férias remuneradas, 13º salário, entre outros. Para mais informações, visite nossa página de recursos.",
  complaint: "Para registrar uma reclamação, faça login em sua conta e clique em 'Nova Reclamação' no seu painel.",
  contact:
    "Você pode entrar em contato conosco pelo e-mail suporte@vozdotrabalhador.com ou pelo telefone 0800-123-4567.",
  faq: "Você pode encontrar respostas para perguntas frequentes em nossa página de FAQ. Que tipo de informação você está procurando?",
  resources:
    "Temos diversos recursos educacionais disponíveis. Você pode encontrá-los na seção 'Recursos' do nosso site. Há algo específico que você gostaria de saber?",
  companies:
    "Você pode avaliar empresas ou ver avaliações existentes na seção 'Empresas' do nosso site. Gostaria de mais informações sobre como fazer isso?",
}

export type Intent = keyof typeof chatbotResponses

export const keywordIntentMap: Record<string, Intent> = {
  olá: "greeting",
  oi: "greeting",
  tchau: "farewell",
  obrigado: "farewell",
  direitos: "rights",
  trabalhista: "rights",
  reclamação: "complaint",
  denúncia: "complaint",
  contato: "contact",
  email: "contact",
  telefone: "contact",
  faq: "faq",
  dúvida: "faq",
  pergunta: "faq",
  recurso: "resources",
  educacional: "resources",
  empresa: "companies",
  avaliação: "companies",
}

export function detectIntent(input: string): Intent {
  const lowercaseInput = input.toLowerCase()
  for (const [keyword, intent] of Object.entries(keywordIntentMap)) {
    if (lowercaseInput.includes(keyword)) {
      return intent
    }
  }
  return "default"
}

