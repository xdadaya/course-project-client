import { configureStore } from '@reduxjs/toolkit'
import authSlice from "./features/auth/authSlice";
import collectionSlice from "./features/collection/collectionSlice";
import usersSlice from "./features/users/usersSlice";
import itemSlice from "./features/item/itemSlice";
import commentSlice from "./features/comments/commentSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        collection: collectionSlice,
        user: usersSlice,
        item: itemSlice,
        comment: commentSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['users/getUsers/fulfilled', 'collection/getAllCollections/fulfilled',
                    'collection/createCollection/fulfilled', 'item/getItemsByCollectionId/fulfilled',
                    'item/createItemInCollection/fulfilled', 'comment/getCommentByItemId/fulfilled',
                    'comment/createComment/fulfilled', 'item/updateItem/fulfilled'
                ]
            },
        }),

})