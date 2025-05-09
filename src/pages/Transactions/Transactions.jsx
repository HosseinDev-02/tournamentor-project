import React, { useEffect, useState } from "react";
import Box from "../../components/Box/Box.jsx";
import PrimaryButton from "../../components/Buttons/PrimaryButton/PrimaryButton.jsx";
import Modal from "../../components/Modal/Modal.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";
import {
    useAddTransactionMutation,
    useGetTransactionsQuery,
    useRevertTransactionMutation,
    useUpdateTransactionMutation,
} from "../../redux/api/walletsApi.js";
import { useParams, useSearchParams } from "react-router-dom";
import {
    useGetTransactionForQuery,
    useGetTransactionStatesQuery,
    useGetTransactionTypesQuery,
} from "../../redux/api/typesApi.js";
import { BiRevision, BiSync } from "react-icons/bi";
import Accordion from "../../components/Accordion/Accordion.jsx";
import Swal from "sweetalert2";
import Input from "../../components/Input/Input.jsx";

const setTransactionType = (type) => {
    return (type == 1 && "واریز") || (type == 2 && "برداشت");
};

const setTransactionState = (state) => {
    return (
        (state == 1 && "در حال پردازش") ||
        (state == 2 && "تایید شد") ||
        (state == 3 && "تکمیل شد") ||
        (state == 4 && "رد شد") ||
        (state == 5 && "ناموفق") ||
        (state == 6 && "لغو شد") ||
        (state == 7 && "برگشت")
    );
};

const setTransactionFor = (item) => {
    return (item == 1 && "حساب کاربری") || (item == 2 && "تورنومنت");
};

const setTransactionStateStyle = (state) => {
    return (
        ((state == 1 || state == 5) && "text-yellow bg-yellow/20") ||
        ((state == 3 || state == 2) && "text-success bg-success/20") ||
        ((state == 4 || state == 6) && "text-red bg-red/20") ||
        (state == 7 && "text-secondary bg-secondary/20")
    );
};

