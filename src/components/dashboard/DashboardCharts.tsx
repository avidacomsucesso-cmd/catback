import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useNewCustomersChart, useAppointmentsChart } from "@/hooks/use-dashboard-charts";
import { Skeleton } from "@/components/ui/skeleton";

const ChartCard: React.FC<{ title: string; data: any[] | undefined; isLoading: boolean; error: Error | null; dataKey: string; color: string }> = ({ title, data, isLoading, error, dataKey, color }) => {
    if (isLoading) {
        return <Skeleton className="h-80 w-full" />;
    }

    if (error) {
        return (
            <Card className="h-80 flex items-center justify-center">
                <p className="text-red-500">Erro ao carregar dados do gráfico.</p>
            </Card>
        );
    }

    return (
        <Card className="shadow-md">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <XAxis dataKey="day" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                        <Tooltip
                            contentStyle={{
                                background: "hsl(var(--background))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "var(--radius)",
                            }}
                        />
                        <Bar dataKey="count" fill={color} radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

const DashboardCharts: React.FC = () => {
  const { data: customersData, isLoading: isLoadingCustomers, error: customersError } = useNewCustomersChart();
  const { data: appointmentsData, isLoading: isLoadingAppointments, error: appointmentsError } = useAppointmentsChart();

  return (
    <div className="grid gap-6 md:grid-cols-2">
        <ChartCard 
            title="Novos Cartões de Cliente (Últimos 7 Dias)"
            data={customersData}
            isLoading={isLoadingCustomers}
            error={customersError}
            dataKey="count"
            color="#7C3AED" // catback-purple
        />
        <ChartCard 
            title="Agendamentos (Últimos 7 Dias)"
            data={appointmentsData}
            isLoading={isLoadingAppointments}
            error={appointmentsError}
            dataKey="count"
            color="#F59E0B" // catback-energy-orange
        />
    </div>
  );
};

export default DashboardCharts;