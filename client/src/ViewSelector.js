import "bootstrap/dist/css/bootstrap.min.css"
import "./Host-Background.css";
import "./Guest-Background.css";
import HostView from "./HostView";
import GuestView from "./GuestView";
import Guest from "./Guest";
import {useState} from "react";


function ViewSelector(whichView) {

    const [count, setCount] = useState(32);

    const handleClick = () => {
        console.log("parent click");
        if(count === 32){
            setCount(999);
        }
        else{
            setCount(32);
        }

    };

    return (

        <div>
            {JSON.stringify(whichView).includes("Host") ? (

            <div className="header1">
                <HostView count={count} handleClick={handleClick}/>
            </div> )

                : (<div className="header2">
                        <Guest count={count}/>
                    </div>)
            }

        </div>


    )
}

export default ViewSelector
