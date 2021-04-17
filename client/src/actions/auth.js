import axios from 'axios';

export const register = async (register_user) => {
     await axios.post('http://localhost:5000/api/auth/signup', register_user)
}

export const login = async (login_user) => {
    await axios.post('http://localhost:5000/api/auth/login' , login_user)
}
