import { HashRouter as Router, Route } from "react-router-dom";
// here we will use hash router as when we merge these projects then if we click note and click refresh then django cant find path /note/id
// hash router adds a hash so that our routing is handled by react in django.
import "./App.css";
import Header from "./components/Header";
import NotesListPage from "./pages/NotesListPage";
import NotePage from "./pages/NotePage";

function App() {
  return (
    <Router>
      {/* For light theme remove dark from classname */}
      <div className="container dark">
        <div className="app">
          <Header />
          {/* whenever our url path exact matches it renders noteslistpage */}
          {/* we need to add routes as in higher version v6 syntax has changed */}
          <Route path="/" exact component={NotesListPage} />
          {/* here we can access our NotePage by using note/:id */}
          <Route path="/note/:id" component={NotePage} />
        </div>
      </div>
    </Router>
  );
}

export default App;
