import CommenHeader from "../commenHeader/CommenHeader";
import logo from "../../assets/profile4.jpg"

const Calendar = () => {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];

    const state = {
      currentDay: new Date()
    }
  
    return (
      <div>
        <CommenHeader title={"Calendar"} logo={logo}/>
        <div className="bg-white m-5 rounded-2xl p-4 shadow-2xl">
        <h2>{weekdays[state.currentDay.getMonth()]} {months[state.currentDay.getMonth()]} {state.currentDay.getFullYear()}</h2>
        <h2>{months[state.currentDay.getMonth()]} {state.currentDay.getFullYear()}</h2>
        </div>
      </div>
    )
}
export default Calendar