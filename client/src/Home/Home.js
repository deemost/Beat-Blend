import CreateRoom from "./CreateRoom"
import JoinRoom from "./JoinRoom"
import {WSDemo} from "./WSDemo";

const Home = () => {
    return (
        <div>
            <CreateRoom/>
            <br/>
            <div>-- OR --</div>
            <JoinRoom/>
            <WSDemo/>
        </div>
    );
};
export default Home;
