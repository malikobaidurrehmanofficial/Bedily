# Bedily - URL Shortener

<div align="center">
  <img src="frontend/public/assets/logo.png" alt="Bedily Logo" width="120" />
  <h3>Modern URL Shortener with Powerful Analytics</h3>
  <p>Built with MERN Stack</p>
</div>

---

## 🚀 Features

- ⚡ **Lightning Fast** - Create shortened URLs in milliseconds
- 📊 **Analytics Dashboard** - Track clicks, devices, browsers, and referrers
- 🎨 **Custom Short Codes** - Personalize your links with custom aliases
- 🔒 **Rate Limiting** - Built-in protection against abuse
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🌐 **Production Ready** - Comprehensive error handling and validation

## 📁 Project Structure

```
bedily/
├── backend/                 # Node.js + Express API
│   ├── src/
│   │   ├── config/         # Configuration (database, environment)
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Rate limiting, validation, error handling
│   │   ├── models/         # Mongoose schemas (Url, Click)
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic layer
│   │   ├── utils/          # Helper functions
│   │   └── server.js       # Application entry point
│   ├── .env.example
│   ├── .env.production.example
│   └── package.json
│
└── frontend/               # React + Vite application
    ├── public/
    │   └── assets/         # Static assets (logo, images)
    ├── src/
    │   ├── components/     # Reusable UI components
    │   ├── contexts/       # React contexts
    │   ├── hooks/          # Custom React hooks
    │   ├── pages/          # Page components (Home, Analytics)
    │   ├── services/       # API client (Axios)
    │   ├── utils/          # Utility functions
    │   ├── App.jsx         # Main app component with routing
    │   ├── main.jsx        # Application entry point
    │   └── index.css       # Global styles with Tailwind
    ├── .env.example
    ├── .env.production
    └── package.json
```

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js (≥18.0.0)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Security**: Helmet, CORS, Rate Limiting
- **ID Generation**: nanoid
- **Environment**: dotenv

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios
- **Charts**: Recharts

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)
- **MongoDB** (v6.0 or higher) - Local installation or MongoDB Atlas account

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd bedily
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env and configure the following:
# - MONGODB_URI: Your MongoDB connection string
# - JWT_SECRET: Generate with: openssl rand -base64 32
# - CLIENT_URL: Frontend URL (http://localhost:5173 for dev)
# - BASE_URL: Backend URL (http://localhost:5000 for dev)

# Start development server
npm run dev
```

The backend server will start on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# The default values should work for local development
# VITE_API_URL=http://localhost:5000/api
# VITE_BASE_URL=http://localhost:5000

# Start development server
npm run dev
```

The frontend application will start on `http://localhost:5173`

## 🔧 Environment Variables

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/bedily` |
| `JWT_SECRET` | Secret key for JWT | Generate with `openssl rand -base64 32` |
| `JWT_EXPIRE` | JWT expiration time | `7d` |
| `CLIENT_URL` | Frontend URL (for CORS) | `http://localhost:5173` |
| `BASE_URL` | Backend base URL | `http://localhost:5000` |

### Frontend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API endpoint | `http://localhost:5000/api` |
| `VITE_BASE_URL` | Backend base URL | `http://localhost:5000` |

## 📦 Available Scripts

### Backend

```bash
npm run dev      # Start development server with nodemon
npm start        # Start production server
npm run prod     # Start production server with NODE_ENV=production
```

### Frontend

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run build:prod   # Build for production with production env
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🌐 API Endpoints

### URL Shortening

**POST** `/api/url/shorten`
```json
{
  "url": "https://example.com/very-long-url",
  "customShortCode": "my-link" // Optional
}
```

**GET** `/:shortCode`
- Redirects to original URL
- Logs analytics data

### Analytics

**GET** `/api/url/:id/analytics?days=30`
- Returns comprehensive analytics for a URL
- Includes clicks over time, device stats, browser stats, referrers

### Health Check

**GET** `/health`
- Returns server status

## 🚢 Production Deployment

### Environment Configuration

1. **Backend Production Environment**:
   ```bash
   cd backend
   cp .env.production.example .env
   # Update with production values:
   # - Use MongoDB Atlas connection string
   # - Generate strong JWT secret
   # - Set production CLIENT_URL and BASE_URL
   ```

2. **Frontend Production Environment**:
   ```bash
   cd frontend
   # Update .env.production with your production API URL
   ```

### Build for Production

```bash
# Build frontend
cd frontend
npm run build:prod

# The dist/ folder contains the production build
# Deploy the contents to your hosting service (Vercel, Netlify, etc.)
```

### Backend Deployment

```bash
cd backend
npm install --production
npm run prod
```

**Recommended Hosting Platforms**:
- **Backend**: Railway, Render, Heroku, DigitalOcean, AWS
- **Frontend**: Vercel, Netlify, Cloudflare Pages
- **Database**: MongoDB Atlas

### Security Checklist

- ✅ Change `JWT_SECRET` to a strong random value
- ✅ Use MongoDB Atlas with IP whitelist
- ✅ Set `NODE_ENV=production`
- ✅ Configure proper CORS origins
- ✅ Enable HTTPS in production
- ✅ Review and adjust rate limits
- ✅ Set up monitoring and logging

## 🎨 Customization

### Brand Colors

Update the gradient colors in `frontend/tailwind.config.js`:

```javascript
colors: {
  brand: {
    primary: '#3B4FE4',    // Main brand color
    secondary: '#1ED4C6',   // Secondary brand color
  },
},
```

### Rate Limits

Adjust rate limits in `backend/src/middleware/rateLimiter.js`:

```javascript
// URL shortening: 20 requests per 15 minutes
// Analytics: 30 requests per minute
// General API: 100 requests per 15 minutes
```

## 🐛 Troubleshooting

### MongoDB Connection Issues

1. Ensure MongoDB is running: `mongod --version`
2. Check connection string in `.env`
3. For Atlas, verify IP whitelist and credentials

### CORS Errors

1. Verify `CLIENT_URL` in backend `.env`
2. Ensure frontend is running on the correct port
3. Check browser console for specific CORS errors

### Port Already in Use

```bash
# Kill process on port 5000 (backend)
npx kill-port 5000

# Kill process on port 5173 (frontend)
npx kill-port 5173
```

## 📊 Database Schema

### Url Model
- `originalUrl`: String (required, validated)
- `shortCode`: String (unique, indexed, 4-12 chars)
- `clicks`: Number (default: 0)
- `userId`: ObjectId (optional, for future auth)
- `isActive`: Boolean (default: true)
- `expiresAt`: Date (optional)
- `createdAt`, `updatedAt`: Timestamps

### Click Model
- `urlId`: ObjectId (reference to Url)
- `ip`: String (IPv4/IPv6)
- `userAgent`: String
- `referrer`: String
- `device`: String (desktop/mobile/tablet)
- `browser`: String
- `os`: String
- `createdAt`: Timestamp

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with the MERN stack
- UI inspired by modern SaaS applications
- Icons and design principles from Tailwind CSS

---

<div align="center">
  <p>Made with ❤️ by the Bedily Team</p>
  <p>© 2025 Bedily. All rights reserved.</p>
</div>
