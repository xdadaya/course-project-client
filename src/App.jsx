import Layout from "./components/Layout";
import {Route, Routes} from "react-router-dom"
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {getUser} from "./redux/features/auth/authSlice";
import CollectionCreate from "./pages/CollectionCreate";
import AdminPage from "./pages/AdminPage";
import CollectionPage from "./pages/CollectionPage";
import UsersCollectionsPage from "./pages/UsersCollectionsPage";
import CollectionEdit from "./pages/CollectionEdit";


function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])

    return (
        <Layout>
            <Routes>
                <Route path='/' element={<MainPage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path='/create-collection' element={<CollectionCreate/>}/>
                <Route path='/admin-panel' element={<AdminPage/>}/>
                <Route path='collection/:id' element={<CollectionPage/>}/>
                <Route path='collection/:id/edit' element={<CollectionEdit/>}/>
                <Route path='/users-collections' element={<UsersCollectionsPage/>}/>
            </Routes>
            <ToastContainer position="bottom-right"/>
        </Layout>
    );
}


export default App;