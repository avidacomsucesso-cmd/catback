import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBusinessSettings, useUpsertBusinessSettings } from "@/hooks/use-business-settings";
import { Loader2, Store, Upload, Image, Trash } from "lucide-react";
import { useFileUpload } from "@/hooks/use-file-upload";
import { useAuth } from "@/hooks/use-auth";
import { showError } from "@/utils/toast";

// Schema for form validation
const settingsSchema = z.object({
  business_name: z.string().min(2, { message: "O nome do negócio é obrigatório." }),
  // We keep logo_url as string for display/storage, but handle file upload separately
  logo_url: z.string().url({ message: "Insira um URL de logo válido." }).optional().or(z.literal('')),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

const BusinessSettingsForm: React.FC = () => {
  const { user } = useAuth();
  const { data: settings, isLoading: isLoadingSettings } = useBusinessSettings();
  const upsertMutation = useUpsertBusinessSettings();
  const fileUploadMutation = useFileUpload();
  
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      business_name: "",
      logo_url: "",
    },
  });

  // Populate form and set preview when settings data loads
  useEffect(() => {
    if (settings) {
      form.reset({
        business_name: settings.business_name || "",
        logo_url: settings.logo_url || "",
      });
      setPreviewUrl(settings.logo_url);
    }
  }, [settings, form]);
  
  // Handle file selection and preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        showError("Por favor, selecione um arquivo de imagem.");
        return;
      }
      setLogoFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      form.setValue('logo_url', ''); // Clear URL field if file is selected
    }
  };
  
  const handleRemoveLogo = () => {
    setLogoFile(null);
    setPreviewUrl(null);
    form.setValue('logo_url', '', { shouldValidate: true });
  };

  const { isSubmitting } = form.formState;
  const isUploading = fileUploadMutation.isPending;

  async function onSubmit(values: SettingsFormValues) {
    if (!user) {
        showError("Usuário não autenticado.");
        return;
    }

    let finalLogoUrl = values.logo_url || null;

    if (logoFile) {
        // 1. Upload the file
        const fileExtension = logoFile.name.split('.').pop();
        const path = `logos/${user.id}/logo.${fileExtension}`;
        
        try {
            finalLogoUrl = await fileUploadMutation.mutateAsync({
                file: logoFile,
                bucket: 'logos', // Assuming a bucket named 'logos' exists
                path: path,
            });
        } catch (e) {
            // Error handled by useFileUpload onError
            return;
        }
    } else if (values.logo_url === "") {
        // If the user cleared the URL field and didn't upload a file, set to null
        finalLogoUrl = null;
    }

    // 2. Upsert business settings with the final URL
    upsertMutation.mutate({
        business_name: values.business_name,
        logo_url: finalLogoUrl,
    });
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="text-2xl text-catback-dark-purple flex items-center">
            <Store className="w-6 h-6 mr-2" /> Configurações do Negócio
        </CardTitle>
        <p className="text-sm text-gray-500">Defina o nome e a logo que aparecerão nos cartões e emails dos seus clientes.</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="business_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Negócio</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Café da Praça" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormItem>
                <FormLabel>Logo do Negócio (Upload)</FormLabel>
                <div className="flex items-center space-x-4">
                    <Input 
                        id="logo-upload"
                        type="file" 
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <label 
                        htmlFor="logo-upload"
                        className="flex items-center justify-center p-3 border-2 border-dashed border-catback-purple/50 rounded-md cursor-pointer hover:bg-catback-light-purple/10 transition-colors flex-grow"
                    >
                        <Upload className="w-5 h-5 mr-2 text-catback-purple" />
                        {logoFile ? logoFile.name : "Clique para selecionar arquivo"}
                    </label>
                    {previewUrl && (
                        <div className="relative w-16 h-16 flex-shrink-0">
                            <img src={previewUrl} alt="Logo Preview" className="w-full h-full object-contain border rounded-md" />
                            <Button 
                                type="button"
                                variant="destructive" 
                                size="icon" 
                                className="absolute -top-2 -right-2 h-5 w-5"
                                onClick={handleRemoveLogo}
                            >
                                <Trash className="h-3 w-3" />
                            </Button>
                        </div>
                    )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                    Formatos suportados: PNG, JPG. Tamanho máximo recomendado: 500x500px.
                </p>
            </FormItem>

            <FormField
              control={form.control}
              name="logo_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL da Logo (Alternativa)</FormLabel>
                  <FormControl>
                    <Input 
                        placeholder="https://suaempresa.com/logo.png" 
                        {...field} 
                        value={field.value || ''} 
                        disabled={!!logoFile} // Disable if a file is selected
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full bg-catback-purple hover:bg-catback-dark-purple"
              disabled={isSubmitting || isUploading}
            >
              {isSubmitting || isUploading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Salvar Configurações"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default BusinessSettingsForm;