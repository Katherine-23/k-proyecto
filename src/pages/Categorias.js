import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../pages/Categorías.css';
import NuevaCategoria from './NuevaCategoria';
import EditarCategoria from './EditarCategoria';
import { Link } from 'react-router-dom';

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/categorias');
        setCategorias(response.data);
      } catch (error) {
        console.error('Error al obtener categorías:', error);
      }
    };

    obtenerCategorias();
  }, []);

  const handleAgregarCategoria = (nuevaCategoria) => {
    setCategorias([...categorias, nuevaCategoria]);
    setShowModal(false);
    alert('Categoría agregada exitosamente');
  };

  const handleEditarCategoria = (categoria) => {
    setCategoriaSeleccionada(categoria);
    setShowModal(true);
  };

  const handleEliminarCategoria = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/categorias/${id}`);
      setCategorias(categorias.filter((categoria) => categoria.id !== id));
      alert('Categoría eliminada exitosamente');
    } catch (error) {
      console.error('Error al eliminar categoría:', error);
    }
  };

  return (
    <div className="container">
      <div className="content">
        <center><h2 style={{ fontFamily: 'Arial' }}>Categorías</h2></center>
        <button onClick={() => setShowModal(true)}>Agregar Categoría</button><br /><br />
        <table>
          <thead>
            <tr>
              <th style={{ fontFamily: 'Arial' }}>Nombre</th>
              <th style={{ fontFamily: 'Arial' }}>Tipo</th>
              <th style={{ fontFamily: 'Arial' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((categoria) => (
              <tr key={categoria.id}>
                <td>{categoria.nombres}</td>
                <td>{categoria.tipo}</td>
                <td>
                  <button onClick={() => handleEditarCategoria(categoria)}>Editar</button><br />
                  <button onClick={() => handleEliminarCategoria(categoria.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table><br />
        {showModal && <NuevaCategoria onAgregarCategoria={handleAgregarCategoria} onClose={() => setShowModal(false)} />}
        {categoriaSeleccionada && (
          <EditarCategoria
            categoria={categoriaSeleccionada}
            onClose={() => {
              setShowModal(false);
              setCategoriaSeleccionada(null);
            }}
            onUpdate={(categoriaActualizada) => {
              setCategorias(
                categorias.map((categoria) =>
                  categoria.id === categoriaActualizada.id ? categoriaActualizada : categoria
                )
              );
              alert('Categoría editada exitosamente');
            }}
          />
        )}
        <center><button type='submit'><Link to='/home' style={{ textDecoration: 'none', color: 'white' }}>Ir a Inicio</Link></button></center>
      </div>
    </div>
  );
};

export default Categorias;
