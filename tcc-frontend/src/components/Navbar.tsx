// src/components/Navbar.tsx
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-xl font-bold">Governança Digital</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Propostas</Link>
          <Link to="/vote" className="hover:underline">Votação</Link>
          <Link to="/login" className="hover:underline">Login</Link>
          <Link to="/register" className="hover:underline">Cadastro</Link>
        </div>
      </div>
    </nav>
  );
}
