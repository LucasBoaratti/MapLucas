import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Coordenadas } from "../../Models/Coordenadas.model";
import type { DadosClima } from "../../Models/Clima.model";
import axios from "axios";
import style from "./ClimaDetalhado.module.css";

interface ClimaDetalhadoProps extends Coordenadas {
    open: boolean;
    close: () => void;
}

export function ClimaDetalhado({ open, close, latitude, longitude }: ClimaDetalhadoProps) {
    const dialogRef = useRef<HTMLDialogElement | null>(null);
    const [dadosClima, setDadosClima] = useState<DadosClima | null>(null);

    function openModal() {
        const dialog = dialogRef.current;
        if (!dialog) return null;

        if (open) {
            dialog.showModal();
        }
        else {
            dialog.close();
        }
    }

    async function getClima() {
        if (!open) return;

        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,is_day,wind_speed_10m,weather_code&hourly=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation_probability,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_probability_max,sunrise,sunset&timezone=America%2FSao_Paulo`;

        try {
            const response = await axios.get<DadosClima>(apiUrl);

            setDadosClima(response.data);
        }   
        catch(error) {
            console.error("Erro ao buscar dados do clima: ", error);
        }
    }

    useEffect(() => {
        getClima();
    }, [open, latitude, longitude]);

    useEffect(() => {
        openModal();
    }, [open]);

    return createPortal(
        <dialog
            ref={dialogRef}
            onClose={close}
            className={style.containerDialog}
            onClick={close}
        >
            <section
                onClick={(e) => e.stopPropagation()}
            >
                <p>Em andamento...</p>
            </section>
        </dialog>,
        document.body
    );
}