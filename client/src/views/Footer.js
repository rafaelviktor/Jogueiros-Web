import React from 'react';
import { Link } from "react-router-dom";

function Footer(props) {
  return (
        <footer id={props.id}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 h-100 text-center text-lg-start my-auto">
                        <ul className="list-inline mb-2">
                            <li key={"sobre"} className="text-white list-inline-item"><Link to="#" style={{color: 'white'}}>Sobre</Link></li>
                            <li key={"dot"} className="text-white list-inline-item">⋅</li>
                            <li key={"contato"} className="text-white list-inline-item"><Link to="#" style={{color: 'white'}}>Contato</Link></li>
                            <li key={"dot2"} className="text-white list-inline-item">⋅</li>
                            <li key={"termosuso"} className="text-white list-inline-item"><Link to="#" style={{color: 'white'}}>Termos de uso</Link></li>
                            <li key={"dot3"} className="text-white list-inline-item">⋅</li>
                            <li key={"politicadepriv"} className="text-white list-inline-item"><Link to="#" style={{color: 'white'}}>Política de privacidade</Link></li>
                        </ul>
                        <p className="text-white small mb-4 mb-lg-0">© Jogueiros 2022. Todos os direitos reservados.</p>
                    </div>
                    <div className="col-lg-6 h-100 text-center text-lg-end my-auto">
                        <ul className="list-inline mb-0">
                            <li key={"facebook2"} className="list-inline-item me-4">
                                <Link to="#" style={{color: 'white'}}><i className="bi-facebook fs-3"></i></Link>
                            </li>
                            <li key={"twitter2"} className="list-inline-item me-4">
                                <Link to="#" style={{color: 'white'}}><i className="bi-twitter fs-3"></i></Link>
                            </li>
                            <li key={"instagram1"} className="list-inline-item">
                                <Link to="#" style={{color: 'white'}}><i className="bi-instagram fs-3"></i></Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
  )
}

export default Footer