function Transactions() {
    const param = useParams();
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const { data: transactionsResult, isLoading: loadingTransactions } =
        useGetTransactionsQuery({
            User: param.userId,
            WalletId: param.walletId,
        });
    const { data: transactionFor } = useGetTransactionForQuery();
    const { data: transactionStates } = useGetTransactionStatesQuery();
    const { data: transactionTypes } = useGetTransactionTypesQuery();
    const [formData, setFormData] = useState({
        transactionState: null,
        transactionId: null,
        transactionValue: null,
        walletId: null,
        transactionFor: null,
        transactionType: null,
        description: null,
    });

    const [updateTransaction] = useUpdateTransactionMutation();
    const [revertTransaction] = useRevertTransactionMutation();
    const [addTransaction] = useAddTransactionMutation();

    useEffect(() => {
        if (transactionsResult) {
            console.log("Transactions :", transactionsResult);
        }
    }, [transactionsResult]);

    const addNewTransaction = async () => {
        const newData = {
            walletId: param.walletId,
            value: formData.transactionValue,
            description: formData.description,
            transactionFor: formData.transactionFor,
            transactionState: formData.transactionState,
            transactionType: formData.transactionType,
        };

        try {
            const response = await addTransaction(newData).unwrap();
            const { httpCode } = response;
            console.log(response);

            if (httpCode == 200) {
                Swal.fire({
                    title: "تراکنش اضافه شد",
                    icon: "success",
                    confirmButtonText: "بستن",
                }).then((res) => {
                    if (res.isConfirmed) {
                        closeCreateModalHandler();
                    }
                });
            } else {
                throw new Error("هنگام تغییر وضعیت خطایی رخ داد");
            }
        } catch (error) {
            Swal.fire({
                title: "خطایی رخ داد",
                icon: "error",
                confirmButtonText: "بستن",
            }).then((res) => {
                if (res.isConfirmed) {
                    closeCreateModalHandler();
                }
            });
        }
    };

    const handlerUpdateTransaction = async () => {
        const newData = {
            transactionId: formData.transactionId,
            transactionState: formData.transactionState,
        };

        try {
            const response = await updateTransaction(newData).unwrap();
            const { httpCode } = response;

            console.log(response);

            if (httpCode == 200) {
                Swal.fire({
                    title: "اطلاعات ذخیره شد",
                    icon: "success",
                    confirmButtonText: "بستن",
                }).then((res) => {
                    if (res.isConfirmed) {
                        closeUpdateModalHandler();
                    }
                });
            } else {
                throw new Error("هنگام تغییر وضعیت خطایی رخ داد");
            }
        } catch (err) {
            Swal.fire({
                title: "خطایی رخ داد",
                icon: "error",
                confirmButtonText: "بستن",
            }).then((res) => {
                if (res.isConfirmed) {
                    closeUpdateModalHandler();
                }
            });
        }
    };

    const setFormDataHandler = (dataLabel, value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [dataLabel]: value,
        }));
    };

    const revertTransactionHandler = (transactionId) => {
        Swal.fire({
            title: "آیا از این کار اطمینان دارید ؟",
            icon: "question",
            confirmButtonText: "بله",
            cancelButtonText: "خیر",
            showCancelButton: true,
        }).then(async (res) => {
            if (res.isConfirmed) {
                const newData = {
                    transactionId,
                };
                console.log("confirmed");
                try {
                    const response = await revertTransaction(newData).unwrap();
                    const { httpCode } = response;

                    console.log(response);

                    if (httpCode == 200) {
                        Swal.fire({
                            title: "تراکنش برگشت خورد",
                            icon: "success",
                            confirmButtonText: "بستن",
                        });
                    } else {
                        throw new Error("هنگام تغییر وضعیت خطایی رخ داد");
                    }
                } catch (error) {
                    Swal.fire({
                        title: "خطایی رخ داد",
                        icon: "error",
                        confirmButtonText: "بستن",
                    });
                }
            }
        });
    };

    // Close Modal Function

    const closeCreateModalHandler = () => {
        setFormData({
            transactionState: null,
            transactionId: null,
            transactionValue: null,
            walletId: null,
            transactionFor: null,
            transactionType: null,
            description: null,
        });
        setShowCreateModal(false);
    };

    const closeUpdateModalHandler = () => {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                transactionId: null,
                transactionState: null,
            };
        });
        setShowUpdateModal(false);
    };

    return (
        <Box>
            {/* avatars Page Header */}
            <div className="flex-col sm:flex-row gap-6 flex items-center justify-between mb-6">
                <h2 className="font-Estedad-Bold text-xl text-black">
                    لیست تراکنش ها
                </h2>
                <PrimaryButton
                    onClick={() => setShowCreateModal(true)}
                    className="!w-auto shrink-0"
                    title="افزودن تراکنش"
                />
                {/* Add Transaction Modal */}
                <Modal
                    showModal={showCreateModal}
                    closeModalHandler={closeCreateModalHandler}
                >
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                        }}
                        className="flex flex-col gap-4"
                        action="#"
                    >
                        <Input
                            type="number"
                            onInput={(e) =>
                                setFormDataHandler(
                                    "transactionValue",
                                    parseInt(e.target.value)
                                )
                            }
                            placeholder="مقدار حجم تراکنش"
                            label="حجم تراکنش"
                            name="transactionValue"
                            value={formData?.transactionValue || ""}
                        />
                        <Input
                            type="textarea"
                            onInput={(e) =>
                                setFormDataHandler(
                                    "description",
                                    e.target.value
                                )
                            }
                            placeholder="توضیحات"
                            label="توضیحات تراکنش"
                            name="description"
                            value={formData?.description || ""}
                        />
                        <Accordion
                            items={transactionStates || []}
                            label="وضعیت تراکنش"
                            mainItemId={formData?.transactionState}
                            setMainItemId={(item) => {
                                setFormDataHandler("transactionState", item);
                            }}
                        />
                        <Accordion
                            items={transactionTypes || []}
                            label="نوع تراکنش"
                            mainItemId={formData?.transactionType}
                            setMainItemId={(item) => {
                                setFormDataHandler("transactionType", item);
                            }}
                        />
                        <Accordion
                            items={transactionFor || []}
                            label="تراکنش برای"
                            mainItemId={formData?.transactionFor}
                            setMainItemId={(item) => {
                                setFormDataHandler("transactionFor", item);
                            }}
                        />
                        <PrimaryButton
                            onClick={addNewTransaction}
                            title="افزودن تراکنش"
                        />
                    </form>
                </Modal>
            </div>
            {/* Table */}
            <div className="w-full mt-10 overflow-auto">
                {/* Table */}
                <>
                    {loadingTransactions ? (
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
                                                حجم تراکنش
                                            </span>
                                        </th>
                                        <th>
                                            <span className="text-title text-lg">
                                                نوع تراکنش
                                            </span>
                                        </th>
                                        <th>
                                            <span className="text-title text-lg">
                                                وضعیت تراکنش
                                            </span>
                                        </th>
                                        <th>
                                            <span className="text-title text-lg">
                                                تراکنش برای
                                            </span>
                                        </th>
                                        <th>
                                            <span className="text-title text-lg">
                                                تغییر وضعیت تراکنش
                                            </span>
                                        </th>
                                        <th>
                                            <span className="text-title text-lg">
                                                برگشت تراکنش
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="font-IranYekan-Medium text-2sm">
                                    {transactionsResult?.response?.map(
                                        (transaction, index) => (
                                            <tr
                                                key={transaction?.id}
                                                className="*:px-6 *:py-3.5 border-b border-zinc"
                                            >
                                                <td className="hidden md:table-cell">
                                                    {index + 1}
                                                </td>
                                                <td>{transaction?.user}</td>
                                                <td>
                                                    {transaction?.value.toLocaleString()}
                                                </td>
                                                <td>
                                                    <span
                                                        className={`font-IranYekan-Bold text-xs rounded py-1 px-2.5 inline-flex items-center justify-center`}
                                                    >
                                                        {setTransactionType(
                                                            transaction?.type
                                                        )}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span
                                                        className={`${setTransactionStateStyle(
                                                            transaction?.financialTransactionState
                                                        )} font-IranYekan-Bold text-xs rounded py-1 px-2.5 inline-flex items-center justify-center`}
                                                    >
                                                        {setTransactionState(
                                                            transaction?.financialTransactionState
                                                        )}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span
                                                        className={`font-IranYekan-Bold text-xs rounded py-1 px-2.5 inline-flex items-center justify-center`}
                                                    >
                                                        {setTransactionFor(
                                                            transaction?.for
                                                        )}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="flex items-center justify-center gap-2">
                                                        <PrimaryButton
                                                            icon="BiSync"
                                                            title="تغییر وضعیت"
                                                            onClick={() => {
                                                                setShowUpdateModal(
                                                                    true
                                                                );
                                                                setFormDataHandler(
                                                                    "transactionId",
                                                                    transaction?.id
                                                                );
                                                            }}
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flex items-center justify-center gap-2">
                                                        {transaction?.financialTransactionState ==
                                                            3 && (
                                                            <PrimaryButton
                                                                icon="BiRevision"
                                                                title="برگشت"
                                                                onClick={() =>
                                                                    revertTransactionHandler(
                                                                        transaction?.id
                                                                    )
                                                                }
                                                            />
                                                        )}
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
                                itemsCount={transactionsResult?.totalPages}
                            />
                        </>
                    )}
                </>
                {/* Table Pagination */}

                {/* <Pagination /> */}
            </div>

            {/* Update Transaction Modal */}
            <Modal
                showModal={showUpdateModal}
                closeModalHandler={closeUpdateModalHandler}
            >
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                    }}
                    className="flex flex-col gap-4"
                    action="#"
                >
                    <Accordion
                        items={transactionStates || []}
                        label="وضعیت تراکنش"
                        mainItemId={formData?.transactionState}
                        setMainItemId={(item) => {
                            setFormDataHandler("transactionState", item);
                        }}
                    />
                    <PrimaryButton
                        onClick={handlerUpdateTransaction}
                        title="ویرایش تراکنش"
                    />
                </form>
            </Modal>
        </Box>
    );
}

export default Transactions;
