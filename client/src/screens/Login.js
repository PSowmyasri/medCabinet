import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { login } from '../actions/auth';
import LoginComponent from '../components/LoginComponent'
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router';
import { Redirect } from 'react-router-dom';


import { createBrowserHistory } from "history";

// export const history = createBrowserHistory();


const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { isLoggedIn } = useSelector(state => state.authReducer);

    const dispatch = useDispatch();
    let history = useHistory();


    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            console.log(email)
            console.log(password)
            const res = await login(
                {
                    email: email,
                    password: password
                }
            );
            console.log(res.data.token);
            window.localStorage.setItem('user', JSON.stringify(res.data.token));
            dispatch({
                type: 'LOGIN_USER',
                payload: res.data
            });
            toast.success("Logged in!");
            // let history = useHistory();
            // props.history.push('/home');
            // return <Redirect to="/home" />;

        }
        catch (err) {
            console.log(err);
            toast.error(err.response.data.message)
        }
    }
    // if(isLoggedIn){
    //     return <Redirect to = "/home" />
    // }

    return (
        <div className='col-md-12'>
            <LoginComponent email={email} password={password}
                setEmail={setEmail}
                setPassword={setPassword}
                handleLogin={handleLogin} />
        </div>
    );
};

export default Login;

