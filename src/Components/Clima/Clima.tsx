import axios from "axios";
import style from "./Clima.module.css";
import { useEffect, useState } from "react";
import type { DadosClima } from "../../Models/Clima.model";
import type { Coordenadas } from "../../Models/Coordenadas.model";
import { ClimaDetalhado } from "../Dialog/ClimaDetalhado";

export function Clima({ latitude, longitude }: Coordenadas) {
    const [dadosClima, sepadosClima] = useState<DadosClima | null>(null);
    const [dialog, setDialog] = useState<boolean>(false);

    async function getClima() {
        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,is_day,wind_speed_10m,weather_code&hourly=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation_probability,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_probability_max,sunrise,sunset&timezone=America%2FSao_Paulo`;

        try {
            const response = await axios.get<DadosClima>(apiUrl);

            sepadosClima(response.data);
        }   
        catch(error) {
            console.error("Erro ao buscar dados do clima: ", error);
        }
    }

    // Função de trocar ícone do clima
    function getIconeClima(code: number) {
        switch (code) {
            case 0: 
                return (
                    <div className={style.iconeTemperatura}>
                        <p style={{ fontSize: '15px' }}>☀️ {dadosClima?.current.temperature_2m}°C</p>
                        <p>Ensolarado</p>
                    </div>
                );
            case 1:
            case 2:
                return (
                    <div className={style.iconeTemperatura}>
                        <p style={{ fontSize: '15px' }}>⛅ {dadosClima?.current.temperature_2m}°C</p>
                        <p>Parcialmente nublado</p>
                    </div>
                );
            case 3:
                return (
                    <div className={style.iconeTemperatura}>
                        <p style={{ fontSize: '15px' }}>☁️ {dadosClima?.current.temperature_2m}°C</p>
                        <p>Nublado</p>
                    </div>
                );
            case 45:
            case 48:
                return (
                    <div className={style.iconeTemperatura}>
                        <p style={{ fontSize: '15px' }}>🌫️ {dadosClima?.current.temperature_2m}°C</p>
                        <p>Nevoeiro</p>
                    </div>
                );
            case 51:
            case 53:
            case 55:
                return (
                    <div className={style.iconeTemperatura}>
                        <p style={{ fontSize: '15px' }}>🌧️ {dadosClima?.current.temperature_2m}°C</p>
                        <p>Chuva fraca</p>
                    </div>
                );
            case 61:
            case 63:
            case 65:
                return (
                    <div className={style.iconeTemperatura}>
                        <p style={{ fontSize: '15px' }}>🌦️ {dadosClima?.current.temperature_2m}°C</p>
                        <p>Chuva</p>
                    </div>
                );
            case 80:
            case 81:
            case 82:
                return (
                    <div className={style.iconeTemperatura}>
                        <p style={{ fontSize: '15px' }}>🌧️ {dadosClima?.current.temperature_2m}°C</p>
                        <p>Pancadas de chuva</p>
                    </div>
                );
            default:
                return `Código: ${code}`;
        }
    }

    useEffect(() => {
        getClima();
    }, [latitude, longitude]);

    if (!dadosClima) {
        return <p>Carregando dados do clima...</p>;
    }

    return (
        <section>
            <div className={style.informacoesIniciais}>
                <h3 className={style.coordenadas}>{dadosClima.latitude.toPrecision(4)}</h3>
                <h3 className={style.coordenadas}>{dadosClima.longitude.toPrecision(4)}</h3>
                <p style={{ display: 'flex', fontSize: '15px' }}>{getIconeClima(dadosClima.current.weather_code)}</p>
            </div>
            <div className={style.dadosClimaticos}>
                <p>Elevação: {dadosClima.elevation}m</p>
                <p>Sensação térmica: {dadosClima.current.apparent_temperature}°C</p>
                <p>Umidade: {dadosClima.current.relative_humidity_2m}%</p>
                <p>Tempo atual: {dadosClima.current.is_day ? "Dia" : "Noite"}</p>
                <p>Velocidade do vento: {dadosClima.current.wind_speed_10m}km/h</p>
                <div className={style.containerBotao}>
                    <button className={style.botao} type="button" onClick={() => setDialog(true)}>Ver mais informações</button>
                </div>
            </div>
            <ClimaDetalhado latitude={dadosClima.latitude} longitude={dadosClima.longitude} open={dialog} close={() => setDialog(false)} />
                    
                        
                        

            {/* <h2>Dados de clima</h2>
                    
                        <p>Data/hora</p>
                        <p>Temperatura</p>
                    
                    {dadosClima.hourly.time.map((time, index) => (
                        <div key={time}>
                            <p>{time}</p>
                            <p>{dadosClima.hourly.temperature_2m[index]}</p>
                        </div>
                    ))} */}
        </section>
    );
}