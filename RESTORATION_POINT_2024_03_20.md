# Ponto de Restauração do Sistema - CATBACK
**Data:** 20 de Março de 2024
**Versão:** 1.2.0 (Google Tag Migration & NFC Checkout)

## 📋 Status Atual das Funcionalidades
- **Autenticação:** Operacional (Lojistas e Clientes via Supabase Auth).
- **Fidelização:** Operacional (Cartão de Selos, Pontos e Cashback).
- **Agendamento:** Operacional (Integração com serviços e cálculo de horários).
- **Pagamentos:** Operacional (Stripe Checkout para Display NFC).
- **Marketing:** Operacional (Google Tag AW-17858320955 configurada e testada).

## 🛠 Configurações Críticas
- **Supabase URL:** `https://xwwvhlwoxmbczqkcxqxg.supabase.co`
- **Stripe Public Key:** Configurada via Variáveis de Ambiente.
- **Google Tag ID:** `AW-17858320955`
- **Conversão Google Ads:** `AW-17858320955/HMT2CPye_AbELu0wcNC`

## 📦 Dependências Principais
- React 18 / TypeScript
- TanStack Query (React Query) para gestão de estado.
- Tailwind CSS para estilização.
- Stripe SDK para pagamentos.
- Lucide React para ícones.

---
*Este arquivo serve como referência técnica para restauração manual em caso de falha crítica.*