import './style/App.css';
import NavBar from './components/Navbar.js'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import DashBoard from './components/Dashboard.js'
import SearchResults from './components/Searchresults.js'
import ProfilePage from './components/Profilepage.js'
import PlatformPage from './components/Platformpage.js'
import QuizPage from './components/Quizpage.js'
import QuizTaking from './components/Quiztaking.js'

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
        {/* Profile Page */}
        <Route path='/profile' component={ProfilePage}/>
        {/* Platform Page*/}
        <Route path='/platform' component={PlatformPage}/>
        {/* Quiz Page Page */}
        <Route path='/quizpage' component={QuizPage}/>
        {/* Quiz Taking */}
        <Route path='/quiztaking' component={QuizTaking}/>
      </body>
    </Router>
  );
}

export default App;
