import { useState } from "react";
import { Container, UnitList, UnitRegister } from '../../components';

export default function Unidades(){
  const [openForm, setOpenForm] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(undefined);
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
             
           

      
