# java_UI (React + Vite)

Frontend for the student management system.

## Local run

1. Install dependencies:

   npm install

2. Create environment file:

   Copy `.env.example` to `.env` and set:

   VITE_API_BASE_URL=http://localhost:3001

3. Start dev server:

   npm run dev

## Deploy to Vercel

This app is in a subfolder, so set Vercel Root Directory to:

`src/com/Distributed_GUI/java_UI`

### Vercel project settings

- Framework Preset: Vite
- Build Command: npm run build
- Output Directory: dist
- Install Command: npm install

### Environment variable (required)

Add in Vercel Project Settings -> Environment Variables:

- Name: `VITE_API_BASE_URL`
- Value: your deployed backend URL (for example `https://your-api.example.com`)

After setting this variable, redeploy so the frontend builds with the correct API URL.

## Important note

If your backend is still running only on localhost, the deployed Vercel UI cannot reach it. You must deploy your backend to a public URL and allow CORS from your Vercel domain.
