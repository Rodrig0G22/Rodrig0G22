import React from 'react';

function VistaContactos() {
  return (
    <div className='vista_contactos'>
      <h1 className="contact-title">¡Contáctanos!</h1>
      <div className="contact-info">
        <p className="contact-text">¿Tienes preguntas, sugerencias o solo quieres saludar? ¡Estamos aquí para ayudarte!</p>

        <div className="contact-details">
          <p className="detail"><strong>Teléfono:</strong> +52 771 179 7429</p>
          <p className="detail"><strong>Correo Electrónico:</strong> <a href="mailto:19301509@uttt.edu.mx">19301509@uttt.edu.mx</a></p>
        </div>

        <div className="social-media">
          <p className="social-title"><strong>Redes Sociales:</strong></p>
          <ul className="social-list">
            <li><a href="https://twitter.com/HerbOPediaOfficial" target="_blank" rel="noopener noreferrer" className="social-link">Twitter</a></li>
            <li><a href="https://www.facebook.com/HerbOPedia" target="_blank" rel="noopener noreferrer" className="social-link">Facebook</a></li>
          </ul>
        </div>

        <div className="address">
          <p className="address-title"><strong>Dirección:</strong></p>
          <p>HerbOPedia HQ</p>
          <p>Calle de las Plantas, #123</p>
          <p>Ciudad Botánica, C.P. 12345</p>
          <p>País Verde</p>
        </div>

        <p className="opening-hours"><strong>Horario de Atención:</strong> Lunes a Viernes, 9:00 AM - 6:00 PM (Hora Botánica)</p>
      </div>
    </div>
  );
}

export default VistaContactos;
