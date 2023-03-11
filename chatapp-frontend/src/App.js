import './App.css';
import Navigation from './Components/Navigation';
import {BrowserRouter , Routes , Route} from "react-router-dom";
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Chat from './Pages/Chat';
import UserStateContext from './Context/UserStateContext';


function App() {
  return (
    <div className="App">
    <UserStateContext>
    <BrowserRouter>
    <Navigation/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/chat' element={<Chat/>} />
    </Routes>
    </BrowserRouter>
    </UserStateContext>
    </div>
  );
}

export default App;
