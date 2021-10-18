import './App.css';
import { 
  BrowserRouter,
   Route,
    Link 
  } from "react-router-dom";
import trivia from './trivia';
import triviapreguntas from './triviapreguntas';


function App() {
  return (
    <BrowserRouter>
      <Route path='/' exact component={trivia}></Route>
      <Route path='/retrivia' exact component={triviapreguntas}></Route>
    </BrowserRouter>
  );
}

export default App;
