import React, { Fragment, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import InputMask from 'react-input-mask'
import Axios from "axios";

import Logo from "../assets/logo.jpg"
import Footer from "./Footer";

const Anunciar = ({ setAnuncio }) => {
  const [id, setId] = useState("");

  const getProfile = async () => {
    try {
      const res = await fetch("/perfil", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseData = await res.json();
      setId(parseData._id);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const onFileChange = (e) => {
    if(e.target.files[0].size === undefined) {

    }
    else if(e.target.files[0].size > 1024*1024*2) {
      setInputs({ ...inputs, imagem: "", resultado: "O arquivo excede o tamanho máximo de 2MB.", cor: "cor-vermelho"})
    }
    else if(e.target.files[0]) {
      formData.append("image", e.target.files[0]);
      Axios.post('/upload',
      formData
      ).then(res => {
        setInputs({ ...inputs, imagem: res.data.url, display: "", inputKey: Math.random().toString(36), resultado: res.data.message, cor: "cor-verde"});
      }).catch(function (error) {
        if (error.response.status === 500) {
          setInputs({ ...inputs, imagem: "", resultado: "Ops! algo não deu certo ao enviar o arquivo.", cor: "cor-vermelho"})
        } else if (error.request) {
          setInputs({ ...inputs, imagem: "", resultado: "Ops! algo não deu certo ao enviar o arquivo.", cor: "cor-vermelho"})
        } else {
          setInputs({ ...inputs, imagem: "", resultado: "Ops! algo não deu certo ao enviar o arquivo.", cor: "cor-vermelho"})
        }
      });
    } else {

    }

  }


  const [inputs, setInputs] = useState({
    titulo: "",
    descricao: "",
    preco: "",
    imagem: "",
    display: "d-none",
    inputKey: Math.random().toString(36),
    cep: "",
    numero: "",
    logradouro: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    resultado: "",
    cor: ""
  });

  const { titulo, descricao, preco, imagem, display, inputKey, cep, numero, logradouro, complemento, bairro, cidade, estado, resultado, cor } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  
  let history = useHistory();

  const formData = new FormData();


  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { titulo, descricao, preco, imagem, cep, numero, logradouro, complemento, bairro, cidade, estado };
      const response = await fetch(`/anuncios/cadastrar/${id}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();

      if (parseRes) {
        window.scrollTo(0, 0)
        history.push("/")
        toast.success("Anúncio cadastrado com sucesso");
      } else {
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const onBlurCep = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        }
      });
      const parseRes = await response.json();

      setInputs({ ...inputs, logradouro: parseRes.logradouro, bairro: parseRes.bairro, cidade: parseRes.localidade, estado: parseRes.uf });

    } catch (err) {
      console.error(err.message);
    }
  };

  const handleExclusao = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/upload/excluir/${imagem}`, {
        method: "DELETE",
        headers: { token: localStorage.token },
      });
      const parseRes = await response.json();
      console.log(parseRes)
      setInputs({ ...inputs, imagem: "", display: "d-none", resultado: ""});
    } catch (err) {
      console.error(err.message);
    }
  };

  return(
    <Fragment>
      <section className="mb-5">
        <div className="container">
          <form id="form-anunciar" className="shadow p-5 border mt-5 rounded-3" onSubmit={onSubmitForm} autoComplete="off">
            <i className="bi bi-apple"></i>
            <Link to="/">
              <img
                className="navbar-brand mt-4"
                alt="logomarca"
                src={Logo}
                style={{ height: 66, marginBottom: 40, display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
              />
            </Link>
            <div id="emailHelp" className="text-center mb-4"><h1 className="fs-2">Criar anúncio</h1></div>
            <h2 className="fs-4 mt-3 mb-4">Informações básicas</h2>
            <div className="mb-3">
            <label for="inputName1" className="form-label">Título do anúncio</label>
            <input
              type="text"
              name="titulo"
              className="form-control"
              value={titulo}
              placeholder={"Qual será o nome do seu anúncio?"}
              onChange={(e) => onChange(e)}
              required
            />
            </div>
            <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">Descrição</label>
            <textarea
              rows={4}
              name="descricao"
              className="form-control"
              value={descricao}
              placeholder={"Conta um pouco mais para a gente do seu anúncio..."}
              onChange={(e) => onChange(e)}
            ></textarea>
            </div>
            <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Preço</label>
            <InputMask
              type="text"
              name="preco"
              mask="999"
              maskChar=""
              maxLength={3}
              className="form-control"
              value={preco}
              placeholder={"Qual o valor do aluguel por hora?"}
              onChange={(e) => onChange(e)}
              required
            />
            </div>
            <h2 className="fs-4 mt-5 mb-4">Imagens</h2>
            <div className="mb-3">
            <label for="formFile" className="form-label">Selecione uma imagem para seu anúncio</label>
              <input
              className="form-control"
              name="image"
              type="file"
              key={inputKey}
              id="formFile"
              onChange={onFileChange}
              />
              <p className="fw-bold mt-2" id={cor}>{resultado}</p>
              <div>
              <button onClick={(e) => handleExclusao(e)} className={`${display} btn btn-danger rounded-circle position-absolute m-1`} style={{zIndex: 100}}><i class="bi bi-x-lg"></i></button>
              <img src={`/uploads/${imagem}`} className={`${display} img-fluid-ad position-relative`}/>
              </div>
            </div>
            <h2 className="fs-4 mt-5 mb-4">Localização</h2>
            <div className="d-flex justify-content-between">
            <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">CEP</label>
            <InputMask
              type="text"
              name="cep"
              className="d-inline-block form-control"
              mask="99999-999"
              maskChar=""
              maxLength={9}
              value={cep}
              placeholder={"Somente os números."}
              onChange={(e) => onChange(e)}
              onBlur={(e) => onBlurCep(e)}
              required
            />
            </div>
            <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label ms-2">Número</label>
            <InputMask
              type="text"
              name="numero"
              mask="99999"
              maskChar=""
              maxLength={5}
              className="d-inline-block form-control ms-2"
              value={numero}
              placeholder={"Se não tiver, deixar vazio."}
              onChange={(e) => onChange(e)}
            />
            </div>
            </div>
            <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Logradouro</label>
            <input
              type="text"
              name="logradouro"
              className="form-control"
              value={logradouro}
              placeholder={"Rua, Avenida, etc..."}
              onChange={(e) => onChange(e)}
              required
            />
            </div>
            <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Complemento (opcional)</label>
            <input
              type="text"
              name="complemento"
              className="form-control"
              value={complemento}
              placeholder={""}
              onChange={(e) => onChange(e)}
            />
            </div>
            <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Bairro</label>
            <input
              type="text"
              name="bairro"
              className="form-control"
              value={bairro}
              placeholder={""}
              onChange={(e) => onChange(e)}
              required
            />
            </div>
            <div className="d-flex justify-content-between mb-3">
            <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Cidade</label>
            <input
              type="text"
              name="cidade"
              id="cursor-proibido"
              className="d-inline-block form-control"
              value={cidade}
              onChange={(e) => onChange(e)}
              readOnly
              required
            />
            </div>
            <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label ms-2">Estado</label>
            <input
              type="text"
              name="estado"
              id="cursor-proibido"
              className="d-inline-block form-control ms-2"
              value={estado}
              onChange={(e) => onChange(e)}
              readOnly
              required
            />
            </div>
            </div>

            <button
              type="submit"
              className="btn btn-success mt-4"
              id="btn-center"
              style={{ paddingInline: "3vh", borderRadius: 25 }}>Salvar e Anunciar</button>
          </form>
        </div>
      </section>
      <Footer id="block" />
    </Fragment>
  )
}

export default Anunciar