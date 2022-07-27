import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/auth';
import { Login, SignUp, PrivateRoute, Dashboard } from './pages'

function App() {
  return (
    <div>
      <h1>Nite</h1>
      <Router>
        <AuthProvider>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route exact path="/" element={<Dashboard />}></Route>
            </Route>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
