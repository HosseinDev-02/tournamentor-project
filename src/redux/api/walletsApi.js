import { apiSlice } from "./apiSlice";

export const walletsApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getWallets: build.query({
            query(currentPage) {
                return `Wallet/Wallets?CurrentPage=${currentPage}`;
            },
        }),
        getTransactions: build.query({
            query({ User, WalletId }) {
                const params = new URLSearchParams();
                if (User) params.append("User", User);
                if (WalletId) params.append("WalletId", WalletId);
                return `Wallet/Transactions?${params?.toString()}`;
            },
        }),
        updateTransaction: build.mutation({
            query(newData) {
                return {
                    url: `Wallet/UpdateTransaction`,
                    method: "PUT",
                    body: newData,
                };
            },
        }),
        revertTransaction: build.mutation({
            query(newData) {
                return {
                    url: "Wallet/RevertTransaction",
                    method: "PUT",
                    body: newData,
                };
            },
        }),
        addTransaction: build.mutation({
            query(newData) {
                return {
                    url: `Wallet/NewTransaction`,
                    method: "POST",
                    body: newData,
                };
            },
        }),
    }),
});

export const {
    useGetWalletsQuery,
    useGetTransactionsQuery,
    useRevertTransactionMutation,
    useUpdateTransactionMutation,
    useAddTransactionMutation,
} = walletsApi;
