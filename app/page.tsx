'use client'
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { api } from "@/convex/_generated/api";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated, useMutation, useQuery } from "convex/react";
import { DocumentCard } from "./document-card";
import CreateDocumentButton from "./create-document-button";

export default function Home() {
  
  const documents = useQuery(api.documents.getDocuments)
  //Getting access to the Mutations functions
  const createDocument = useMutation(api.documents.createDocument);
  
  return (
    <main className="p-24 space-y-8">
      <div className="flex justify-between items-center">
      <h1 className="text-4xl font-bold">My Documents</h1>
      <CreateDocumentButton/>
      </div>
        

        
        <div className="grid grid-cols-4 gap-8">        
          {documents?.map((doc) => <DocumentCard
        
        document ={doc}
        
        />) }
          </div>


        
        
          </main>
  );
}
