import React, {useEffect, useState} from 'react';
import {DataGrid, GridToolbarContainer} from '@mui/x-data-grid'
import {useDispatch, useSelector} from "react-redux";
import {blockUsers, getUsers, removeAdminUsers, setAdminUsers, unblockUsers, deleteUsers} from "../redux/features/users/usersSlice";
import {checkIsAdmin} from "../redux/features/auth/authSlice";
import moment from "moment";

const columns = [
    {field: 'id', headerName: 'ID', width: 300},
    {field: 'username', headerName: 'Username', width: 150},
    {field: 'isAdmin', headerName: 'Admin', type: 'boolean', width: 150},
    {field: 'isBanned', headerName: 'Banned', type: 'boolean', width: 110},
    {field: 'createdAt', headerName: 'Create date', width: 170,
        valueFormatter: params => moment(params?.value).format("DD/MM/YYYY hh:mm A"),},
];

const AdminPage = () => {
    const dispatch = useDispatch()
    const isAdmin = useSelector(checkIsAdmin)
    const {users} = useSelector(state => state.user)

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <div className="flex gap-5 px-3">
                    <button onClick={() => btnClickHandler(blockUsers)}
                            className="items-center rounded-sm opacity-0.6 transition-0.3 bg-gray-300 py-2 px-3">
                        Block
                    </button>
                    <button onClick={() => btnClickHandler(unblockUsers)}
                            className="items-center rounded-sm opacity-0.6 transition-0.3 bg-gray-300 py-2 px-3">
                        Unblock
                    </button>
                    <button onClick={() => btnClickHandler(setAdminUsers)}
                            className="items-center rounded-sm opacity-0.6 transition-0.3 bg-gray-300 py-2 px-3">
                        Set admin
                    </button>
                    <button onClick={() => btnClickHandler(removeAdminUsers)}
                            className="items-center rounded-sm opacity-0.6 transition-0.3 bg-gray-300 py-2 px-3">
                        Remove admin
                    </button>
                    <button onClick={() => btnClickHandler(deleteUsers)}
                            className="items-center rounded-sm opacity-0.6 transition-0.3 bg-gray-300 py-2 px-3">
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
            <DataGrid
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