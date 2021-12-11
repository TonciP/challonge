import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function CrearTonero() {
    const dispatch = useDispatch();
    const history = useHistory();
    const token = useSelector(state => state.login.token);

    const [nombre, setNombre] = useState("");
    const [nombreJuego, setNombreJuego] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fecahFin, setFechaFin] = useState("");
    const [estado, setEstado] = useState("");
    const [puntuacionVictoria, setPuntuacionVictoria] = useState("");

    const [puntuacionDerrota, setPuntuacionDerrota] = useState("");
    const [puntuacionEmpate, setEmpate] = useState("");
    const [creador_id, setCreadorID] = useState("");
    const [modalidad, setModalidad] = useState("");

    useEffect(() => {
        if (token === null) {
            console.log(token);
            history.push('/login');
        } else {
           // obtenerPermisos(token)
        }
    })

    const registrar = () => {
        debugger;
        const params = {
            nombre,
            nombreJuego,
            fechaInicio,
            fecahFin,
            estado,
            puntuacionVictoria,
            puntuacionDerrota,
            puntuacionEmpate,
            creador_id,
            modalidad
        }

        var loginUrl = "http://127.0.0.1:8000/api/torneo";
        axios.post(loginUrl, params, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(response => {
                history.push('/');

            }).catch(error => {

                console.log(error);
            });
    }

    return (
        <div>
            <div class="form">
                <div class="title">Crear Torneo</div>
                <div class="subtitle">Llene los campos!!</div>
                <div class="input-container ic1">
                    <input id="nombre" class="input" type="text" placeholder="nombre" onChange={(e) => {
                        setNombre(e.target.value)
                    }} />
                    <div class="cut"></div>
                    <label for="nombre" class="placeholder">Nombre</label>
                </div>
                <div class="input-container ic2">
                    <input id="nombreJuego" class="input" type="text" placeholder="Nombre Juego" onChange={(e) => {
                        setNombreJuego(e.target.value)
                    }} />
                    <div class="cut"></div>
                    <label for="nombreJuego" class="placeholder">Nombre Juego</label>
                </div>
                <div class="input-container ic2">
                    <input id="fechaInicio" class="input" type="date" placeholder="Fecha Inicio" onChange={(e) => {
                        setFechaInicio(e.target.value)
                    }} />
                    <div class="cut cut-short"></div>
                    <label for="fechaInicio" class="placeholder">Fecha Inicio</label>
                </div>

                <div class="input-container ic2">
                    <input id="fecahFin" class="input" type="date" placeholder="Fecha Fin" onChange={(e) => {
                        setFechaFin(e.target.value)
                    }} />
                    <div class="cut cut-short"></div>
                    <label for="fecahFin" class="placeholder">Fecha Fin</label>
                </div>
                <div class="input-container ic2">
                    <select id="estado" className="form-select" value={estado} onChange={(e) => {
                        setEstado(e.currentTarget.value);
                    }}>
                        <option value="Creado">Creado</option>
                        <option value="Registro Abierto">Registro Abierto</option>
                        <option value="Iniciado">Iniciado</option>
                        <option value="Finalizado">Finalizado</option>
                    </select>
                    <div class="cut cut-short"></div>
                    <label for="estado" class="placeholder">Estado</label>
                </div>
                <div class="input-container ic2">
                    <input id="puntuacionVictoria" class="input" type="number" type="number" min="0" max="3" maxlength="1" placeholder="Puntuacion Victoria" onChange={(e) => {
                        setPuntuacionVictoria(e.target.value)
                    }} />
                    <div class="cut cut-short"></div>
                    <label for="puntuacionVictoria" class="placeholder">Puntuacion Victoria </label>
                </div>
                <div class="input-container ic2">
                    <input id="puntuacionDerrota" class="input" type="number" min="0" max="3" maxlength="1" placeholder="Puntuacion Derrota" onChange={(e) => {
                        setPuntuacionDerrota(e.target.value)
                    }} />
                    <div class="cut cut-short"></div>
                    <label for="puntuacionDerrota" class="placeholder">Puntuacion Derrota</label>
                </div>
                <div class="input-container ic2">
                    <input id="puntuacionEmpate" class="input" type="number" min="0" max="3" maxlength="1" placeholder="Puntuacion Empate" onChange={(e) => {
                        setEmpate(e.target.value)
                    }} />
                    <div class="cut cut-short"></div>
                    <label for="puntuacionEmpate" class="placeholder">Puntuacion Empate</label>
                </div>
                <div class="input-container ic2">
                    <input id="creador_id" class="input" type="number" placeholder="Creador ID" onChange={(e) => {
                        setCreadorID(e.target.value)
                    }} />
                    <div class="cut cut-short"></div>
                    <label for="creador_id" class="placeholder">Creado ID</label>
                </div>
                <div class="input-container ic2">
                    <select id='modalidad' className="form-select" value={estado} onChange={(e) => {
                        setModalidad(e.currentTarget.value);
                    }}>
                        <option value="1">Rondas Suizas</option>
                        <option value="2">Eliminacion Simple</option>
                        <option value="3">Round Robin</option>
                    </select>
                    <div class="cut cut-short"></div>
                    <label for="modalidad" class="placeholder">Modalidad</label>
                </div>
                <button type="text" class="button" onClick={registrar}>Guardar</button>
            </div>
        </div >
    )
}

export default CrearTonero
