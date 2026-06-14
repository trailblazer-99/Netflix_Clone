# Flixin - Movie Catalog with Dynamic Streaming Links (Vercel & Render)

A high-fidelity Flixin movie catalog web application built with a React (Vite) frontend and an Express (Node.js) backend. This application pulls movie metadata from The Movie Database (TMDB) and resolves regional watch providers to link titles directly to their respective streaming platforms (Netflix, Disney+, Prime Video, etc.).

---

## 📁 Repository Structure

- **`client/`**: React Vite application. Deployed on **Vercel**.
- **`server/`**: Express API proxy. Deployed on **Render**.

---

## 🚀 How to Run Locally

### 1. Start the Backend Server
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file inside the `server/` directory and add your TMDB API Key:
   ```env
   TMDB_API_KEY=your_tmdb_api_key_or_token_here
   PORT=5000
   ```
4. Start the server:
   ```bash
   npm start
   ```
   *The server will run at `http://localhost:5000`.*

### 2. Start the Frontend React Client
1. Open a new terminal and navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   *The client will run at `http://localhost:5173`. By default, the client points to the local backend proxy at `http://localhost:5000`.*

---

## ☁️ How to Deploy Online

### 1. Push Code to GitHub
1. Initialize git in the root folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Flixin Monorepo"
   ```
2. Create a new repository on GitHub.
3. Link and push your project to GitHub:
   ```bash
   git remote add origin https://github.com/your-username/your-repo-name.git
   git branch -M main
   git push -u origin main
   ```

---

### 2. Deploy Backend to Render
1. Go to [Render.com](https://render.com) and log in.
2. Click **New +** and select **Web Service**.
3. Connect your GitHub repository.
4. Set the following configurations:
   - **Name**: `flixin-api`
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
5. Scroll down to **Environment Variables** and add:
   - Key: `TMDB_API_KEY` | Value: *[Your actual TMDB key/token]*
6. Click **Deploy Web Service**.
7. Copy the generated Web Service URL (e.g., `https://flixin-api.onrender.com`).

---

### 3. Deploy Frontend to Vercel
1. Go to [Vercel.com](https://vercel.com) and log in.
2. Click **Add New** -> **Project**.
3. Connect your GitHub repository.
4. Set the following configurations:
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click Edit and select `client`
5. Open the **Environment Variables** accordion and add:
   - Key: `VITE_BACKEND_URL` | Value: *[Your Render Web Service URL copied above]*
6. Click **Deploy**.
7. Once finished, Vercel will output your live public URL!

---

## 🌟 Key Features

1. **API Key Security**: The React client never handles or exposes your API key. All TMDB calls go through the Node/Express proxy backend, injecting the key on the server.
2. **Demo Mode Fallback**: If the server has no `TMDB_API_KEY` configured, it responds with a status indicator, and the client automatically loads our pre-loaded catalog of 17 popular movies with working redirect links to Netflix/Prime.
3. **Play Direct**: Pressing the play button on featured titles automatically redirects to the streaming services (Netflix, Disney+, Max) where the movie is currently playing. A secondary option lets you play the trailer inside the custom iframe player.
