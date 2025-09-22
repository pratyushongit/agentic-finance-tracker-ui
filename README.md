# Agentic Finance Tracker UI

A modern, responsive React SPA for the Finance Agent Agentic Workflow Architecture. Built with Vite, TypeScript, and Sass, featuring a beautiful dark/light theme and comprehensive financial data visualization.

## 🚀 Features

### Frontend Layer Components

- **User Interface**
  - Chat Interface with AI assistant
  - Interactive Dashboard with real-time data
  - File Upload with drag & drop support
  - Responsive design with mobile-first approach

- **Input Sources**
  - SMS Exports integration
  - Email Transactions parsing
  - Bank Statements (CSV) import
  - Natural Language Queries processing

- **Visualization**
  - Spending Charts with interactive tooltips
  - Trend Analysis with time-based filtering
  - Category Breakdown with pie charts
  - Monthly comparison views

- **Alerts & Notifications**
  - Budget Alerts with customizable thresholds
  - Anomaly Detection notifications
  - Real-time alert management
  - Configurable alert rules

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Sass with CSS custom properties
- **Routing**: React Router DOM
- **Charts**: Recharts
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **File Upload**: React Dropzone
- **Date Handling**: date-fns

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd agentic-finance-tracker-ui
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#2563eb)
- **Secondary**: Orange (#f59e0b)
- **Accent**: Green (#10b981)
- **Status Colors**: Success, Warning, Error, Info

### Typography
- **Font Family**: Inter (Google Fonts)
- **Font Sizes**: Responsive scale from 0.75rem to 2.25rem
- **Font Weights**: 300, 400, 500, 600, 700

### Components
- **Cards**: Consistent padding, shadows, and border radius
- **Buttons**: Multiple variants (primary, secondary, success, warning, error)
- **Forms**: Styled inputs with focus states
- **Navigation**: Sidebar with collapsible sections

## 🌙 Theme Support

The application supports both light and dark themes with:
- CSS custom properties for easy theme switching
- Automatic system preference detection
- Manual theme toggle in header
- Consistent color schemes across all components

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: xs (480px), sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- **Flexible Layouts**: Grid and flexbox layouts that adapt to screen size
- **Touch Friendly**: Appropriate touch targets and gestures

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Layout/          # Main layout wrapper
│   ├── Header/          # Top navigation header
│   └── Sidebar/         # Side navigation menu
├── pages/               # Page components
│   ├── Dashboard/       # Main dashboard view
│   ├── ChatInterface/   # AI chat interface
│   ├── InputSources/    # Data input management
│   ├── Visualization/   # Charts and analytics
│   └── Alerts/          # Notifications and alerts
├── styles/              # Global styles and variables
│   ├── main.scss        # Main stylesheet
│   └── variables.scss   # SASS variables and mixins
└── main.tsx            # Application entry point
```

## 🎯 Key Features Implementation

### Dashboard
- Real-time financial metrics
- Interactive charts with Recharts
- Recent transactions list
- Budget vs actual spending comparison

### Chat Interface
- AI-powered financial assistant
- Natural language query processing
- Suggested questions for quick access
- Voice input support (UI ready)

### Input Sources
- Multiple data source connections
- File upload with validation
- Processing status tracking
- Integration management

### Visualization
- Multiple chart types (line, bar, pie, area)
- Time-based filtering
- Category-based analysis
- Export functionality (UI ready)

### Alerts System
- Configurable alert rules
- Real-time notifications
- Priority-based categorization
- Action-required flagging

## 🚀 Future Enhancements

- Backend API integration
- Real-time WebSocket connections
- Advanced data filtering
- Export to PDF/Excel
- Mobile app version
- Voice command integration
- Machine learning insights

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Design inspiration from modern fintech applications
- Icons provided by Lucide React
- Charts powered by Recharts
- Animations by Framer Motion
