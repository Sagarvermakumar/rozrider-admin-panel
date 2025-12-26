import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://rozzride.com/api',
        prepareHeaders: (headers, { getState }) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['User', 'Driver', 'Dashboard'],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: 'admin/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        getProfile: builder.query({
            query: () => 'admin/me',
        }),
        /*
                getDashboardStats: builder.query({
                    query: () => 'admin/dashboard', 
                    providesTags: ['Dashboard'],
                }),
        */
        getUsers: builder.query({
            query: () => 'admin/users',
            providesTags: ['User'],
        }),
        getUser: builder.query({
            query: (id) => `admin/users/${id}`,
            providesTags: (result, error, id) => [{ type: 'User', id }],
        }),
        createAdmin: builder.mutation({
            query: (data) => ({
                url: 'admin/create',
                method: 'POST',
                body: data,
            }),
        }),
        updatePassword: builder.mutation({
            query: (data) => ({
                url: 'admin/updatepassword',
                method: 'PUT',
                body: data,
            }),
        }),
        uploadDriverDocument: builder.mutation({
            query: (data) => ({
                url: 'admin/driver/document/store',
                method: 'POST',
                body: data,
            }),
        }),
        updateUserStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `admin/users/${id}`,
                method: 'PUT',
                body: { status },
            }),
            invalidatesTags: ['User', 'Dashboard'],
        }),
        updateUserDetails: builder.mutation({
            query: ({ id, data }) => ({
                url: `admin/users/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'User', id }, 'User', 'Dashboard'],
        }),
        getDrivers: builder.query({
            query: () => 'admin/drivers',
            providesTags: ['Driver'],
        }),
        getDriver: builder.query({
            query: (id) => `admin/drivers/${id}`,
            providesTags: (result, error, id) => [{ type: 'Driver', id }],
        }),
        updateDriverStatus: builder.mutation({
            query: ({ id, action }) => ({
                url: `admin/drivers/${id}`,
                method: 'PUT',
                body: { action },
            }),
            invalidatesTags: ['Driver', 'Dashboard'],
        }),
        updateDriverDetails: builder.mutation({
            query: ({ id, data }) => ({
                url: `admin/drivers/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Driver', id }, 'Driver', 'Dashboard'],
        }),
        // User Management
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `admin/users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User', 'Dashboard'],
        }),

        // Driver Management
        deleteDriver: builder.mutation({
            query: (id) => ({
                url: `admin/drivers/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Driver', 'Dashboard'],
        }),

        // Driver Documents Management (Admin)
        getDriverDocuments: builder.mutation({
            query: (driverId) => ({
                url: 'admin/driver/document/show',
                method: 'POST',
                body: { driver_id: driverId },
            }),
        }),
        updateDriverDocumentStatus: builder.mutation({
            query: (data) => ({
                url: 'admin/driver/document/statusupdate',
                method: 'PUT',
                body: data, // { driver_id, [field_status]: 'approved'|'rejected' }
            }),
        }),
        deleteDriverDocuments: builder.mutation({
            query: (driverId) => ({
                url: 'admin/driver/document/delete',
                method: 'POST',
                body: { driver_id: driverId },
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: 'admin/logout',
                method: 'POST',
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useGetProfileQuery,
    useCreateAdminMutation,
    useUpdatePasswordMutation,
    // useGetDashboardStatsQuery,
    useGetUsersQuery,
    useGetUserQuery,
    useUpdateUserStatusMutation,
    useUpdateUserDetailsMutation,
    useDeleteUserMutation,
    useGetDriversQuery,
    useGetDriverQuery,
    useUpdateDriverStatusMutation,
    useUpdateDriverDetailsMutation,
    useDeleteDriverMutation,
    useGetDriverDocumentsMutation,
    useUpdateDriverDocumentStatusMutation,
    useDeleteDriverDocumentsMutation,
    useUploadDriverDocumentMutation,
    useLogoutMutation,
} = adminApi;
