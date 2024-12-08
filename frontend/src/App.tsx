
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './Components/HomePage';
import { RegistrationForm } from './Components/RegistrationForm';
import { LoginForm } from './Components/LoginForm';
import { AuthProvider } from './contexts/AuthContext';
import { UserProfile } from './Components/UserProfile';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/register' element={<RegistrationForm/>}/>
          <Route path='/login' element={<LoginForm/>}/>
          <Route path='/user/:name' element={<UserProfile/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
