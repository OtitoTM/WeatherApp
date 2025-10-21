# Weather App Deployment Guide

## Issues Found & Fixed

### ✅ **Fixed Issues:**

1. **Hardcoded localhost URLs** - Updated all services to use environment variables
2. **Missing environment configuration** - Created dev/prod environment files
3. **Vercel configuration** - Enhanced vercel.json with proper build settings
4. **Asset configuration** - Added environment files to build assets

### 🔧 **Remaining Steps:**

## Step 1: Deploy Your Backend

You have two backend options:

### Option A: Deploy Spring Boot Backend

```bash
# Deploy to Railway (Recommended)
cd WeatherWebsite/WeatherWebsite
# Follow Railway deployment guide for Spring Boot
```

### Option B: Deploy Node.js Backend

```bash
# Deploy to Railway or Render
cd weather-backend
# Follow deployment guide for Node.js apps
```

### Option C: Use Vercel Serverless Functions

Create `api/` folder in your project root with serverless functions.

## Step 2: Update Production Environment

After deploying your backend, update `src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  weatherApiUrl: "https://api.openweathermap.org/data/2.5",
  backendApiUrl: "https://your-deployed-backend-url.com/api", // ⚠️ UPDATE THIS
  apiKey: "1c27a7b13e5a4f069779839f5fc4ceae",
};
```

## Step 3: Deploy to Vercel

```bash
# Install Vercel CLI if not installed
npm i -g vercel

# Deploy
vercel --prod
```

## Common Vercel Errors & Solutions

### Error: "Module not found"

**Solution**: Ensure all dependencies are in `package.json`

### Error: "Build failed"

**Solution**: Check Node.js version compatibility (use Node 18+)

### Error: "API calls failing"

**Solution**:

1. Verify backend URL in environment.prod.ts
2. Check CORS configuration on backend
3. Ensure backend is deployed and accessible

### Error: "Routing not working"

**Solution**: Verify `vercel.json` configuration is correct

## Environment Variables (Optional)

If you prefer using Vercel environment variables:

1. Add in Vercel dashboard:

   - `BACKEND_API_URL`
   - `WEATHER_API_KEY`

2. Update environment files to use:
   ```typescript
   backendApiUrl: process.env.BACKEND_API_URL || "http://localhost:8080/api";
   ```

## Testing Deployment

1. **Test API connections** - Check browser console for errors
2. **Test routing** - Navigate between pages
3. **Test weather functionality** - Search for cities
4. **Test backend features** - Weather history, city management

## Quick Fix Commands

```bash
# Clean and reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Build locally to test
npm run build:prod

# Deploy with fresh build
vercel --prod --force
```

## Support

If you still encounter issues:

1. Check Vercel deployment logs
2. Verify all environment variables
3. Test backend API endpoints directly
4. Check browser console for specific errors
