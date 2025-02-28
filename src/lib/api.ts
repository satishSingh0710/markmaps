import axios from 'axios';

interface GenerateMarkdownRequest {
  topic: string;
}

interface OpenRouterResponse {
  id: string;
  choices: {
    message: {
      content: string;
    };
  }[];
}

export async function generateMarkdown(request: GenerateMarkdownRequest): Promise<string> {
  try {
    const response = await axios.post<OpenRouterResponse>(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'anthropic/claude-3-7-sonnet',
        messages: [
          {
            role: 'user',
            content: `Generate a comprehensive, well-structured markdown document about "${request.topic}". 
            The document should include:
            - A clear title and introduction
            -Keep it brief and concise (using # for main headings, ## for subheadings, etc.)
            - Bullet points for lists where appropriate
            - Some key facts or statistics if relevant
            - A conclusion section
            - Keep it to 200 words or less
            
            Make sure the document is informative, factually accurate, and well-organized for creating a mind map.`
          }
        ],
        max_tokens: 4000
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating markdown:', error);
    throw new Error('Failed to generate markdown. Please try again later.');
  }
} 