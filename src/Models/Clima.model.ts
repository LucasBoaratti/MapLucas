export interface DadosClima {
    latitude: number;
    longitude: number;
    elevation: number;
    
    current: {
        time: string;
        interval: number;
        temperature_2m: number;
        apparent_temperature: number;
        relative_humidity_2m: number;
        is_day: number;
        wind_speed_10m: number;
        weather_code: number;
    };

    hourly: {
        time: string[];
        temperature_2m: number[];
        apparent_temperature: number[];
        relative_humidity_2m: number[];
        precipitation_probability: number[];
        precipitation: number[];
        weather_code: number[];
        wind_speed_10m: number[];
    };

    daily: {
        time: string[];
        weather_code: number[];
        temperature_2m_max: number[];
        temperature_2m_min: number[];
        uv_index_max: number[];
        precipitation_probability_max: number[];
        sunrise: string[];
        sunset: string[];
    };
}