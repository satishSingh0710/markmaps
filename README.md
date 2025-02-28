# MarkMaps - AI-Powered Mind Mapping

MarkMaps is a Next.js application that generates comprehensive markdown documents on any topic using Claude 3.7 Sonnet via OpenRouter, and visualizes them as interactive mind maps.

## Features

- Generate well-structured markdown documents on any topic using Claude 3.7 Sonnet
- Visualize markdown as interactive mind maps using the markmap library
- Edit generated markdown and see real-time updates to the mind map
- Copy markdown to clipboard for use in other applications
- Modern UI built with Tailwind CSS and shadcn/ui components

## Tech Stack

- **Next.js** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Reusable UI components
- **Lucide React** - Beautiful icons
- **Markmap** - Markdown visualization library
- **OpenRouter API** - Access to Claude 3.7 Sonnet AI model
- **React Hook Form** - Form validation
- **Zod** - Schema validation
- **Sonner** - Toast notifications

## Getting Started

### Prerequisites

- Node.js 18.x or later
- OpenRouter API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/satishsingh21/markmaps.git
   cd markmaps
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your OpenRouter API key:
   ```
   OPENROUTER_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Enter a topic in the input field
2. Click "Generate Markdown"
3. View and edit the generated markdown in the text area
4. See the mind map visualization update in real-time
5. Copy the markdown to clipboard if needed

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Claude 3.7 Sonnet](https://www.anthropic.com/claude) by Anthropic
- [OpenRouter](https://openrouter.ai/) for API access
- [markmap](https://markmap.js.org/) for mind map visualization
- [shadcn/ui](https://ui.shadcn.com/) for UI components
