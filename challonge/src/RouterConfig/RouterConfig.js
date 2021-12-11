import React from 'react'
import { Route, Switch } from 'react-router';
import CrearTonero from '../pages/CrearTonero';
import Home from '../pages/Home';
import ListaTorneos from '../pages/ListaTorneos';
import Login from '../pages/Login';
import Registrarse from '../pages/Registrarse';

const RouterConfig = () => {
    return (
        <Switch>
            <Route path="/" exact>
                <Home></Home>
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/registrarse" >
                <Registrarse></Registrarse>
            </Route>
            <Route path="/crearTorneo" >
                <CrearTonero></CrearTonero>
            </Route>
            <Route path="/listTorneos">
                <ListaTorneos></ListaTorneos>
            </Route>
        </Switch>
    );
}
export default RouterConfig;
