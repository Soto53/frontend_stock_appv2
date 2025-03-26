
import {useState} from 'react';
import Stockwidget from './stockwidget';

const logo = "logo192.png";


const DeskStockwidget: React.FC = () =>{

const [click, setClick] = useState(false);

return(
    

    <div className='deskstockwidget'>

    <Stockwidget/>
    </div>

)

}

export default DeskStockwidget