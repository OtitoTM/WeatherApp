# Weather App

A modern weather application built with Angular 18 and Spring Boot, featuring real-time weather data, forecasts, and weather history tracking.

## Features

- 🌤️ Real-time weather data from OpenWeatherMap API
- 📍 Location-based weather information
- 📊 7-day weather forecast
- 📈 Weather history tracking
- 🏙️ City management and favorites
- 📱 Responsive design with Angular Material
- ⚡ Fast loading with optimized assets

## Tech Stack

### Frontend

- **Angular 18** - Modern web framework
- **Angular Material** - UI component library
- **RxJS** - Reactive programming
- **TypeScript** - Type-safe JavaScript

### Backend

- **Spring Boot** - Java backend framework
- **MongoDB** - NoSQL database
- **Node.js/Express** - Alternative backend (weather-backend folder)

## Project Structure

```
WeatherApp/
├── src/                    # Angular source code
│   ├── app/               # Application components and services
│   ├── environments/      # Environment configuration
│   └── images/           # Static assets
├── weather-backend/       # Node.js backend
├── WeatherWebsite/        # Spring Boot backend
└── vercel.json           # Vercel deployment configuration
```

## Environment Configuration

The app uses environment files to manage different configurations:

- `src/environments/environment.ts` - Development environment
- `src/environments/environment.prod.ts` - Production environment

### Required Environment Variables

1. **OpenWeatherMap API Key**: Already configured in environment files
2. **Backend API URL**: Update in production environment file

## Deployment Issues & Solutions

### Vercel Deployment Problems

#### Issue 1: Hardcoded localhost URLs

**Problem**: Services trying to connect to `localhost:8080` in production
**Solution**: ✅ Fixed - Updated all services to use environment variables

#### Issue 2: Missing Environment Configuration

**Problem**: No environment-specific API URLs
**Solution**: ✅ Fixed - Created environment files for dev/prod

#### Issue 3: Backend Deployment

**Problem**: Vercel is frontend-only, backend needs separate deployment
**Solution**: Deploy backend separately (see Backend Deployment section)

## Backend Deployment Options

### Option 1: Deploy Spring Boot Backend

1. Deploy to **Railway**, **Heroku**, or **AWS**
2. Update `environment.prod.ts` with your backend URL
3. Configure CORS in Spring Boot application

### Option 2: Deploy Node.js Backend

1. Deploy `weather-backend` to **Railway** or **Render**
2. Update `environment.prod.ts` with your backend URL

### Option 3: Use Vercel Serverless Functions

1. Create API routes in `api/` folder
2. Handle weather history and city management
3. No separate backend needed

## Local Development

### Prerequisites

- Node.js 18+
- Angular CLI 18+
- Java 17+ (for Spring Boot)
- MongoDB (optional, for full features)

### Frontend Setup

```bash
npm install
ng serve
```

### Backend Setup (Spring Boot)

```bash
cd WeatherWebsite/WeatherWebsite
./mvnw spring-boot:run
```

### Backend Setup (Node.js)

```bash
cd weather-backend
npm install
npm start
```

## Production Deployment Steps

### 1. Deploy Backend First

Choose one of the backend deployment options above and get your production URL.

### 2. Update Environment Configuration

Edit `src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  weatherApiUrl: "https://api.openweathermap.org/data/2.5",
  backendApiUrl: "https://your-actual-backend-url.com/api", // Update this
  apiKey: "1c27a7b13e5a4f069779839f5fc4ceae",
};
```

### 3. Deploy to Vercel

```bash
vercel --prod
```

## Troubleshooting

### Common Vercel Errors

1. **Build Failures**

   - Check Node.js version compatibility
   - Ensure all dependencies are in `package.json`

2. **API Connection Errors**

   - Verify backend URL in environment files
   - Check CORS configuration on backend
   - Ensure backend is deployed and accessible

3. **Routing Issues**
   - Verify `vercel.json` configuration
   - Check Angular routing setup

### Environment Variables

If you need to use Vercel environment variables:

1. Add them in Vercel dashboard
2. Update environment files to use `process.env.VARIABLE_NAME`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
