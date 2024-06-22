import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NuevaCompra from './NuevaCompra';
import EditarCompra from './EditarCompra';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';

const Compras = () => {
  const [compras, setCompras] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [compraSeleccionada, setCompraSeleccionada] = useState(null);

  useEffect(() => {
    fetchCompras();
  }, []);

  const fetchCompras = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/carts');
      setCompras(response.data);
    } catch (error) {
      console.error('Error fetching compras:', error);
    }
  };

  const handleAgregarCompra = () => {
    setModalOpen(true);
    setCompraSeleccionada(null); // Reiniciar la compra seleccionada al agregar una nueva compra
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setCompraSeleccionada(null);
  };

  const handleEliminarCompra = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/carts/${id}`);
      const updatedCompras = compras.filter(compra => compra.id !== id);
      setCompras(updatedCompras);
      alert('Compra eliminada exitosamente');
    } catch (error) {
      console.error('Error deleting compra:', error);
    }
  };

  const handleEditarCompra = (compra) => {
    setCompraSeleccionada(compra);
    setModalOpen(true); // Solo abrir la modal de edición cuando se edita una compra
  };

  const handleUpdateCompra = (updatedCompra) => {
    const updatedCompras = compras.map(compra =>
      compra.id === updatedCompra.id ? updatedCompra : compra
    );
    setCompras(updatedCompras);
    alert('Compra actualizada exitosamente');
  };

  const handleNuevaCompra = async (nuevaCompra) => {
    try {
      const response = await axios.post('http://localhost:8000/api/carts', nuevaCompra);
      setCompras([...compras, response.data]);
      alert('Compra agregada exitosamente');
      handleCloseModal();
    } catch (error) {
      console.error('Error adding compra:', error);
    }
  };

  const exportarCompraPDF = (id) => {
    // Obtener la compra por su ID
    const compra = compras.find(compra => compra.id === id);

    if (compra) {
      // Crear un nuevo documento PDF
      const doc = new jsPDF();

      // Agregar contenido al documento
      doc.text(`Compra ID: ${compra.id}`, 10, 10);
      doc.text(`Usuario: ${compra.usuario}`, 10, 20);
      doc.text(`Producto: ${compra.producto}`, 10, 30);

      // Guardar el documento como un archivo PDF
      doc.save(`Compra_${compra.id}.pdf`);
    } else {
      console.error(`No se encontró la compra con ID ${id}`);
    }
  };

  return (
    <div className="container">
      <div className="content">
        <center><h2 style={{fontFamily: 'Arial'}}>Compras</h2></center>
        <button onClick={handleAgregarCompra}>Agregar Compra</button><br/>
        <table>
          <thead>
            <tr>
              <th style={{fontFamily: 'Arial'}}>Usuario</th>
              <th style={{fontFamily: 'Arial'}}>Producto</th>
              <th style={{fontFamily: 'Arial'}}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {compras.map(compra => (
              <tr key={compra.id}>
                <td>{compra.usuario}</td>
                <td>{compra.producto}</td>
                <td>
                  <button onClick={() => handleEditarCompra(compra)}>Editar</button><br />
                  <button onClick={() => handleEliminarCompra(compra.id)}>Eliminar</button><br />
                  <button onClick={() => exportarCompraPDF(compra.id)}>Exportar a PDF</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table><br />
        {modalOpen && compraSeleccionada && (
          <EditarCompra
            compra={compraSeleccionada}
            closeModal={handleCloseModal}
            updateCompra={handleUpdateCompra}
          />
        )}
        {modalOpen && !compraSeleccionada && (
          <NuevaCompra
            closeModal={handleCloseModal}
            updateCompras={handleNuevaCompra}
          />
        )}

        <center><button type='submit'><Link to='/home' style={{textDecoration: 'none', color: 'white'}}>Ir a inicio</Link></button></center>
      </div>
    </div>
  );
};

export default Compras;
