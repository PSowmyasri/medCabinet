// import { Home } from '../actions/auth';
import { toast } from 'react-toastify';
import { getUser} from '../actions/Home';


const HomeComponent = () =>{
    const user= window.localStorage.getItem('user');
    console.log(user);
    getUser(user)
    .then( res =>{
        console.log(JSON.parse(res));
        toast.success(`welcome ${res.data.name}`)
    })
    // console.log(res);
    return(
        <div>
            <h1>welcome</h1>
        </div>
    )

}

export default HomeComponent ;