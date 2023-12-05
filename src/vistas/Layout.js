// Layout.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PlantCard from '../components/PlantCard';
import { getAuth, signOut } from 'firebase/auth';
import { firebaseApp } from '../firebase';
import { collection, getDocs, getFirestore, doc, updateDoc } from 'firebase/firestore';

const Layout = ({ user }) => {
  const navigate = useNavigate();
  const [logoutError, setLogoutError] = useState(null);
  const [plantas, setPlantas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null);

  const handleCerrarSesion = () => {
    const auth = getAuth(firebaseApp);

    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Error al cerrar sesión: ', error);
        setLogoutError('Error al cerrar sesión. Por favor, inténtalo de nuevo.');
      });
  };

  const getPlantas = async () => {
    try {
      const db = getFirestore(firebaseApp);
      const plantasCollection = collection(db, 'Plantas');
      const plantasSnapshot = await getDocs(plantasCollection);
      const plantasData = plantasSnapshot.docs.map((doc) => {
        const data = doc.data();
        return { ...data, id: doc.id, esFavorita: data.favorita && user };
      });
      setPlantas(plantasData);
    } catch (error) {
      console.error('Error al obtener las plantas: ', error);
    }
  };

  const showNotification = (message) => {
    setNotification(message);

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const addToFavorites = async (plantaId) => {
    if (!user) {
      navigate('/IniciodeSesion');
      return;
    }

    try {
      const db = getFirestore(firebaseApp);
      const plantasCollection = collection(db, 'Plantas');
      const plantaRef = doc(plantasCollection, plantaId);

      await updateDoc(plantaRef, { favorita: true });
      getPlantas();
      showNotification('Planta agregada a favoritos');
    } catch (error) {
      console.error('Error al agregar a Favoritos: ', error);
    }
  };

  const removeFromFavorites = async (plantaId) => {
    try {
      const db = getFirestore(firebaseApp);
      const plantasCollection = collection(db, 'Plantas');
      const plantaRef = doc(plantasCollection, plantaId);

      await updateDoc(plantaRef, { favorita: false });
      getPlantas();
      showNotification('Planta eliminada de favoritos');
    } catch (error) {
      console.error('Error al quitar de Favoritos: ', error);
    }
  };

  useEffect(() => {
    getPlantas();
  }, []);

  const filteredPlantas = plantas.filter((planta) =>
    planta.Nombre && planta.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="nav-buttons-container">
        <Link to="/Categorias" className="nav-button">
          Categorías
        </Link>
        <Link to="/Favoritos" className="nav-button">
          Favoritos
        </Link>
        <Link to="/Contactos" className="nav-button">
          Contactos
        </Link>
        <Link to="/Acercade" className="nav-button">
          Acerca de
        </Link>
      </div>

      <div>
        {user ? (
          <div>
            <p>Bienvenido, {user.displayName || user.email}</p>
            <button onClick={handleCerrarSesion}>Cerrar Sesión</button>
          </div>
        ) : (
          <Link to="/IniciodeSesion" className="nav-button">
            Iniciar Sesión
          </Link>
        )}
      </div>

      <hr />
      <nav>
        <ul>{/* Resto del código del menú de navegación */}</ul>
      </nav>

      <div>
        <input
          className="search-input"
          type="text"
          placeholder="Buscar planta por nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Mostrar notificación */}
      {notification && <div className="notification">{notification}</div>}

      <div className="plant-cards">
        {filteredPlantas.map((planta, index) => (
          <PlantCard
            key={index}
            name={planta.Nombre}
            description={planta.Descripcion}
            imageSrc={planta.ImagenURL}
            addToFavorites={() => addToFavorites(planta.id)}
            removeFromFavorites={() => removeFromFavorites(planta.id)}
            esFavorita={planta.esFavorita}
          />
        ))}
      </div>

      {/* Pie de página */}
      <div className="footer">
        <p>Desarrollado por: Rodrigo Garcia Perez</p>
        <p>{new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default Layout;
