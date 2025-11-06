# Sparklab Certificate Portal

A premium, minimalistic certificate portal for Sparklab Tech Training Center, built with React and TypeScript. This application allows parents and guardians to search for and view their children's achievement certificates from various tech training programs.

![Sparklab Certificate Portal](https://img.shields.io/badge/React-18.3.1-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.17-blue) ![TanStack Query](https://img.shields.io/badge/TanStack_Query-5.83.0-red)

## ✨ Features

### 🔍 Certificate Search

- **Smart Search**: Search by surname or last name with intelligent matching
- **Real-time Results**: Instant search results with loading states
- **Error Handling**: Clear messaging when certificates are not found
- **Search Guidance**: Helpful examples and instructions for users

### 🏆 Certificate Display

- **Premium Design**: Minimalistic, professional certificate presentation
- **Interactive Preview**: Blurred certificate preview that clears on hover
- **Privacy Protection**: Personal information obscured in previews
- **Download Ready**: One-click certificate downloads

### 🔐 Security & Verification

- **Email Verification**: Secure access via email verification codes
- **Phone Verification**: Additional verification layer for certificate access
- **Data Protection**: Privacy-focused design with information security

### 📊 Program Information

- **Curriculum Tracking**: Detailed curriculum completion information
- **Assessment Metrics**: Performance indicators and achievements
- **Next Stage Preview**: Information about upcoming program phases
- **Dynamic Content**: Course-specific curriculum based on program type

### 🎨 Premium UI/UX

- **Minimalist Design**: Clean, professional interface inspired by top-tier design systems
- **Brand Consistency**: Sparklab blue color scheme throughout
- **Responsive Layout**: Optimized for all device sizes
- **Smooth Animations**: Subtle transitions and hover effects

## 🚀 Tech Stack

### Frontend Framework

- **React 18.3.1** - Modern React with hooks and concurrent features
- **TypeScript 5.8.3** - Type-safe JavaScript for better development experience
- **Vite 5.4.19** - Fast build tool and development server

### UI & Styling

- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Radix UI** - Accessible, unstyled UI components
- **Lucide React** - Beautiful icon library
- **Heroicons** - Additional icon set

### State Management & Data Fetching

- **TanStack Query 5.83.0** - Powerful data synchronization for React
- **React Router DOM 6.30.1** - Declarative routing for React

### Forms & Validation

- **React Hook Form 7.61.1** - Performant forms with easy validation
- **Zod 3.25.76** - TypeScript-first schema validation

### External Services

- **EmailJS** - Client-side email sending service
- **Google Apps Script** - Serverless backend for data management

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd sparklab-certificate-portal
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# EmailJS Configuration (for verification emails)
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key

# API Endpoints (Google Apps Script URLs)
VITE_SEARCH_API_URL=Available on request
VITE_REVIEW_API_URL=available on request
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📜 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run build:dev    # Build for development
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint for code linting
```

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── PhoneVerification.tsx    # Email/phone verification modal
│   ├── ResultCard.tsx           # Certificate search result card
│   ├── ReviewForm.tsx           # Parent feedback form
│   └── SearchForm.tsx           # Certificate search form
├── pages/               # Route-based page components
│   ├── CertificatePage.tsx      # Certificate display page
│   ├── Index.tsx                # Landing page
│   ├── NotFound.tsx             # 404 error page
│   └── SearchPage.tsx           # Certificate search page
├── data/                # Static data and types
│   └── mockData.ts              # TypeScript interfaces
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
└── App.tsx              # Main application component
```

## 🔗 API Integration

### Search API

- **Endpoint**: Google Apps Script macro
- **Method**: GET
- **Parameters**: `name` (search query), `nocache` (cache busting)
- **Response**: Array of matching certificate records

### Review API

- **Endpoint**: Google Apps Script macro
- **Method**: POST
- **Body**: Form-encoded review data (name, rating, comments)
- **Response**: Success/error status

## 🎨 Design System

### Color Palette

- **Primary**: Sparklab Blue (`#3B82F6`) - Main brand color
- **Secondary**: Sparklab Purple (`#8B5CF6`) - Accent color
- **Success**: Emerald (`#10B981`) - Positive actions
- **Error**: Red (`#EF4444`) - Error states
- **Neutral**: Gray scale for text and backgrounds

### Typography

- **Font Family**: Montserrat (Google Fonts)
- **Headings**: Bold weights for hierarchy
- **Body Text**: Regular weight for readability

### Spacing

- **Base Unit**: 4px (0.25rem)
- **Scale**: 4, 8, 12, 16, 24, 32, 48, 64px
- **Consistent margins and padding** throughout

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Hosting Platform

The built files in the `dist/` directory can be deployed to:

- **Vercel**
- **Netlify**
- **GitHub Pages**
- **AWS S3 + CloudFront**
- **Any static hosting service**

### Environment Variables for Production

Ensure all `VITE_` prefixed environment variables are set in your hosting platform's environment configuration.

## 🤝 Contributing

### Development Guidelines

1. **Code Style**: Follow the existing TypeScript and React patterns
2. **Component Structure**: Use functional components with hooks
3. **Styling**: Use Tailwind CSS utility classes
4. **State Management**: Use TanStack Query for server state, React state for UI state

### Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Quality

- Run `npm run lint` before committing
- Ensure TypeScript compilation passes
- Test all user flows manually
- Follow accessibility best practices

## 📄 License

This project is proprietary software owned by Sparklab Tech Training Center. All rights reserved.

## 📞 Support

For technical support or questions:

- **Email**: support@sparklabtech.com
- **Documentation**: Internal wiki (coming soon)
- **Issues**: GitHub Issues for bug reports

## 🙏 Acknowledgments

- **Sparklab Tech Training Center** for the vision and requirements
- **React & TypeScript communities** for excellent documentation
- **Tailwind CSS** for the utility-first CSS framework
- **TanStack Query** for powerful data fetching capabilities

---

**Built with ❤️ for Sparklab Tech Training Center**
