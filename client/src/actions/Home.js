import axios from 'axios';

export const getUser = async (token) => {
    console.log(token);
    const res = await axios.get('http://localhost:5000/api/auth/home',{headers:{
        // Authorization: `Bearer ${token}`    
        'x-access-token': token     
    }} );
    console.log("getUser")
    console.log(res);
    return res ;

}