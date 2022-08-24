import React, {useEffect, useState} from 'react';
import {DataGrid, GridToolbarContainer} from '@mui/x-data-grid'
import {useDispatch, useSelector} from "react-redux";
import {blockUsers, getUsers, removeAdminUsers, setAdminUsers, unblockUsers, deleteUsers} from "../redux/features/users/usersSlice";
import {checkIsAdmin} from "../redux/features/auth/authSlice";
import moment from "moment";
import {useTranslation} from "react-i18next";

const AdminPage = () => {
    const dispatch = useDispatch()
    const isAdmin = useSelector(checkIsAdmin)
    const {users} = useSelector(state => state.user)
    const {t} = useTranslation()

    const username = t("adminPage.username")
    const admin = t("adminPage.admin")
    const banned = t("adminPage.banned")
    const createDate = t("adminPage.createDate")

    const columns = [
        {field: 'id', headerName: 'ID', type: 'string', width: 300},
        {field: 'username', headerName: username, type: 'string', width: 150},
        {field: 'isAdmin', headerName: admin, type: 'boolean', width: 150},
        {field: 'isBanned', headerName: banned, type: 'boolean', width: 110},
        {field: 'createdAt', headerName: createDate, type: 'string', width: 170,
            valueFormatter: params => moment(params?.value).format("DD/MM/YYYY hh:mm A"),},
    ];


    function CustomToolbar() {
        return (
            <GridToolbarContainer className="justify-center">
                <div className="flex-wrap rounded-md shadow-sm align-center" role="group">
                    <button type="button" onClick={() => btnClickHandler(blockUsers)}
                            className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                        {t("adminPage.block")}
                    </button>
                    <button type="button" onClick={() => btnClickHandler(unblockUsers)}
                            className="py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                        {t("adminPage.unblock")}
                    </button>
                    <button type="button" onClick={() => btnClickHandler(setAdminUsers)}
                            className="py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                        {t("adminPage.setAdmin")}
                    </button>
                    <button type="button" onClick={() => btnClickHandler(removeAdminUsers)}
                            className="py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                        {t("adminPage.removeAdmin")}
                    </button>
                    <button type="button" onClick={() => btnClickHandler(deleteUsers)}
                            className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-r-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                        {t("adminPage.delete")}
                    </button>
                </div>
            </GridToolbarContainer>
        );
    }

    async function btnClickHandler(func){
        await func(selectionModel)
        dispatch(getUsers())
        setSelectionModel([])
    }

    const [selectionModel, setSelectionModel] = useState([])

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])


    if (!isAdmin) {
        return (
            <div className='text-xl text-center text-black py-10'>
                This page is only for admins.
            </div>
        )
    }

    return (
        <div style={{height: "90vh"}} className="px-3">
            <DataGrid className="dark:text-white"
                rows={users}
                columns={columns}
                checkboxSelection
                disableSelectionOnClick
                onSelectionModelChange={
                    (newSelectionModel) => setSelectionModel(newSelectionModel)
                }
                selectionModel={selectionModel}
                experimentalFeatures={{newEditingApi: true}}
                components={{
                    Toolbar: CustomToolbar,
                }}
            />
        </div>
    );
};

export default AdminPage;