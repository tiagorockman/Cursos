import React from 'react';
import {Link} from 'react-router-dom'; // npm install -S react-router-dom --- yarn add @types/react-router-dom -D
import {FiPlus} from 'react-icons/fi';
import {Map} from 'react-leaflet'; //yarn add react-leaflet  ---- yarn add @types/react-leaflet -D

import mapMarkerImp from '../images/map-marker.svg';

import '../styles/pages/Orfanato-Map';

function OrphanagesMap(){
  return(
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImp} alt="Happy" title="Happy"/>

          <h2> Escolha uma orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>

        </header>
        <footer>
          <strong>Ribeirão das Neves</strong>
          <span>Minas Gerais</span>
        </footer>
      </aside>
      <div>
      <Link to="" className="create-orfanato">
        <FiPlus size={32} color="#fff"/>
      </Link>
      </div>
    </div>
  );
}

export default OrphanagesMap;