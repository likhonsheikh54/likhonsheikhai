# Likhon Sheikh AI Coding Agent

An advanced AI coding assistant built with modern web technologies, designed to help developers write code, build UIs, and implement complex features through natural language.

![Likhon Sheikh AI Coding Agent](/client/public/social-preview.png)

## Features

- **AI-Powered Code Generation**: Convert natural language descriptions into fully functional code with best practices
- **Multiple Language Support**: JavaScript, TypeScript, Python, Rust, Go, and many others
- **Full-Stack Development**: From frontend UI to backend services, databases, and APIs
- **Smart Versioning**: Track changes and roll back to previous versions when needed
- **Multiple AI Providers**: Integrated with Groq, OpenRouter and other AI providers
- **Progressive Web App**: Install on desktop or mobile for offline access
- **Responsive Design**: Optimized for all device sizes from mobile to desktop
- **Dark/Light Mode**: Choose the theme that works best for your environment

## Tech Stack

- **Frontend**: React, TailwindCSS, shadcn/ui components
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **State Management**: React Context API and TanStack Query
- **AI Integration**: Vercel AI SDK with Groq and OpenRouter providers
- **Deployment**: Vercel with optimized configurations

## Getting Started

### Prerequisites

- Node.js 18+ (20.x recommended)
- PostgreSQL database
- API keys for AI providers (Optional)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/likhonsheikh54/ai-coding-agent.git
   cd ai-coding-agent
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file with the following:
   ```
   DATABASE_URL=your_postgresql_connection_string
   OPENAI_API_KEY=your_openai_api_key (optional)
   GROQ_API_KEY=your_groq_api_key (optional)
   ```

4. Initialize the database:
   ```bash
   npm run db:push
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
likhon-sheikh-ai-coding-agent/
├── client/                  # Frontend code
│   ├── public/              # Public assets
│   │   ├── icons/           # PWA icons
│   │   ├── manifest.json    # PWA manifest
│   │   └── service-worker.js # PWA service worker
│   └── src/
│       ├── components/      # React components
│       │   ├── chat/        # Chat interface components
│       │   ├── layout/      # Layout components
│       │   ├── marketing/   # Marketing page components
│       │   └── ui/          # Shadcn UI components
│       ├── contexts/        # React contexts
│       ├── hooks/           # Custom React hooks
│       ├── lib/             # Utility functions
│       └── pages/           # Page components
├── server/                  # Backend code
│   ├── db.ts                # Database connection
│   ├── index.ts             # Server entry point
│   ├── routes.ts            # API routes
│   ├── storage.ts           # Data storage interface
│   └── vite.ts              # Vite server configuration
├── shared/                  # Shared code
│   └── schema.ts            # Database schema
├── vercel.json              # Vercel deployment configuration
└── package.json             # Project dependencies
```

## API Documentation

The API provides endpoints for managing:

- User authentication
- Conversations and messages
- AI completions and streaming
- Checkpoints and version history
- Settings and preferences

For detailed API documentation, see [API.md](API.md).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with love by [Likhon Sheikh](https://github.com/likhonsheikh54)
- Inspired by modern AI coding assistants like GitHub Copilot and Replit's Ghostwriter
- UI design inspired by Vercel, Replit and v0.dev

---

Made with ❤️ by Likhon Sheikh