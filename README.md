# Likhon Sheikh AI Coding Agent

A modern, optimized UI/UX for the Likhon Sheikh AI Coding Agent application integrating Vercel AI SDK for enhanced provider management and streaming responses.

![Likhon Sheikh AI Coding Agent](generated-icon.png)

## 🚀 Features

- **Multi-Provider Architecture**: Seamless integration with Groq, OpenRouter, and other AI providers
- **Modern UI Components**: Built with shadcn UI, Tailwind CSS, and Framer Motion
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Dark/Light Mode**: Full theme support with automatic system preference detection
- **Advanced Animations**: Smooth, engaging user experiences with motion effects
- **PWA Support**: Offline capabilities and app-like experience on mobile devices
- **SEO Optimized**: Comprehensive meta tags, sitemap, and optimized content
- **Database Integration**: PostgreSQL support with Drizzle ORM
- **User Authentication**: Secure login and session management
- **Conversation Management**: Save, restore, and manage chat interactions
- **Checkpoint System**: Create restore points in conversations

## 💻 Tech Stack

- **Frontend**: React with TypeScript, Vite for fast builds
- **Styling**: Tailwind CSS, shadcn components, Framer Motion
- **State Management**: Context API with React Query for data fetching
- **Backend**: Express with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Passport.js for secure user authentication
- **AI Integration**: Vercel AI SDK for multiple provider support
- **Deployment**: Replit Deployments with Vercel compatibility

## 📊 Architecture

The application follows a modern full-stack architecture with:

- **Clean Separation of Concerns**: UI components, data hooks, and business logic
- **Responsive UI Layer**: Adaptive components for all device sizes
- **Provider-Agnostic AI Layer**: Support multiple AI backends with unified interface
- **Database Abstraction**: Type-safe database access with Drizzle ORM
- **REST API**: Standard API endpoints for all functionality

```
├── client/           # Frontend application
│   ├── public/       # Static assets, PWA manifest, SEO files
│   └── src/
│       ├── components/ # UI components
│       ├── contexts/   # React context providers
│       ├── hooks/      # Custom React hooks
│       ├── lib/        # Utilities and helper functions
│       └── pages/      # Application pages
├── server/           # Backend application
│   ├── routes.ts     # API routes
│   ├── storage.ts    # Database interface
│   └── db.ts         # Database connection
└── shared/           # Shared code between frontend and backend
    └── schema.ts     # Database schema and types
```

## 📱 UI Components

The application includes several specialized UI components:

- **ChatInterface**: Main conversation UI with message display and input
- **Checkpoint Indicator**: Visual markers for conversation restore points
- **Code Block**: Syntax-highlighted code display with copy functionality
- **Implementation Plan**: Structured display of AI-generated project plans
- **Animated UI Elements**: Loading indicators, transitions, and feedback
- **Database Visualization**: Interactive display of database operations
- **Text Shimmer Effects**: Animated text for improved user engagement
- **Testimonials Section**: Social proof with automatic rotation
- **Modern Navigation**: Responsive navigation with mobile menu

## 🔧 Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see `.env.example`)
4. Initialize the database: `npm run db:push`
5. Start development server: `npm run dev`

## 📝 API Reference

The backend provides several API endpoints:

- **POST /api/chat**: Send messages to the AI agent
- **GET /api/models/:provider**: Get available models for a provider
- **POST /api/auth/login**: User authentication
- **GET /api/conversations**: Get user conversation history
- **POST /api/checkpoints**: Create a conversation checkpoint
- **POST /api/checkpoints/:id/restore**: Restore to a checkpoint

## 🎯 Future Enhancements

- Enhanced code generation capabilities
- Additional AI provider integrations
- Real-time collaboration features
- Advanced model fine-tuning options
- Expanded plugin system for custom functionality

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [shadcn/ui](https://ui.shadcn.com/) for the component system
- [Vercel](https://vercel.com/) for the AI SDK
- [Replit](https://replit.com/) for the hosting platform
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Drizzle ORM](https://orm.drizzle.team/) for database access