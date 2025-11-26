import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Clock, DollarSign, Gift } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { pt } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { CustomerSummary } from '@/hooks/use-customers';

interface CustomerStatusCardProps {
  customer: CustomerSummary & { status: { label: string; color: string; icon: React.ElementType } };
  onViewDetails: (identifier: string) => void;
}

const CustomerStatusCard: React.FC<CustomerStatusCardProps> = ({ customer, onViewDetails }) => {
  const { status } = customer;
  const StatusIcon = status.icon;
  
  const displayName = customer.full_name || customer.customer_identifier;

  return (
    <Card className={cn("shadow-lg hover:shadow-xl transition-shadow border-l-4", status.color)}>
      <CardHeader>
        <CardTitle className="truncate text-lg">{displayName}</CardTitle>
        <div className="flex items-center text-sm font-semibold" style={{ color: status.color.replace('border-', 'bg-').replace('bg-l-4', '') }}>
          <StatusIcon className="w-4 h-4 mr-2" />
          {status.label}
        </div>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-2 text-gray-400" />
          <span>Última atividade: {formatDistanceToNow(new Date(customer.last_activity_at), { addSuffix: true, locale: pt })}</span>
        </div>
        <div className="flex items-center">
          <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
          <span>Total gasto: {new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR" }).format(customer.total_spent)}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={() => onViewDetails(customer.customer_identifier)}>
          <Eye className="w-4 h-4 mr-2" />
          Ver Detalhes
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CustomerStatusCard;