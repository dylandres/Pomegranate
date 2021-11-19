import './style/App.css';
import NavBar from './components/Navbar.js'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import DashBoard from './components/Dashboard.js'
import SearchResults from './components/Searchresults.js'
import ProfilePage from './components/Profilepage.js'
import PlatformPage from './components/Platformpage.js'
import QuizPage from './components/Quizpage.js'
import QuizTaking from './components/Quiztaking.js'
import EditQuiz from './components/EditQuiz.js'

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
        {/* Quiz Page */}
        <Route path='/quizpage' component={QuizPage}/>
        {/* Quiz Editing */}
        <Route path='/quizediting' component={EditQuiz}/>
        {/* Quiz Taking */}
        <Route path='/quiztaking' component={QuizTaking}/>
        {/* Platform Page */}
        <Route path='/platform' component={PlatformPage}/>
        {/* Invalid URL redirects to homepage */}
        <Route render={() => <Redirect to={{pathname: "/"}} />} />
      </body>
    </Router>
  );
}

export default App;
