import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProfile, useUpdateProfile } from "@/hooks/use-profile";
import { Loader2 } from "lucide-react";

const profileSchema = z.object({
  first_name: z.string().min(2, { message: "O nome é obrigatório." }),
  last_name: z.string().optional().nullable(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const ProfileSettingsForm: React.FC = () => {
  const { data: profile, isLoading: isLoadingProfile } = useProfile();
  const updateProfileMutation = useUpdateProfile();
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
    },
  });

  // Populate form when profile data loads
  useEffect(() => {
    if (profile) {
      form.reset({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
      });
    }
  }, [profile, form]);

  const { isSubmitting } = form.formState;

  async function onSubmit(values: ProfileFormValues) {
    updateProfileMutation.mutate({
        first_name: values.first_name,
        last_name: values.last_name || "",
    });
  }

  if (isLoadingProfile) {
    return (
      <Card className="w-full max-w-lg">
        <CardContent className="p-6 flex justify-center items-center h-40">
          <Loader2 className="h-6 w-6 animate-spin text-catback-purple" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="text-2xl text-catback-dark-purple">Informações Pessoais</CardTitle>
        <p className="text-sm text-gray-500">Atualize seu nome e sobrenome.</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome (ou Nome do Negócio)</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sobrenome</FormLabel>
                  <FormControl>
                    <Input placeholder="Sobrenome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full bg-catback-purple hover:bg-catback-dark-purple"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Salvar Alterações"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProfileSettingsForm;