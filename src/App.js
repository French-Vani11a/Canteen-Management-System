import { Route, Routes } from 'react-router-dom'; 
import NotFound from './pages/NotFound';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard'; 
import PrivateRoute from './components/PrivateRoute'; 
import { AuthContext, AuthProvider } from './auth/AuthProvider'; 
import PasswordReset from './pages/PasswordReset';
import Signup from './pages/Signup'; 
import AuthRedirect from './components/AuthRedirect';
import { useContext } from 'react';
import Home from './pages/Home';
import OrdersDashboard from './pages/OrdersDashboard';

function App() {  
  return (
    <AuthProvider>
      
      <Routes>
        <Route path="/" element={<AuthRedirect element={<Home />} />} />
        <Route path="/login" element={<AuthRedirect element={<Home />} />} />
        <Route path="/student_dashboard" element={<PrivateRoute element={<StudentDashboard />} />} />
        <Route path="/admin_dashboard" element={<PrivateRoute element={<AdminDashboard />} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/orders" element={<OrdersDashboard />} />
        <Route path="/password_reset" element={<PasswordReset />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
