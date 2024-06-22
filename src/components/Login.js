import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './Login.css'; 

function Login() {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    window.location.href = '/home'; // Redirige inmediatamente después de hacer clic en el botón

    // Mantén la lógica del fetch para enviar las credenciales al servidor
    try {
      const response = await fetch('http://localhost:8000/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo: correo,
          contraseña: contraseña,
        }),
      });
      if (response.ok) {
        // La redirección ya ha ocurrido, así que no se necesita hacer nada aquí
      } else {
        console.error('Credenciales inválidas');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div className="login">
      <h2>¡Bienvenido Admin!</h2>
      <div className="container mt-3">
        <div className="card">
          <div className="card-header">
            <h3>Ingresa Tus Credenciales:</h3>
          </div><br/><br/>
          <form className="was-validated" onSubmit={handleSubmit}>
            <div className="mb-3 mt-3">
              <label htmlFor="correo" className="form-label">Correo: </label>
              <input 
                type="email" 
                className="form-control" 
                id="correo" 
                placeholder="Ingrese Su Correo" 
                value={correo} 
                onChange={(e) => setCorreo(e.target.value)} 
                required 
              />
            </div><br/>
            <div className="mb-3">
              <label htmlFor="contraseña" className="form-label">Contraseña: </label>
              <input 
                type="password" 
                className="form-control" 
                id="contraseña" 
                placeholder="Ingrese Su Contraseña" 
                value={contraseña} 
                onChange={(e) => setContraseña(e.target.value)} 
                required 
              /><br/>
            </div>
            <div className="text-center">
              <center><button type="submit" className="btn btn-primary">Iniciar Sesión</button></center>
              <br/>
              <Link to="/registro" className="link" style={{ textDecoration: 'none', color: 'blue' }}>¿No tienes una cuenta?</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
