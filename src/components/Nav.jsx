import React from 'react';
import {Navbar} from "flowbite-react";
import {useDispatch, useSelector} from "react-redux";
import {checkIsAdmin, checkIsAuth, logout} from "../redux/features/auth/authSlice";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import Toggle from "./ThemeToggle";

const Nav = () => {
    const isAuth = useSelector(checkIsAuth)
    const isAdmin = useSelector(checkIsAdmin)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = () => {
        dispatch(logout())
        window.localStorage.removeItem('token')
        toast('Logged out')
        navigate('/')
    }

    return (
        <Navbar>
            <Navbar.Brand href='/'>
                <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Logo"/>
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    Home page
                </span>
            </Navbar.Brand>
            <div className='flex items-center justify-center gap-10'>
                <Toggle/>
                <Navbar.Toggle/>
                <Navbar.Collapse>
                    {isAuth && <Navbar.Link href="/create-collection"> Create collection </Navbar.Link>}
                    {isAuth && <Navbar.Link href="/users-collections"> My collections </Navbar.Link>}
                    {isAdmin && <Navbar.Link href="/admin-panel"> Admin panel </Navbar.Link>}
                    {!isAuth && <Navbar.Link href="/login"> Login </Navbar.Link>}
                    {isAuth &&
                        // <button type="button" onClick={logoutHandler}
                        //         className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                        //     Log out
                        // </button>
                        <Navbar.Link onClick={logoutHandler} style={{cursor: 'pointer'}}> Log out </Navbar.Link>

                    }
                </Navbar.Collapse>
            </div>
        </Navbar>

    );
};

export default Nav;