import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NuevoProveedor from './NuevoProveedor';
import EditarProveedor from './EditarProveedor';
import { Link } from 'react-router-dom';

const Proveedores = () => {
  const [proveedores, setProveedores] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null);

  useEffect(() => {
    fetchProveedores();
  }, []);

  const fetchProveedores = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/proveedores');
      setProveedores(response.data);
    } catch (error) {
      console.error('Error fetching proveedores:', error);
    }
  };

  const handleAgregarProveedor = () => {
    setModalOpen(true);
    setProveedorSeleccionado(null);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setProveedorSeleccionado(null);
  };

  const handleAddProveedor = async (nuevoProveedor) => {
    try {
      const response = await axios.post('http://localhost:8000/api/proveedores', nuevoProveedor);
      setProveedores([...proveedores, response.data]);
      alert('Proveedor agregado exitosamente');
    } catch (error) {
      console.error('Error al agregar proveedor:', error);
    }
  };

  const handleEliminarProveedor = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/proveedores/${id}`);
      const updatedProveedores = proveedores.filter(proveedor => proveedor.id !== id);
      setProveedores(updatedProveedores);
      alert('Proveedor eliminado exitosamente');
    } catch (error) {
      console.error('Error al eliminar proveedor:', error);
    }
  };

  const handleEditarProveedor = (proveedor) => {
    setProveedorSeleccionado(proveedor);
    setModalOpen(true);
  };

  const handleUpdateProveedor = async (id, updatedProveedor) => {
    try {
      await axios.put(`http://localhost:8000/api/proveedores/${id}`, updatedProveedor);
      const updatedProveedores = proveedores.map(proveedor =>
        proveedor.id === id ? updatedProveedor : proveedor
      );
      setProveedores(updatedProveedores);
      alert('Proveedor actualizado exitosamente');
      handleCloseModal();
    } catch (error) {
      console.error('Error al actualizar proveedor:', error);
    }
  };

  return (
    <div className="container">
      <div className="content">
        <center><h2 style={{ fontFamily: 'Arial' }}>Proveedores</h2></center>
        <button onClick={handleAgregarProveedor}>Agregar Proveedor</button><br />
        <table>
          <thead>
            <tr>
              <th style={{ fontFamily: 'Arial' }}>Nombre</th>
              <th style={{ fontFamily: 'Arial' }}>Estado</th>
              <th style={{ fontFamily: 'Arial' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proveedores.map(proveedor => (
              <tr key={proveedor.id}>
                <td>{proveedor.nombre}</td>
                <td>{proveedor.estado}</td>
                <td>
                  <button onClick={() => handleEditarProveedor(proveedor)}>Editar</button><br />
                  <button onClick={() => handleEliminarProveedor(proveedor.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table><br />
        {modalOpen && proveedorSeleccionado && (
          <EditarProveedor
            proveedor={proveedorSeleccionado}
            closeModal={handleCloseModal}
            updateProveedor={handleUpdateProveedor}
          />
        )}
        {modalOpen && !proveedorSeleccionado && (
          <NuevoProveedor closeModal={handleCloseModal} onAddProveedor={handleAddProveedor} />
        )}

        <center><button type='submit'><Link to='/home' style={{ textDecoration: 'none', color: 'white' }}>Ir a inicio</Link></button></center>
      </div>
    </div>
  );
};

export default Proveedores;
