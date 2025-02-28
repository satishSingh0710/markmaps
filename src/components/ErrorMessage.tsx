"use client";

import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface ErrorMessageProps {
  title?: string;
  message: string;
  retry?: () => void;
}

export function ErrorMessage({ 
  title = "An error occurred", 
  message, 
  retry 
}: ErrorMessageProps) {
  return (
    <Card className="border-red-200 bg-red-50">
      <CardHeader>
        <CardTitle className="flex items-center text-red-700">
          <AlertCircle className="mr-2 h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription className="text-red-600">
          {message}
        </CardDescription>
      </CardHeader>
      {retry && (
        <CardFooter>
          <Button 
            variant="outline" 
            onClick={retry}
            className="border-red-200 text-red-700 hover:bg-red-100 hover:text-red-800"
          >
            Try Again
          </Button>
        </CardFooter>
      )}
    </Card>
  );
} 