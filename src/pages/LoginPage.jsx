import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {checkIsAuth, loginUser} from "../redux/features/auth/authSlice";

const LoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { status } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAuth = useSelector(checkIsAuth)

    useEffect(()=>{
        if(isAuth) navigate('/')
    }, [status, isAuth, navigate])

    const handleSubmit = () =>{
        try{
            dispatch(loginUser({username, password}))
            setPassword('')
            setUsername('')
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <form onSubmit={e => e.preventDefault()} className="max-w-xl mx-auto mt-40 px-2">
            <h1 className="text-xl text-white text-center">Авторизация</h1>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username"
                   className="mt-1 text-black w-full rounded-lg bg-gray-200 border py-1.5 px-2 text-m text-center"/>

            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"
                   className="mt-3 text-black w-full rounded-lg bg-gray-200 border py-1.5 px-2 text-m text-center"/>
            <div className="flex gap-8 justify-center mt-4">
                <button type='submit' onClick={handleSubmit}
                        className="flex justify-center items-center bg-gray-600 text-m text-white rounded-sm py-2 px-10">
                    Sign in
                </button>
                <Link to='/register' className='flex justify-center items-center text-s text-black'>Create an account?</Link>
            </div>
        </form>
    );
};

export default LoginPage;