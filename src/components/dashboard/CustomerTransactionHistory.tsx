import React from "react";
import { useCustomerTransactions, CustomerTransaction } from "@/hooks/use-customer-transactions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowUp, ArrowDown, History } from "lucide-react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CustomerTransactionHistoryProps {
  identifier: string;
}

const TransactionRow: React.FC<{ transaction: CustomerTransaction }> = ({ transaction }) => {
    const isPositive = transaction.change_amount >= 0;
    const isStamp = transaction.card_type === 'stamps';
    const isCashback = transaction.card_type === 'cashback';
    const currencySymbol = isCashback ? '€' : 'Pts';

    const getAmountText = () => {
        if (transaction.description === 'Recompensa resgatada') return "Recompensa Resgatada";
        if (isStamp) {
            return `${isPositive ? '+' : ''}${transaction.change_amount} Selo(s)`;
        }
        return `${isPositive ? '+' : ''}${transaction.change_amount.toFixed(isCashback ? 2 : 0)} ${currencySymbol}`;
    };

    return (
        <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-800">
            <div>
                <p className="font-medium text-gray-800 dark:text-gray-200">{transaction.description || "Atualização de saldo"}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    {transaction.loyalty_card_name} | {format(new Date(transaction.created_at), "d MMM yyyy, HH:mm", { locale: pt })}
                </p>
            </div>
            <div className={`flex items-center font-semibold text-sm ${isPositive ? 'text-catback-success-green' : 'text-destructive'}`}>
                {isPositive ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
                {getAmountText()}
            </div>
        </div>
    );
};

const CustomerTransactionHistory: React.FC<CustomerTransactionHistoryProps> = ({ identifier }) => {
  const { data: transactions, isLoading, error } = useCustomerTransactions(identifier);

  return (
    <Card className="shadow-lg h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center text-xl text-catback-dark-purple">
          <History className="w-5 h-5 mr-2" />
          Histórico de Transações
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <ScrollArea className="flex-grow h-96 pr-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="h-6 w-6 animate-spin text-catback-purple" />
            </div>
          ) : error ? (
            <p className="text-red-500">Erro ao carregar histórico.</p>
          ) : transactions && transactions.length > 0 ? (
            <div className="space-y-2">
              {transactions.map(tx => <TransactionRow key={tx.id} transaction={tx} />)}
            </div>
          ) : (
            <p className="text-center text-sm text-gray-500 pt-8">Nenhuma transação encontrada para este cliente.</p>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default CustomerTransactionHistory;