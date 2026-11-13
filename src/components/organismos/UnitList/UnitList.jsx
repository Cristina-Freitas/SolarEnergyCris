import { useState, useEffect } from "react";
import { Button } from "../../index";
import { API_URL } from "../../../utils";
import './UnitList.css'

export default function UnitList({setOpenForm, setSelectedUnit}){
    const [unidades, setUnidades] = useState([]);
 
    const loadUnits = () => {
        fetch(`${API_URL}/unidades`)
        .then((response) => response.json())
        .then((data) => setUnidades(data));
    }

    useEffect(() => {
        loadUnits();
      }, []);

      const handleDelete = (id) =>{
        // Só recarrega a lista depois que a remoção terminar
        fetch(`${API_URL}/unidades/${id}`, {
            method: "DELETE",
          }).then(() => loadUnits());
      };

      const handleEdit = (unidade) =>{
        setSelectedUnit(unidade);
        setOpenForm(true)
      };

    return(
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
                <Button onClick={() => handleEdit(unidade)
                }classStyle='green'>
                  Editar
                </Button>
              </td>
              <td>
                <Button onClick={() => handleDelete(unidade.id)
                } classStyle='danger'>
                  Remover
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br/>
      <br/>
      <Button
        id="new-unit"
        classStyle='secondary' 
        onClick={() => setOpenForm(true)}
        >Nova Unidade
        </Button>
      </section>
    )
}