import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Info, 
  Plus, 
  Check, 
  Search, 
  Settings, 
  Bell, 
  X, 
  Star, 
  Film, 
  Tv, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Globe
} from 'lucide-react';
import { mockMovies, mockCategories } from './mockData';
import './App.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

// Helper to make requests to our Express proxy server.
// Automatically routes standard TMDB paths to Express endpoints.
const fetchFromBackendProxy = async (endpoint, unused_key, params = {}) => {
  let url = `${BACKEND_URL}/api`;
  
  if (endpoint === '/trending/all/week') {
    url += '/trending';
  } else if (endpoint === '/movie/top_rated') {
    url += '/top-rated';
  } else if (endpoint === '/discover/movie') {
    url += '/discover';
  } else if (endpoint === '/search/multi') {
    url += '/search';
  } else if (endpoint.match(/^\/(movie|tv)\/\d+$/)) {
    // /movie/:id or /tv/:id
    url += endpoint.replace(/^\/(movie|tv)/, '/media/$1');
  } else if (endpoint.match(/^\/(movie|tv)\/\d+\/watch\/providers$/)) {
    // Watch providers: /movie/:id/watch/providers -> /media/movie/:id/providers
    url += endpoint.replace(/^\/(movie|tv)\/(\d+)\/watch\/providers$/, '/media/$1/$2/providers');
  } else if (endpoint.match(/^\/(movie|tv)\/\d+\/credits$/)) {
    // Credits: /movie/:id/credits -> /media/movie/:id/credits
    url += endpoint.replace(/^\/(movie|tv)\/(\d+)\/credits$/, '/media/$1/$2/credits');
  } else if (endpoint.match(/^\/(movie|tv)\/\d+\/videos$/)) {
    // Videos: /movie/:id/videos -> /media/movie/:id/videos
    url += endpoint.replace(/^\/(movie|tv)\/(\d+)\/videos$/, '/media/$1/$2/videos');
  } else {
    url += endpoint;
  }

  // Append query params if any
  const queryParams = new URLSearchParams(params).toString();
  if (queryParams) {
    url += `?${queryParams}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Server responded with error status ${response.status}`);
  }
  return response.json();
};

