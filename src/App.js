import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Cases from './components/Cases';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Hero />
        <About />
        <Projects />
        <Cases />
        <Contact />
        <Footer />
      </div>
    </Router>
  );
}

export default App;

