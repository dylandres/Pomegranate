import './style/App.css';
import NavBar from './components/Navbar.js'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import DashBoard from './components/Dashboard.js'
import SearchResults from './components/Searchresults.js'
import ProfilePage from './components/Profilepage.js'
import PlatformPage from './components/Platformpage.js'

function App() {
  return (
    <Router>
      <body>
      {/* NavBar always at top of page */}
        <NavBar/>
        <br/>
        {/* DashBoard */}
        <Route path="/" exact component={DashBoard}/>
        {/* Search Results Page */}
        <Route path='/search' component={SearchResults}/>
        {/* User's Profile Page */}
        <Route path='/profile' component={ProfilePage}/>
        {/* Platform Page*/}
        <Route path='/platform' component={PlatformPage}/>
      </body>
    </Router>
  );
}

export default App;
