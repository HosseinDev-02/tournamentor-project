import React, { useEffect, useState } from "react";
import Box from "../../components/Box/Box.jsx";
import PrimaryButton from "../../components/Buttons/PrimaryButton/PrimaryButton.jsx";
import Modal from "../../components/Modal/Modal.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";
import { useGetWalletsQuery } from "../../redux/api/walletsApi.js";
import { BiEdit, BiShow } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const setWalletStateTitle = (state) => {
    return (
        (state == 0 && "فعال") ||
        (state == 1 && "غیرفعال") ||
        (state == 2 && "حذف شده")
    );
};

const setWalletStateStyle = (state) => {
    return (
        (state == 0 && "bg-success/20 text-success") ||
        (state == 1 && "bg-yellow/20 text-yellow") ||
        (state == 2 && "bg-red/20 text-red")
    );
};

function Wallets() {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const  navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(1);
    const { data: walletsResult, isLoading: loadingWalletsResult } =
        useGetWalletsQuery(currentPage);

    console.log("Wallets Result :", walletsResult);

    // Add Avatar Function

    const addNewUserHandler = () => {};

    // Show Edit Modal Function

    // Edit Avatar Function

    // Close Modal Function

    const closeModalHandler = () => {
        setShowModalCreateUser(false);
    };

    return (
        <Box>
            {/* avatars Page Header */}
            <div className="flex-col sm:flex-row gap-6 flex items-center justify-between mb-6">
                <h2 className="font-Estedad-Bold text-xl text-black">
                    لیست کیف پول ها
                </h2>
                {/* Add Avatar Modal */}
            </div>
            {/* Table */}
            <div className="w-full mt-10 overflow-auto">
                <>
                    {loadingWalletsResult ? (
                        <>
                            {/* avatars Table Header */}
                            <div className="bg-red-50 text-black font-IranYekan-Bold text-xl p-2 rounded-md">
                                <h4>اطلاعاتی وجود ندارد</h4>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Table */}

                            <table className="w-full text-right text-nowrap">
                                <thead className="font-IranYekan-Regular text-xs">
                                    <tr className="*:px-6 *:pb-3 border-b border-zinc">
                                        <th className="hidden md:table-cell">
                                            <span className="text-title text-lg">
                                                شناسه
                                            </span>
                                        </th>
                                        <th>
                                            <span className="text-title text-lg">
                                                نام کاربر
                                            </span>
                                        </th>
                                        <th>
                                            <span className="text-title text-lg">
                                                موجودی
                                            </span>
                                        </th>
                                        <th>
                                            <span className="text-title text-lg">
                                                وضعیت
                                            </span>
                                        </th>
                                        <th>
                                            نمایش تراکنش ها
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="font-IranYekan-Medium text-2sm">
                                    {walletsResult?.response?.map(
                                        (wallet, index) => (
                                            <tr
                                                key={wallet.walletId}
                                                className="*:px-6 *:py-3.5 border-b border-zinc"
                                            >
                                                <td className="hidden md:table-cell">
                                                    {index + 1}
                                                </td>
                                                <td>{wallet.user}</td>
                                                <td>
                                                    {wallet.balance.toLocaleString()}
                                                </td>
                                                <td>
                                                    <span
                                                        className={`${setWalletStateStyle(
                                                            wallet.state
                                                        )} font-IranYekan-Bold text-xs rounded py-1 px-2.5 inline-flex items-center justify-center`}
                                                    >
                                                        {setWalletStateTitle(
                                                            wallet.state
                                                        )}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="flex items-center justify-center gap-2">
                                                        <span onClick={() => navigate(`/transactions/wallet/${wallet.walletId}`)} className="w-6 h-6 flex items-center justify-center cursor-pointer">
                                                            <BiShow size="20px" />
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                            {/* Table Pagination */}

                            <Pagination
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                itemsCount={walletsResult?.totalPages}
                            />
                        </>
                    )}
                </>
            </div>
        </Box>
    );
}

export default Wallets;
