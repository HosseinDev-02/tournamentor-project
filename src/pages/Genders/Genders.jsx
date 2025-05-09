import React, { useEffect, useState } from "react";
import Box from "../../components/Box/Box.jsx";
import PrimaryButton from "../../components/Buttons/PrimaryButton/PrimaryButton.jsx";
import { BiEdit, BiTrash, BiX } from "react-icons/bi";
import Input from "../../components/Input/Input.jsx";
import Swal from "sweetalert2";
import Modal from "../../components/Modal/Modal.jsx";
import Accordion from "../../components/Accordion/Accordion.jsx";
import {
    useAddGenderMutation,
    useGetGenderQuery,
    useGetGendersQuery,
    useUpdateGenderMutation,
} from "../../redux/api/gendersApi.js";
import { useGetStatesQuery } from "../../redux/api/typesApi.js";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedGenderId } from "../../redux/Gender/genderSlice.js";

function Genders() {
    const [showNewGenderModal, setShowNewGenderModal] = useState(false);
    const [newGenderTitle, setNewGenderTitle] = useState("");
    const [selectedState, setSelectedState] = useState(null);
    const [mainGenderTitle, setMainGenderTitle] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const { data: gendersResult, isLoading: loadingGendersResult } =
        useGetGendersQuery();
    const { data: statesResult } = useGetStatesQuery();
    const [addGender] = useAddGenderMutation();
    const dispatch = useDispatch();
    const mainGenderId = useSelector((state) => state.gender.selectedGenderId);

    const [formData, setFormData] = useState({ gender: "", state: "", id: "" });

    const { data: mainGender } = useGetGenderQuery(mainGenderId, {
        skip: !mainGenderId,
    });
    const [updateGender] = useUpdateGenderMutation();

    // Add Gender Function

    const addNewGender = async () => {
        const newGender = {
            gender: formData.gender,
        };

        try {
            const response = await addGender(newGender).unwrap();
            if (response.httpCode === 200) {
                Swal.fire({
                    title: "جنسیت اضافه شد",
                    icon: "success",
                    confirmButtonText: "بستن",
                }).then((res) => {
                    if (res.isConfirmed) {
                        // setAddGenderIsSucceeded((prevState) => !prevState);
                        setShowNewGenderModal(false);
                        setNewGenderTitle("");
                    }
                });
            } else {
                throw new Error("هنگام افزودن جنسیت خطایی رخ داد");
            }
        } catch (error) {
            Swal.fire({
                title: "مشکلی پیش امد",
                icon: "error",
                confirmButtonText: "فهمیدم",
            });
        }

        // if (newGenderTitle) {
        // const response = await api.post("/Gender/Add", {
        //     gender: newGenderTitle,
        // });

        // const { data: result } = response;
        // const { httpCode: status } = result;

        // }
    };

    useEffect(() => {
        if (mainGender) {
            setFormData({
                gender: mainGender.response.gender,
                state: mainGender.response.state,
                id: mainGender.response.id,
            });
        }
    }, [mainGender]);

    // Show Edit Modal Function

    const editModalHandler = (mainGenderId) => {
        dispatch(setSelectedGenderId(mainGenderId));
        setShowEditModal(true);
    };

    // Edit Gender Function

    const editGenderHandler = async () => {
        const newData = {
            id: formData.id,
            gender: formData.gender,
            state: selectedState ?? formData.state,
        };
        try {
            const response = await updateGender(newData).unwrap();
            if (response.httpCode === 200) {
                Swal.fire({
                    title: "تغییرات اعمال شد",
                    icon: "success",
                    confirmButtonText: "بستن",
                }).then((res) => {
                    if (res.isConfirmed) {
                        closeModalHandler();
                    }
                });
            } else {
                throw new Error("هنگام بروزرسانی آواتار خطایی رخ داد");
            }
        } catch (error) {
            Swal.fire({
                title: "مشکلی پیش امد",
                icon: "error",
                confirmButtonText: "فهمیدم",
            });
        }
    };

    const inputValueChangeHandler = (e) => {
        const { value, name } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    // Close Modal Function

    const closeModalHandler = () => {
        setShowEditModal(false);
        setSelectedState(null);
        setMainGenderTitle("");
    };

    return (
        <Box>
            {/* Genders Page Header */}
            <div className="flex-col sm:flex-row gap-6 flex items-center justify-between mb-6">
                <h2 className="font-Estedad-Bold text-xl text-black">
                    لیست جنسیت ها
                </h2>
                <PrimaryButton
                    onClick={() => setShowNewGenderModal(true)}
                    className="!w-auto shrink-0"
                    title="افزودن جنسیت"
                />
                {/* Add Gender Modal */}
                <Modal
                    showModal={showNewGenderModal}
                    closeModalHandler={() => setShowNewGenderModal(false)}
                >
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                        }}
                        className="flex flex-col gap-4"
                        action="#"
                    >
                        <Input
                            type="text"
                            onInput={inputValueChangeHandler}
                            placeholder="عنوان جنسیت را وارد کنید"
                            label="جنسیت"
                            name="gender"
                        />
                        <PrimaryButton
                            onClick={addNewGender}
                            title="افزودن جنسیت"
                        />
                    </form>
                </Modal>
            </div>
            {/* Genders Table */}
            <div className="w-full mt-10 overflow-auto">
                <>
                    {loadingGendersResult ? (
                        <>
                            {/* Genders Table Header */}
                            <div className="bg-red-50 text-black font-IranYekan-Bold text-xl p-2 rounded-md">
                                <h4>اطلاعاتی وجود ندارد</h4>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Genders Table */}
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
                                                عنوان
                                            </span>
                                        </th>
                                        <th>
                                            <span className="text-title text-lg">
                                                وضعیت
                                            </span>
                                        </th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody className="font-IranYekan-Medium text-2sm">
                                    {gendersResult?.response.length !== 0 &&
                                        gendersResult?.response.map(
                                            (item, index) => (
                                                <tr
                                                    key={item.id}
                                                    className="*:px-6 *:py-3.5 border-b border-zinc"
                                                >
                                                    <td className="hidden md:table-cell">
                                                        {index + 1}
                                                    </td>
                                                    <td>{item.gender}</td>
                                                    <td>
                                                        <span
                                                            className={`${
                                                                (item.state ===
                                                                    0 &&
                                                                    "bg-success/20 text-success") ||
                                                                (item.state ===
                                                                    1 &&
                                                                    "bg-yellow/20 text-yellow") ||
                                                                (item.state ===
                                                                    2 &&
                                                                    "bg-red/20 text-red")
                                                            } font-IranYekan-Bold text-xs rounded py-1 px-2.5 inline-flex items-center justify-center`}
                                                        >
                                                            {(item.state ===
                                                                0 &&
                                                                "فعال") ||
                                                                (item.state ===
                                                                    1 &&
                                                                    "غیر فعال") ||
                                                                (item.state ===
                                                                    2 &&
                                                                    "حذف شده")}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div className="flex items-center justify-center gap-2">
                                                            <span
                                                                onClick={() =>
                                                                    editModalHandler(
                                                                        item.id
                                                                    )
                                                                }
                                                                className="w-6 h-6 flex items-center justify-center cursor-pointer"
                                                            >
                                                                <BiEdit size="20px" />
                                                            </span>
                                                            {/* <span className="w-6 h-6 flex items-center justify-center cursor-pointer">
                                                        <BiTrash size="20px" />
                                                    </span> */}
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                </tbody>
                            </table>
                        </>
                    )}
                </>
                {/* Edit Gender Modal */}
                {mainGender && (
                    <Modal
                        showModal={showEditModal}
                        closeModalHandler={closeModalHandler}
                    >
                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                            }}
                            className="flex flex-col gap-4"
                            action="#"
                        >
                            <Input
                                defaultValue={formData.gender || ""}
                                type="text"
                                name="gender"
                                onInput={inputValueChangeHandler}
                                placeholder="عنوان جنسیت را وارد کنید"
                                label="جنسیت"
                            />
                            <Accordion
                                items={statesResult || []}
                                label="انتخاب وضعیت"
                                mainItemId={formData.state}
                                setMainItemId={setSelectedState}
                            />
                            <PrimaryButton
                                onClick={editGenderHandler}
                                title="ذخیره اطلاعات"
                            />
                        </form>
                    </Modal>
                )}
            </div>
        </Box>
    );
}

export default Genders;
