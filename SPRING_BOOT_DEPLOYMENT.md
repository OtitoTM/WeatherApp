# Spring Boot Backend Deployment Guide

## Deploy to Railway (Recommended)

### Step 1: Prepare Your Spring Boot App

1. **Navigate to your Spring Boot project:**

   ```bash
   cd WeatherWebsite/WeatherWebsite/WeatherWebsite
   ```

2. **Create a `system.properties` file** in the root of your Spring Boot project:

   ```properties
   java.runtime.version=17
   ```

3. **Update `application.properties`** to use environment variables:

   ```properties
   # Database Configuration
   spring.datasource.url=${DATABASE_URL:jdbc:mysql://127.0.0.1:3306/weatherHistory}
   spring.datasource.username=${DB_USERNAME:root}
   spring.datasource.password=${DB_PASSWORD:}

   # JPA Configuration
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=false

   # Server Configuration
   server.port=${PORT:8080}

   # CORS Configuration
   spring.web.cors.allowed-origins=${ALLOWED_ORIGINS:http://localhost:4200,https://your-vercel-app.vercel.app}
   spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
   spring.web.cors.allowed-headers=*
   ```

### Step 2: Deploy to Railway

1. **Go to [Railway.app](https://railway.app)**
2. **Sign up/Login** with your GitHub account
3. **Create New Project** → **Deploy from GitHub repo**
4. **Select your repository** and the Spring Boot folder
5. **Add Environment Variables:**
   - `DATABASE_URL` - Railway will provide this
   - `DB_USERNAME` - Railway will provide this
   - `DB_PASSWORD` - Railway will provide this
   - `ALLOWED_ORIGINS` - Your Vercel app URL

### Step 3: Get Your Backend URL

After deployment, Railway will provide you with a URL like:

```
https://your-app-name.railway.app
```

## Option 2: Deploy to Render

1. **Go to [Render.com](https://render.com)**
2. **Create New Web Service**
3. **Connect your GitHub repository**
4. **Configure:**
   - **Build Command:** `./mvnw clean install`
   - **Start Command:** `java -jar target/WeatherWebsite-0.0.1-SNAPSHOT.jar`
   - **Environment:** Java

## Option 3: Deploy to Heroku

1. **Install Heroku CLI**
2. **Create `Procfile`:**
   ```
   web: java -jar target/WeatherWebsite-0.0.1-SNAPSHOT.jar
   ```
3. **Deploy:**
   ```bash
   heroku create your-app-name
   git push heroku main
   ```

## After Deployment

Once your backend is deployed, update your Angular environment file:

```typescript
// src/environments/environment.prod.ts
export const environment = {
  production: true,
  weatherApiUrl: "https://api.openweathermap.org/data/2.5",
  backendApiUrl: "https://your-railway-app.railway.app/api", // ⚠️ UPDATE THIS
  apiKey: "1c27a7b13e5a4f069779839f5fc4ceae",
};
```

## CORS Configuration

Make sure your Spring Boot app has proper CORS configuration:

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:4200", "https://your-vercel-app.vercel.app")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*");
    }
}
```

## Testing Your Backend

After deployment, test your API endpoints:

- `https://your-backend-url.com/api/weatherHistory`
- `https://your-backend-url.com/api/cities`
- `https://your-backend-url.com/api/cities/autocomplete`
