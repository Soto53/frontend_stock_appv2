
import {useState} from 'react';
import Stockwidget from './stockwidget';

const logo = "logo192.png";

const MobileStockwidget: React.FC = () =>{

const [click, setClick] = useState(false);

return(
  
     <div className = "mobilestockwidget">
    <img 
    src={logo} 
    alt="logo" 
    className="stockwidgelogo" 
    onClick={() => setClick(!click)}/>
    
    {click && <Stockwidget />}

   




    </div>
   
)

}

export default MobileStockwidget