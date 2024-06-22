import React, { useState } from 'react';

const EditarMarca = ({ marca, onUpdateMarca, redirectToMarcas, onCloseModal }) => {
  const [nombre, setNombre] = useState(marca.nombre);
  const [estado, setEstado] = useState(marca.estado);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const marcaActualizada = { nombre, estado };
    await onUpdateMarca(marca.id, marcaActualizada, redirectToMarcas);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <center><h2>Editar Marca</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} /><br/><br/>
          <label htmlFor="estado">Estado:</label>
          <input type="text" id="estado" value={estado} onChange={(e) => setEstado(e.target.value)} /><br/><br />
          <button type="submit">Actualizar Marca</button><br />
          <button type="button" onClick={onCloseModal}>Cancelar</button> {/* Botón para cerrar el modal */}
        </form></center>
      </div>
    </div>
  );
};

export default EditarMarca;
