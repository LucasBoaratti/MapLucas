import axios from "axios";
import { useEffect, useState } from "react";
import type { DadosClima } from "../../Models/Clima.model";

export function Clima() {
    const [dadosClima, setDadosClima] = useState<DadosClima | null>(null);
    const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=-23.514938&longitude=-46.610504&current=temperature_2m,apparent_temperature,relative_humidity_2m,is_day,wind_speed_10m,weather_code&hourly=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation_probability,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_probability_max,sunrise,sunset&timezone=America%2FSao_Paulo";

    async function getClima() {
        try {
            const response = await axios.get<DadosClima>(apiUrl);

            setDadosClima(response.data);
        }   
        catch(error) {
            console.error("Erro ao buscar dados do clima: ", error);
        }
    }

    // Funções de configurações do clima

    // Função de trocar ícone do clima
    function getWeatherIcon(code: number) {
        switch (code) {
            case 0: 
                return "☀️ Céu limpo";
            case 1:
            case 2:
            case 3:
                return "⛅ Parcialmente nublado/Nublado";
            case 45:
            case 48:
                return "🌫️ Névoa";
            case 51:
            case 53:
            case 55:
                return "🌧️ Garoa";
            case 61:
            case 63:
            case 65:
                return "🌧️ Chuva";
            case 80:
            case 81:
            case 82:
                return "🌦️ Pancadas de chuva";
            default:
                return `Código: ${code}`;
        }
    }

    useEffect(() => {
        getClima();
    }, []);

    if (!dadosClima) {
        return <p>Carregando dados do clima...</p>;
    }

    return (
        <>
            <h1>Divisão atual (temporário)</h1>

            <h2>Dados individuais</h2>
            <table>
                <thead>
                    <tr>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>Elevação</th>
                        <th>Temperatura atual</th>
                        <th>Sensação térmica</th>
                        <th>Umidade</th>
                        <th>Tempo atual</th>
                        <th>Velocidade do vento</th>
                        <th>Ícone</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{dadosClima.latitude.toPrecision(8)}</td>
                        <td>{dadosClima.longitude.toPrecision(8)}</td>
                        <td>{dadosClima.elevation}m</td>
                        <td>{dadosClima.current.temperature_2m}°C</td>
                        <td>{dadosClima.current.apparent_temperature}°C</td>
                        <td>{dadosClima.current.relative_humidity_2m}%</td>
                        <td>{dadosClima.current.is_day ? "Dia" : "Noite"}</td>
                        <td>{dadosClima.current.wind_speed_10m}km/h</td>
                        <td>{getWeatherIcon(dadosClima.current.weather_code)}</td>
                    </tr>
                </tbody>
            </table>

            <h2>Dados de clima</h2>
            <table>
                <thead>
                    <tr>
                        <th>Data/hora</th>
                        <th>Temperatura</th>
                    </tr>
                </thead>
                <tbody>
                    {dadosClima.hourly.time.map((time, index) => (
                        <tr key={time}>
                            <td>{time}</td>
                            <td>{dadosClima.hourly.temperature_2m[index]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}