import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useServices } from "@/hooks/use-services";
import { useCreateAppointment } from "@/hooks/use-appointments";

const formSchema = z.object({
  service_id: z.string({ required_error: "Selecione um serviço." }),
  customer_identifier: z.string().min(3, { message: "Identificador do cliente é obrigatório." }),
  start_time: z.date({ required_error: "A data é obrigatória." }),
  time: z.string({ required_error: "A hora é obrigatória." }),
  notes: z.string().optional(),
});

type AppointmentFormValues = z.infer<typeof formSchema>;

const timeSlots = Array.from({ length: 24 * 2 }, (_, i) => {
    const hours = Math.floor(i / 2);
    const minutes = (i % 2) * 30;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
});

const AppointmentForm: React.FC<{ onFinished: () => void }> = ({ onFinished }) => {
  const { data: services, isLoading: isLoadingServices } = useServices();
  const createMutation = useCreateAppointment();
  const isSubmitting = createMutation.isPending;

  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: AppointmentFormValues) {
    const [hours, minutes] = values.time.split(':').map(Number);
    const finalStartTime = new Date(values.start_time);
    finalStartTime.setHours(hours, minutes);

    createMutation.mutate({
      service_id: values.service_id,
      customer_identifier: values.customer_identifier,
      start_time: finalStartTime.toISOString(),
      status: 'confirmed',
      notes: values.notes,
    }, { onSuccess: onFinished });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="service_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Serviço</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger disabled={isLoadingServices}>
                    <SelectValue placeholder={isLoadingServices ? "A carregar..." : "Selecione um serviço"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {services?.map(service => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name} ({service.duration_minutes} min)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="customer_identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cliente (Email ou Telefone)</FormLabel>
              <FormControl>
                <Input placeholder="email@cliente.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="start_time"
            render={({ field }) => (
                <FormItem className="flex flex-col">
                <FormLabel>Data</FormLabel>
                <Popover>
                    <PopoverTrigger asChild>
                    <FormControl>
                        <Button
                        variant={"outline"}
                        className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                        )}
                        >
                        {field.value ? (
                            format(field.value, "PPP")
                        ) : (
                            <span>Escolha uma data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                    </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                    />
                    </PopoverContent>
                </Popover>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Hora</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione a hora" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {timeSlots.map(time => (
                                    <SelectItem key={time} value={time}>{time}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notas (Opcional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Observações sobre o agendamento" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-catback-purple hover:bg-catback-dark-purple" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Criar Agendamento"}
        </Button>
      </form>
    </Form>
  );
};

export default AppointmentForm;