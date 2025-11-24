import React from "react";
import { useRecentActivity } from "@/hooks/use-dashboard-widgets";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Activity, User, Stamp } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { pt } from "date-fns/locale";

const RecentActivity: React.FC = () => {
  const { data: activities, isLoading, error } = useRecentActivity();

  const getActivityText = (activity: any) => {
    const progressText = activity.card_type === 'stamps' 
      ? `${activity.progress} selo(s)` 
      : `${activity.progress.toFixed(activity.card_type === 'cashback' ? 2 : 0)} ${activity.card_type === 'cashback' ? '€' : 'pts'}`;
    
    return (
      <>
        <span className="font-semibold text-catback-dark-purple dark:text-white">{activity.customer_identifier}</span>
        <span> atualizou o cartão </span>
        <span className="font-semibold">{activity.loyalty_card_name}</span>
        <span> para </span>
        <span className="font-semibold">{progressText}</span>.
      </>
    );
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center text-lg font-semibold text-gray-800 dark:text-gray-200">
          <Activity className="w-5 h-5 mr-3 text-catback-success-green" />
          Atividade Recente
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-24">
            <Loader2 className="h-6 w-6 animate-spin text-catback-purple" />
          </div>
        ) : error ? (
          <p className="text-red-500 text-sm">Erro ao carregar atividades.</p>
        ) : activities && activities.length > 0 ? (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <Stamp className="w-4 h-4 text-gray-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {getActivityText(activity)}
                  </p>
                  <p className="text-xs text-gray-400">
                    {formatDistanceToNow(new Date(activity.updated_at), { addSuffix: true, locale: pt })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-sm text-gray-500">Nenhuma atividade recente.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;