import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { guardarPermisos, sesionIniciada } from '../redux/loginSlice';
import './../style/Register.css';

function Registrarse (){
    const dispatch = useDispatch();
    const history = useHistory();

    const token = useSelector(state => state.login.token);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    
    const registrar = () =>{
        const params = {
            name,
            email,
            password
        }

        var loginUrl = "http://127.0.0.1:8000/api/register";
        axios.post(loginUrl, params, {
            before: (xhr) => {
                console.log("cargando");
            }
        })
        .then(response => {
            history.push('/login');
        
        }).catch(error => {
            console.log(error);
        });
    }
    
    return (
        <div>
            <div class="form">
                <div class="title">Registrarse Usuario</div>
                <div class="subtitle">Crearse una cuenta!</div>
                <div class="input-container ic1">
                    <input id="nombre" class="input" type="text" placeholder="nombre" onChange={(e) => {
                            setName(e.target.value)}} />
                    <div class="cut"></div>
                    <label for="nombre" class="placeholder">Nombre</label>
                </div>
                <div class="input-container ic2">
                    <input id="email" class="input" type="text" placeholder="email" onChange={(e) => {
                            setEmail(e.target.value)}}/>
                    <div class="cut"></div>
                    <label for="email" class="placeholder">Email</label>
                </div>
                <div class="input-container ic2">
                    <input id="password" class="input" type="text" placeholder="password" onChange={(e) => {
                            setPassword(e.target.value)}}/>
                    <div class="cut cut-short"></div>
                    <label for="password" class="placeholder">Password</label>
                </div>
                <button type="text" class="button" onClick={registrar}>Guardar</button>
            </div>
        </div>
    );
}


export default Registrarse;
