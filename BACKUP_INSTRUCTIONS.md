# Plano de Backup Completo Local

Para garantir a segurança total do sistema CATBACK, siga estes passos para realizar o backup local de todos os componentes:

## 1. Backup de Código (Git/Local)
O código fonte já está seguro no repositório, mas para uma cópia física local:
- Comprima a pasta `src`, `public` e os arquivos de configuração (`vite.config.ts`, `tailwind.config.ts`, `package.json`).
- **NÃO** inclua a pasta `node_modules`.

## 2. Backup do Banco de Dados (Supabase)
Como o banco de dados é gerenciado, você deve exportar os dados periodicamente:
1. Acesse o [Painel do Supabase](https://app.supabase.com/).
2. Vá em **Table Editor**.
3. Para cada tabela (`profiles`, `loyalty_cards`, `appointments`, `services`), clique em **Export CSV**.
4. Guarde esses arquivos em um local seguro (ex: Google Drive ou Disco Rígido Externo).

## 3. Backup de Configurações de Ambiente
Mantenha uma cópia segura do seu arquivo `.env` (ou as chaves de integração) em um gerenciador de senhas. Chaves críticas incluem:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_STRIPE_PUBLIC_KEY`
- `STRIPE_SECRET_KEY` (Edge Functions)

## 4. Backup de Ativos (Imagens)
Certifique-se de que todas as imagens em `public/images` possuem cópias originais fora do ambiente de desenvolvimento.

---
*Recomendação: Realize este procedimento a cada atualização significativa de funcionalidades.*