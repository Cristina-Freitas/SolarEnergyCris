import './Unidades.css'
import { useState, useEffect } from "react";
import { Container } from "../../components";

export default function Unidades(){
    const [unidades, setUnidades] = useState([]);
    const [openForm, setOpenForm] = useState(false);

    const getData = () => {
        fetch("http://localhost:3333/unidades")
        .then((response) => response.json())
        .then((data) => setUnidades(data));
    }

    useEffect(() => {
        getData();
      }, []);

      const handleDelete = (id) =>{
        // console.log(id);
        fetch(`http://localhost:3333/unidades/${id}`, {
            method: "DELETE",
          });
          getData();
      };


    return (
        <Container title="Unidades">
        <section className="unit-list">
          <h2>Lista de unidades</h2>
          <br />
    
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Apelido</th>
                <th>Local</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
          {unidades.map((unidade) => (
            <tr key={unidade.id}>
              <td>{unidade.id}</td>
              <td>{unidade.apelido}</td>
              <td>{unidade.local}</td>
              <td>{unidade.marca}</td>
              <td>{unidade.modelo}</td>
              <td>
                <button className='green'>
                  Editar
                </button>
              </td>
              <td>
                <button onClick={() => handleDelete(unidade.id)
                } className='danger'>
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </section>
      <button className='secondary' onClick={() => setOpenForm(true)}>Nova Unidade</button>

      {openForm &&<section className='unit-form'>
       Terá um formulário aqui
       <br/>
       <br/>
       <button onClick={() => {
          setOpenForm(false);
       }}>
        Fecha formulário
        </button>
      </section>}
    </Container>
  );
}
             
           

      
