import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "@splidejs/splide/dist/css/splide.min.css";
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

import Logo from "../assets/logo.jpg";

const NavBar = ({ setAuth }) => {
  const [name, setName] = useState("");

  const getProfile = async () => {
    try {
      const res = await fetch("/perfil", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseData = await res.json();
      setName(parseData.result.nome);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);



  function LogoutButton() {
    const fname = name.split(' ')
    const welcome = "Olá, "+ fname[0]
    return (
      <>
      <NavDropdown title={welcome} id="collasible-nav-dropdown">
        <NavDropdown.Item href=""><Link className="item-menu-navbar" to="/perfil">Meu Perfil</Link></NavDropdown.Item>
        <NavDropdown.Item href=""><Link className="item-menu-navbar" to="/meus-anuncios">Meus anúncios</Link></NavDropdown.Item>
        <NavDropdown.Item href=""><Link className="item-menu-navbar" to="/logout">Sair</Link></NavDropdown.Item>
      </NavDropdown>
      </>
    );
  }

  function LoginButton() {
    return (
      <Nav.Link href="" className="p-0">
        <Link className="btn btn-success btn-navbar" to="/login">
        Entre ou Cadastre-se
        </Link>
      </Nav.Link>
    );
  }

  // Variáveis nome de usuário e tipo de botão
  const buttonAuth = name ? <LogoutButton/> : <LoginButton />;

  return (
    <Navbar collapseOnSelect expand="lg" bg="light">
    <Container>
    <Navbar.Brand href=""><Link to="/"><img src={Logo} className="navbar-brand logo-responsive" alt="Logomarca jogueiros"/></Link></Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="me-auto">
      </Nav>
        <Nav>
        <Nav.Link className="p-0"><Link className="btn btn-success btn-navbar" to="/pesquisa">Descobrir</Link></Nav.Link>
        <Nav.Link className="p-0"><Link className="btn btn-success btn-navbar" to="/anunciar">Anunciar</Link></Nav.Link>
        {buttonAuth}
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
      );
};

export default NavBar