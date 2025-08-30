import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./index.css";
import CreateHero from "./pages/CreateHero/CreateHero";
import Home from "./pages/Home/Home";
function App() {
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <Navbar />

      <main className="p-6 w-full">
        <Routes>
          <Route path="/create-hero" element = {<CreateHero/>}/>
          <Route path = "/" element = {<Home/>}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
