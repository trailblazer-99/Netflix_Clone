// Curated high-fidelity dataset of popular movies and TV shows with streaming provider deep links.
// Image paths are standard TMDB paths which render directly using: https://image.tmdb.org/t/p/w500 (poster) and original (backdrop)

export const mockMovies = [
  {
    id: "st4",
    title: "Stranger Things",
    name: "Stranger Things",
    overview: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
    backdrop_path: "/56v21GZgLw5vPI4XI7jZ6eR45XY.jpg",
    poster_path: "/x2LSRK2CmHNnqnLO5COx55U6tTy.jpg",
    release_date: "2016-07-15",
    first_air_date: "2016-07-15",
    vote_average: 8.6,
    media_type: "tv",
    genres: ["Sci-Fi & Fantasy", "Drama", "Mystery"],
    trailer_url: "https://www.youtube.com/embed/b9EkMc79ZSU",
    cast: ["Winona Ryder", "David Harbour", "Millie Bobby Brown", "Finn Wolfhard", "Gaten Matarazzo"],
    watch_providers: [
      {
        name: "Netflix",
        logo: "https://image.tmdb.org/t/p/original/9A1JSVmS45l0BLv51fwxiLJNnkn.jpg",
        link: "https://www.netflix.com/title/80057281"
      }
    ]
  },
  {
    id: "wed",
    title: "Wednesday",
    name: "Wednesday",
    overview: "A sleuthing, supernaturally infused mystery charting Wednesday Addams' years as a student at Nevermore Academy. She attempts to master her emerging psychic ability, thwart a monstrous killing spree and solve the mystery that embroiled her parents 25 years ago.",
    backdrop_path: "/iH7482o6RL128V7vU4Qv0d37vlz.jpg",
    poster_path: "/9pfq7wV21u4mdx98V6rmZ08eug5.jpg",
    release_date: "2022-11-23",
    first_air_date: "2022-11-23",
    vote_average: 8.5,
    media_type: "tv",
    genres: ["Sci-Fi & Fantasy", "Mystery", "Comedy"],
    trailer_url: "https://www.youtube.com/embed/Di310WS8zLk",
    cast: ["Jenna Ortega", "Gwendoline Christie", "Riki Lindhome", "Christina Ricci", "Emma Myers"],
    watch_providers: [
      {
        name: "Netflix",
        logo: "https://image.tmdb.org/t/p/original/9A1JSVmS45l0BLv51fwxiLJNnkn.jpg",
        link: "https://www.netflix.com/title/81231974"
      }
    ]
  },
  {
    id: "tb4",
    title: "The Boys",
    name: "The Boys",
    overview: "A fun and irreverent take on what happens when superheroes—who are as popular as celebrities, as influential as politicians, and as revered as gods—abuse their superpowers rather than use them for good.",
    backdrop_path: "/n5fSyjewVjvd6srG09Z7JW3i7qw.jpg",
    poster_path: "/7ns943R7iyXFzscc7w581q4Vd7K.jpg",
    release_date: "2019-07-25",
    first_air_date: "2019-07-25",
    vote_average: 8.5,
    media_type: "tv",
    genres: ["Sci-Fi & Fantasy", "Action & Adventure", "Drama"],
    trailer_url: "https://www.youtube.com/embed/M1bhOaLvCqY",
    cast: ["Karl Urban", "Jack Quaid", "Antony Starr", "Erin Moriarty", "Jessie T. Usher"],
    watch_providers: [
      {
        name: "Prime Video",
        logo: "https://image.tmdb.org/t/p/original/dQ494L6q23Wl5M6qZ54N9M3.jpg",
        link: "https://www.amazon.com/dp/B0875R21L9"
      }
    ]
  },
  {
    id: "mando",
    title: "The Mandalorian",
    name: "The Mandalorian",
    overview: "After the fall of the Galactic Empire, lawlessness has spread throughout the galaxy. An independent bounty hunter, Outer Rim mercenary, and lone gunfighter, makes his way through the outer reaches of the galaxy, far from the authority of the New Republic.",
    backdrop_path: "/o8zk3GcFC2Ns2ZJ175snJgHg86g.jpg",
    poster_path: "/eU1i6eHXlzGuw7t1upRvh4P1A7C.jpg",
    release_date: "2019-11-12",
    first_air_date: "2019-11-12",
    vote_average: 8.4,
    media_type: "tv",
    genres: ["Sci-Fi & Fantasy", "Action & Adventure"],
    trailer_url: "https://www.youtube.com/embed/aOC8E8z_Ifw",
    cast: ["Pedro Pascal", "Katee Sackhoff", "Carl Weathers", "Giancarlo Esposito"],
    watch_providers: [
      {
        name: "Disney+",
        logo: "https://image.tmdb.org/t/p/original/7rwE0w6JBp9uIaCf4r840pjZJ2H.jpg",
        link: "https://www.disneyplus.com/series/the-mandalorian/3jLKiMcbhsuW"
      }
    ]
  },
  {
    id: "loki",
    title: "Loki",
    name: "Loki",
    overview: "Loki, the God of Mischief, steps out of his brother's shadow to embark on an adventure that takes place after the events of \"Avengers: Endgame.\"",
    backdrop_path: "/1OD979j5lsT9i4464g46r936c53.jpg",
    poster_path: "/vo065PjIE2HWI25687mKG46tzz2.jpg",
    release_date: "2021-06-09",
    first_air_date: "2021-06-09",
    vote_average: 8.2,
    media_type: "tv",
    genres: ["Sci-Fi & Fantasy", "Drama", "Action & Adventure"],
    trailer_url: "https://www.youtube.com/embed/nW948Va-l10",
    cast: ["Tom Hiddleston", "Owen Wilson", "Sophia Di Martino", "Gugu Mbatha-Raw", "Wunmi Mosaku"],
    watch_providers: [
      {
        name: "Disney+",
        logo: "https://image.tmdb.org/t/p/original/7rwE0w6JBp9uIaCf4r840pjZJ2H.jpg",
        link: "https://www.disneyplus.com/series/loki/6qv65oXI7KaR"
      }
    ]
  },
  {
    id: "dune2",
    title: "Dune: Part Two",
    name: "Dune: Part Two",
    overview: "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee.",
    backdrop_path: "/xOMo8BRK7PqaJ8021J7ecczJmfs.jpg",
    poster_path: "/czemb4hm1YjUR2JFlrNAVzP5FUe.jpg",
    release_date: "2024-02-27",
    vote_average: 8.3,
    media_type: "movie",
    genres: ["Science Fiction", "Adventure"],
    trailer_url: "https://www.youtube.com/embed/Way9Dexny3w",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Josh Brolin", "Austin Butler"],
    watch_providers: [
      {
        name: "Max",
        logo: "https://image.tmdb.org/t/p/original/fB4ea25LIb7vW6F8G276V03C28S.jpg",
        link: "https://www.max.com/movies/dune-part-two/4c000494-df76-47b2-9388-7517c5b6b158"
      },
      {
        name: "Prime Video",
        logo: "https://image.tmdb.org/t/p/original/dQ494L6q23Wl5M6qZ54N9M3.jpg",
        link: "https://www.amazon.com/dp/B0CXPGB1QL"
      }
    ]
  },
  {
    id: "oppen",
    title: "Oppenheimer",
    name: "Oppenheimer",
    overview: "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II, showing how it changed the course of history and ushered in the atomic age.",
    backdrop_path: "/rM5N14Zsd0sS5nN5L4mB5t5T541.jpg",
    poster_path: "/8Gxv2wY4g0fhwbCj0IG1vX5XUdM.jpg",
    release_date: "2023-07-19",
    vote_average: 8.1,
    media_type: "movie",
    genres: ["Drama", "History"],
    trailer_url: "https://www.youtube.com/embed/uYPbbksJxIg",
    cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon", "Robert Downey Jr.", "Florence Pugh"],
    watch_providers: [
      {
        name: "Prime Video",
        logo: "https://image.tmdb.org/t/p/original/dQ494L6q23Wl5M6qZ54N9M3.jpg",
        link: "https://www.amazon.com/dp/B0CKTR6K5C"
      },
      {
        name: "Peacock",
        logo: "https://image.tmdb.org/t/p/original/dDlE562EQXcjILm52BM557gR5Zx.jpg", // fallback
        link: "https://www.peacocktv.com/watch-online/movies/oppenheimer/89f66710-85f8-3e4b-9c3f-c67cc00f07bc"
      }
    ]
  },
  {
    id: "inter",
    title: "Interstellar",
    name: "Interstellar",
    overview: "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
    backdrop_path: "/rAiw1ptZJ298PtzoX84J4mH4oVb.jpg",
    poster_path: "/gEU2Qv6155tNigGUq5g2vfj9tQ3.jpg",
    release_date: "2014-11-05",
    vote_average: 8.4,
    media_type: "movie",
    genres: ["Science Fiction", "Drama", "Adventure"],
    trailer_url: "https://www.youtube.com/embed/zSWdZAZE3gU",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine", "Ellen Burstyn"],
    watch_providers: [
      {
        name: "Paramount+",
        logo: "https://image.tmdb.org/t/p/original/eU1i6eHXlzGuw7t1upRvh4P1A7C.jpg", // fallback
        link: "https://www.paramountplus.com/movies/interstellar/"
      },
      {
        name: "Prime Video",
        logo: "https://image.tmdb.org/t/p/original/dQ494L6q23Wl5M6qZ54N9M3.jpg",
        link: "https://www.amazon.com/dp/B00S10BRLC"
      }
    ]
  },
  {
    id: "dk",
    title: "The Dark Knight",
    name: "The Dark Knight",
    overview: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.",
    backdrop_path: "/oPgxiIFmwb3R45kPnfZ5cQYhD5d.jpg",
    poster_path: "/qJ2tWw3YiO1NMLR977qKCmw9K61.jpg",
    release_date: "2008-07-16",
    vote_average: 8.5,
    media_type: "movie",
    genres: ["Drama", "Action", "Crime", "Thriller"],
    trailer_url: "https://www.youtube.com/embed/EXeTwQWrcwY",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Maggie Gyllenhaal", "Gary Oldman"],
    watch_providers: [
      {
        name: "Max",
        logo: "https://image.tmdb.org/t/p/original/fB4ea25LIb7vW6F8G276V03C28S.jpg",
        link: "https://www.max.com/movies/dark-knight/67c000e4-b78f-4318-ae7f-44243b7e77b6"
      }
    ]
  },
  {
    id: "bb",
    title: "Breaking Bad",
    name: "Breaking Bad",
    overview: "Walter White, a New Mexico chemistry teacher, is diagnosed with Stage III cancer and given a prognosis of two years to live. To secure his family's financial future, W.W. chooses a career in drug abuse and sales with a former student.",
    backdrop_path: "/ts59U9WfexlAupF10fT3a165SBr.jpg",
    poster_path: "/ztkUQpLbg14KWc51j6EB5613zpM.jpg",
    release_date: "2008-01-20",
    first_air_date: "2008-01-20",
    vote_average: 8.9,
    media_type: "tv",
    genres: ["Drama", "Crime"],
    trailer_url: "https://www.youtube.com/embed/HhesaQXLuRY",
    cast: ["Bryan Cranston", "Aaron Paul", "Anna Gunn", "Bob Odenkirk", "Giancarlo Esposito"],
    watch_providers: [
      {
        name: "Netflix",
        logo: "https://image.tmdb.org/t/p/original/9A1JSVmS45l0BLv51fwxiLJNnkn.jpg",
        link: "https://www.netflix.com/title/70143825"
      }
    ]
  },
  {
    id: "ted",
    title: "Ted Lasso",
    name: "Ted Lasso",
    overview: "US American football coach Ted Lasso heads to the UK to manage a struggling London football team in the top flight of English football, AFC Richmond, despite having no experience coaching soccer.",
    backdrop_path: "/5AkcSk3p9Zsc2sF27oW9W22x5XG.jpg",
    poster_path: "/5342aC4r7e55vQG6fI5Xq08q8vH.jpg",
    release_date: "2020-08-14",
    first_air_date: "2020-08-14",
    vote_average: 8.5,
    media_type: "tv",
    genres: ["Comedy", "Drama"],
    trailer_url: "https://www.youtube.com/embed/3u7EIioHs6U",
    cast: ["Jason Sudeikis", "Hannah Waddingham", "Jeremy Swift", "Phil Dunster", "Brett Goldstein"],
    watch_providers: [
      {
        name: "Apple TV+",
        logo: "https://image.tmdb.org/t/p/original/2E7tiJ7092ly42t0tJ60Z5gVFWg.jpg",
        link: "https://tv.apple.com/show/ted-lasso/umc.cmc.v0z4rec4sf3fmui4u8w5311r"
      }
    ]
  },
  {
    id: "sev",
    title: "Severance",
    name: "Severance",
    overview: "Mark leads a team of office workers whose memories have been surgically divided between their work and personal lives. When a mysterious colleague appears outside of work, it begins a journey to discover the truth about their jobs.",
    backdrop_path: "/oPns5z2U2y2t1eX91B0v0G4U1Bv.jpg",
    poster_path: "/69xF2Z1f7uGf49tF5HlRmgkY1bX.jpg",
    release_date: "2022-02-17",
    first_air_date: "2022-02-17",
    vote_average: 8.4,
    media_type: "tv",
    genres: ["Drama", "Mystery", "Sci-Fi & Fantasy"],
    trailer_url: "https://www.youtube.com/embed/xD5N7s4SwnE",
    cast: ["Adam Scott", "Patricia Arquette", "John Turturro", "Christopher Walken", "Britt Lower"],
    watch_providers: [
      {
        name: "Apple TV+",
        logo: "https://image.tmdb.org/t/p/original/2E7tiJ7092ly42t0tJ60Z5gVFWg.jpg",
        link: "https://tv.apple.com/show/severance/umc.cmc.1x4t4fpaue7szk15xz4a0de1x"
      }
    ]
  },
  {
    id: "squid",
    title: "Squid Game",
    name: "Squid Game",
    overview: "Hundreds of cash-strapped players accept a strange invitation to compete in children's games. Inside, a tempting prize awaits — with deadly high stakes.",
    backdrop_path: "/346j4t272h4m5f8oU8Qv4e71z4Q.jpg",
    poster_path: "/dDlE562EQXcjILm52BM557gR5Zx.jpg",
    release_date: "2021-09-17",
    first_air_date: "2021-09-17",
    vote_average: 8.7,
    media_type: "tv",
    genres: ["Drama", "Mystery", "Action & Adventure"],
    trailer_url: "https://www.youtube.com/embed/oqxAJKy0R4A",
    cast: ["Lee Jung-jae", "Park Hae-soo", "Wi Ha-jun", "Jung Ho-yeon", "O Yeong-su"],
    watch_providers: [
      {
        name: "Netflix",
        logo: "https://image.tmdb.org/t/p/original/9A1JSVmS45l0BLv51fwxiLJNnkn.jpg",
        link: "https://www.netflix.com/title/81040344"
      }
    ]
  },
  {
    id: "succ",
    title: "Succession",
    name: "Succession",
    overview: "The Roy family is known for controlling the biggest media and entertainment company in the world. However, their world changes when their father steps down from the company.",
    backdrop_path: "/eZ3mhE5gdJv62m5f23R9F5r6W37.jpg",
    poster_path: "/7V412z667g1U04j8Z11c8x12T87.jpg",
    release_date: "2018-06-03",
    first_air_date: "2018-06-03",
    vote_average: 8.3,
    media_type: "tv",
    genres: ["Drama", "Comedy"],
    trailer_url: "https://www.youtube.com/embed/OzYxJVXP4tY",
    cast: ["Brian Cox", "Jeremy Strong", "Sarah Snook", "Kieran Culkin", "Matthew Macfadyen"],
    watch_providers: [
      {
        name: "Max",
        logo: "https://image.tmdb.org/t/p/original/fB4ea25LIb7vW6F8G276V03C28S.jpg",
        link: "https://www.max.com/shows/succession/1d3f9e8a-e9fa-47cb-bcde-fae45b149b1a"
      }
    ]
  },
  {
    id: "spidey",
    title: "Spider-Man: Into the Spider-Verse",
    name: "Spider-Man: Into the Spider-Verse",
    overview: "Struggling to find his place in the world while juggling school and family, Brooklyn teenager Miles Morales is bitten by a radioactive spider and quickly learns that he is not the only Spider-Man in the universe.",
    backdrop_path: "/7dD4k13jZ5N7X8c3sB1o1z7c5eH.jpg",
    poster_path: "/iiZZmzr7b4G7684NQzo517nnPmC.jpg",
    release_date: "2018-12-06",
    vote_average: 8.4,
    media_type: "movie",
    genres: ["Animation", "Action", "Adventure", "Science Fiction"],
    trailer_url: "https://www.youtube.com/embed/g4HbzUKy71M",
    cast: ["Shameik Moore", "Jake Johnson", "Hailee Steinfeld", "Mahershala Ali", "Brian Tyree Henry"],
    watch_providers: [
      {
        name: "Netflix",
        logo: "https://image.tmdb.org/t/p/original/9A1JSVmS45l0BLv51fwxiLJNnkn.jpg",
        link: "https://www.netflix.com/title/81002270"
      },
      {
        name: "Prime Video",
        logo: "https://image.tmdb.org/t/p/original/dQ494L6q23Wl5M6qZ54N9M3.jpg",
        link: "https://www.amazon.com/dp/B07L924XSD"
      }
    ]
  },
  {
    id: "eeao",
    title: "Everything Everywhere All at Once",
    name: "Everything Everywhere All at Once",
    overview: "An aging Chinese immigrant is swept up in an insane adventure, where she alone can save the world by exploring other universes connecting with the lives she could have led.",
    backdrop_path: "/f1J5f7Sg49tG2S8rO4W7eX9Lz2T.jpg",
    poster_path: "/w355a2d67aG2S82O8Z9rS3wU29C.jpg",
    release_date: "2022-03-24",
    vote_average: 7.8,
    media_type: "movie",
    genres: ["Action", "Science Fiction", "Comedy", "Adventure"],
    trailer_url: "https://www.youtube.com/embed/wxN1T1uxQ2g",
    cast: ["Michelle Yeoh", "Ke Huy Quan", "Stephanie Hsu", "Jamie Lee Curtis", "James Hong"],
    watch_providers: [
      {
        name: "Netflix",
        logo: "https://image.tmdb.org/t/p/original/9A1JSVmS45l0BLv51fwxiLJNnkn.jpg",
        link: "https://www.netflix.com/title/81613891"
      },
      {
        name: "Prime Video",
        logo: "https://image.tmdb.org/t/p/original/dQ494L6q23Wl5M6qZ54N9M3.jpg",
        link: "https://www.amazon.com/dp/B0B5T6XW72"
      }
    ]
  },
  {
    id: "avatar2",
    title: "Avatar: The Way of Water",
    name: "Avatar: The Way of Water",
    overview: "Set more than a decade after the events of the first film, learn the story of the Sully family, the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.",
    backdrop_path: "/8rpD7BwOf647R0TC1nszG2q05Z2.jpg",
    poster_path: "/t6HI7Zk7IWnPMuN0nWDpf65u8aL.jpg",
    release_date: "2022-12-14",
    vote_average: 7.6,
    media_type: "movie",
    genres: ["Science Fiction", "Action", "Adventure"],
    trailer_url: "https://www.youtube.com/embed/d9MyW72ELq0",
    cast: ["Sam Worthington", "Zoe Saldaña", "Sigourney Weaver", "Stephen Lang", "Kate Winslet"],
    watch_providers: [
      {
        name: "Disney+",
        logo: "https://image.tmdb.org/t/p/original/7rwE0w6JBp9uIaCf4r840pjZJ2H.jpg",
        link: "https://www.disneyplus.com/movies/avatar-the-way-of-water/4b6H9Pq8H7m4"
      },
      {
        name: "Max",
        logo: "https://image.tmdb.org/t/p/original/fB4ea25LIb7vW6F8G276V03C28S.jpg",
        link: "https://www.max.com/movies/avatar-the-way-of-water/"
      }
    ]
  }
];

export const mockCategories = [
  {
    id: "trending",
    title: "Trending Now",
    items: ["st4", "dune2", "tb4", "wed", "oppen", "avatar2"]
  },
  {
    id: "top-rated",
    title: "Top Rated",
    items: ["bb", "st4", "dk", "wed", "tb4", "inter"]
  },
  {
    id: "action",
    title: "Action & Thriller",
    items: ["tb4", "dk", "eeao", "avatar2", "mando", "st4"]
  },
  {
    id: "scifi",
    title: "Sci-Fi & Space",
    items: ["inter", "dune2", "st4", "loki", "mando", "sev"]
  },
  {
    id: "drama",
    title: "Acclaimed Dramas",
    items: ["bb", "succ", "oppen", "sev", "ted", "dk"]
  }
];
