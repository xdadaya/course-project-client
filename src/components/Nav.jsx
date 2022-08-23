import React from 'react';
import {Navbar} from "flowbite-react";
import {useDispatch, useSelector} from "react-redux";
import {checkIsAdmin, checkIsAuth, logout} from "../redux/features/auth/authSlice";
import {toast} from "react-toastify";
import {Link, useNavigate} from "react-router-dom";
import Toggle from "./ThemeToggle";
import {useTranslation} from "react-i18next";

const Nav = () => {
    const isAuth = useSelector(checkIsAuth)
    const isAdmin = useSelector(checkIsAdmin)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {t, i18n} = useTranslation()

    const changeLanguage = (language) => {
        i18n.changeLanguage(language)
    }

    const logoutHandler = () => {
        dispatch(logout())
        window.localStorage.removeItem('token')
        toast('Logged out')
        navigate('/')
    }

    return (
        <Navbar>
            <Navbar.Brand>
                <Link to="/" className={"flex align-center"}>
                    <img src="https://hotemoji.com/images/dl/7/memo-emoji-by-twitter.png" className="mr-3 h-6 sm:h-9"
                         alt="Logo"/>
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    I Have It!
                </span>
                </Link>
                <Toggle/>
                <button onClick={() => changeLanguage("en")}>EN</button>
                <button onClick={() => changeLanguage("ru")}>RU</button>

            </Navbar.Brand>
            <Navbar.Toggle/>
            <Navbar.Collapse>
                {isAuth && <Navbar.Link href="/create-collection"> {t("navbar.createCollection")} </Navbar.Link>}
                {isAuth && <Navbar.Link href="/users-collections"> {t("navbar.myCollections")} </Navbar.Link>}
                {isAdmin && <Navbar.Link href="/admin-panel"> {t("navbar.adminPanel")} </Navbar.Link>}
                {!isAuth &&
                    <Navbar.Link href="/login">
                        <button
                            className={"text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"}
                            style={{width: "100%"}}>{t("navbar.login")}
                        </button>
                    </Navbar.Link>
                }
                {isAuth &&
                    <Navbar.Link onClick={logoutHandler} style={{cursor: 'pointer'}}> {t("navbar.logout")} </Navbar.Link>
                }
            </Navbar.Collapse>
        </Navbar>

    );
};

export default Nav;