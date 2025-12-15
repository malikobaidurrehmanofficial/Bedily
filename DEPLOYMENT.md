# Deployment Guide

This guide covers deploying Bedily to production.

## 📋 Pre-Deployment Checklist

- [ ] MongoDB Atlas account created and cluster set up
- [ ] Strong JWT secret generated
- [ ] Production environment variables configured
- [ ] Frontend built with production API URLs
- [ ] Rate limits reviewed and adjusted if needed
- [ ] CORS origins properly configured
- [ ] SSL/HTTPS certificates ready

## 🗄️ Database Setup (MongoDB Atlas)

1. **Create MongoDB Atlas Account**
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free tier

2. **Create a Cluster**
   - Choose your cloud provider and region
   - Select M0 (free tier) for testing

3. **Configure Network Access**
   - Add IP addresses (0.0.0.0/0 for all IPs, or specific IPs)
   - Create database user with password

4. **Get Connection String**
   ```
   mongodb+srv://username:password@cluster.mongodb.net/bedily?retryWrites=true&w=majority
   ```

## 🚀 Deployment Options

### Option 1: Deploy to Railway (Recommended)

#### Backend Deployment

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway**
   ```bash
   railway login
   ```

3. **Initialize Project**
   ```bash
   cd backend
   railway init
   ```

4. **Set Environment Variables**
   ```bash
   railway variables set MONGODB_URI="your-mongodb-atlas-uri"
   railway variables set JWT_SECRET="your-jwt-secret"
   railway variables set NODE_ENV="production"
   railway variables set CLIENT_URL="https://your-frontend-domain.com"
   railway variables set BASE_URL="https://your-backend-domain.railway.app"
   ```

5. **Deploy**
   ```bash
   railway up
   ```

#### Frontend Deployment (Vercel)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   cd frontend
   vercel
   ```

3. **Set Environment Variables in Vercel Dashboard**
   - `VITE_API_URL`: Your Railway backend URL + `/api`
   - `VITE_BASE_URL`: Your Railway backend URL

### Option 2: Deploy to Render

#### Backend on Render

1. Go to [render.com](https://render.com)
2. Create new Web Service
3. Connect your GitHub repository
4. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `npm run prod`
   - **Environment**: Add all variables from `.env.production.example`

#### Frontend on Vercel

Same as Option 1 frontend deployment.

### Option 3: Deploy to Heroku

#### Backend on Heroku

```bash
cd backend

# Login to Heroku
heroku login

# Create app
heroku create bedily-backend

# Set environment variables
heroku config:set MONGODB_URI="your-atlas-uri"
heroku config:set JWT_SECRET="your-secret"
heroku config:set NODE_ENV="production"
heroku config:set CLIENT_URL="https://your-frontend.vercel.app"

# Deploy
git push heroku main
```

## 🔐 Security Considerations

### Generate Strong JWT Secret

```bash
# On Linux/Mac
openssl rand -base64 32

# On Windows PowerShell
$bytes = New-Object byte[] 32
[System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
[Convert]::ToBase64String($bytes)
```

### Configure CORS Properly

In production, set `CLIENT_URL` to your exact frontend domain:
```
CLIENT_URL=https://yourdomain.com
```

### Enable HTTPS

Most hosting platforms (Railway, Render, Vercel) provide free SSL certificates automatically.

## 📊 Post-Deployment

### Verify Deployment

1. **Health Check**
   ```bash
   curl https://your-backend-url.com/health
   ```

2. **Test URL Shortening**
   ```bash
   curl -X POST https://your-backend-url.com/api/url/shorten \
     -H "Content-Type: application/json" \
     -d '{"url":"https://example.com"}'
   ```

3. **Test Redirect**
   - Visit: `https://your-backend-url.com/SHORTCODE`

### Monitor Application

- Set up error tracking (Sentry, LogRocket)
- Monitor MongoDB Atlas metrics
- Review rate limit logs
- Set up uptime monitoring (UptimeRobot, Pingdom)

### Performance Optimization

1. **Enable Compression**
   ```bash
   npm install compression
   ```
   
   Add to server.js:
   ```javascript
   import compression from 'compression';
   app.use(compression());
   ```

2. **Add CDN for Frontend**
   - Vercel and Netlify include CDN by default

3. **Database Indexing**
   - Already configured in Mongoose schemas
   - Monitor slow queries in Atlas

## 🐛 Common Issues

### MongoDB Connection Timeout

- Check IP whitelist in MongoDB Atlas
- Verify connection string format
- Ensure database user has correct permissions

### CORS Errors in Production

- Verify `CLIENT_URL` exactly matches your frontend domain
- Include protocol (https://)
- No trailing slashes

### Rate Limit Too Restrictive

Adjust in `backend/src/middleware/rateLimiter.js`

### Environment Variables Not Loading

- For Railway: Use `railway variables` command
- For Render: Set in dashboard
- For Heroku: Use `heroku config:set`

## 📈 Scaling Considerations

### Database Scaling

- Upgrade MongoDB Atlas tier as needed
- Add indexes for frequently queried fields
- Consider read replicas for high traffic

### Application Scaling

- Most platforms auto-scale
- Monitor memory and CPU usage
- Consider Redis for session storage (future enhancement)

### Rate Limiting

- Adjust limits based on traffic patterns
- Consider Redis for distributed rate limiting

## 🔄 CI/CD Setup (Optional)

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy Backend
        run: |
          # Add deployment commands
          
      - name: Deploy Frontend
        run: |
          # Add deployment commands
```

## 📞 Support

For deployment issues:
1. Check server logs
2. Verify environment variables
3. Test each endpoint individually
4. Review MongoDB Atlas metrics

---

Good luck with your deployment! 🚀
