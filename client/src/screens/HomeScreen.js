import HomeComponent from "../components/HomeComponent"
import { getUser} from '../actions/Home';
// import { getUser } from "../../../server/controller/homeController";

const HomeScreen = () =>{
    //        const temp = window.localStorage.getItem('user');
    //        console.log("hey");
    //        console.log(temp);
    //        console.log(getUser);
    // const res = getUser(temp.token);
    return(
        <div>
            {/* { res ? <h1> UnAuthorised</h1> : <h1> welcome !!</h1>} */}
            <HomeComponent/>
        </div>
    
    )
}
export default HomeScreen ;