import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NuevaVenta from './NuevaVenta';
import EditarVenta from './EditarVenta';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';

const Ventas = () => {
  const [ventas, setVentas] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);

  useEffect(() => {
    fetchVentas();
  }, []);

  const fetchVentas = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/cart-purchases');
      setVentas(response.data);
    } catch (error) {
      console.error('Error fetching ventas:', error);
    }
  };

  const handleAgregarVenta = () => {
    setModalOpen(true);
    setVentaSeleccionada(null); // Reiniciar la venta seleccionada al agregar una nueva venta
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setVentaSeleccionada(null);
  };

  const handleEliminarVenta = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/cart-purchases/${id}`);
      const updatedVentas = ventas.filter(venta => venta.id !== id);
      setVentas(updatedVentas);
      alert('Venta eliminada exitosamente');
    } catch (error) {
      console.error('Error deleting venta:', error);
    }
  };

  const handleEditarVenta = (venta) => {
    setVentaSeleccionada(venta);
    setModalOpen(true); // Solo abrir la modal de edición cuando se edita una venta
  };

  const handleUpdateVenta = (updatedVenta) => {
    const updatedVentas = ventas.map(venta =>
      venta.id === updatedVenta.id ? updatedVenta : venta
    );
    setVentas(updatedVentas);
    alert('Venta actualizada exitosamente');
  };

  const handleNuevaVenta = async (nuevaVenta) => {
    try {
      const response = await axios.post('http://localhost:8000/api/cart-purchases', nuevaVenta);
      setVentas([...ventas, response.data]);
      alert('Venta agregada exitosamente');
      handleCloseModal();
    } catch (error) {
      console.error('Error adding venta:', error);
    }
  };

  const exportarAPDF = (id, venta) => {
    try {
      // Crear un nuevo objeto de jsPDF
      const doc = new jsPDF();

      // Agregar contenido al PDF
      doc.text(`Venta con ID: ${id}`, 10, 10);
      doc.text(`Usuario: ${venta.usuario}`, 10, 20);
      doc.text(`Producto: ${venta.producto}`, 10, 30);
      doc.text(`Precio: ${venta.precio}`, 10, 40);
      doc.text(`Cantidad: ${venta.cantidad}`, 10, 50);

      // Guardar el PDF
      doc.save(`venta_${id}.pdf`);
    } catch (error) {
      console.error('Error al exportar venta a PDF:', error);
    }
  };

  return (
    <div className="container">
      <div className="content">
        <center><h2 style={{fontFamily: 'Arial'}}>Ventas</h2></center>
        <button onClick={handleAgregarVenta}>Agregar Venta</button><br/>
        <table>
          <thead>
            <tr>
              <th style={{fontFamily: 'Arial'}}>Usuario</th>
              <th style={{fontFamily: 'Arial'}}>Producto</th>
              <th style={{fontFamily: 'Arial'}}>Precio</th>
              <th style={{fontFamily: 'Arial'}}>Cantidad</th>
              <th style={{fontFamily: 'Arial'}}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map(venta => (
              <tr key={venta.id}>
                <td>{venta.usuario}</td>
                <td>{venta.producto}</td>
                <td>{venta.precio}</td>
                <td>{venta.cantidad}</td>
                <td>
                  <button onClick={() => handleEditarVenta(venta)}>Editar</button><br />
                  <button onClick={() => handleEliminarVenta(venta.id)}>Eliminar</button><br />
                  <button onClick={() => exportarAPDF(venta.id, venta)}>Exportar a PDF</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table><br />
        {modalOpen && ventaSeleccionada && (
          <EditarVenta
            venta={ventaSeleccionada}
            closeModal={handleCloseModal}
            updateVenta={handleUpdateVenta}
          />
        )}
        {modalOpen && !ventaSeleccionada && (
          <NuevaVenta
            closeModal={handleCloseModal}
            updateVentas={handleNuevaVenta}
          />
        )}

        <center><button type='submit'><Link to='/home' style={{textDecoration: 'none', color: 'white'}}>Ir a inicio</Link></button></center>
      </div>
    </div>
  );
};

export default Ventas;
