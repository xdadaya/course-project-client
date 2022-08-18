import { configureStore } from '@reduxjs/toolkit'
import authSlice from "./features/auth/authSlice";
import collectionSlice from "./features/collection/collectionSlice";
import usersSlice from "./features/users/usersSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        collection: collectionSlice,
        user: usersSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['users/getUsers/fulfilled', 'collection/getAllCollections/fulfilled', 'collection/createCollection/fulfilled']
            },
        }),

})