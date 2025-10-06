<p align="center">
  <img src="https://raw.githubusercontent.com/Amadou-dot/Amadou-dot/main/assets/banners/worldwise-banner.png" 
       alt="WorldWise Banner" 
       width="100%" />
</p>

<h1 align="center">🌍 WorldWise – Track Your Adventures Around the Globe</h1>

<p align="center">
  <a href="#" target="_blank">
    <img src="https://img.shields.io/badge/Live%20Preview-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Preview"/>
  </a>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"/>
  <img src="https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=leaflet&logoColor=white"/>
</p>

<p align="center">
  A world map application that tracks your footsteps into every city you can think of. Never forget your wonderful experiences, and show your friends how you have wandered the world.
</p>

---

## ✨ Features

- **🗺️ Interactive World Map**: Click anywhere on the map to add cities you've visited
- **📍 Geolocation Support**: Use your current location to quickly add nearby cities
- **🏙️ City Management**: Add, view, and delete cities with detailed information
- **🌍 Country Overview**: View all countries you've visited with flags and stats
- **📝 Travel Notes**: Add personal notes and memories for each city
- **📅 Date Tracking**: Keep track of when you visited each location
- **🔐 User Authentication**: Secure login system to protect your travel data
- **💾 Local Storage**: Your data persists between sessions

## 🛠 Tech Stack

- **Frontend**: [React 18](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/) for fast development and optimized builds
- **Mapping**: [Leaflet](https://leafletjs.com/) with [React Leaflet](https://react-leaflet.js.org/)
- **Routing**: [React Router DOM](https://reactrouter.com/) for navigation
- **Styling**: CSS Modules for component-scoped styling
- **Date Handling**: [React DatePicker](https://reactdatepicker.com/)
- **Tools**: ESLint for code quality, JSON Server for development API

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) (version 8 or higher)

### Installation

```bash
# Clone the repository
git clone https://github.com/Amadou-dot/worldwise.git
cd worldwise

# Install dependencies
npm install
```

### Initialize & Run

```bash
# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the application.

### Additional Scripts

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint

# Start mock API server (if needed for development)
npm run server
```

## 📁 Project Structure

```
worldwise/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images and media files
│   ├── components/     # Reusable UI components
│   │   └── Buttons/    # Button components
│   ├── context/        # React context for state management
│   ├── data/           # Mock data and JSON files
│   ├── helpers/        # Utility functions
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components
│   ├── types/          # TypeScript type definitions
│   ├── App.tsx         # Main application component
│   └── main.tsx        # Application entry point
├── package.json        # Dependencies and scripts
└── vite.config.ts      # Vite configuration
```

## 🎮 How to Use

1. **Login**: Start by logging into the application
2. **Explore the Map**: Navigate around the interactive world map
3. **Add Cities**: Click on any location to add a city you've visited
4. **Fill Details**: Add the date of visit and personal notes
5. **View Your Journey**: Check your cities list and countries overview
6. **Manage Data**: Edit or delete entries as needed

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

---

<p align="center">
  Made by <a href="https://github.com/Amadou-dot">Amadou</a>
</p>