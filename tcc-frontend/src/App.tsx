import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Proposals from "./pages/Proposals";
import Votes from "./pages/Votes";


export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* HEADER */}
        <header className="bg-blue-600 text-white shadow-md">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Governança Digital</h1>

            {/* Navbar com botões */}
            <nav className="flex gap-4">
              <Link
                to="/"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Home
              </Link>
              <Link
                to="/login"
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
              >
                Register
              </Link>
              <Link
                to="/proposals"
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
              >
                Propostas
              </Link>
              <Link
                to="/votes"
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Votos
              </Link>
            </nav>
          </div>
        </header>

        {/* MAIN */}
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/proposals" element={<Proposals />} />
            <Route path="/votes" element={<Votes />} />
          </Routes>
        </main>

        {/* FOOTER */}
        <footer className="bg-gray-100 text-center py-4 text-sm text-gray-600">
          © 2025 Governança Digital - Todos os direitos reservados
        </footer>
      </div>
    </Router>
  );
}
