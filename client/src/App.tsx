import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./index.css";
function App() {
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <Navbar />

      <main className="p-6 w-full">
        <Routes>
        </Routes>
      </main>
    </div>
  );
}

export default App;
