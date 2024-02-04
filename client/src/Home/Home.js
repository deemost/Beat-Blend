import CreateRoom from "./CreateRoom"
import JoinRoom from "./JoinRoom"

const Home = () => {
    return (
        <div>
            <CreateRoom/>
            <br/>
            <div>-- OR --</div>
            <JoinRoom/>
        </div>
    );
};
export default Home;
