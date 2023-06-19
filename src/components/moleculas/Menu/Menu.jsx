import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.svg'
import dashboard from '../../../assets/dashboard.png';
import unidadeConsumidora from '../../../assets/unidadeConsumidora.png';
import cadastro from '../../../assets/cadastro.png';

import './Menu.css';

export default function Menu(){
    const navigate = useNavigate()
    const location = useLocation();

    const isSelected = (pathname) => {
        return location.pathname === pathname ? "selected" : "";
      };
    
      const handleClick = (pathname) => {
        navigate(pathname);
      };

    return(
        <div className='Menu'>
            <img src={logo} alt="logo" onClick={() => navigate("/")}/>
            
            <button className={isSelected("/")} onClick={() => handleClick("/")}>
                <img src={dashboard} alt="dashboard" width="32" height="32" viewBox="0 0 24 24" />
                    <span>Dashboard</span>
            </button>
            
            <button className={isSelected("/unidades")} onClick={() => handleClick("/unidades")}>
                <img src={unidadeConsumidora} alt="unidade consumidora" width="32" height="32" viewBox="0 0 24 24"/>
                    <span>Unidade consumidora</span>
            </button>
            
            <button className={isSelected("/cadastro")} onClick={() => handleClick("/cadastro")}>       
                <img src={cadastro} alt="cadastro de energia gerada" width="32" height="32" viewBox="0 0 24 24" />
                    <span>Cadastro de energia gerada</span>
            </button>
        </div>
    );
}