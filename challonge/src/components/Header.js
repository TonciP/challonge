import React, { useEffect, useState } from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { guardarPermisos, sesionCerrada, sesionIniciada } from '../redux/loginSlice';
import { useHistory } from 'react-router';
import { usuarioTienePermisos } from '../utils/roleUtils';
import axios from 'axios';

import "./../style/Header.css";

const Header = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const permisos = useSelector(state => state.login.permisos);
    const token = useSelector(state => state.login.token);
    const [permisoCrearTorneo, SetCrearTorneo] = useState(false);
    const [mostrarTorneos, setMostraTorneos] = useState(false);
    useEffect(() => {
        if (!token) {
            history.push('/login');
        }
    }, [token])
    useEffect(() => {
        if (!permisos) {
            return;
        }
        if (permisos.length === 0) {
            return;
        }
        SetCrearTorneo(usuarioTienePermisos("crear Torneo", permisos));
        setMostraTorneos(usuarioTienePermisos("mostrar torneos", permisos));

    }, [permisos])
    const cerrarSesion = () => {
        dispatch(sesionCerrada());
    }

    const Invitado = () => {
        const email = 'invitado@invitado.com';
        const password = "invitado!123";

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
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand  ><a class="brand-image logo" href="/" ></a></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {token &&
                        <Nav className="me-auto">
                            {(mostrarTorneos) ? <Link className="nav-link" to="/listTorneos">Torneos</Link> :""}
                            <Link className="nav-link" to="/">Eventos</Link>
                            {(permisoCrearTorneo) ? <NavDropdown title="Torneo" id="basic-nav-dropdown">
                                <Link className="dropdown-item" to="/crearTorneo">Crear Torneo</Link>
                            </NavDropdown> : ""}
                        </Nav>}
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    {token &&

                        <button type="button" class="btn btn-danger" onClick={cerrarSesion}>Cerrar sesión</button>
                    }
                    {!token && <Nav className="me-auto">
                        <Link className="nav-link" to="/registrarse">Registrarse</Link>
                        <Link className="nav-link" to="/login">Iniciar sesión</Link>
                        <button type="button" class="btn btn-success" onClick={Invitado}>Invitado</button>
                    </Nav>}
                </Navbar.Collapse>
            </Container>
        </Navbar>


    );
}

export default Header;