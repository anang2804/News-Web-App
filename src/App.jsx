import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Indonesia from "./pages/Indonesia";
import Programming from "./pages/Programming";
import Covid19 from "./pages/Covid19";
import Saved from "./pages/Saved";
import Search from "./pages/Search";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Indonesia />} />
        <Route path="/programming" element={<Programming />} />
        <Route path="/Covid19" element={<Covid19 />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/search/:keyword" element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;
