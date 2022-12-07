import React, { Fragment, useState, useEffect } from "react";

import "./App.scss"

import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { toast } from "react-toastify";

// imports das views
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import Anunciar from "./views/Anunciar";
import Anuncio from "./views/Anuncio";
import MeusAnuncios from "./views/MeusAnuncios"
import Perfil from "./views/Perfil";
import PerfilEdit from "./views/PerfilEdit";
import AnuncioEdit from "./views/AnuncioEdit";
import Pesquisa from "./views/Pesquisa";
import NotFound from "./views/NotFound";

toast.configure();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthenticated = async () => {
    try {
      const res = await fetch("/perfil", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);


    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const logout = async () => {
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Usuário deslogado");
    } catch (err) {
      console.error(err.message);
    }
  };

  const anunciar = async () => {
        toast.info("Para criar um anúncio é necessário estar logado.")
  };

  return (
    <Fragment>
      <Router>
        <Switch>
        <Route
            exact
            path="/"
            render={(props) =>
              <Home {...props}/>
            }
          />
          <Route
            exact
            path="/pesquisa"
            render={(props) =>
              <Pesquisa {...props}/>
            }
          />
          <Route
            exact
            path="/estado/:UF"
            render={(props) =>
              <Pesquisa {...props}/>
            }
          />
          <Route
            exact
            path="/login"
            render={(props) =>
              !isAuthenticated ? (
                <Login {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            exact
            path="/register"
            render={(props) =>
              !isAuthenticated ? (
                <Register {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
            <Route
            exact
            path="/logout"
            render={(props) =>
                <Redirect to="/" {...logout()}/>}
            />
          <Route
            exact
            path="/anunciar"
            render={(props) =>
              isAuthenticated ? (
                <Anunciar  />
              ) : (
                <Redirect to="/login" {...anunciar()}/>
              )
            }
          />
          <Route
            exact
            path="/meus-anuncios"
            render={(props) =>
              isAuthenticated ? (
                <MeusAnuncios  {...props} setAuth={setAuth}/>
              ) : (
                <Redirect to="/login" {...props}/>
              )
            }
          />
          <Route
            exact
            path="/perfil"
            render={(props) =>
              isAuthenticated ? (
                <Perfil {...props} setAuth={setAuth}/>
              ) : (
                <Redirect to="/login" {...props}/>
              )
            }
          />
          <Route
            exact
            path="/edit-profile"
            render={(props) =>
              isAuthenticated ? (
                <PerfilEdit {...props} setAuth={setAuth}/>
              ) : (
                <Redirect to="/login" {...props}/>
              )
            }
          />
            <Route
            exact
            path="/anuncio/:id"
            render={(props) =>
              <Anuncio {...props}/>
            }
          />
          <Route
            exact
            path="/edit-ad/:id"
            render={(props) =>
              isAuthenticated ? (
                <AnuncioEdit {...props} setAuth={setAuth}/>
              ) : (
                <Redirect to="/login" {...props}/>
              )
            }
          />
            <Route
            exact
            path="*"
            render={(props) =>
              <NotFound {...props}/>
            }
          />
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
