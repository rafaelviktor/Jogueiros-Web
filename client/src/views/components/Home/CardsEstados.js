import React from 'react';
import { Link } from "react-router-dom";

const wid22rem = {
    maxWidth: "22rem",
};

function Cards3(props) {
    return (
        <div class="card" id="card-regioes">
        <h5 class="card-header text-start">Selecione seu estado</h5>
        <div class="card-body">
            <span class="card-text text-start">
            <Link className='me-2' to="estado/AC">AC</Link>
            <Link className='me-2' to="estado/AL">AL</Link>
            <Link className='me-2' to="estado/AP">AP</Link>
            <Link className='me-2' to="estado/AM">AM</Link>
            <Link className='me-2' to="estado/BA">BA</Link>
            <Link className='me-2' to="estado/CE">CE</Link>
            <Link className='me-2' to="estado/DF">DF</Link>
            <Link className='me-2' to="estado/ES">ES</Link>
            <Link className='me-2' to="estado/GO">GO</Link>
            <Link className='me-2' to="estado/MA">MA</Link>
            <Link className='me-2' to="estado/MT">MT</Link>
            <Link className='me-2' to="estado/MS">MS</Link>
            <Link className='me-2' to="estado/MG">MG</Link>
            <Link className='me-2' to="estado/PA">PA</Link>
            <Link className='me-2' to="estado/PB">PB</Link>
            <Link className='me-2' to="estado/PR">PR</Link>
            <Link className='me-2' to="estado/PE">PE</Link>
            <Link className='me-2' to="estado/PI">PI</Link>
            <Link className='me-2' to="estado/RJ">RJ</Link>
            <Link className='me-2' to="estado/RN">RN</Link>
            <Link className='me-2' to="estado/RS">RS</Link>
            <Link className='me-2' to="estado/RO">RO</Link>
            <Link className='me-2' to="estado/RR">RR</Link>
            <Link className='me-2' to="estado/SC">SC</Link>
            <Link className='me-2' to="estado/SP">SP</Link>
            <Link className='me-2' to="estado/SE">SE</Link>
            <Link className='me-2' to="estado/TO">TO</Link>
            </span>
        </div>
        </div>
    );
}

export default Cards3