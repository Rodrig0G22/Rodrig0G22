import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseApp } from '../firebase';

function InicioSesion() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [inicioSesionError, setInicioSesionError] = useState(null);
  const navigate = useNavigate();

  const handleInicioSesion = async () => {
    const auth = getAuth(firebaseApp);

    try {
      await signInWithEmailAndPassword(auth, correo, contrasena);
      navigate('/'); // Redirige al usuario a la página principal después del inicio de sesión exitoso
    } catch (error) {
      console.error('Error al iniciar sesión: ', error);
      setInicioSesionError('Error al iniciar sesión. Por favor, verifica tus credenciales.');
    }
  }

  return (
    <div className='vista_iniciosesion container'>
      <h1>Iniciar Sesión</h1>
      {inicioSesionError && <div className="inicio-sesion-error">{inicioSesionError}</div>}
      <form>
        <div className="form-group">
          <label htmlFor="correo">Correo Electrónico</label>
          <input
            type="email"
            id="correo"
            placeholder="Tu correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="contrasena">Contraseña</label>
          <input
            type="password"
            id="contrasena"
            placeholder="Tu contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            className="form-input"
          />
        </div>
        <button type="button" onClick={handleInicioSesion} className="submit-button">Iniciar Sesión</button>
      </form>
      <p>¿No tienes una cuenta? <Link to="/Registro" className="link-button">Registrarse</Link></p>
    </div>
  );
}

export default InicioSesion;
  