# Codey - Your AI Coding Coach

Codey is an intelligent, personalized AI coding coach that adapts to different learning personas and provides tailored educational experiences for coding fundamentals and software engineering concepts.

## Features

### 🎯 Personalized Learning Paths
- **Kids**: Fun, emoji-rich coding fundamentals with playful analogies
- **Adults**: Professional coding or software engineering concepts with real-world analogies
- **Medical Professionals**: Technical concepts explained through medical analogies

### 🎨 Adaptive Themes
- **Playful Theme**: Bright, colorful interface for younger learners
- **Graceful Theme**: Professional, elegant interface for adult learners

### 🏆 Gamification
- Points system for completed challenges
- Badge achievements for milestones
- Progress tracking across learning paths

### 🔐 Secure Authentication
- Google OAuth integration via Firebase
- User progress saved to Firestore
- Admin dashboard for analytics

### 🤖 AI-Powered Coaching
- Gemini AI integration for personalized explanations
- Context-aware feedback based on user persona
- Secure backend API for AI interactions

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Backend**: Netlify Functions
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth (Google OAuth)
- **AI**: Google Gemini API
- **Deployment**: Netlify

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase project with Firestore and Auth enabled
- Google Gemini API key

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add your Gemini API key:
     ```
     GEMINI_API_KEY=your_gemini_api_key_here
     ```

4. Configure Firebase:
   - Update `src/firebaseConfig.ts` with your Firebase project configuration

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:4278](http://localhost:4278) in your browser

### Development Notes

- The app runs on port 4278 by default
- Firebase Auth warnings about Cross-Origin-Opener-Policy in development are normal and expected
- For full functionality, you'll need to set up Firebase and Gemini API keys

### Building for Production

```bash
npm run build
```

### Deployment

The project is configured for Netlify deployment:

1. Connect your repository to Netlify
2. Set the build command to `npm run build`
3. Set the publish directory to `dist`
4. Add your `GEMINI_API_KEY` environment variable in Netlify settings
5. Deploy!

## Project Structure

```
src/
├── components/          # React components
│   ├── icons.tsx       # SVG icon components
│   ├── Header.tsx      # Main header component
│   ├── WelcomeModal.tsx # Onboarding flow
│   └── ...
├── services/           # External service integrations
│   ├── authService.ts  # Firebase authentication
│   ├── dbService.ts    # Firestore database operations
│   └── geminiService.ts # AI service integration
├── constants.ts        # Learning paths and configuration
├── types.ts           # TypeScript type definitions
├── firebaseConfig.ts  # Firebase configuration
└── App.tsx           # Main application component

netlify/
└── functions/
    └── gemini.ts      # Secure backend API for Gemini
```

## Learning Paths

### Coding Fundamentals (Kids & Adults)
1. Welcome to Coding
2. Variables (Storing Information)
3. Conditionals (Making Decisions)

### Software Engineering Concepts (Adults)
1. System Architecture Overview
2. CPU & RAM Understanding
3. API Communication

### MedTech Concepts (Medical Professionals)
1. Technology in Medicine Introduction
2. System Anatomy (CPU & RAM with medical analogies)
3. System Communication (APIs in healthcare)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or support, please open an issue in the repository.
