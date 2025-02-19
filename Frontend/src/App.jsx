import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignInForm from './auth/forms/SignInForm'
import SignUpForm from './auth/forms/SignUpForm'
import Home from './Pages/Home'
import About from './Pages/About'
import Dashboard from './Pages/Dashboard'
import NewsArticles from './Pages/NewsArticles'
import Header from './components/shared/Header'
import { Toaster } from './components/ui/toaster'
import Footer from './components/shared/Footer'
import PrivateRoute from './components/shared/PrivateRoute'

function App() {
  return (
<>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/sign-in' element={<SignInForm />} /> 
      <Route path='/sign-up' element={<SignUpForm />} /> 

      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />

      <Route element={<PrivateRoute />}>
      <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      <Route path="/news" element={<NewsArticles />} />
    </Routes>

    <Footer/>
    <Toaster />
    </BrowserRouter>

    </>
  )
}

export default App