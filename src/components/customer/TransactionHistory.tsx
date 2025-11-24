import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useLoyaltyTransactions, LoyaltyTransaction } from "@/hooks/use-loyalty-transactions";
import { Loader2, ArrowUp, ArrowDown } from "lucide-react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { CustomerCard } from "@/hooks/use-customer-cards";

interface TransactionHistoryProps {
  card: CustomerCard;
  isOpen: boolean;
  onClose: () => void;
}

const TransactionRow: React.FC<{ transaction: LoyaltyTransaction, cardType: string }> = ({ transaction, cardType }) => {
    const isPositive = transaction.change_amount >= 0;
    const isStamp = cardType === 'stamps';
    const isCashback = cardType === 'cashback';
    const currencySymbol = isCashback ? '€' : 'Pts';

    const getAmountText = () => {
        if (transaction.description === 'Recompensa resgatada') return "Recompensa";
        if (isStamp) {
            return `${isPositive ? '+' : ''}${transaction.change_amount} Selo(s)`;
        }
        return `${isPositive ? '+' : ''}${transaction.change_amount.toFixed(isCashback ? 2 : 0)} ${currencySymbol}`;
    };

    return (
        <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-800">
            <div>
                <p className="font-medium text-gray-800 dark:text-gray-200">{transaction.description || "Atualização de saldo"}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{format(new Date(transaction.created_at), "d MMM yyyy, HH:mm", { locale: pt })}</p>
            </div>
            <div className={`flex items-center font-semibold ${isPositive ? 'text-catback-success-green' : 'text-destructive'}`}>
                {isPositive ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
                {getAmountText()}
            </div>
        </div>
    );
};

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ card, isOpen, onClose }) => {
  const { data: transactions, isLoading, error } = useLoyaltyTransactions(card.id);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Histórico de Transações</SheetTitle>
          <SheetDescription>
            {card.loyalty_cards.name}
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4 h-[calc(100vh-8rem)] overflow-y-auto">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="h-6 w-6 animate-spin text-catback-purple" />
            </div>
          ) : error ? (
            <p className="text-red-500">Erro ao carregar histórico.</p>
          ) : transactions && transactions.length > 0 ? (
            <div className="space-y-2">
              {transactions.map(tx => <TransactionRow key={tx.id} transaction={tx} cardType={card.loyalty_cards.type} />)}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-10">Nenhuma transação encontrada.</p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default TransactionHistory;