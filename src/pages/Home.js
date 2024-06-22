import React, { useState, useEffect } from "react";
import "./Home.css";
import Sidebar from "../components/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { Table } from "reactstrap";

function Home() {
  const [usuario, setUsuario] = useState("");
  const [ventas, setVentas] = useState(10);
  const [productos, setProductos] = useState(3);
  const [clientes, setClientes] = useState(10);
  const [compras, setCompras] = useState(7);
  const [categorías, setCategorias] = useState(2);
  const [marcas, setMarcas] = useState(2);
  const [clientesNuevos, setClientesNuevos] = useState(0);
  const navigate = useNavigate();

  // Configurar tiempo de inactividad
  const inactivityTime = 300000; // 5 minutos de inactividad
  let timeout;

  const resetTimeout = () => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      alert("La sesión ha caducado");
      navigate('/');
    }, inactivityTime);
  };

  useEffect(() => {
    // Simular la carga de datos
    setTimeout(() => {
      setVentas(10 + Math.floor(Math.random() * 1));
      setProductos(3 + Math.floor(Math.random() * 5));
      setClientes(10 + Math.floor(Math.random() * 1));
      setCompras(7 + Math.floor(Math.random() * 3));
      setCategorias(2 + Math.floor(Math.random() * 1));
      setMarcas(2 + Math.floor(Math.random() * 1));
      setClientesNuevos(clientesNuevos + Math.floor(Math.random() * 5));
    }, 1000);
  }, []);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/usuarios', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setUsuario(data.nombre);
        } else {
          console.error('Error al obtener información del usuario');
        }
      } catch (error) {
        console.error('Error al obtener información del usuario:', error);
      }
    };

    fetchUsuario();

    // Agregar eventos para reiniciar el timeout de inactividad
    window.addEventListener('mousemove', resetTimeout);
    window.addEventListener('keydown', resetTimeout);

    // Iniciar el timeout de inactividad
    resetTimeout();

    // Limpiar eventos al desmontar el componente
    return () => {
      if (timeout) clearTimeout(timeout);
      window.removeEventListener('mousemove', resetTimeout);
      window.removeEventListener('keydown', resetTimeout);
    };
  }, []);

  return (
    <div className="Home">
      <Sidebar usuario={usuario} />
      <header className="Home-header">
      </header>
      <main className="Home-main">
        <section className="Home-seccion-izquierda">
          {/* Contenido de la sección izquierda */}
        </section>
        <section className="Home-seccion-derecha">
          <center><h1>Bienvenido, {usuario}!</h1></center>
          <h2>Detalles</h2>
          <div className="Home-grid-container">
            <div className="Home-fila">
              <div className="Home-cuadro">
                <p>{clientes}</p>
                <p>Clientes </p>
              </div>
              <div className="Home-cuadro">
                <p>{ventas}</p>
                <p>Ventas</p>
              </div>
              <div className="Home-cuadro">
                <p>{productos}</p>
                <p>Productos </p>
              </div>
            </div>
            <div className="Home-fila">
              <div className="Home-cuadro">
                <p>{compras}</p>
                <p>Compras </p>
              </div>
              <div className="Home-cuadro">
                <p>{categorías}</p>
                <p>Categorías </p>
              </div>
              <div className="Home-cuadro">
                <p>{marcas}</p>
                <p>Marcas</p>
              </div>
            </div>
          </div>
          <br/><br/>
          <center>
            <Link to="/nuevo-cliente" className="link" style={{ textDecoration: 'none', color: 'black' }}><h1>Clientes Nuevos</h1></Link>
          </center>
          <br/><br/>
          <center><Table className="Table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Tipo de documento</th>
                <th>Número de documento</th>
                <th>Teléfono</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>ETB</td>
                <td>NIT</td>
                <td>3434248291</td>
                <td>4349473847</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Claro</td>
                <td>RUT</td>
                <td>4545326171</td>
                <td>3461961966</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Movistar</td>
                <td>RUES</td>
                <td>2892510591</td>
                <td>4566490290</td>
              </tr>
            </tbody>
          </Table>
          </center>
        </section>
      </main>
    </div>
  );
}

export default Home;
