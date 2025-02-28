"use client";

import { useEffect, useRef, useState } from "react";
import { renderMarkmap } from "@/lib/markmap";
import { Markmap } from "markmap-view";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Shorter sample markdown for better performance
const sampleMarkdown = `# Artificial Intelligence

## Machine Learning
- Supervised Learning
- Unsupervised Learning
- Reinforcement Learning

## Neural Networks
- Feedforward Networks
- CNNs
- RNNs
- Transformers

## Applications
- NLP
- Computer Vision
- Robotics

## Ethics
- Bias and Fairness
- Privacy`;

export function DemoMarkmap() {
  const markmapRef = useRef<HTMLDivElement>(null);
  const markmapInstanceRef = useRef<Markmap | null>(null);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    // Make sure we're in the browser environment
    if (typeof window === 'undefined') return;
    
    // Render the markmap after component is mounted
    const timer = setTimeout(() => {
      if (markmapRef.current && !isRendered) {
        try {
          // Create new markmap
          markmapInstanceRef.current = renderMarkmap(sampleMarkdown, markmapRef.current);
          console.log("Markmap rendered successfully");
          setIsRendered(true);
        } catch (error) {
          console.error("Error rendering markmap:", error);
        }
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [isRendered]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sample Mind Map</CardTitle>
        <CardDescription>
          An example of a mind map generated from markdown
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
  );
} 