import React, { useEffect, useMemo } from "react";
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
import { format, setHours, setMinutes, addMinutes, startOfDay, isSameDay } from "date-fns";
import { useServices } from "@/hooks/use-services";
import { useCreateAppointment, useUpdateAppointment, Appointment } from "@/hooks/use-appointments";
import { useOccupiedSlots } from "@/hooks/use-occupied-slots"; // Import useOccupiedSlots

const formSchema = z.object({
  service_id: z.string({ required_error: "Selecione um serviço." }).min(1, { message: "Selecione um serviço." }),
  customer_identifier: z.string().min(3, { message: "Identificador do cliente é obrigatório." }),
  start_time: z.date({ required_error: "A data é obrigatória." }),
  time: z.string({ required_error: "A hora é obrigatória." }),
  notes: z.string().optional(),
  status: z.string().optional(),
});

type AppointmentFormValues = z.infer<typeof formSchema>;

// Horários de abertura/fecho (Exemplo: 9:00 às 18:00)
const OPEN_HOUR = 9;
const CLOSE_HOUR = 18;
const SLOT_INTERVAL_MINUTES = 30;

const generateTimeSlots = () => {
    const slots: string[] = [];
    const start = setHours(startOfDay(new Date()), OPEN_HOUR);
    const end = setHours(startOfDay(new Date()), CLOSE_HOUR);
    let current = start;

    while (current < end) {
        slots.push(format(current, 'HH:mm'));
        current = addMinutes(current, SLOT_INTERVAL_MINUTES);
    }
    return slots;
};

const allTimeSlots = generateTimeSlots();

interface AppointmentFormProps {
    appointment?: Appointment;
    onFinished: () => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ appointment, onFinished }) => {
  const { data: services, isLoading: isLoadingServices } = useServices();
  const createMutation = useCreateAppointment();
  const updateMutation = useUpdateAppointment();
  
  const isEditing = !!appointment;
  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        service_id: appointment?.service_id || "",
        customer_identifier: appointment?.customer_identifier || "",
        start_time: appointment ? new Date(appointment.start_time) : undefined,
        time: appointment ? format(new Date(appointment.start_time), "HH:mm") : undefined,
        notes: appointment?.notes || "",
        status: appointment?.status || "confirmed",
    }
  });

  const serviceIdWatch = form.watch("service_id");
  const dateWatch = form.watch("start_time");

  const selectedService = services?.find(s => s.id === serviceIdWatch);
  const serviceDuration = selectedService?.duration_minutes || 0;

  // Fetch occupied slots for the selected date
  const { data: occupiedSlots, isLoading: isLoadingSlots } = useOccupiedSlots(dateWatch);

  // Calculate available slots based on occupied slots and service duration
  const availableTimeSlots = useMemo(() => {
    if (!dateWatch || !occupiedSlots || serviceDuration === 0) return [];

    return allTimeSlots.filter(timeSlot => {
        const [hours, minutes] = timeSlot.split(':').map(Number);
        
        // 1. Calculate proposed appointment interval
        const proposedStart = new Date(dateWatch);
        proposedStart.setHours(hours, minutes, 0, 0);
        
        const proposedEnd = addMinutes(proposedStart, serviceDuration);

        // 2. Check if the proposed slot is outside business hours
        const businessEnd = setHours(startOfDay(dateWatch), CLOSE_HOUR);
        if (proposedEnd > businessEnd) {
            return false;
        }

        // 3. Check for overlap with occupied slots
        const isOverlapping = occupiedSlots.some(slot => {
            const occupiedStart = new Date(slot.start_time);
            const occupiedEnd = new Date(slot.end_time);
            
            // If editing, allow overlap with the current appointment being edited
            if (isEditing && appointment.id) {
                const currentAppStart = new Date(appointment.start_time);
                const currentAppEnd = new Date(appointment.end_time);
                
                // If the occupied slot is the current appointment, ignore it for overlap check
                if (isSameDay(occupiedStart, currentAppStart) && occupiedStart.getTime() === currentAppStart.getTime()) {
                    return false;
                }
            }

            // Overlap occurs if: (Start A < End B) AND (End A > Start B)
            return (proposedStart < occupiedEnd) && (proposedEnd > occupiedStart);
        });

        // 4. Check if the slot is in the past (only for today)
        if (isSameDay(dateWatch, new Date())) {
            if (proposedStart < new Date()) {
                return false;
            }
        }

        return !isOverlapping;
    });
  }, [dateWatch, occupiedSlots, serviceDuration, isEditing, appointment]);


  useEffect(() => {
    if (appointment) {
        const startTime = new Date(appointment.start_time);
        form.reset({
            service_id: appointment.service_id,
            customer_identifier: appointment.customer_identifier,
            start_time: startTime,
            time: format(startTime, "HH:mm"),
            notes: appointment.notes || "",
            status: appointment.status || "confirmed",
        });
    }
  }, [appointment, form]);


  async function onSubmit(values: AppointmentFormValues) {
    const [hours, minutes] = values.time.split(':').map(Number);
    
    // Combine date and time into a single Date object
    let finalStartTime = new Date(values.start_time);
    finalStartTime = setHours(finalStartTime, hours);
    finalStartTime = setMinutes(finalStartTime, minutes);

    const payload = {
      service_id: values.service_id,
      customer_identifier: values.customer_identifier,
      start_time: finalStartTime.toISOString(),
      status: values.status || 'confirmed',
      notes: values.notes,
    };

    if (isEditing) {
        updateMutation.mutate({ id: appointment.id, ...payload }, { onSuccess: onFinished });
    } else {
        createMutation.mutate(payload, { onSuccess: onFinished });
    }
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
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger disabled={isLoadingServices}>
                    <SelectValue placeholder={isLoadingServices ? "A carregar..." : "Selecione um serviço"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {services?.filter(s => s.is_active).map(service => (
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
                        disabled={(date) => date < startOfDay(new Date()) && !isEditing}
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
                        <FormLabel>Hora ({serviceDuration} min)</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                                <SelectTrigger disabled={!dateWatch || !serviceIdWatch || isLoadingSlots}>
                                    <SelectValue placeholder={isLoadingSlots ? "A verificar horários..." : "Selecione a hora"} />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {availableTimeSlots.length > 0 ? (
                                    availableTimeSlots.map(time => (
                                        <SelectItem key={time} value={time}>{time}</SelectItem>
                                    ))
                                ) : (
                                    <SelectItem value="" disabled>Nenhum horário disponível</SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
        
        {isEditing && (
            <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione o status" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="confirmed">Confirmado</SelectItem>
                                <SelectItem value="pending">Pendente</SelectItem>
                                <SelectItem value="cancelled">Cancelado</SelectItem>
                                <SelectItem value="completed">Concluído</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
        )}

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
        <Button 
          type="submit" 
          className="w-full bg-catback-purple hover:bg-catback-dark-purple" 
          disabled={isSubmitting || !serviceIdWatch}
        >
          {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (isEditing ? "Salvar Alterações" : "Criar Agendamento")}
        </Button>
      </form>
    </Form>
  );
};

export default AppointmentForm;