import React, {useState} from 'react';
import { toast } from 'react-toastify';
import { login } from '../actions/auth';
import LoginComponent from '../components/LoginComponent'
import axios from 'axios';
import { useDispatch } from "react-redux";




const Login = () => {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();


    const handleLogin = async(e) => {
        e.preventDefault();

        try{
            console.log(email)
            console.log(password)
            const res = await login(
                {
                 email : email,
                 password : password}
                 );
            // console.log(res.data);
            window.localStorage.setItem('user', JSON.stringify(res.data));
            dispatch({
                    type:'LOGIN_USER',
                    payload:res.data
                });
            toast.success("Logged in!");

        }
        catch(err){
            console.log(err);
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

