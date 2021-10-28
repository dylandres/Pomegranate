import './App.css';
import NavBar from './components/Navbar.js'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './components/Homepage.js'
import SearchResults from './components/Searchresults.js'

function App() {
  return (
    <Router>
      <body>
      {/* NavBar always at top of page */}
        <NavBar/>
        <br/>
        {/* Home Page */}
        <Route path="/" exact component={HomePage}/>
        {/* Search Results Page */}
        <Route path="/search" component={SearchResults}/>
      </body>
    </Router>
  );
}

export default App;
