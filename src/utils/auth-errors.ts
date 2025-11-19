import { AuthApiError } from '@supabase/supabase-js';

export function getAuthErrorMessage(error: unknown): string {
  if (error instanceof AuthApiError) {
    // Handle specific Supabase Auth errors
    switch (error.status) {
      case 400:
        if (error.message.includes('Invalid login credentials')) {
          return 'Credenciais de login inválidas. Verifique o email e a senha.';
        }
        if (error.message.includes('Email not confirmed')) {
          return 'Email não confirmado. Verifique sua caixa de entrada.';
        }
        return 'Erro de autenticação: ' + error.message;
      case 429:
        return 'Muitas tentativas. Tente novamente mais tarde.';
      default:
        return 'Ocorreu um erro desconhecido durante a autenticação.';
    }
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'Ocorreu um erro desconhecido.';
}