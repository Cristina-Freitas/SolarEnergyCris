import "./UnitRegister.css";
export default function UnitRegister({setOpenForm}){
    const saveForm = (event) => {
        event.preventDefault()
        setOpenForm(false)
    }
    return(
        <section className="unit-register">
            <h2>Cadastro de Unidade Geradora</h2>
            <form onSubmit={saveForm}>
                <div>
                <label htmlFor="apelido">Apelido</label>
                <input type="text" name="apelido" id=""></input>
                <label htmlFor="local">Local</label>
                <input type="text" name="local" id=""></input>
                <label htmlFor="marca">Marca</label>
                <input type="text" name="marca" id=""></input>
                <label htmlFor="modelo">Modelo</label>
                <input type="text" name="modelo" id=""></input>
                </div>
                <div className="checkbox">
                <label htmlFor="ativo">Ativo</label>
                <input type="checkbox" name="active" id=""></input>
                </div>
                <button classStyle="green" type="submit">Salvar</button>
            </form>
        </section>
    )
}