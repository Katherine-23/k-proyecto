import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Registro.css';
import axios from 'axios';

function Registro() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');

  async function registrarUsuario(event) {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente
    try {
      const response = await axios.post('http://localhost:8000/api/usuarios', {
        nombre,
        correo,
        contraseña,
        rol: 'usuario_regular' // Puedes cambiar esto según tus necesidades
      });
      console.log(response.data.message); // Imprime el mensaje de éxito
      
      // Mostrar una alerta de registro exitoso
      alert('Usuario registrado exitosamente');

      // Limpiar los campos del formulario después de un registro exitoso
      setNombre('');
      setCorreo('');
      setContraseña('');
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert('Hubo un error al registrar el usuario'); // Mostrar una alerta en caso de error
    }
  }

  return (
    <div className="login">
      <h2>Regístrate Para Continuar Si Eres Un Administrador Nuevo!</h2>
      <div className="container mt-3">
        <div className="card">
          <div className="card-header">
            <h3><p>Ingrese Sus Datos:</p></h3>
          </div><br/>
          <form className="was-validated" onSubmit={registrarUsuario}>
            <div className="mb-3 mt-3">
              <label htmlFor="nombre" className="form-label">Nombre: </label>
              <input 
                type="text" 
                className="form-control" 
                id="nombre" 
                placeholder="Ingrese Su Nombre" 
                value={nombre} 
                onChange={(e) => setNombre(e.target.value)} 
                required 
              /><br/><br/>
            </div>
            <div className="mb-3">
              <label htmlFor="correo" className="form-label">Correo: </label>
              <input 
                type="email" 
                className="form-control" 
                id="correo" 
                placeholder="Ingrese Su Correo" 
                value={correo} 
                onChange={(e) => setCorreo(e.target.value)} 
                required 
              /><br/><br/>
            </div>
            <div className="mb-3">
              <label htmlFor="contraseña" className="form-label">Contraseña: </label>
              <input 
                type="password" 
                className="form-control" 
                id="contraseña" 
                placeholder="Ingrese Su Contraseña" 
                value={contraseña} 
                onChange={(e) => setContraseña(e.target.value)} 
                minLength="8" // Longitud mínima de la contraseña
                required 
              /><br/>
            </div>
            <div className="text-center">
              <center><button type="submit" className="btn btn-primary">Registrarse</button></center>
              <br/>
              <Link to="/" className="link" style={{ textDecoration: 'none', color: 'blue' }}>¿Ya tienes una cuenta?</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registro;
