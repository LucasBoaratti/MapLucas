import { Map, Marker, Popup } from "react-map-gl/mapbox";
import { useState } from "react";
import { Clima } from "../Clima/Clima";
import type { Coordenadas } from "../../Models/Coordenadas.model";
import type { MapMouseEvent } from "react-map-gl/mapbox";
import style from "./Mapa.module.css";

export function Mapa() {
    const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

    const [viewState, setViewState] = useState({
        latitude: -23.555872,
        longitude: -46.639587,
        zoom: 15,
        pitch: 55, // -> ative, caso queira deixar em 3D
    });
    const [ponto, setPonto] = useState<Coordenadas | null>(null);

    function exibirInformacoes(evt: MapMouseEvent) {
        const { lat, lng } = evt.lngLat;

        setPonto({
            latitude: lat,
            longitude: lng,
        });
    }

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <Map
                {...viewState}
                onMove={evt => setViewState(evt.viewState)}
                onClick={exibirInformacoes}
                style={{ width: '100%', height: '100%' }}
                mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
                mapboxAccessToken={MAPBOX_TOKEN}
                terrain={{ source: 'mapbox-dem', exaggeration: 1.2 }}
            > 
                {ponto && (
                    <>
                        <Marker
                            latitude={ponto.latitude}
                            longitude={ponto.longitude}
                            color="red"
                        />

                        <Popup
                            latitude={ponto.latitude}
                            longitude={ponto.longitude}
                            onClose={() => setPonto(null)}
                            closeOnClick={false}
                        > 
                            <div className={style.dados}>
                                <Clima latitude={ponto.latitude} longitude={ponto.longitude} />
                            </div>
                        </Popup>
                    </>
                )}
            </Map>
        </div>
    );
}