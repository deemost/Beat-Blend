import "bootstrap/dist/css/bootstrap.min.css"
import "./Host-Background.css";
import "./Guest-Background.css";
import HostView from "./HostView";
import Guest from "./Guest";


function ViewSelector(whichView) {

    return (

        <div>
            {JSON.stringify(whichView).includes("Host") ? (

            <div className="header1">
                <HostView/>
            </div> )

                : (<div className="header2">
                        <Guest/>
                    </div>)
            }

        </div>


    )
}

export default ViewSelector
