import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router';
import { guardarPermisos, sesionCerrada } from '../redux/loginSlice';
import { usuarioTienePermisos } from '../utils/roleUtils';

import "./../style/Home.css";

function Home() {
    const token = useSelector(state => state.login.token)
    const permisos = useSelector(state => state.login.permisos);

    const [permisoCrearTorneo, SetCrearTorneo] = useState(false);
    const [permisoInsertarPersona, setPermisoInsertarPersona] = useState(false);
    

    const history = useHistory();
    const dispatch = useDispatch();


    useEffect(() => {
        if (token === null) {
            console.log(token);
            history.push('/login');
        } else {
           // obtenerPermisos(token)
        }
    })
    useEffect(() => {
        if (!permisos) {
            return;
        }
        if (permisos.length === 0) {
            return;
        }
        SetCrearTorneo(usuarioTienePermisos("crear Torneo", permisos));
        setPermisoInsertarPersona(usuarioTienePermisos("mostrar usuarios", permisos));

    }, [permisos])



    const crearTorneo = () =>{
        history.push('/crearTorneo');
    }

    return (
        <div className='content-body'>
            <div className='body'>
                <div id='title'>
                    <h2><b>¿Preparado para simplificar la administración de torneos? </b></h2>
                    <p>Únete a las millones de personas que confían en Challonge para administrar sus torneos. Más de 28,135,362 llaves creadas.</p>
                </div>
                <div id='article'>
                    {(permisoCrearTorneo) ?
                        <div className='content-btn'>
                            <a type="button" class="btn btn-warning" onClick={crearTorneo}>Crear Torneo</a>
                        </div> : ""}

                    <img class="img" src="https://assets.challonge.com/assets/bracket-tree-8ce099d29904dd717b6707ff62fcdccfe3510956862e0a1b6d49265b02482a90.png" alt="Bracket tree"></img>
                </div>
            </div>
        </div>
    )
}

export default Home
