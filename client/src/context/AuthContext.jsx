import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  const signup = async (username, email, password) => {
    try {
      const res = await axios.post("http://localhost:8080/api/auth/signup", {
        username,
        email,
        password,
      });
      const { token, data } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      toast.success("Account created successfully!");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
      return false;
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:8080/api/auth/signin", {
        email,
        password,
      });
      const { token, data } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      toast.success("Logged in successfully!");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
    toast.success("Logged out");
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
