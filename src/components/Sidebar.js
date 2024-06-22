import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import profileImage from '../profile.jpg';
import './Sidebar.css'; 

function Sidebar({ usuario }) {
  const location = useLocation();
  const navigate = useNavigate();

  const hiddenPaths = ['/editarPerfil', '/login', '/registro'];

  if (hiddenPaths.includes(location.pathname)) {
    return null;
  }

  const handleLogout = (e) => {
    e.preventDefault();
    const confirmLogout = window.confirm('¿Estás seguro de que quieres cerrar sesión?');
    if (confirmLogout) {
      navigate('/');
    }
  };

  return (
    <div className="sidebar">
      <ul>
        <Link to="/editarPerfil" alt="link" style={{ textDecoration: 'none', color: 'white' }}>
          <img src={profileImage} alt="Foto de perfil" style={{ maxWidth: '100%', height: 'auto' }} /><br/><br/>
        </Link>
        <center><div className="Name">{usuario}</div></center><br/>
        <li><Link to="/home" alt="link" className="link" style={{ textDecoration: 'none', color: 'white' }}>Home</Link></li><br/>
        <li><Link to="/categorias" alt="link" className="link" style={{ textDecoration: 'none', color: 'white' }}>Categorías</Link></li><br/>
        <li><Link to="/productos" alt="link" className="link" style={{ textDecoration: 'none', color: 'white' }}>Productos</Link></li><br/>
        <li><Link to="/proveedores" alt="link" className="link" style={{ textDecoration: 'none', color: 'white' }}>Proveedores</Link></li><br/>
        <li><Link to="/clientes" alt="link" className="link" style={{ textDecoration: 'none', color: 'white' }}>Clientes</Link></li><br/>
        <li><Link to="/ventas" alt="link" className="link" style={{ textDecoration: 'none', color: 'white' }}>Ventas</Link></li><br/>
        <li><Link to="/compras" alt="link" className="link" style={{ textDecoration: 'none', color: 'white' }}>Compras</Link></li><br/>
        <li><Link to="/marcas" alt="link" className="link" style={{ textDecoration: 'none', color: 'white' }}>Marcas</Link></li><br/>
      </ul><br/>
      <button onClick={handleLogout} style={{ textDecoration: 'none', color: 'white' }}>Cerrar Sesión</button>
    </div>
  );
}

export default Sidebar;
