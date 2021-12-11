import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import "./../style/Box.css"

function ListaTorneos() {

    const history = useHistory();

    const [lista, setLista] = useState([]);
    const [cargando, setcargando] = useState(false);
    const token = useSelector(state => state.login.token);
    const idUsuario = useSelector(state => state.id);

    useEffect(() => {
        obtenerListaTorneos();

    }, [])
    useEffect(() => {
        if (token === null) {
            console.log(token);
            history.push('/login');
        } else {
            // obtenerPermisos(token)
            console.log(idUsuario);
        }
    })
    const obtenerListaTorneos = () => {
        setcargando(true);
        const urlListaTorneo = "http://127.0.0.1:8000/api/torneo";

        axios.get(urlListaTorneo, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(response => {
                setLista(response.data);
                setcargando(false);
            });
    }
    return (<div>
        {cargando === true && <h1>Cargando..</h1>}
        {cargando === false &&
            <div className='wrapper'>
                {lista.map(item =>
                    <div className='album'>
                        <p>{item.nombre}</p>
                        <p>{item.nombreJuego}</p>
                        <p>{item.fechaInicio}</p>
                        <p>{item.fecahFin}</p>
                        <p>{item.estado}</p>
                        <p>{item.puntuacionVictoria}</p>
                        <p>{item.puntuacionDerrota}</p>
                        <p>{item.puntuacionEmpate}</p>
                        <p>{item.creador_id}</p>
                        <p>{item.modalidad}</p>
                        {item.estado === "Registro Abierto" &&
                            <button type='button' className='btn btn-success'>Registrarse</button>
                        }
                    </div>
                )}
            </div>}
    </div>
    )
}

export default ListaTorneos
