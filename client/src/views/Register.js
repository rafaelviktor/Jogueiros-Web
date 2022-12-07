import React, { Fragment, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import InputMask from 'react-input-mask'
import HCaptcha from '@hcaptcha/react-hcaptcha';

import { toast } from "react-toastify";
import Logo from "../assets/logo.jpg"

const Register = ({ setAuth }) => {
  const [token, setToken] = useState(null);
  const [inputs, setInputs] = useState({
    user_email: "",
    user_password: "",
    user_name: "",
    celular: "",
  });

  const { user_email, user_password, user_name, celular } = inputs;

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
        const body = { user_email, user_password, user_name, celular };
        const response = await fetch("/auth/register", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(body),
        });
        const parseRes = await response.json();
  
        if (parseRes.token) {
          localStorage.setItem("token", parseRes.token);
          setAuth(true);
          toast.success("Cadastrado com sucesso");
        } else {
          setAuth(false);
          toast.error(parseRes);
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
              name="user_name"
              className="form-control"
              maxLength={50}
              value={user_name}
              onChange={(e) => onChange(e)}
              required
            />
            </div>
            <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">E-Mail</label>
            <input
              type="email"
              name="user_email"
              className="form-control"
              maxLength={50}
              value={user_email}
              onChange={(e) => onChange(e)}
              required
            />
            </div>
            <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Celular</label>
            <InputMask
              type="text"
              name="celular"
              className="form-control"
              mask="(99) 99999-9999"
              maskChar=""
              minLength={15}
              maxLength={15}
              value={celular}
              onChange={(e) => onChange(e)}
              required
            />
            </div>
            <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Senha</label>
            <input
              type="password"
              name="user_password"
              className="form-control"
              minLength={8}
              value={user_password}
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
