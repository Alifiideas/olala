import { BrowserRouter, Routes, Route } from "react-router-dom";
import Todo from "./pages/Todo";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import "./App.css";


function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/duplicate-detector" element={<DuplicateDetector />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;