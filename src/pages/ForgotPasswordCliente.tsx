import React, { useState } from "react";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const ForgotPasswordCliente: React.FC = () => {
    const [emailSent, setEmailSent] = useState(false);

    if (emailSent) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
                <Card className="w-full max-w-md shadow-xl text-center">
                    <CardHeader>
                        <CheckCircle className="w-12 h-12 mx-auto text-catback-success-green" />
                        <CardTitle className="text-3xl font-bold text-catback-dark-purple">Email Enviado</CardTitle>
                        <CardDescription>
                            Verifique sua caixa de entrada. O link de redefinição de senha foi enviado.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Link to="/customer-auth" className="text-catback-energy-orange hover:underline">
                            Voltar para o Acesso Cliente
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
            <ForgotPasswordForm 
                isCustomerFlow={true} 
                onEmailSent={() => setEmailSent(true)} 
            />
        </div>
    );
};

export default ForgotPasswordCliente;