import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NuevaMarca from './NuevaMarca';
import EditarMarca from './EditarMarca';
import { Link } from 'react-router-dom';

const Marcas = () => {
  const API_URL = 'http://localhost:8000/api';
  const [marcas, setMarcas] = useState([]);
  const [showNuevaMarcaModal, setShowNuevaMarcaModal] = useState(false);
  const [showEditarMarcaModal, setShowEditarMarcaModal] = useState(false);
  const [marcaToEdit, setMarcaToEdit] = useState(null);

  useEffect(() => {
    const obtenerMarcas = async () => {
      try {
        const response = await axios.get(`${API_URL}/marcas`);
        setMarcas(response.data);
      } catch (error) {
        console.error('Error al obtener marcas:', error);
      }
    };

    obtenerMarcas();
  }, [API_URL]);

  const handleAddMarca = async (nuevaMarca) => {
    try {
      const response = await axios.post(`${API_URL}/marcas`, nuevaMarca);
      const marcaAgregada = response.data;
      setMarcas([...marcas, marcaAgregada]);
      alert('Marca agregada exitosamente');
    } catch (error) {
      console.error('Error al agregar marca:', error);
    }
  };

  const handleUpdateMarca = async (id, marcaActualizada) => {
    try {
      await axios.put(`${API_URL}/marcas/${id}`, marcaActualizada);
      const updatedMarcas = marcas.map((marca) => (marca.id === id ? marcaActualizada : marca));
      setMarcas(updatedMarcas);
      alert('Marca actualizada exitosamente');
      closeEditarMarcaModal();
    } catch (error) {
      console.error('Error al actualizar marca:', error);
    }
  };

  const handleDeleteMarca = async (id) => {
    try {
      await axios.delete(`${API_URL}/marcas/${id}`);
      const updatedMarcas = marcas.filter((marca) => marca.id !== id);
      setMarcas(updatedMarcas);
      alert('Marca eliminada exitosamente');
    } catch (error) {
      console.error('Error al eliminar marca:', error);
    }
  };

  const openNuevaMarcaModal = () => setShowNuevaMarcaModal(true);
  const closeNuevaMarcaModal = () => setShowNuevaMarcaModal(false);

  const openEditarMarcaModal = (marca) => {
    setMarcaToEdit(marca);
    setShowEditarMarcaModal(true);
  };

  const closeEditarMarcaModal = () => setShowEditarMarcaModal(false);

  return (
    <div className="container">
      <div className="content">
        <center><h2 style={{fontFamily: 'Arial'}}>Marcas</h2></center>
        <button onClick={openNuevaMarcaModal}>Agregar Marca</button><br/>
        <table>
          <thead>
            <tr>
              <th style={{fontFamily: 'Arial'}}>Nombre</th>
              <th style={{fontFamily: 'Arial'}}>Estado</th>
              <th style={{fontFamily: 'Arial'}}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {marcas.map((marca) => (
              <tr key={marca.id}>
                <td>{marca.nombre}</td>
                <td>{marca.estado}</td>
                <td>
                  <button onClick={() => openEditarMarcaModal(marca)}>Editar</button><br />
                  <button onClick={() => handleDeleteMarca(marca.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table><br />
        {showNuevaMarcaModal && (
          <NuevaMarca
            onAddMarca={handleAddMarca}
            onCloseModal={closeNuevaMarcaModal}
          />
        )}
        {showEditarMarcaModal && (
          <EditarMarca
            marca={marcaToEdit}
            onUpdateMarca={handleUpdateMarca}
            onCloseModal={closeEditarMarcaModal}
          />
        )}

        <center><button type='submit'><Link to='/home' style={{textDecoration: 'none', color: 'white'}}>Ir a Inicio</Link></button></center>
      </div>
    </div>
  );
};

export default Marcas;
