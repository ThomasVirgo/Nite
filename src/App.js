import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/auth';
import { Login, SignUp, PrivateRoute, Dashboard, Account, Friends } from './pages'

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
              <Route exact path="/friends" element={<Friends />}></Route>
            </Route>


          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
