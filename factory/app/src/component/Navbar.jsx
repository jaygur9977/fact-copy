// // src/components/Navbar.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Navbar = () => {
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showAuthModal, setShowAuthModal] = useState(false);
//   const [authMode, setAuthMode] = useState('signup');
//   const [formData, setFormData] = useState({ name: '', email: '', password: '' });

//   useEffect(() => {
//     const fetchUser = async () => {
//       const res = await axios.get("http://localhost:5000/api/auth/user", { withCredentials: true });
//       if (res.data.user) setUser(res.data.user);
//     };
//     fetchUser();
//   }, []);

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleAuth = async () => {
//     setIsLoading(true);
//     try {
//       const endpoint = authMode === 'signup' ? 'register' : 'login';
//       const res = await axios.post(`http://localhost:5000/api/auth/${endpoint}`, formData, { withCredentials: true });
//       setUser(res.data.user);
//       setShowAuthModal(false);
//       setFormData({ name: '', email: '', password: '' });
//     } catch (err) {
//       alert(err.response?.data?.message || 'Error');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleLogout = async () => {
//     await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
//     setUser(null);
//   };

//   return (
//     <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
//       <div className="flex items-center">
//         <img src="/newlogo.jpg" alt="Logo" className="h-10 w-auto max-h-10 object-contain" />
//       </div>

//       {showAuthModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
//             <h2 className="text-2xl font-bold mb-4">{authMode === 'signup' ? 'Sign Up' : 'Login'}</h2>
//             {authMode === 'signup' && (
//               <input name="name" placeholder="Name" onChange={handleInputChange} className="mb-2 p-2 border rounded w-full" />
//             )}
//             <input name="email" placeholder="Email" onChange={handleInputChange} className="mb-2 p-2 border rounded w-full" />
//             <input type="password" name="password" placeholder="Password" onChange={handleInputChange} className="mb-4 p-2 border rounded w-full" />

//             <button onClick={handleAuth} className="w-full bg-blue-600 text-white p-2 rounded">
//               {isLoading ? 'Processing...' : authMode === 'signup' ? 'Sign Up' : 'Login'}
//             </button>
//             <button onClick={() => setAuthMode(authMode === 'signup' ? 'login' : 'signup')} className="text-blue-500 mt-2">
//               {authMode === 'signup' ? 'Already have an account? Login' : 'Need an account? Sign Up'}
//             </button>
//             <button onClick={() => setShowAuthModal(false)} className="mt-4 text-gray-500">Cancel</button>
//           </div>
//         </div>
//       )}

//       <div className="flex space-x-4 items-center">
//         {user ? (
//           <div className="relative group">
//             <div className="w-8 h-8 bg-blue-600 rounded-full text-white flex items-center justify-center cursor-pointer">
//               {user.name.charAt(0).toUpperCase()}
//             </div>
//             <div className="absolute hidden group-hover:block bg-white shadow-md right-0 mt-2 py-2 rounded z-50">
//               <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</div>
//               <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</div>
//               <div onClick={handleLogout} className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600">Logout</div>
//             </div>
//           </div>
//         ) : (
//           <button onClick={() => { setAuthMode('login'); setShowAuthModal(true); }} className="bg-blue-600 text-white px-4 py-2 rounded">
//             Login
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;




import React, { useState, useEffect } from "react";
import axios from "axios";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('signup');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [showDropdown, setShowDropdown] = useState(false);

  // Navigation handlers
  const handleHome = () => window.location.href = '/';
  const handleDashboard = () => window.location.href = '/dashboard';
  const handleFactory = () => window.location.href = '/factory';
  const handleContact = () => window.location.href = '/contact';
  const handleSuggestion = () => window.location.href = '/suggestion';

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/user", { withCredentials: true });
        if (res.data.user) setUser(res.data.user);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuth = async () => {
    setIsLoading(true);
    try {
      const endpoint = authMode === 'signup' ? 'register' : 'login';
      const res = await axios.post(
        `http://localhost:5000/api/auth/${endpoint}`,
        formData,
        { withCredentials: true }
      );
      setUser(res.data.user);
      setShowAuthModal(false);
      setFormData({ name: '', email: '', password: '' });
      // Redirect to dashboard after successful login/signup
      window.location.href = '/dashboard';
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      // Redirect to home page after logout
      window.location.href = '/';
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <div className="flex items-center space-x-8">
        <img 
          src="/newlogo.jpg" 
          alt="Logo" 
          className="h-10 w-auto max-h-10 object-contain cursor-pointer"
          onClick={handleHome}
        />
        
        {/* Navigation Buttons */}
        <button 
          onClick={handleHome}
          className="text-gray-700 hover:text-blue-600 transition"
        >
          Home
        </button>
        
        {user && (
          <button 
            onClick={handleDashboard}
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Dashboard
          </button>
        )}
        
        <button 
          onClick={handleFactory}
          className="text-gray-700 hover:text-blue-600 transition"
        >
          Factory
        </button>
        
        <button 
          onClick={handleContact}
          className="text-gray-700 hover:text-blue-600 transition"
        >
          Contact Us
        </button>
        
        <button 
          onClick={handleSuggestion}
          className="text-gray-700 hover:text-blue-600 transition"
        >
          Suggestion
        </button>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-2xl font-bold mb-4">
              {authMode === 'signup' ? 'Sign Up' : 'Login'}
            </h2>
            
            {authMode === 'signup' && (
              <input 
                name="name" 
                placeholder="Name" 
                value={formData.name}
                onChange={handleInputChange} 
                className="mb-2 p-2 border rounded w-full" 
              />
            )}
            
            <input 
              name="email" 
              placeholder="Email" 
              value={formData.email}
              onChange={handleInputChange} 
              className="mb-2 p-2 border rounded w-full" 
            />
            
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              value={formData.password}
              onChange={handleInputChange} 
              className="mb-4 p-2 border rounded w-full" 
            />

            <button 
              onClick={handleAuth} 
              disabled={isLoading}
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : authMode === 'signup' ? 'Sign Up' : 'Login'}
            </button>
            
            <button 
              onClick={() => setAuthMode(authMode === 'signup' ? 'login' : 'signup')} 
              className="text-blue-500 mt-2 hover:underline"
            >
              {authMode === 'signup' ? 'Already have an account? Login' : 'Need an account? Sign Up'}
            </button>
            
            <button 
              onClick={() => setShowAuthModal(false)} 
              className="mt-4 text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Auth Section */}
      <div className="flex space-x-4 items-center">
        {user ? (
          <div className="relative">
            <div 
              className="w-8 h-8 bg-blue-600 rounded-full text-white flex items-center justify-center cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
            
            {showDropdown && (
              <div className="absolute bg-white shadow-md right-0 mt-2 py-2 rounded z-50 w-48">
                <div 
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setShowDropdown(false);
                    window.location.href = '/profile';
                  }}
                >
                  Profile
                </div>
                
                <div 
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setShowDropdown(false);
                    window.location.href = '/settings';
                  }}
                >
                  Settings
                </div>
                
                <div 
                  onClick={() => {
                    setShowDropdown(false);
                    handleLogout();
                  }} 
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex space-x-2">
            <button 
              onClick={() => { 
                setAuthMode('signup'); 
                setShowAuthModal(true); 
              }} 
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Sign Up
            </button>
            
            <button 
              onClick={() => { 
                setAuthMode('login'); 
                setShowAuthModal(true); 
              }} 
              className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;