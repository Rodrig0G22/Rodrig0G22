import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Categorias from './vistas/vista_categorias';
import Favoritos from './vistas/vista_favoritos';
import Contactos from './vistas/vista_contactos';
import Acercade from './vistas/vista_acercade';
import InicioSesion from './vistas/InicioSesion';
import Registro from './vistas/Registro';
import Layout from './vistas/Layout';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firebaseApp } from './firebase';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    // Limpieza del efecto
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className='body'>
        <div className='header'>
          <h1>HerbOPedia</h1>
          <Routes>
            {/* Cambiado el path para redirigir a la vista principal directamente */}
            <Route path="/" element={<Layout user={user} />} />
            <Route path="/Categorias" element={<Categorias />} />
            <Route path="/Favoritos" element={<Favoritos />} />
            <Route path="/Contactos" element={<Contactos />} />
            <Route path="/Acercade" element={<Acercade />} />
            <Route path="/IniciodeSesion" element={<InicioSesion />} />
            <Route path="/Registro" element={<Registro />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
