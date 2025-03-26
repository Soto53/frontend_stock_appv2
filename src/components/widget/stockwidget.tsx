import DeskStockwidget from "./deskstockwidget"
import MobileStockwidget from "./mobileStockWidget"
import StockChartWithWatchlist from '../stockChart';
import CommunityChat from '../chat';
import BusinessInfo from '../businessInfo';
import NewsSection from '../newsSection';


const Stockwidget = () => {

 return(
<div>


<StockChartWithWatchlist/>
<CommunityChat/>
<NewsSection/>
<BusinessInfo/>

</div>
 )   
}

export default Stockwidget;