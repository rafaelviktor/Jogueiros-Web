import React, { Fragment, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import InputMask from 'react-input-mask'

import { toast } from "react-toastify";
import Logo from "../assets/logo.jpg"

const Register = ({ setAuth }) => {
    const location = useHistory();
    const [id, setId] = useState("");
    const [inputs, setInputs] = useState({
        user_email: "",
        user_password: "",
        user_name: "",
        celular: "",
      });

    const getProfile = async () => {
      try {
        const res = await fetch("/perfil", {
          method: "GET",
          headers: { token: localStorage.token },
        });
  
        const parseData = await res.json();
        setId(parseData._id);
        setInputs({ ...inputs, user_email: parseData.email, user_name: parseData.nome, celular: parseData.contato})
      } catch (err) {
        console.error(err.message);
      }
    };
  
    useEffect(() => {
      getProfile();
    }, []);

  const { user_email, user_password, user_name, celular } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { user_email, user_password, user_name, celular };
      const response = await fetch(`/auth/user-edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      location.push("/perfil")
      toast.success(parseRes);
    } catch (err) {
      console.error(err.message);
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
            <div className="form-text text-center" style={{ marginBottom: 15 }}>Editar informações de usuário:</div>
            <div className="mb-3">
            <label for="inputName1" className="form-label">Nome completo</label>
            <input
              type="text"
              name="user_name"
              className="form-control"
              value={user_name}
              onChange={(e) => onChange(e)}
            />
            </div>
            <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">E-Mail</label>
            <input
              type="email"
              name="user_email"
              className="form-control"
              value={user_email}
              onChange={(e) => onChange(e)}
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
              placeholder={"Caso não queira trocar, só deixar vazio."}
              onChange={(e) => onChange(e)}
            />
            </div>
            <button
              type="submit"
              className="btn btn-success"
              id="btn-center">Alterar</button>
          </form>
        </div>
      </section>
    </Fragment>
  );
};

export default Register;