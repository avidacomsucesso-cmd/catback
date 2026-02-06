# Backup Completo do Sistema - CATBACK
**Data do Backup:** 23 de Janeiro de 2026
**Versão do Sistema:** 1.2.2

## 📝 Descrição
Este documento serve como um registro consolidado do estado atual do sistema, incluindo a estrutura de arquivos, dependências e configurações críticas para garantir que o projeto possa ser restaurado ou replicado com precisão.

## 🗂️ Estrutura do Projeto
- **Framework:** React 18 com Vite e TypeScript.
- **Estilização:** Tailwind CSS + shadcn/ui.
- **Backend/Banco de Dados:** Supabase (Auth, Database, Edge Functions).
- **Pagamentos:** Stripe (Integration via Edge Functions).
- **Marketing:** Google Ads (Tag ID: `AW-17858320955`) e Meta Pixel (ID: `1385953883008355`).

## 📦 Inventário de Dependências (package.json)
As dependências críticas incluem:
- `@supabase/supabase-js`: ^2.83.0
- `@stripe/stripe-js`: ^8.6.0
- `react-router-dom`: ^6.29.0
- `@tanstack/react-query`: ^5.56.2
- `lucide-react`: ^0.462.0

## 🔗 Configurações de Integração
- **Supabase URL:** `https://xwwvhlwoxmbczqkcxqxg.supabase.co`
- **Google Tag ID:** `AW-17858320955`
- **Meta Pixel ID:** `1385953883008355`
- **Roteamento:** Configurado via `src/App.tsx` com suporte para Single Page Application (SPA) no `vercel.json`.

## 📂 Arquivos de Configuração Críticos
- `vite.config.ts`: Configuração do servidor e plugins.
- `tailwind.config.ts`: Temas e cores personalizadas (Catback Purple, Energy Orange, etc).
- `capacitor.config.ts`: Configurações para builds mobile (Android/iOS).
- `vercel.json`: Regras de redirecionamento para produção.

## 💾 Instruções de Recuperação
1. Clone o repositório do código.
2. Instale as dependências: `npm install`.
3. Configure as variáveis de ambiente no arquivo `.env`.
4. Realize o build: `npm run build`.
5. Verifique a conectividade com o Supabase e as chaves do Stripe.

---
*Este backup garante a integridade funcional do CATBACK na data especificada.*
