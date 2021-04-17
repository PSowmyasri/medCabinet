import React, {useState} from 'react';
import { toast } from 'react-toastify';
import { login } from '../actions/auth';
import LoginComponent from '../components/LoginComponent'


const Login = () => {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async(e) => {
        e.preventDefault();

        try{
            console.log(email)
            console.log(password)
            const temp = await login(
                {
                 email : email,
                 password : password}
                 );
            toast.success("Logged in!");

        }
        catch(err){
            toast.error(err.response.data.message)
        }
    } 

    return (
        <div className='col-md-12'>
            <LoginComponent email={email} password={password}
            setEmail = {setEmail}
            setPassword = {setPassword} 
            handleLogin = {handleLogin}/>
        </div>
    );
} ;

export default Login;

