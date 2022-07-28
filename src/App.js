import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/auth';
import { Login, SignUp, PrivateRoute, Dashboard } from './pages'

function App() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Nite</h1>
      <Router>
        <AuthProvider>
          <Routes>

            {/* PUBLIC ROUTES */}
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />

            {/* PRIVATE ROUTES */}
            <Route element={<PrivateRoute />}>
              <Route exact path="/" element={<Dashboard />}></Route>
            </Route>


          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
