
# **React Movie Finder App**

**React Movie Finder** is a movie search application built with **React** and powered by the **OMDb API**. Users can search for movies by entering a movie name in the search bar, and the app will display relevant movie information such as **movie posters**, **titles**, and **release years**. The app allows users to click the **Next** button to load more results as needed.

The app provides a simple and user-friendly interface for discovering movies.

## **Features**

- **Search for Movies**: Users can type the name of a movie into the search bar and click the **Search** button to find matching movies.
- **Movie Information Displayed**:
  - **Movie Poster**: A thumbnail image of the movie's poster.
  - **Movie Title**: The name of the movie.
  - **Year of Release**: The release year of the movie.
- **Pagination**: Users can click the **Next** button to load more movies based on the search query.
- **Responsive UI**: The app is fully responsive, providing a great user experience on desktop, tablet, and mobile devices.
- **Simple and Clean Design**: The design is minimal and easy to navigate.

## **How It Works**

1. **User Input**: Users enter the name of the movie into a search bar and click the **Search** button.
2. **API Request**: The app sends a request to the **OMDb API**, passing the movie name as a query.
3. **Data Retrieval**: The OMDb API returns a list of movies with relevant information (poster, title, year).
4. **Displaying Results**: The app displays the results, showing each movie's poster, title, and year of release.
5. **Pagination**: Users can click the **Next** button to load more movies if needed.

### **App Structure**

- **App.js**: The main React component responsible for handling the search input, fetching movies, and displaying results.
- **CSS**: Custom CSS to style the application, including responsive designs for different screen sizes.

## **App.js Code**

```javascript
import React, { useState, useEffect } from 'react';
import './App.css';

const Api = "https://www.omdbapi.com/?apikey=6584f4f5";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const fetchMovies = async () => {
    const response = await fetch(`${Api}&s=${query}&page=${page}`);
    const data = await response.json();
    if (data.Search) {
      setMovies((prevMovies) => [...prevMovies, ...data.Search]);
    }
  };

  useEffect(() => {
    if (query) {
      setMovies([]);
      setPage(1);
    }
    fetchMovies();
  }, [page, query]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchClick = () => {
    setPage(1);
    setMovies([]);
    fetchMovies();
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar-container">
          <h1>Movie Finder</h1>
        </div>
      </nav>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for movies..."
          value={query}
          onChange={handleSearch}
        />
        <button className="btn btn-primary" onClick={handleSearchClick}>
          Search
        </button>
      </div>

      <div className="row">
        {movies.map((movie) => (
          <div className="col" key={movie.imdbID}>
            <div className="card">
              <img src={movie.Poster} alt={movie.Title} />
              <div className="card-body">
                <h1>{movie.Title}</h1>
                <h5>{movie.Year}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="btn btn-primary" id='bt' onClick={loadMore}>
        Next
      </button>

      <footer className="footer">
        <h5>&copy; All rights reserved</h5>
      </footer>
    </div>
  );
};

export default App;
```

## **CSS Code**

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

nav {
  background-color: #007bff;
  padding: 15px 0;
  text-align: center;
  color: white;
}

.navbar h1 {
  font-size: 24px;
  margin: 0;
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-around;
}

.card {
  width: 255px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  transition: 0.3s ease-in-out;
}

.card img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.card-body {
  padding: 15px;
}

.card-body h1 {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
}

.card-body h5 {
  font-size: 14px;
  color: #666;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15);
}

.search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  gap: 10px;
  width: 100%;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
}

.search-bar input {
  width: 100%;
  max-width: 300px;
  padding: 10px 15px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 25px;
  outline: none;
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
}

.search-bar input:focus {
  border-color: #007bff;
  box-shadow: 0px 0px 12px rgba(0, 123, 255, 0.5);
}

.search-bar button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  height: 40px;
}

.search-bar button:hover {
  background-color: #0056b3;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

button.btn-primary {
  display: block;
  margin: 20px auto;
  padding: 12px 24px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

button.btn-primary:hover {
  background-color: #0056b3;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1);
}

#bt {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}

.footer {
  background-color: #007bff;
  padding: 15px 0;
  text-align: center;
  color: white;
  margin-top: 40px;
}

.footer p {
  margin: 0;
  font-size: 14px;
}

/* Media Query for Tablets and Mobile Devices */
@media (max-width: 768px) {
  .row {
    flex-direction: column;
    align-items: center;
  }

  .card {
    width: 100%;
    max-width: 90%;
  }

  .search-bar {
    flex-direction: column;
    gap: 10px;
    margin-left: 20px;
    margin-right: 20px;
  }

  .search-bar input {
    width: 100%;
    max-width: 280px;
  }

  #bt {
    left: 0;
    transform: translateX(0);
  }
}

@media (max-width: 480px) {
  nav {
    padding: 10px 0;
  }

  .navbar h1 {
    font-size: 20px;
  }

  .search-bar input {
    width: 100%;
    max-width: 200px;
  }

  button.btn-primary {
    width: 100%;
  }

  .card-body h1 {
    font-size: 14px;
  }

  .card-body h5 {
    font-size: 12px;
  }

  .footer p {
    font-size: 12px;
  }
}
```

## **How to Run the App Locally**

To run this app on your local machine, follow these steps:

1. **Clone the repository**:
   ```bash
  

 git clone https://github.com/your-username/react-movie-finder.git
   ```
2. **Install dependencies**:
   Navigate to the project directory and run:
   ```bash
   npm install
   ```
3. **Run the app**:
   Start the development server by running:
   ```bash
   npm start
   ```

The app should now be running locally at `http://localhost:3000`.

## **Technologies Used**

- **React** for building the user interface.
- **OMDb API** to fetch movie data.
- **CSS** for styling the app, including responsiveness for various devices.

---
