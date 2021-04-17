import axios from 'axios';

export const register = async (register_user) => {
    const res = await axios.post('http://localhost:5000/api/auth/signup', register_user);
    return res ;

}

export const login = async (login_user) => {
   const res = await axios.post('http://localhost:5000/api/auth/login' , login_user)
   return res ;
}
