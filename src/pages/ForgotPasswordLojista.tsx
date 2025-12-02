import React, { useState } from "react";
import Layout from "@/components/Layout";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const ForgotPasswordLojista: React.FC = () => {
    const [emailSent, setEmailSent] = useState(false);

    if (emailSent) {
        return (
            <Layout>
                <div className="container py-16 flex justify-center">
                    <Card className="w-full max-w-md shadow-xl text-center">
                        <CardHeader>
                            <CheckCircle className="w-12 h-12 mx-auto text-catback-success-green" />
                            <CardTitle className="text-3xl font-bold text-catback-dark-purple">Email Enviado</CardTitle>
                            <CardDescription>
                                Verifique sua caixa de entrada. O link de redefinição de senha foi enviado.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Link to="/login" className="text-catback-purple hover:underline">
                                Voltar para o Login
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="container py-16 flex justify-center">
                <ForgotPasswordForm 
                    isCustomerFlow={false} 
                    onEmailSent={() => setEmailSent(true)} 
                />
            </div>
        </Layout>
    );
};

export default ForgotPasswordLojista;