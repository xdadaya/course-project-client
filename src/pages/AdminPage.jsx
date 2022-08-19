import React, {useEffect, useState} from 'react';
import {DataGrid, GridToolbarContainer} from '@mui/x-data-grid'
import {useDispatch, useSelector} from "react-redux";
import {blockUsers, getUsers, removeAdminUsers, setAdminUsers, unblockUsers, deleteUsers} from "../redux/features/users/usersSlice";
import {checkIsAdmin} from "../redux/features/auth/authSlice";
import moment from "moment";

const columns = [
    {field: 'id', headerName: 'ID', type: 'string', width: 300},
    {field: 'username', headerName: 'Username', type: 'string', width: 150},
    {field: 'isAdmin', headerName: 'Admin', type: 'boolean', width: 150},
    {field: 'isBanned', headerName: 'Banned', type: 'boolean', width: 110},
    {field: 'createdAt', headerName: 'Create date', type: 'string', width: 170,
        valueFormatter: params => moment(params?.value).format("DD/MM/YYYY hh:mm A"),},
];

const AdminPage = () => {
    const dispatch = useDispatch()
    const isAdmin = useSelector(checkIsAdmin)
    const {users} = useSelector(state => state.user)

    function CustomToolbar() {
        return (
            <GridToolbarContainer className="justify-center">
                <div className="inline-flex rounded-md shadow-sm align-center" role="group">
                    <button type="button" onClick={() => btnClickHandler(blockUsers)}
                            className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                        Block
                    </button>
                    <button type="button" onClick={() => btnClickHandler(unblockUsers)}
                            className="py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                        Unblock
                    </button>
                    <button type="button" onClick={() => btnClickHandler(setAdminUsers)}
                            className="py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                        Set admin
                    </button>
                    <button type="button" onClick={() => btnClickHandler(removeAdminUsers)}
                            className="py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                        Remove admin
                    </button>
                    <button type="button" onClick={() => btnClickHandler(deleteUsers)}
                            className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-r-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                        Delete
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
        <div style={{height: 400}} className="w-fit-content px-3">
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