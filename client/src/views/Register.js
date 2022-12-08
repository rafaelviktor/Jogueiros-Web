import React, { Fragment, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import InputMask from 'react-input-mask'
import HCaptcha from '@hcaptcha/react-hcaptcha';

import { toast } from "react-toastify";
import Logo from "../assets/logo.jpg"

const Register = ({ setAuth }) => {
  const [token, setToken] = useState(null);
  const [inputs, setInputs] = useState({
    email: "",
    senha: "",
    nome: "",
    contato: "",
  });

  let { email, senha, nome, contato } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  function handleVerificationSuccess(token, ekey) {
    setToken(token)
  }

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (token) {
      try {
        contato = contato.replace(/\D/g, "")
        const body = { email, senha, nome, contato };
        console.log(body)
        const response = await fetch("/users/registrar", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(body),
        });
        const parseRes = await response.json();
  
        if (parseRes.result) {
          localStorage.setItem("token", parseRes.result);
          setAuth(true);
          toast.success("Cadastrado com sucesso");
        } else {
          setAuth(false);
          toast.error(parseRes.message);
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      toast.error("É necessário marcar o captcha para prosseguir.");
    }
  };

  return (
    <Fragment>
      <section className="societys text-start">
        <div className="container">
          <form id="form-auth" className="shadow p-5 border mt-5 rounded-3" onSubmit={onSubmitForm} autoComplete="off">
            <i className="bi bi-apple"></i>
            <Link to="/">
              <img
                className="navbar-brand mt-4"
                alt="logomarca"
                src={Logo}
                style={{ height: 66, marginBottom: 40, display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
              />
            </Link>
            <div className="mb-3">
            <label for="inputName1" className="form-label">Nome completo</label>
            <input
              type="text"
              name="nome"
              className="form-control"
              maxLength={50}
              value={nome}
              onChange={(e) => onChange(e)}
              required
            />
            </div>
            <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">E-Mail</label>
            <input
              type="email"
              name="email"
              className="form-control"
              maxLength={50}
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
            </div>
            <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Celular</label>
            <InputMask
              type="text"
              name="contato"
              className="form-control"
              mask="(99) 99999-9999"
              maskChar=""
              value={contato}
              onChange={(e) => onChange(e)}
              required
            />
            </div>
            <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Senha</label>
            <input
              type="password"
              name="senha"
              className="form-control"
              minLength={8}
              value={senha}
              onChange={(e) => onChange(e)}
              required
            />
            </div>
            <div className="mb-3">
            <HCaptcha
              sitekey="809f90e3-50ba-4226-84d8-545d4ada3323"
              onVerify={(token,ekey) => handleVerificationSuccess(token, ekey)}
            />
            </div>
            <button
              type="submit"
              className="btn btn-success"
              id="btn-center">Cadastrar</button>
          </form>
          <p className="text-center" style={{ marginTop: 15, marginBottom: -7 }}>
            Já possui uma conta? <Link to="/login">Faça login</Link>
          </p>
        </div>
      </section>
      <script src="https://www.google.com/recaptcha/api.js?render=6Lfzg0ggAAAAAMJOdtOH43U0iZY0Cr32U-F2CYjJ"></script>
    </Fragment>
  );
};

export default Register;
