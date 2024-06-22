import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../pages/Categorías.css';

const EditarPerfil = () => {
  const [usuario, setUsuario] = useState({
    nombre: '',
    foto: '',
    correo: '',
    contraseña: '',
  });
  const [newFoto, setNewFoto] = useState(null);

  useEffect(() => {
    // Obtén los datos del usuario desde el servidor al cargar el componente
    const obtenerUsuario = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/usuario/actual');
        setUsuario(response.data);
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    obtenerUsuario();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUsuario({
      ...usuario,
      [name]: value,
    });
  };

  const handleFotoChange = (e) => {
    setNewFoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nombre', usuario.nombre);
    formData.append('correo', usuario.correo);
    formData.append('contraseña', usuario.contraseña);
    if (newFoto) {
      formData.append('foto', newFoto);
    }

    try {
      const response = await axios.put('http://localhost:8000/api/usuarios/actual', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUsuario(response.data);
      alert('Perfil actualizado exitosamente');
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
    }
  };

  return (
    <div className="perfil">
      <div className="perfil-formulario">
        <center><h2>Editar Perfil</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={usuario.nombre}
              onChange={handleInputChange}
            />
          </div><br />
          <div>
            <label>Correo:</label>
            <input
              type="email"
              name="correo"
              value={usuario.correo}
              onChange={handleInputChange}
            />
          </div><br />
          <div>
            <label>Contraseña:</label>
            <input
              type="password"
              name="contraseña"
              value={usuario.contraseña}
              onChange={handleInputChange}
            />
          </div><br />
          <div>
            <label>Foto de Perfil:</label>
            <input type="file" onChange={handleFotoChange} />
          </div><br />
          <button type="submit">Actualizar Perfil</button>
        </form></center>
      </div>
    </div>
  );
};

export default EditarPerfil;
