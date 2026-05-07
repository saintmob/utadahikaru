<div align="center">
<img width="1200" height="475" alt="Hikaru Utada: The Blue Spectrum" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 🎵 Hikaru Utada: The Blue Spectrum

An interactive web application celebrating the music and artistry of Hikaru Utada (宇多田光). Explore her emotional landscape through an immersive visual experience powered by modern web technologies.

## ✨ Features

- **Emotion-Based Navigation** - Discover songs organized by emotional themes
- **Album Timeline** - Browse albums across decades with interactive visuals
- **Interactive Playlist** - Play and share your favorite tracks
- **Smooth Animations** - Elegant transitions powered by Framer Motion
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **AI-Enhanced** - Powered by Google Gemini API for intelligent recommendations

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd utadahikaru
   npm install
   ```

2. **Configure Gemini API:**
   ```bash
   cp .env.local.example .env.local
   ```
   Add your Gemini API key to `.env.local`:
   ```
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```
   Open http://localhost:3000 in your browser

### Build for Production

```bash
npm run build
npm run preview  # Preview production build locally
```

## 📦 Tech Stack

- **Frontend Framework:** React 19 + TypeScript
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **AI Integration:** Google Generative AI SDK
- **Server:** Express.js

## 📁 Project Structure

```
src/
├── App.tsx           # Main application component
├── main.tsx          # Entry point
├── index.css         # Global styles
├── assets/
│   └── images/       # Album covers and artwork
└── vite-env.d.ts     # Vite type definitions
```

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Create production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Type check with TypeScript |
| `npm run clean` | Remove build artifacts |

## 🔗 Links

- **Live Demo:** https://utadahikaru.vercel.app/

## 📄 License

This project is provided as-is. All album artwork and music information are for appreciation and fan purposes.
