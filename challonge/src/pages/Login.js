import Button from "@restart/ui/esm/Button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { guardarPermisos, guardarUsuario, sesionIniciada } from '../redux/loginSlice';

import "./../style/Login.css";

function Login() {
    const dispatch = useDispatch();
    const history = useHistory();

    const token = useSelector(state => state.login.token)
    const idUsuario = useSelector(state => state.login.token)

    useEffect(()=>{
        if(token !== null){
            console.log(token);
            history.push('/');
        }
    })

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        if(email.length > 0 && password.length > 0){
            return true;
        }
        return false;
    }

    const loguer = () => {

        //event.preventDefault();
        const params = {
            email,
            password
        }

        var loginUrl = "http://127.0.0.1:8000/api/login";
        axios.post(loginUrl, params)
        .then(response => {

            console.log(response.data);
            const token = response.data.access_token;
            dispatch(sesionIniciada(token))
            obtenerPermisos(token);
        
        }).catch(error => {

            console.log(error);
        });
    }

    const obtenerPermisos = (token) => {
        const url = 'http://127.0.0.1:8000/api/user';
        axios.get(url, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(response => {

                const roles = response.data.roles;
                let permisos = [];
                roles.forEach(rol => {
                    const permissions = rol.permissions.map(item => {
                        return {
                            id: item.id,
                            name: item.name
                        }
                    });
                    permissions.forEach(permiso => {
                        if(!permisos.includes(permiso)){
                            permisos.push(permiso);
                        }
                    });
                });
                dispatch(guardarPermisos(permisos))

                history.push('/');
            }).catch(error => {
                console.log(error);
            });
    }

    return (
        <div className="Login">
            <Form className="formLogin">
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button block size="lg" type="button" disabled={!validateForm()} onClick={loguer}>
                    Login
                </Button>
            </Form>
        </div>
    );
}
export default Login;