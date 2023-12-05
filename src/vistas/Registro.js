import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { firebaseApp } from '../firebase'; // Importa la inicialización de Firebase

function Registro() {
  const [usuario, setUsuario] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const [registroError, setRegistroError] = useState(null);

  const handleRegistro = async () => {
    const auth = getAuth(firebaseApp); // Obtén la instancia de autenticación
    const db = getFirestore(firebaseApp); // Obtén la instancia de Firestore

    try {
      // Registrar al usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, correo, contrasena);
      const user = userCredential.user;

      // Agregar el usuario a Firestore
      const usuariosCollection = collection(db, 'Usuarios');
      const nuevoUsuario = {
        usuario,
        nombre,
        correo,
        contrasena,
        apellido,
      };

      const docRef = await addDoc(usuariosCollection, nuevoUsuario);
      console.log('Usuario agregado con ID: ', docRef.id);

      // Registro exitoso
      setRegistroExitoso(true);
      setRegistroError(null);

      // Limpiar los campos
      setUsuario('');
      setNombre('');
      setApellido('');
      setCorreo('');
      setContrasena('');
    } catch (error) {
      console.error('Error al registrar usuario: ', error);

      // Registro fallido, muestra un mensaje de error
      setRegistroError('Error al registrar usuario. Por favor, inténtalo de nuevo.');
      setRegistroExitoso(false);
    }
  }

  return (
    <div className='vista_registro container'>
      <h1>Regístrate</h1>
      {registroExitoso && <div className="registro-exitoso">¡Registro exitoso!</div>}
      {registroError && <div className="registro-error">{registroError}</div>}
      <form>
        <input type="text" placeholder="Nombre de usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} className="form-input" />
        <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} className="form-input" />
        <input type="text" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} className="form-input" />
        <input type="email" placeholder="Correo electrónico" value={correo} onChange={(e) => setCorreo(e.target.value)} className="form-input" />
        <input type="password" placeholder="Contraseña" value={contrasena} onChange={(e) => setContrasena(e.target.value)} className="form-input" />
        <button type="button" onClick={handleRegistro} className="submit-button">Registrarse</button>
      </form>
    </div>
  );
}

export default Registro;
