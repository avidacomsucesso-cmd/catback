import React, { useState } from "react";
import { useCustomerNotes, useCreateCustomerNote, useDeleteCustomerNote } from "@/hooks/use-customer-notes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, PlusCircle, Trash, MessageSquare } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

interface CustomerNotesProps {
  identifier: string;
}

const CustomerNotes: React.FC<CustomerNotesProps> = ({ identifier }) => {
  const { data: notes, isLoading } = useCustomerNotes(identifier);
  const createMutation = useCreateCustomerNote();
  const deleteMutation = useDeleteCustomerNote();
  const [newNote, setNewNote] = useState("");

  const handleAddNote = () => {
    if (newNote.trim()) {
      createMutation.mutate({ customer_identifier: identifier, note: newNote }, {
        onSuccess: () => setNewNote(""),
      });
    }
  };

  return (
    <Card className="shadow-lg h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center text-xl text-catback-dark-purple">
          <MessageSquare className="w-5 h-5 mr-2" />
          Notas do Cliente
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <div className="space-y-2 mb-4">
          <Textarea
            placeholder="Adicionar uma nota privada..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            rows={2}
          />
          <Button 
            onClick={handleAddNote} 
            disabled={createMutation.isPending || !newNote.trim()} 
            className="w-full bg-catback-dark-purple hover:bg-catback-purple"
          >
            {createMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <PlusCircle className="h-4 w-4 mr-2" />}
            Adicionar Nota
          </Button>
        </div>
        <ScrollArea className="flex-grow h-64 pr-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="h-6 w-6 animate-spin text-catback-purple" />
            </div>
          ) : notes && notes.length > 0 ? (
            <div className="space-y-3">
              {notes.map(note => (
                <div key={note.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md text-sm border border-gray-200 dark:border-gray-700">
                  <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{note.note}</p>
                  <div className="flex justify-between items-center mt-1 pt-1 border-t border-gray-100 dark:border-gray-700/50">
                    <p className="text-xs text-gray-500">
                      {format(new Date(note.created_at), "d MMM yyyy, HH:mm", { locale: pt })}
                    </p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-red-500 hover:bg-red-500/10"
                      onClick={() => deleteMutation.mutate({ noteId: note.id, identifier })}
                    >
                      <Trash className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-sm text-gray-500 pt-8">Nenhuma nota adicionada.</p>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default CustomerNotes;