# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Não Lançado]

### Adicionado

- Implementação do SessionProvider para gerenciamento de estado de autenticação global
- Criação de tipagens customizadas para NextAuth no arquivo next-auth.d.ts
- Página de registro de usuários
- Página de recursos adicionais com vídeos educativos
- Chatbot visível na página inicial no canto inferior esquerdo
- Página "Sobre" explicando a missão e visão do site
- Funcionalidade de pesquisa no site
- Páginas detalhadas para recursos educacionais:
  - Página de todos os recursos categorizados
  - Página sobre direitos trabalhistas
  - Página sobre proteção no trabalho
- Implementação de notificações push para novas avaliações de empresas e novos recursos educacionais
- Personalização das preferências de notificação no perfil do usuário
- Nova rota de API para atualizar as preferências de notificação do usuário
- Atualização do schema do Prisma para incluir as preferências de notificação do usuário

### Alterado

- Ajuste no redirecionamento de todas as páginas do site
- Correção na funcionalidade de criar reclamações
- Atualização do Navbar para usar a sessão do cliente
- Remoção do sistema de blog
- Melhoria na seção de recursos educacionais na página inicial
- Atualização dos botões de recursos para linkarem às novas páginas
- Atualização das rotas de API para avaliações de empresas e recursos educacionais para enviar notificações push
- Melhoria no componente de perfil do usuário para incluir opções de preferências de notificação

### Corrigido

- Correção de erros relacionados à tipagem da sessão do usuário
- Ajuste nas avaliações de empresas
- Correção na rota de API para empresas individuais

## [0.1.0]

### Adicionado

- Estrutura inicial do projeto
- Configuração do ambiente de desenvolvimento
- Implementação básica da página inicial

