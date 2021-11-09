import './style/App.css';
import NavBar from './components/Navbar.js'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import DashBoard from './components/Dashboard.js'
import SearchResults from './components/Searchresults.js'
import ProfilePage from './components/Profilepage.js'
import PlatformPage from './components/Platformpage.js'
import QuizPage from './components/Quizpage.js'
import QuizTaking from './components/Quiztaking.js'
import { useContext } from 'react'
import { myContext } from './Context.js'

function App() {
  const userObject = useContext(myContext)
  console.log('WOW WE HAVE THE CONTEXT!!!!')
  console.log(userObject)
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
        {/* Quiz Page */}
        <Route path='/quizpage' component={QuizPage}/>
        {/* Quiz Taking */}
        <Route path='/quiztaking' component={QuizTaking}/>
        {/* Platform Page */}
        <Route path='/platform' component={PlatformPage}/>
      </body>
    </Router>
  );
}

export default App;