function App() {
  // --- States ---
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [region, setRegion] = useState(() => localStorage.getItem('flixin_region') || 'US');
  
  const [activeTab, setActiveTab] = useState('home'); // home | tv | movies | mylist
  const [activeMovie, setActiveMovie] = useState(null);
  const [playingTrailer, setPlayingTrailer] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchActive, setSearchActive] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  
  const [showSettings, setShowSettings] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [myList, setMyList] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('flixin_mylist')) || [];
    } catch {
      return [];
    }
  });

  // Cached data for dynamic TMDB entries
  const [liveData, setLiveData] = useState({
    trending: [],
    topRated: [],
    action: [],
    scifi: [],
    drama: []
  });
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [movieProviders, setMovieProviders] = useState({});
  const [movieCredits, setMovieCredits] = useState({});
  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const searchInputRef = useRef(null);

  // --- Scroll Effect ---
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Save watchlist ---
  useEffect(() => {
    localStorage.setItem('flixin_mylist', JSON.stringify(myList));
  }, [myList]);

  // --- Check Backend Configuration Status ---
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/status`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        if (data.status === 'online' && data.tmdbConfigured) {
          setIsLiveMode(true);
        } else {
          setIsLiveMode(false);
        }
      } catch (err) {
        setIsLiveMode(false);
      }
    };
    checkStatus();
  }, [region]);

  // --- Save region settings ---
  const handleSaveSettings = (reg) => {
    localStorage.setItem('flixin_region', reg);
    setRegion(reg);
    setShowSettings(false);
    
    // Clear dynamic states to trigger refetch
    setLiveData({ trending: [], topRated: [], action: [], scifi: [], drama: [] });
    setFeaturedMovie(null);
    setMovieProviders({});
    setMovieCredits({});
  };

  // --- Fetch TMDB Data ---
  useEffect(() => {
    if (!isLiveMode) {
      // Demo Mode: Setup static featured movie
      const defaultFeatured = mockMovies.find(m => m.id === 'st4') || mockMovies[0];
      setFeaturedMovie(defaultFeatured);
      return;
    }

    const loadBackendData = async () => {
      setIsLoading(true);
      try {
        // Fetch Trending
        const trendingRes = await fetchFromBackendProxy('/trending/all/week');
        const trending = trendingRes.results || [];
        
        // Fetch Top Rated
        const topRatedRes = await fetchFromBackendProxy('/movie/top_rated');
        const topRated = topRatedRes.results || [];

        // Fetch Action Movies (Genre ID 28)
        const actionRes = await fetchFromBackendProxy('/discover/movie', null, { with_genres: 28 });
        const action = actionRes.results || [];

        // Fetch Sci-Fi (Genre ID 878)
        const scifiRes = await fetchFromBackendProxy('/discover/movie', null, { with_genres: 878 });
        const scifi = scifiRes.results || [];

        // Fetch Drama (Genre ID 18)
        const dramaRes = await fetchFromBackendProxy('/discover/movie', null, { with_genres: 18 });
        const drama = dramaRes.results || [];

        setLiveData({
          trending,
          topRated,
          action,
          scifi,
          drama
        });

        // Set random movie from trending as featured banner
        if (trending.length > 0) {
          const randomIndex = Math.floor(Math.random() * Math.min(trending.length, 10));
          const featured = trending[randomIndex];
          
          // Get full details to retrieve backdrop, runtimes, etc.
          const details = await fetchFromBackendProxy(`/${featured.media_type || 'movie'}/${featured.id}`);
          const featuredWithDetails = { ...featured, ...details };
          setFeaturedMovie(featuredWithDetails);

          // Prefetch watch providers and cast details for the featured banner movie
          const mediaType = featured.media_type || 'movie';
          const [providersRes, credits] = await Promise.all([
            fetchFromBackendProxy(`/${mediaType}/${featured.id}/watch/providers`).catch(() => null),
            fetchFromBackendProxy(`/${mediaType}/${featured.id}/credits`).catch(() => ({ cast: [] }))
          ]);

          if (providersRes) {
            const localProviders = providersRes.results?.[region] || null;
            setMovieProviders(prev => ({
              ...prev,
              [featured.id]: localProviders
            }));
          }
          if (credits) {
            setMovieCredits(prev => ({
              ...prev,
              [featured.id]: credits.cast?.slice(0, 5).map(c => c.name) || []
            }));
          }
        }
      } catch (err) {
        console.error("Error fetching proxy lists:", err);
        setIsLiveMode(false);
      } finally {
        setIsLoading(false);
      }
    };

    loadBackendData();
  }, [isLiveMode, region]);

  // --- Search ---
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      if (isLiveMode) {
        try {
          const res = await fetchFromBackendProxy('/search/multi', null, { query: searchQuery });
          const filtered = (res.results || []).filter(item => 
            (item.media_type === 'movie' || item.media_type === 'tv') && item.backdrop_path
          );
          setSearchResults(filtered);
        } catch (err) {
          console.error("Search failed:", err);
        }
      } else {
        // Local search inside mock data
        const term = searchQuery.toLowerCase();
        const filtered = mockMovies.filter(movie => 
          movie.title?.toLowerCase().includes(term) || 
          movie.name?.toLowerCase().includes(term) || 
          movie.overview?.toLowerCase().includes(term) ||
          movie.genres.some(g => g.toLowerCase().includes(term))
        );
        setSearchResults(filtered);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, isLiveMode]);

  // --- Fetch Additional Details (Modal) ---
  const handleOpenModal = async (movie) => {
    setActiveMovie(movie);
    
    if (!isLiveMode) {
      setMovieDetails(movie);
      return;
    }

    const mediaType = movie.media_type || (movie.first_air_date ? 'tv' : 'movie');
    const id = movie.id;

    try {
      const [details, providersRes, credits] = await Promise.all([
        fetchFromBackendProxy(`/${mediaType}/${id}`),
        fetchFromBackendProxy(`/${mediaType}/${id}/watch/providers`),
        fetchFromBackendProxy(`/${mediaType}/${id}/credits`).catch(() => ({ cast: [] }))
      ]);

      setMovieDetails({ ...movie, ...details });
      
      const localProviders = providersRes.results?.[region] || null;
      setMovieProviders(prev => ({
        ...prev,
        [id]: localProviders
      }));

      setMovieCredits(prev => ({
        ...prev,
        [id]: credits.cast?.slice(0, 5).map(c => c.name) || []
      }));

    } catch (err) {
      console.error("Error fetching modal details:", err);
      setMovieDetails(movie);
    }
  };

  // --- Fetch Trailer Link ---
  const handlePlayTrailer = async (movie) => {
    if (!isLiveMode) {
      if (movie.trailer_url) {
        setPlayingTrailer(movie.trailer_url);
      } else {
        const queryTitle = movie.title || movie.name;
        setPlayingTrailer(`https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(queryTitle + " trailer")}&autoplay=1`);
      }
      return;
    }

    const mediaType = movie.media_type || (movie.first_air_date ? 'tv' : 'movie');
    try {
      const videoRes = await fetchFromBackendProxy(`/${mediaType}/${movie.id}/videos`);
      const videos = videoRes.results || [];
      const trailer = videos.find(v => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser')) || videos[0];
      
      if (trailer) {
        setPlayingTrailer(`https://www.youtube.com/embed/${trailer.key}?autoplay=1`);
      } else {
        const queryTitle = movie.title || movie.name;
        setPlayingTrailer(`https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(queryTitle + " trailer")}&autoplay=1`);
      }
    } catch (err) {
      console.error("Failed to fetch trailer:", err);
      const queryTitle = movie.title || movie.name;
      setPlayingTrailer(`https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(queryTitle + " trailer")}&autoplay=1`);
    }
  };

  // --- Resolve Primary Streaming Provider (Watch Link) ---
  const getPrimaryProvider = (movie) => {
    if (!movie) return null;
    if (!isLiveMode) {
      if (movie.watch_providers && movie.watch_providers.length > 0) {
        return movie.watch_providers[0]; 
      }
      return null;
    }

    const providers = movieProviders[movie.id];
    if (!providers) return null;

    const streams = providers.flatrate || [];
    const rents = providers.rent || [];
    const purchases = providers.buy || [];
    const firstProv = streams[0] || rents[0] || purchases[0];

    if (firstProv) {
      return {
        name: firstProv.provider_name,
        logo: `https://image.tmdb.org/t/p/original${firstProv.logo_path}`,
        link: providers.link || `https://www.justwatch.com/${region.toLowerCase()}/search?q=${encodeURIComponent(movie.title || movie.name)}`
      };
    }
    return null;
  };

  // --- Watchlist Functions ---
  const toggleWatchlist = (movie, e) => {
    if (e) e.stopPropagation();
    const idStr = String(movie.id);
    if (myList.includes(idStr)) {
      setMyList(prev => prev.filter(item => item !== idStr));
    } else {
      setMyList(prev => [...prev, idStr]);
    }
  };

  const isInWatchlist = (movie) => {
    return myList.includes(String(movie.id));
  };

  const getWatchlistMovies = () => {
    if (isLiveMode) {
      const allLoaded = [
        ...liveData.trending,
        ...liveData.topRated,
        ...liveData.action,
        ...liveData.scifi,
        ...liveData.drama,
        activeMovie,
        featuredMovie
      ].filter(Boolean);
      
      const uniqueMap = {};
      allLoaded.forEach(m => { uniqueMap[String(m.id)] = m; });
      
      return myList.map(id => uniqueMap[id]).filter(Boolean);
    } else {
      return mockMovies.filter(m => myList.includes(String(m.id)));
    }
  };

  const getCategoryItems = (categoryId) => {
    if (isLiveMode) {
      switch (categoryId) {
        case 'trending': return liveData.trending;
        case 'top-rated': return liveData.topRated;
        case 'action': return liveData.action;
        case 'scifi': return liveData.scifi;
        case 'drama': return liveData.drama;
        default: return [];
      }
    } else {
      const category = mockCategories.find(c => c.id === categoryId);
      if (!category) return [];
      return mockMovies.filter(m => category.items.includes(m.id));
    }
  };

  const scrollSlider = (rowId, direction) => {
    const slider = document.getElementById(rowId);
    if (slider) {
      const scrollAmount = slider.clientWidth * 0.75;
      slider.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const getImageUrl = (path, size = 'w500') => {
    if (!path) return 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=500';
    if (path.startsWith('http')) return path;
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${BACKEND_URL}/api/images/${size}/${cleanPath}`;
  };

  const handleLogoClick = () => {
    setSearchQuery('');
    setSearchActive(false);
    setActiveTab('home');
  };

  const getFilteredMainView = () => {
    if (activeTab === 'home') return null;

    let items = [];
    if (isLiveMode) {
      const all = [
        ...liveData.trending,
        ...liveData.topRated,
        ...liveData.action,
        ...liveData.scifi,
        ...liveData.drama
      ];
      const unique = {};
      all.forEach(m => { unique[m.id] = m; });
      items = Object.values(unique);
    } else {
      items = mockMovies;
    }

    if (activeTab === 'tv') {
      return items.filter(item => item.media_type === 'tv' || item.first_air_date);
    }
    if (activeTab === 'movies') {
      return items.filter(item => item.media_type === 'movie' || item.release_date);
    }
    return null;
  };

  const filteredViewItems = getFilteredMainView();
  const watchlistItems = getWatchlistMovies();
  const featuredProvider = getPrimaryProvider(featuredMovie);

  return (
    <div className="app">
      {/* --- NAVBAR --- */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-left">
          <div className="nav-logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
            <span>Flixin</span>
          </div>
          <ul className="nav-menu">
            <li 
              className={`nav-menu-item ${activeTab === 'home' && !searchQuery ? 'active' : ''}`}
              onClick={() => { setActiveTab('home'); setSearchQuery(''); }}
            >
              Home
            </li>
            <li 
              className={`nav-menu-item ${activeTab === 'tv' && !searchQuery ? 'active' : ''}`}
              onClick={() => { setActiveTab('tv'); setSearchQuery(''); }}
            >
              TV Shows
            </li>
            <li 
              className={`nav-menu-item ${activeTab === 'movies' && !searchQuery ? 'active' : ''}`}
              onClick={() => { setActiveTab('movies'); setSearchQuery(''); }}
            >
              Movies
            </li>
            <li 
              className={`nav-menu-item ${activeTab === 'mylist' && !searchQuery ? 'active' : ''}`}
              onClick={() => { setActiveTab('mylist'); setSearchQuery(''); }}
            >
              My List {myList.length > 0 && <span style={{fontSize: '11px', backgroundColor: 'var(--flixin-red)', padding: '2px 6px', borderRadius: '50%', marginLeft: '5px'}}>{myList.length}</span>}
            </li>
          </ul>
        </div>

        <div className="nav-right">
          <div className={`search-container ${searchActive || searchQuery ? 'active' : ''}`}>
            <button 
              className="search-btn" 
              onClick={() => {
                setSearchActive(!searchActive);
                setTimeout(() => searchInputRef.current?.focus(), 100);
              }}
            >
              <Search size={20} />
            </button>
            <input 
              ref={searchInputRef}
              type="text" 
              className="search-input" 
              placeholder="Titles, people, genres..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onBlur={() => {
                if (!searchQuery) setSearchActive(false);
              }}
            />
          </div>

          <span className={`api-badge ${isLiveMode ? '' : 'demo'}`}>
            {isLiveMode ? `Live (${region})` : 'Demo'}
          </span>

          <button className="nav-icon-btn" title="Settings" onClick={() => setShowSettings(true)}>
            <Settings size={20} />
          </button>
          
          <button className="nav-icon-btn" title="Notifications">
            <Bell size={20} />
          </button>

          <div className="profile-avatar" title="User Settings">
            N
          </div>
        </div>
      </nav>

      {/* --- MAIN CONTENT AREA --- */}
      {searchQuery ? (
        // Search View
        <div className="search-results-container">
          <h1 className="search-grid-title">Search Results for "{searchQuery}"</h1>
          {searchResults.length > 0 ? (
            <div className="search-results-grid">
              {searchResults.map(movie => (
                <div 
                  key={movie.id} 
                  className="row-poster-card" 
                  onClick={() => handleOpenModal(movie)}
                >
                  <img src={getImageUrl(movie.backdrop_path || movie.poster_path)} alt={movie.title || movie.name} />
                  <div className="card-overlay">
                    <p className="card-title">{movie.title || movie.name}</p>
                    <div className="card-meta">
                      <span className="card-rating">{(movie.vote_average || 7.0).toFixed(1)} Rating</span>
                      <span className="card-year">{(movie.release_date || movie.first_air_date || '2024').slice(0, 4)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-results">No movies or TV shows match your search query. Try something else!</p>
          )}
        </div>
      ) : activeTab === 'mylist' ? (
        // Watchlist View
        <div className="search-results-container">
          <h1 className="search-grid-title">My List</h1>
          {watchlistItems.length > 0 ? (
            <div className="search-results-grid">
              {watchlistItems.map(movie => (
                <div 
                  key={movie.id} 
                  className="row-poster-card" 
                  onClick={() => handleOpenModal(movie)}
                >
                  <img src={getImageUrl(movie.backdrop_path || movie.poster_path)} alt={movie.title || movie.name} />
                  <div className="card-overlay">
                    <p className="card-title">{movie.title || movie.name}</p>
                    <div className="card-meta">
                      <span className="card-rating">{(movie.vote_average || 7.0).toFixed(1)} Rating</span>
                      <button 
                        className="btn-circle" 
                        style={{width: '24px', height: '24px', borderWidth: '1px'}}
                        onClick={(e) => toggleWatchlist(movie, e)}
                      >
                        <Check size={12} className="card-rating" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-results">You haven't added anything to your list yet. Browse the home feed and click '+'!</p>
          )}
        </div>
      ) : activeTab === 'tv' || activeTab === 'movies' ? (
        // Filtered Grid View for TV / Movies
        <div className="search-results-container">
          <h1 className="search-grid-title">{activeTab === 'tv' ? 'TV Shows' : 'Movies'}</h1>
          {filteredViewItems.length > 0 ? (
            <div className="search-results-grid">
              {filteredViewItems.map(movie => (
                <div 
                  key={movie.id} 
                  className="row-poster-card" 
                  onClick={() => handleOpenModal(movie)}
                >
                  <img src={getImageUrl(movie.backdrop_path || movie.poster_path)} alt={movie.title || movie.name} />
                  <div className="card-overlay">
                    <p className="card-title">{movie.title || movie.name}</p>
                    <div className="card-meta">
                      <span className="card-rating">{(movie.vote_average || 7.0).toFixed(1)} Rating</span>
                      <span className="card-year">{(movie.release_date || movie.first_air_date || '').slice(0, 4)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-results">Loading catalog items...</p>
          )}
        </div>
      ) : (
        // standard Home view (Hero + rows)
        <>
          {/* --- HERO BANNER --- */}
          {featuredMovie && (
            <div 
              className="hero-banner" 
              style={{ backgroundImage: `url(${getImageUrl(featuredMovie.backdrop_path, 'original')})` }}
            >
              <div className="hero-banner-mask"></div>
              <div className="hero-content">
                <h1 className="hero-title">{featuredMovie.title || featuredMovie.name}</h1>
                <div className="hero-meta">
                  <span className="hero-rating">
                    {Math.floor((featuredMovie.vote_average || 8.0) * 10)}% Match
                  </span>
                  <span className="hero-year">
                    {(featuredMovie.release_date || featuredMovie.first_air_date || '2024').slice(0, 4)}
                  </span>
                  <span className="hero-type-badge">
                    {featuredMovie.media_type || (featuredMovie.first_air_date ? 'TV Series' : 'Movie')}
                  </span>
                </div>
                <p className="hero-overview">{featuredMovie.overview}</p>
                <div className="hero-buttons">
                  {featuredProvider ? (
                    <a 
                      href={featuredProvider.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-primary"
                    >
                      <Play size={20} fill="currentColor" /> Play on {featuredProvider.name}
                    </a>
                  ) : (
                    <button className="btn-primary" onClick={() => handlePlayTrailer(featuredMovie)}>
                      <Play size={20} fill="currentColor" /> Play Trailer
                    </button>
                  )}

                  {featuredProvider && (
                    <button className="btn-secondary" onClick={() => handlePlayTrailer(featuredMovie)}>
                      <Film size={20} /> Watch Trailer
                    </button>
                  )}
                  
                  <button className="btn-secondary" onClick={() => handleOpenModal(featuredMovie)}>
                    <Info size={20} /> More Info
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* --- ROW CATEGORIES --- */}
          <div className="rows-container">
            {(isLiveMode ? [
              { id: 'trending', title: 'Trending Now' },
              { id: 'top-rated', title: 'Top Rated' },
              { id: 'action', title: 'Action & Thrillers' },
              { id: 'scifi', title: 'Sci-Fi & Fantasy' },
              { id: 'drama', title: 'Acclaimed Dramas' }
            ] : mockCategories).map((category) => {
              const items = getCategoryItems(category.id);
              if (items.length === 0) return null;

              return (
                <div key={category.id} className="row-container">
                  <h2 className="row-title">{category.title}</h2>
                  <div className="row-slider-wrapper">
                    <button 
                      className="slider-arrow left" 
                      onClick={() => scrollSlider(`slider-${category.id}`, 'left')}
                    >
                      <ChevronLeft size={30} />
                    </button>
                    <div id={`slider-${category.id}`} className="row-posters">
                      {items.map(movie => (
                        <div 
                          key={movie.id} 
                          className="row-poster-card"
                          onClick={() => handleOpenModal(movie)}
                        >
                          <img src={getImageUrl(movie.backdrop_path || movie.poster_path)} alt={movie.title || movie.name} />
                          <div className="card-overlay">
                            <p className="card-title">{movie.title || movie.name}</p>
                            <div className="card-meta">
                              <span className="card-rating">{(movie.vote_average || 7.0).toFixed(1)} Match</span>
                              <span className="card-year">{(movie.release_date || movie.first_air_date || '').slice(0, 4)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button 
                      className="slider-arrow right" 
                      onClick={() => scrollSlider(`slider-${category.id}`, 'right')}
                    >
                      <ChevronRight size={30} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* --- MOVIE DETAILS MODAL --- */}
      {activeMovie && (
        <div className="details-modal-overlay" onClick={() => setActiveMovie(null)}>
          <div className="details-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setActiveMovie(null)}>
              <X size={20} />
            </button>

            <div 
              className="modal-header"
              style={{ backgroundImage: `url(${getImageUrl(activeMovie.backdrop_path, 'original')})` }}
            >
              <div className="modal-header-mask"></div>
              <div className="modal-header-content">
                <h2 className="modal-title">{activeMovie.title || activeMovie.name}</h2>
                <div className="modal-header-buttons">
                  {(() => {
                    const activeProvider = getPrimaryProvider(activeMovie);
                    if (activeProvider) {
                      return (
                        <>
                          <a 
                            href={activeProvider.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="btn-primary"
                          >
                            <Play size={18} fill="currentColor" /> Play on {activeProvider.name}
                          </a>
                          <button className="btn-circle" onClick={() => handlePlayTrailer(activeMovie)} title="Watch Trailer">
                            <Film size={20} />
                          </button>
                        </>
                      );
                    } else {
                      return (
                        <button className="btn-primary" onClick={() => handlePlayTrailer(activeMovie)}>
                          <Play size={18} fill="currentColor" /> Play Trailer
                        </button>
                      );
                    }
                  })()}

                  <button 
                    className={`btn-circle ${isInWatchlist(activeMovie) ? 'active' : ''}`} 
                    onClick={() => toggleWatchlist(activeMovie)}
                    title={isInWatchlist(activeMovie) ? "Remove from My List" : "Add to My List"}
                  >
                    {isInWatchlist(activeMovie) ? <Check size={20} /> : <Plus size={20} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="modal-body">
              <div className="modal-body-left">
                <div className="modal-meta-row">
                  <span className="match-rating">
                    {Math.floor((activeMovie.vote_average || 8.0) * 10)}% Match
                  </span>
                  <span className="info-year">
                    {activeMovie.release_date || activeMovie.first_air_date ? 
                      (activeMovie.release_date || activeMovie.first_air_date).slice(0, 4) : 
                      '2024'
                    }
                  </span>
                  <span className="hero-type-badge">
                    {activeMovie.media_type === 'tv' || activeMovie.first_air_date ? 'TV Series' : 'Movie'}
                  </span>
                </div>

                <p className="modal-synopsis">{activeMovie.overview}</p>

                {/* --- STREAMING SERVICES (WHERE TO WATCH) --- */}
                <div className="watch-section">
                  <h3 className="watch-section-title">
                    <Globe size={18} style={{ color: 'var(--flixin-red)' }} />
                    Available to Watch On:
                  </h3>
                  
                  {isLiveMode ? (
                    (() => {
                      const providers = movieProviders[activeMovie.id];
                      if (!providers) {
                        return <p className="no-providers">Loading streaming services...</p>;
                      }
                      
                      const streams = providers.flatrate || [];
                      const rents = providers.rent || [];
                      const purchases = providers.buy || [];
                      const mainLink = providers.link;
                      
                      const uniqueProviders = [];
                      const addedIds = new Set();
                      
                      [...streams, ...rents, ...purchases].forEach(prov => {
                        if (!addedIds.has(prov.provider_id)) {
                          addedIds.add(prov.provider_id);
                          uniqueProviders.push(prov);
                        }
                      });

                      if (uniqueProviders.length === 0) {
                        return (
                          <div>
                            <p className="no-providers">No subscription streams found in {region}.</p>
                            <a 
                              href={`https://www.google.com/search?q=watch+online+${encodeURIComponent(activeMovie.title || activeMovie.name)}`} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="provider-link"
                              style={{ width: 'fit-content', marginTop: '10px' }}
                            >
                              <span className="provider-name">Search on Google</span>
                              <ExternalLink size={12} />
                            </a>
                          </div>
                        );
                      }

                      return (
                        <div>
                          <div className="providers-grid">
                            {uniqueProviders.slice(0, 8).map(prov => (
                              <a 
                                key={prov.provider_id}
                                href={mainLink || `https://www.justwatch.com/${region.toLowerCase()}/search?q=${encodeURIComponent(activeMovie.title || activeMovie.name)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="provider-link"
                                title={`Watch on ${prov.provider_name} via JustWatch`}
                              >
                                <img 
                                  src={`https://image.tmdb.org/t/p/original${prov.logo_path}`} 
                                  alt={prov.provider_name} 
                                  className="provider-logo" 
                                />
                                <span className="provider-name">{prov.provider_name}</span>
                              </a>
                            ))}
                          </div>
                          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px' }}>
                            * Opens JustWatch Streaming Hub with verified deep links for {region}
                          </p>
                        </div>
                      );
                    })()
                  ) : (
                    activeMovie.watch_providers && activeMovie.watch_providers.length > 0 ? (
                      <div className="providers-grid">
                        {activeMovie.watch_providers.map((provider, idx) => (
                          <a 
                            key={idx}
                            href={provider.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="provider-link"
                            title={`Watch on ${provider.name}`}
                          >
                            <img src={provider.logo} alt={provider.name} className="provider-logo" />
                            <span className="provider-name">{provider.name}</span>
                            <ExternalLink size={11} style={{ marginLeft: 'auto', opacity: 0.7 }} />
                          </a>
                        ))}
                      </div>
                    ) : (
                      <p className="no-providers">No streaming links configured for this demo card.</p>
                    )
                  )}
                </div>
              </div>

              <div className="modal-body-right">
                <div>
                  <span className="meta-label">Cast:</span>
                  <span className="meta-value">
                    {isLiveMode ? (
                      movieCredits[activeMovie.id] ? movieCredits[activeMovie.id].join(', ') : 'Loading cast...'
                    ) : (
                      activeMovie.cast ? activeMovie.cast.join(', ') : 'N/A'
                    )}
                  </span>
                </div>
                <div>
                  <span className="meta-label">Genres:</span>
                  <span className="meta-value">
                    {isLiveMode ? (
                      movieDetails.genres ? movieDetails.genres.map(g => g.name).join(', ') : 'Loading genres...'
                    ) : (
                      activeMovie.genres ? activeMovie.genres.join(', ') : 'N/A'
                    )}
                  </span>
                </div>
                {movieDetails.runtime && (
                  <div>
                    <span className="meta-label">Duration:</span>
                    <span className="meta-value">{movieDetails.runtime} mins</span>
                  </div>
                )}
                {movieDetails.number_of_seasons && (
                  <div>
                    <span className="meta-label">Seasons:</span>
                    <span className="meta-value">{movieDetails.number_of_seasons} Season(s)</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- SETTINGS / CONFIG MODAL --- */}
      {showSettings && (
        <div className="settings-modal-overlay">
          <div className="settings-modal">
            <h2 className="settings-title">
              <Settings size={22} className="card-rating" />
              Settings
            </h2>

            <div className="form-group">
              <label className="form-label">Connection Status</label>
              <div className="settings-info-box" style={{ backgroundColor: isLiveMode ? 'rgba(70, 211, 105, 0.05)' : 'rgba(255, 152, 0, 0.05)', borderColor: isLiveMode ? 'rgba(70, 211, 105, 0.2)' : 'rgba(255, 152, 0, 0.2)' }}>
                <p>
                  <strong>Mode:</strong> {isLiveMode ? 'Live Mode (API Server)' : 'Demo Mode (Mock Catalog)'}
                </p>
                <p style={{ marginTop: '6px', fontSize: '12px', color: '#aaaaaa' }}>
                  {isLiveMode 
                    ? 'Successfully connected to backend API server. Real-time movie metadata and streaming links are active.' 
                    : 'Backend API server offline or key is missing. Showing cached popular titles with working direct links.'
                  }
                </p>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Default Region for Streaming Links</label>
              <select 
                className="form-select"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                <option value="US">United States (US)</option>
                <option value="GB">United Kingdom (GB)</option>
                <option value="CA">Canada (CA)</option>
                <option value="AU">Australia (AU)</option>
                <option value="IN">India (IN)</option>
                <option value="DE">Germany (DE)</option>
                <option value="FR">France (FR)</option>
                <option value="JP">Japan (JP)</option>
              </select>
            </div>

            <div className="settings-buttons">
              <button className="btn-cancel" onClick={() => setShowSettings(false)}>
                Close
              </button>
              <button className="btn-save" onClick={() => handleSaveSettings(region)}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- TRAILER PLAYER MODAL --- */}
      {playingTrailer && (
        <div className="trailer-player-overlay">
          <button className="close-trailer-btn" onClick={() => setPlayingTrailer(null)}>
            <X size={24} />
          </button>
          <div className="trailer-iframe-container">
            <iframe 
              src={playingTrailer} 
              title="YouTube Trailer" 
              allow="autoplay; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* --- FOOTER --- */}
      <footer className="footer">
        <div className="footer-links">
          <a href="#" className="footer-link">Audio Description</a>
          <a href="#" className="footer-link">Help Center</a>
          <a href="#" className="footer-link">Gift Cards</a>
          <a href="#" className="footer-link">Media Center</a>
          <a href="#" className="footer-link">Investor Relations</a>
          <a href="#" className="footer-link">Terms of Use</a>
          <a href="#" className="footer-link">Privacy</a>
        </div>
        <div className="footer-credit">
          <p>Built for Pair Programming Demonstration.</p>
          <p>
            Metadata powered by <span className="credits-highlight">The Movie Database (TMDb)</span> and <span className="credits-highlight">JustWatch</span>.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
