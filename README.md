# Smart Traffic Dashboard

A modern, responsive traffic management dashboard built with React and Vite for monitoring and controlling traffic systems across Maharashtra state.

## 🚀 Features

- **Live Feed Monitoring**: Real-time video feeds from multiple traffic junctions
- **Vehicle Counting**: Automatic vehicle detection and counting for each junction
- **Emergency Alerts**: Quick alert system for traffic incidents
- **Traffic Analytics**: Interactive charts and graphs for traffic flow analysis
- **AI Recommendations**: Machine learning-powered traffic optimization suggestions
- **Traffic Simulation**: Visual simulation of traffic patterns
- **Multi-City Support**: Dropdown selection for 30+ Maharashtra cities
- **Responsive Design**: Mobile-friendly interface with dark theme

## 🛠️ Tech Stack

- **Frontend**: React 19.1.1
- **Build Tool**: Vite 7.1.5
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Language**: JavaScript/JSX

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/smart-traffic-dashboard.git
   cd smart-traffic-dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5176`

## 🎮 Usage

### Navigation
- Use the **left sidebar menu** to switch between different sections:
  - 🎥 **Live Feed**: Monitor Junction 1 & 2 with real-time vehicle counts
  - 📊 **Traffic Stats**: View detailed traffic statistics
  - 📈 **Analytics**: Interactive charts and data visualization
  - 🧠 **AI Recommendations**: ML-powered traffic optimization
  - ▶️ **Simulation**: Traffic flow simulation
  - ⚙️ **Settings**: System configuration

### Features
- **City Selection**: Choose from 30+ Maharashtra cities in the top dropdown
- **Control Modes**: Switch between Auto Mode (AI Control) and Manual Mode
- **Real-time Updates**: Data refreshes every 2 seconds
- **Emergency Alerts**: Use "Send Alert" buttons for immediate incident reporting

## 📁 Project Structure

```
smart-traffic-dashboard/
├── public/                 # Static assets and videos
├── src/
│   ├── components/        # React components
│   │   ├── VideoPlayer.jsx
│   │   ├── TrafficStats.jsx
│   │   ├── TrafficCharts.jsx
│   │   └── AIRecommendations.jsx
│   ├── App.jsx           # Main application component
│   ├── main.jsx          # Application entry point
│   └── index.css         # Global styles
├── tailwind.config.js    # Tailwind CSS configuration
├── vite.config.js        # Vite configuration
└── package.json          # Dependencies and scripts
```

## 🎬 Video Setup

To enable video playback, add your MP4 files to the `public/` directory:
- `Video.mp4` - Live feed for Junction 1
- `Video2.mp4` - Live feed for Junction 2
- `Simulation.mp4` - Traffic simulation video

## 🚀 Deployment

The project can be easily deployed to:
- **Vercel**: `npm run build` then deploy to Vercel
- **Netlify**: Connect your GitHub repo for automatic deployment
- **GitHub Pages**: Use the built files from `npm run build`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🔧 Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📧 Support

For support or questions, please open an issue on GitHub.

---

**Built with ❤️ for smart traffic management in Maharashtra**