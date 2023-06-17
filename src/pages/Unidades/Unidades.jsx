import { useState } from "react";
import UnitList from '../../components/organismos/UnitList/UnitList';
import UnitRegister from '../../components/organismos/UnitRegister/UnitRegister';
import { Container } from '../../components';

export default function Unidades(){
  const [openForm, setOpenForm] = useState(false);
console.log(openForm)
    return (
       <Container title="Unidades">
        {openForm === false &&<UnitList setOpenForm={setOpenForm}/>}
        {openForm && <UnitRegister setOpenForm={setOpenForm}/>}
       </Container>
        
        
    
  );
}
             
           

      
