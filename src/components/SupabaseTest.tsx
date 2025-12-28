import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

const SupabaseTest = () => {
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [testResult, setTestResult] = useState<string | null>(null);
  const [testData, setTestData] = useState<any[]>([]);

  const testConnection = async () => {
    setConnectionStatus('testing');
    setTestResult(null);
    setTestData([]);

    try {
      // Test basic connection by fetching data from the profiles table
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .limit(1);

      if (error) {
        throw new Error(`Supabase error: ${error.message}`);
      }

      setConnectionStatus('success');
      setTestResult('Conexão com Supabase estabelecida com sucesso!');
      setTestData(data || []);
    } catch (error: any) {
      setConnectionStatus('error');
      setTestResult(`Erro na conexão: ${error.message}`);
      console.error('Supabase connection error:', error);
    }
  };

  return (
    <div className="p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Teste de Integração com Supabase</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <Button 
              onClick={testConnection} 
              disabled={connectionStatus === 'testing'}
              className="bg-catback-purple hover:bg-catback-dark-purple"
            >
              {connectionStatus === 'testing' ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Testando...
                </>
              ) : (
                'Testar Conexão com Supabase'
              )}
            </Button>
          </div>

          {testResult && (
            <div className={`p-4 rounded-md ${connectionStatus === 'success' ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
              <div className="flex items-center">
                {connectionStatus === 'success' ? (
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-300 mr-2" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600 dark:text-red-300 mr-2" />
                )}
                <p className={connectionStatus === 'success' ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}>
                  {testResult}
                </p>
              </div>
            </div>
          )}

          {testData.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Dados retornados:</h3>
              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md text-sm overflow-auto max-h-60">
                {JSON.stringify(testData, null, 2)}
              </pre>
            </div>
          )}

          <div className="text-sm text-gray-600 dark:text-gray-400 mt-6">
            <h4 className="font-semibold mb-2">Informações da conexão:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>URL do Supabase: https://xwwvhlwoxmbczqkcxqxg.supabase.co</li>
              <li>Status da conexão: {connectionStatus === 'success' ? 'Conectado' : connectionStatus === 'error' ? 'Erro' : 'Aguardando teste'}</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupabaseTest;