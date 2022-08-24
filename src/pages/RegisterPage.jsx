import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {checkIsAuth, registerUser} from "../redux/features/auth/authSlice";
import {useTranslation} from "react-i18next";

const RegisterPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {status} = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAuth = useSelector(checkIsAuth)
    const {t} = useTranslation()

    useEffect(() => {
        if (isAuth) navigate('/')
    }, [status, isAuth, navigate])

    const handleSubmit = () => {
        try {
            dispatch(registerUser({username, password}))
            setPassword('')
            setUsername('')
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <form onSubmit={e => e.preventDefault()} className="max-w-xl mx-auto mt-40 px-2 text-black dark:text-white">
            <h1 className="text-xl text-center mb-10">👋 {t("registration.registration")}</h1>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder={t("registration.username")}
                   className="mt-1 w-full rounded-lg bg-gray-200 dark:bg-gray-800 border py-1.5 px-2 text-m text-center"/>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder={t("registration.password")}
                   className="mt-3 w-full rounded-lg bg-gray-200 dark:bg-gray-800 border py-1.5 px-2 text-m text-center"/>
            <div className="justify-center items-center flex flex-col md:flex-row mt-4 gap-4">
                <button type="submit" onClick={handleSubmit}
                        className="text-gray-900 border-blue-700 w-full bg-gray-200 border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    {t("registration.signUp")} 👉
                </button>
                <Link to='/login' className='w-full flex justify-center items-center text-s'>{t("registration.haveAnAccount")}</Link>
            </div>
        </form>
    );
};

export default RegisterPage;