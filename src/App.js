import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/auth';
import { Login, SignUp, PrivateRoute, Dashboard, Account } from './pages'

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Routes>

            {/* PUBLIC ROUTES */}
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />

            {/* PRIVATE ROUTES */}
            <Route element={<PrivateRoute />}>
              <Route exact path="/" element={<Dashboard />}></Route>
              <Route exact path="/account" element={<Account />}></Route>
            </Route>


          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
