import Map from 'react-map-gl/mapbox';
import { useState } from 'react';

function App() {
  const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

  const [viewState, setViewState] = useState({
    latitude: -23.555872,
    longitude: -46.639587,
    zoom: 15,
    // pitch: 60, -> ative, caso queira deixar em 3D
  });

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
        mapboxAccessToken={MAPBOX_TOKEN}
        terrain={{ source: 'mapbox-dem', exaggeration: 1.5 }}
      />
    </div>
  );  
}

export default App;
