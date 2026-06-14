import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Helper to verify key presence and query TMDB
const fetchFromTMDB = async (path, queryParams = {}) => {
  const token = process.env.TMDB_API_KEY;
  if (!token) {
    throw new Error('TMDB_API_KEY is not configured on the server.');
  }

  const isV4 = token.length > 50 && token.startsWith('ey');
  let url = `${TMDB_BASE_URL}${path}`;
  const headers = {
    'Content-Type': 'application/json;charset=utf-8'
  };

  if (isV4) {
    headers['Authorization'] = `Bearer ${token}`;
    const searchParams = new URLSearchParams(queryParams).toString();
    if (searchParams) {
      url += `?${searchParams}`;
    }
  } else {
    const searchParams = new URLSearchParams({
      api_key: token,
      ...queryParams
    }).toString();
    url += `?${searchParams}`;
  }

  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`TMDB responded with status ${response.status}: ${response.statusText}`);
  }
  return response.json();
};

// --- API Router Endpoints ---

// Status endpoint to check if the server is up and TMDB is configured
app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    tmdbConfigured: !!process.env.TMDB_API_KEY
  });
});

// Trending movies/shows
app.get('/api/trending', async (req, res) => {
  try {
    const data = await fetchFromTMDB('/trending/all/week');
    res.json(data);
  } catch (err) {
    res.status(err.message.includes('not configured') ? 503 : 500).json({ error: err.message });
  }
});

// Top rated movies
app.get('/api/top-rated', async (req, res) => {
  try {
    const data = await fetchFromTMDB('/movie/top_rated');
    res.json(data);
  } catch (err) {
    res.status(err.message.includes('not configured') ? 503 : 500).json({ error: err.message });
  }
});

// Discover movies with filters (genres, etc.)
app.get('/api/discover', async (req, res) => {
  try {
    const data = await fetchFromTMDB('/discover/movie', req.query);
    res.json(data);
  } catch (err) {
    res.status(err.message.includes('not configured') ? 503 : 500).json({ error: err.message });
  }
});

// Search movies/tv/people
app.get('/api/search', async (req, res) => {
  try {
    const data = await fetchFromTMDB('/search/multi', req.query);
    res.json(data);
  } catch (err) {
    res.status(err.message.includes('not configured') ? 503 : 500).json({ error: err.message });
  }
});

// Detailed movie/tv info
app.get('/api/media/:type/:id', async (req, res) => {
  const { type, id } = req.params;
  try {
    const data = await fetchFromTMDB(`/${type}/${id}`);
    res.json(data);
  } catch (err) {
    res.status(err.message.includes('not configured') ? 503 : 500).json({ error: err.message });
  }
});

// Watch providers (Streaming options)
app.get('/api/media/:type/:id/providers', async (req, res) => {
  const { type, id } = req.params;
  try {
    const data = await fetchFromTMDB(`/${type}/${id}/watch/providers`);
    res.json(data);
  } catch (err) {
    res.status(err.message.includes('not configured') ? 503 : 500).json({ error: err.message });
  }
});

// Credits (Cast details)
app.get('/api/media/:type/:id/credits', async (req, res) => {
  const { type, id } = req.params;
  try {
    const data = await fetchFromTMDB(`/${type}/${id}/credits`);
    res.json(data);
  } catch (err) {
    res.status(err.message.includes('not configured') ? 503 : 500).json({ error: err.message });
  }
});

// Videos (Trailers & Teasers)
app.get('/api/media/:type/:id/videos', async (req, res) => {
  const { type, id } = req.params;
  try {
    const data = await fetchFromTMDB(`/${type}/${id}/videos`);
    res.json(data);
  } catch (err) {
    res.status(err.message.includes('not configured') ? 503 : 500).json({ error: err.message });
  }
});

// Fallback static files serving / error route
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`🚀 Express proxy server running at http://localhost:${PORT}`);
  if (!process.env.TMDB_API_KEY) {
    console.warn('⚠️ WARNING: TMDB_API_KEY environment variable is not configured. Server will run in Demo-Fallback mode.');
  }
});
