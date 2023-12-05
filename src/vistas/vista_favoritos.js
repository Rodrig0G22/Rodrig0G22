// vista_favoritos.js
import React, { useEffect, useState } from 'react';
import PlantCard from '../components/PlantCard';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { firebaseApp } from '../firebase';

function VistaFavoritos() {
  const [favoritas, setFavoritas] = useState([]);

  const getFavoritas = async () => {
    try {
      const db = getFirestore(firebaseApp);
      const plantasCollection = collection(db, 'Plantas');
      const plantasSnapshot = await getDocs(plantasCollection);
      const favoritasData = plantasSnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter((planta) => planta.favorita);

      setFavoritas(favoritasData);
    } catch (error) {
      console.error('Error al obtener las plantas favoritas: ', error);
    }
  };

  const removeFromFavorites = async (plantaId) => {
    try {
      const db = getFirestore(firebaseApp);
      const plantasCollection = collection(db, 'Plantas');
      const plantaRef = doc(plantasCollection, plantaId);

      // Quitar la marca de favorita para el usuario actual
      await updateDoc(plantaRef, { favorita: false });
      getFavoritas(); // Actualizar la lista de plantas después de la modificación
    } catch (error) {
      console.error('Error al quitar de Favoritos: ', error);
    }
  };

  useEffect(() => {
    getFavoritas();
  }, []);

  return (
    <div className='vista_favoritos'>
      <h1>Bienvenido a tus Favoritos</h1>
      <div className="plant-cards">
        {favoritas.map((planta, index) => (
          <PlantCard
            key={index}
            name={planta.Nombre}
            description={planta.Descripcion}
            imageSrc={planta.ImagenURL}
            onRemoveFavorite={() => removeFromFavorites(planta.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default VistaFavoritos;
