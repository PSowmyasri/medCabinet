import React, {useState} from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { register } from '../actions/auth';
import RegisterComponent from '../components/RegisterComponent'
import axios from 'axios';

const Register = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVerfiy,setPasswordVerify] = useState('');
    const dispatch = useDispatch();

    const handleRegister = async(e) => {
        e.preventDefault();
        try{
            console.log(name)
            console.log(email)
            console.log(password)
            console.log(passwordVerfiy)
            const temp = await register(
                {name : name, 
                 email : email,
                 password : password,
                 passwordVerify: passwordVerfiy}
                 );
            console.log(temp);
            // window.localStorage.setItem('user', JSON.stringify(temp.data));
            // dispatch({
            //         type:'LOGIN_USER',
            //         payload:test.data
            //     });
            toast.success("Registered!");

        }
        catch(err){
            console.log(err);
            toast.error(err.response.data.message)
        }
    } //end of handleRegister

    return (
        <div className='col-md-12'>
            <RegisterComponent name={name} email={email} password={password} passwordVerfiy={passwordVerfiy}
            setName = {setName}
            setEmail = {setEmail}
            setPassword = {setPassword}
            setPasswordVerify = {setPasswordVerify} 
            handleRegister = {handleRegister}/>
        </div>
    );
} ;

export default Register;

