import { useState } from "react";
// import UnitList from '../../components/organismos/UnitList/UnitList';
// import UnitRegister from '../../components/organismos/UnitRegister/UnitRegister';
import { Container, UnitList, UnitRegister } from '../../components';

export default function Unidades(){
  const [openForm, setOpenForm] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState({});
    return (
       <Container title="Unidades">
        {openForm === false && (
        <UnitList 
        setOpenForm={setOpenForm}
        setSelectedUnit={setSelectedUnit}
        />
        )}
        
        {openForm === true && (
        <UnitRegister 
        setOpenForm={setOpenForm}
        selectedUnit={selectedUnit}
        setSelectedUnit={setSelectedUnit}
        />
        )}
       </Container>    
  );
}
             
           

      
