"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Loader2, FileText } from "lucide-react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { renderMarkmap } from "@/lib/markmap";
import { Markmap } from "markmap-view";
import { DemoMarkmap } from "@/components/DemoMarkmap";
import { ErrorMessage } from "@/components/ErrorMessage";

// Form validation schema
const formSchema = z.object({
  topic: z.string().min(3, {
    message: "Topic must be at least 3 characters.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [markdown, setMarkdown] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const markmapRef = useRef<HTMLDivElement>(null);
  const markmapInstanceRef = useRef<Markmap | null>(null);

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
    },
  });

  // Handle form submission
  const onSubmit = async (values: FormValues) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.post('/api/generate', { topic: values.topic });
      setMarkdown(response.data.markdown);
      toast.success("Markdown generated successfully!");
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to generate markdown. Please check your API key and try again.");
      toast.error("Failed to generate markdown. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Render markmap when markdown changes
  useEffect(() => {
    if (markdown && markmapRef.current) {
      try {
        // Clear any previous content
        if (markmapRef.current.firstChild) {
          markmapRef.current.innerHTML = '';
        }
        
        // Render the markmap after a delay to ensure the DOM is ready
        setTimeout(() => {
          if (markmapRef.current) {
            // Create new markmap
            markmapInstanceRef.current = renderMarkmap(markdown, markmapRef.current);
            console.log("Markmap rendered successfully");
          }
        }, 500);
      } catch (err) {
        console.error("Error rendering markmap:", err);
        setError("Failed to render markmap. Please check your markdown format.");
      }
    }
  }, [markdown]);

  // Copy markdown to clipboard
  const copyMarkdown = () => {
    navigator.clipboard.writeText(markdown);
    toast.success("Markdown copied to clipboard!");
  };

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">MarkMaps - AI-Powered Mind Mapping</h1>
      
      {error && (
        <div className="mb-8">
          <ErrorMessage 
            message={error} 
            retry={() => setError(null)}
          />
        </div>
      )}
      
      <div className="grid grid-cols-1 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Generate Mind Map</CardTitle>
            <CardDescription>
              Enter a topic to generate an interactive mind map using Claude 3.7 Sonnet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="topic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Topic</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Quantum Computing" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate Mind Map"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      {markdown ? (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Mind Map Visualization</CardTitle>
            <CardDescription>
              Interactive mind map generated from your topic
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div 
              ref={markmapRef} 
              className="w-full border rounded-md bg-white overflow-hidden"
              style={{ height: "calc(100vh - 300px)", minHeight: "700px" }}
            />
          </CardContent>
        </Card>
      ) : (
        <div className="mt-8">
          <DemoMarkmap />
        </div>
      )}
    </main>
  );
}
