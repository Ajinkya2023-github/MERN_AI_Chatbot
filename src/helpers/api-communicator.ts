import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/v1"; // Adjust if needed

// Create an axios instance with default headers
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Needed if using cookies
});

// Helper function to get token from localStorage (if using token-based auth)
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// 🟢 LOGIN USER
export const loginUser = async (email: string, password: string) => {
  const res = await api.post("/user/login", { email, password });
  // After a successful login and token storage
  //localStorage.setItem("token", res.data.token);
  //console.log("Stored token:", localStorage.getItem("token"));
  if (res.status !== 200) throw new Error("Unable to login!");
  return res.data;
};

// 🟢 CHECK AUTH STATUS
export const checkAuthStatus = async () => {
  try {
    const res = await api.get("/user/auth-status"); // withCredentials is set by default
    return res.data;
  } catch (error) {
    console.error("Auth check failed, returning null, error ->", error);
    return null;
  }
};

// 🟢 SEND CHAT REQUEST
export const sendChatRequest = async (message: string) => {
  const res = await api.post("/chat/new", { message }, { headers: getAuthHeaders() });
  if (res.status !== 200) throw new Error("Unable to send chat!");
  return res.data;
};

// 🟢 GET USER CHATS
export const getUserChats = async () => {
  const res = await api.get("/chat/all-chats");
  if (res.status !== 200) throw new Error("Unable to get chats!");
  return res.data;
};

// 🟢 DELETE USER CHATS
export const deleteUserChats = async () => {
  const res = await api.delete("/chat/delete", { headers: getAuthHeaders() });
  if (res.status !== 200) throw new Error("Unable to delete chats!");
  return res.data;
};

// 🟢 SIGNUP USER
export const signupUser = async (name: string, email: string, password: string) => {
  const res = await api.post("/user/signup", { name, email, password });
  if (res.status !== 201) throw new Error("Unable to Signup!");
  return res.data;
};

// 🟢 LOGOUT USER
export const logoutUser = async () => {
  const res = await api.get("/user/logout", { headers: getAuthHeaders() });
  if (res.status !== 200) throw new Error("Unable to logout!");
  return res.data;
};


/* export const loginUser = async (email: string, password: string) => {
    const res = await axios.post("/user/login", { email, password });
    if (res.status !== 200) {
        throw new Error("Unable to login!");
    }
    const data = await res.data;
    return data;

};

export const checkAuthStatus = async () => {
    const res = await axios.get("/user/auth-status");
    if (res.status !== 200) {
        throw new Error("Unable to authenticate!");
    }
    const data = await res.data;
    return data;
};

// send chat request function for chatting
export const sendChatRequest = async (message: string) => {
    const res = await axios.post("/chat/new", { message });
    if (res.status !== 200) {
      throw new Error("Unable to send chat!");
    }
    const data = await res.data;
    return data;
};


// get user chats
export const getUserChats = async () => {
    const res = await axios.get("/chat/all-chats");
    if (res.status !== 200) {
      throw new Error("Unable to send chat!");
    }
    const data = await res.data;
    return data;
};

//delete user chats
export const deleteUserChats = async () => {
    const res = await axios.delete("/chat/delete");
    if (res.status !== 200) {
      throw new Error("Unable to delete chats!");
    }
    const data = await res.data;
    return data;
};

// signupUser function added later
export const signupUser = async (name: string, email: string, password: string) => {
      //const response = await axios.post(`${API_BASE_URL}/signup`, {
      const response = await axios.post("/user/signup", {name, email, password});
      if (response.status !== 201) {
        throw new Error("Unable to Signup!");
      }
      const data = await response.data;
      return data;
};


// logoutUser function added later
export const logoutUser = async () => {
    const res = await axios.get("/user/logout");
    if (res.status !== 200) {
      throw new Error("Unable to logout!");
    }
    const data = await res.data;
    return data;
};
  */