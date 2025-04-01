import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./index.css"
import { createTheme, ThemeProvider } from '@mui/material'
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from './context/AuthContext.tsx'
import axios from 'axios'
import {Toaster} from "react-hot-toast" 

axios.defaults.baseURL = "http://localhost:5000/api/v1";
axios.defaults.withCredentials = true;

const theme = createTheme({typography: {
  fontFamily: "Roboto Slab, serif",
  allVariants: { color: "white"},
  },
});

// Ensure 'root' element exists before rendering (mod added)
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme = {theme}>
            <App />
            <Toaster position="top-center" /> {/* ✅ Move Toaster inside */}
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
)
