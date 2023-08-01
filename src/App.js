import Register from './Components/Register'
import Login from './Components/Login'
import Dashboard from './Components/Dashboard';
import {BrowserRouter,Router,Route, Routes} from 'react-router-dom'
function App() {
  return (
   <>
  <BrowserRouter>
  <Routes>
  <Route path ='/login'element={<Login/>}/>
  <Route path ='register' element={<Register/>}/>
  <Route path ='/dashboard' element={<Dashboard/>}/>
  </Routes>
  </BrowserRouter> 
 

   </>
  );
}

export default App;
