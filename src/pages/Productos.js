import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NuevoProducto from './NuevoProducto';
import EditarProducto from './EditarProducto';
import { Link } from 'react-router-dom';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [prevLength, setPrevLength] = useState(productos.length);

  useEffect(() => {
    obtenerProductos();
  }, []);

  useEffect(() => {
    if (productos.length <= 3 && prevLength > productos.length) {
      alert('Quedan pocos productos disponibles');
    }
    setPrevLength(productos.length);
  }, [productos]);

  const obtenerProductos = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/productos');
      setProductos(response.data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  const handleAgregarProducto = (nuevoProducto) => {
    setProductos([...productos, nuevoProducto]);
    alert('Producto agregado exitosamente');
  };

  const handleEditarProducto = (productoEditado) => {
    setProductos(productos.map(producto => producto.id === productoEditado.id ? productoEditado : producto));
    alert('Producto editado exitosamente');
  };

  const handleEliminarProducto = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/productos/${id}`);
      setProductos(productos.filter(producto => producto.id !== id));
      alert('Producto eliminado exitosamente');
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  const handleFiltroChange = (event) => {
    setFiltro(event.target.value);
  };

  const productosFiltrados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    producto.categoria.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="container">
      <div className="content">
        <center><h2 style={{ fontFamily: 'Arial' }}>Productos</h2></center>
        <input
          type="text"
          placeholder="Buscar por nombre o categoría"
          value={filtro}
          onChange={handleFiltroChange}
          style={{ marginBottom: '20px' }}
        />
        <NuevoProducto onAddProducto={handleAgregarProducto} /><br />
        <table>
          <thead>
            <tr>
              <th style={{ fontFamily: 'Arial' }}>Nombre</th>
              <th style={{ fontFamily: 'Arial' }}>Categoría</th>
              <th style={{ fontFamily: 'Arial' }}>Precio</th>
              <th style={{ fontFamily: 'Arial' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.map(producto => (
              <tr key={producto.id}>
                <td>{producto.nombre}</td>
                <td>{producto.categoria}</td>
                <td>{producto.precio}</td>
                <td>
                  <EditarProducto producto={producto} onEditProducto={handleEditarProducto} />
                  <button onClick={() => handleEliminarProducto(producto.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table><br /><br />
        <center><button><Link to='/home' style={{ textDecoration: 'none', color: 'white' }}>Ir a Inicio</Link></button></center>
      </div>
    </div>
  );
};

export default Productos;
