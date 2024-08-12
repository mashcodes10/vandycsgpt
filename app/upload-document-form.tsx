'use client'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Loader2 } from "lucide-react"
import { resolve } from "path"
import { LoadingButton } from "@/components/ui/loading-button"

const formSchema = z.object({
  title: z.string().min(2).max(50),
})
 
export default function UploadDocumentForm({
    onUpload,
  }: {
    onUpload: () => void;
  }) {

    const createDocument = useMutation(api.documents.createDocument);
        // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          title: "",
        },
      })

    // 2. Define a submit handler.
 async function onSubmit(values: z.infer<typeof formSchema>) {
    //sleep 2 seconds
    await new Promise ((resolve)=> setTimeout(resolve,2000));
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    
    await createDocument(values);
    onUpload();
  }
  
    return  (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Syllabus of classes" {...field} />
                </FormControl>
                
                <FormMessage />
              </FormItem>
            )}
          />

          <LoadingButton
        
            isLoading ={form.formState.isSubmitting}
            loadingText = "Uploading..." 
            >
                Upload
            </LoadingButton>
            
        </form>
      </Form>

    );
    
}
      
      

