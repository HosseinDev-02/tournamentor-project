import React, { useEffect, useState } from "react";
import Box from "../../../components/admin-panel/Box/Box.jsx";
import PrimaryButton from "../../../components/admin-panel/PrimaryButton/PrimaryButton.jsx";
import Modal from "../../../components/admin-panel/Modal/Modal.jsx";
import Accordion from "../../../components/admin-panel/Accordion/Accordion.jsx";
import { BiCheck, BiEdit, BiShow, BiX } from "react-icons/bi";
import Input from "../../../components/admin-panel/Input/Input.jsx";
import Swal from "sweetalert2";
import {
    useAddUserMutation,
    useGetUserQuery,
    useGetUsersQuery,
    useUpdateUserMutation,
} from "../../../redux/api/usersApi.js";

import { useGetShortAvatarsQuery } from "../../../redux/api/avatarsApi.js";

import { useGetShortGendersQuery } from "../../../redux/api/gendersApi.js";

import { useDispatch, useSelector } from "react-redux";
import { setSelectedUserId } from "../../../redux/User/userSlice.js";
import Pagination from "../../../components/admin-panel/Pagination/Pagination.jsx";
import useDebounce from "../../../hooks/useDebounce.js";
import { useNavigate } from "react-router-dom";
function Users() {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
        phoneNumber: "",
        genderId: "",
        avatarId: "",
    });
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [selectedGender, setSelectedGender] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [showEditModal, setShowEditModal] = useState(false);
    const [mainUserEmailConfirmed, setMainUserEmailConfirmed] = useState(false);
    const [mainUserPhoneConfirmed, setMainUserPhoneConfirmed] = useState(false);
    const [rolesList, setRolesList] = useState([]);
    const [userRoles, setUserRoles] = useState([]);
    const [searchParam, setSearchParam] = useState("");
    const deBouncedUsername = useDebounce(searchParam, 500);
    const navigate = useNavigate()
    const {
        data: usersResult,
        isLoading: loadingUsersResult,
        error,
    } = useGetUsersQuery({
        currentPage,
        deBouncedUsername,
    });
    const { data: avatarsResult } = useGetShortAvatarsQuery();
    const { data: gendersResult } = useGetShortGendersQuery();
    console.warn("Search Users Items By Pagination");
    console.log("Users :", { usersResult, loadingUsersResult, error });

    const [addUser] = useAddUserMutation();

    const dispatch = useDispatch();
    const selectedUserId = useSelector((state) => state.user.selectedUserId);

    const { data: mainUser } = useGetUserQuery(selectedUserId, {
        skip: !selectedUserId,
    });

    const [updateUser] = useUpdateUserMutation();

    useEffect(() => {
        if (mainUser) {
            setFormData({
                userName: mainUser.response.userName,
                email: mainUser.response.email,
                phoneNumber: mainUser.response.phone,
            });
            setSelectedGender(mainUser.response.genderId);
            setMainUserEmailConfirmed(mainUser.response.emailConfirmed);
            setMainUserPhoneConfirmed(mainUser.response.phoneConfirmed);
            setRolesList(mainUser.response.roles);
            setUserRoles(mainUser.response.currentRoles);
        }
    }, [mainUser]);

    // Add Avatar Function

    const addNewUserHandler = async () => {
        const newUser = {
            userName: formData.userName,
            email: formData.email,
            password: formData.password,
            phoneNumber: formData.phoneNumber,
            genderId: selectedGender,
            avatarId: selectedAvatar,
        };
        try {
            const response = await addUser(newUser).unwrap();
            console.log(response);
            if (response.httpCode === 200) {
                Swal.fire({
                    title: "کاربر اضافه شد",
                    icon: "success",
                    confirmButtonText: "بستن",
                }).then((res) => {
                    if (res.isConfirmed) {
                        closeModalHandler();
                    }
                });
            } else {
                throw new Error("هنگام افزودن کاربر خطایی رخ داد");
            }
        } catch (error) {
            Swal.fire({
                title: "مشکلی پیش امد",
                icon: "error",
                confirmButtonText: "اوکی",
            });
        }
    };

    // Show Edit Modal Function

    const editModalHandler = (mainUserId) => {
        dispatch(setSelectedUserId(mainUserId));
        setShowEditModal(true);
    };

    // Edit User Function

    const editUserHandler = async () => {
        const userData = {
            id: mainUser.response.id,
            userName: formData.userName,
            phone: formData.phoneNumber,
            email: formData.email,
            genderId: selectedGender,
            roles: rolesList,
            currentRoles: userRoles,
            emailConfirmed: mainUserEmailConfirmed,
            phoneConfirmed: mainUserPhoneConfirmed,
        };

        try {
            const response = await updateUser(userData).unwrap();
            console.log(response);
            if (response.httpCode === 200) {
                Swal.fire({
                    title: "تغییرات ذخیره شد",
                    icon: "success",
                    confirmButtonText: "بستن",
                }).then((res) => {
                    if (res.isConfirmed) {
                        clearInputs();
                        setShowEditModal(false);
                    }
                });
            } else {
                throw new Error("هنگام بروزرسانی کاربر خطایی رخ داد");
            }
        } catch (error) {
            Swal.fire({
                title: "مشکلی پیش امد",
                icon: "error",
                confirmButtonText: "فهمیدم",
            });
        }
    };

    // Close Modal Function

    const closeModalHandler = () => {
        setShowModalCreateUser(false);
        clearInputs();
    };

    const clearInputs = () => {
        setFormData({
            userName: "",
            email: "",
            password: "",
            phoneNumber: "",
            genderId: "",
            avatarId: "",
        });
        setSelectedAvatar(null);
        setSelectedGender(null);
        setMainUserEmailConfirmed(false);
        setMainUserPhoneConfirmed(false);
    };

    const closeEditModalHandler = () => {
        setShowEditModal(false);
        clearInputs();
    };

    // User Role Selection Handler

    const userSelectionRole = (mainRole) => {
        const isOnList = userRoles.some((role) => role.id === mainRole.id);
        if (!isOnList) {
            setUserRoles((prevRoles) => [...prevRoles, mainRole]);
        }
    };

    // Onchange Input Function

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    // Remove User Role

    const removeRoleHandler = (mainRoleId) => {
        setUserRoles((prevRoles) =>
            prevRoles.filter((role) => role.id !== mainRoleId)
        );
    };

    return (
        <Box>
            {/* avatars Page Header */}
            <div className="flex-col sm:flex-row gap-6 flex items-center justify-between mb-6">
                <h2 className="font-Estedad-Bold text-xl text-black">
                    لیست کاربران
                </h2>
                <div className="flex gap-4">
                    <Input
                        type="text"
                        onInput={(e) => setSearchParam(e.target.value)}
                        placeholder="جستجو بر اساس نام کاربری"
                    />
                    <PrimaryButton
                        onClick={() => setShowModalCreateUser(true)}
                        className="!w-auto shrink-0"
                        title="افزودن کاربر"
                    />
                </div>
                {/* Add User Modal */}
                <Modal
                    showModal={showModalCreateUser}
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
                            name="userName"
                            type="text"
                            label="نام کاربری"
                            onInput={onChangeHandler}
                            value={formData.userName || ""}
                        />
                        <Input
                            name="email"
                            type="text"
                            label="ایمیل"
                            onInput={onChangeHandler}
                            value={formData.email || ""}
                        />
                        <Input
                            name="password"
                            type="password"
                            label="رمز"
                            onInput={onChangeHandler}
                            value={formData.password || ""}
                        />
                        <Input
                            name="phoneNumber"
                            type="text"
                            label="شماره تماس"
                            onInput={onChangeHandler}
                            value={formData.phoneNumber || ""}
                        />
                        {/* User Avatar */}
                        <Accordion
                            items={avatarsResult?.response || []}
                            label="آواتار"
                            mainItemId={selectedAvatar}
                            setMainItemId={setSelectedAvatar}
                            imageItems={true}
                        />
                        {/* User Gender */}
                        <Accordion
                            items={gendersResult?.response || []}
                            label="جنسیت کاربر"
                            mainItemId={selectedGender}
                            setMainItemId={setSelectedGender}
                        />
                        <PrimaryButton
                            onClick={addNewUserHandler}
                            title="افزودن کاربر"
                        />
                    </form>
                </Modal>
            </div>
            {/* Table */}
            <div className="w-full mt-10 overflow-auto">
                {/* Table */}
                <>
                    {loadingUsersResult ? (
                        <>
                            {/* avatars Table Header */}
                            <div className="bg-red-50 text-black font-IranYekan-Bold text-xl p-2 rounded-md">
                                <h4>اطلاعاتی وجود ندارد</h4>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* avatars Table */}
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
                                                نام کاربری
                                            </span>
                                        </th>

                                        <th>
                                            <span className="text-title text-lg">
                                                ایمیل
                                            </span>
                                        </th>
                                        <th>
                                            <span className="text-title text-lg">
                                                تراکنش ها
                                            </span>
                                        </th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody className="font-IranYekan-Medium text-2sm">
                                    {usersResult?.response.map(
                                        (user, index) => (
                                            <tr
                                                key={user.id}
                                                className="*:px-6 *:py-3.5 border-b border-zinc"
                                            >
                                                <td className="hidden md:table-cell">
                                                    {index + 1}
                                                </td>

                                                <td>{user.userName}</td>
                                                <td>{user.email}</td>
                                                <td>
                                                    <div className="flex items-center justify-center gap-2">
                                                        <span onClick={() => navigate(`/transactions/user/${user.id}`)} className="w-6 h-6 flex items-center justify-center cursor-pointer">
                                                            <BiShow size="20px" />
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flex items-center justify-center gap-2">
                                                        <span
                                                            onClick={() =>
                                                                editModalHandler(
                                                                    user.id
                                                                )
                                                            }
                                                            className="w-6 h-6 flex items-center justify-center cursor-pointer"
                                                        >
                                                            <BiEdit size="20px" />
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
                                itemsCount={usersResult?.totalPages}
                            />
                        </>
                    )}
                </>
                {/* Edit User Modal */}
                {mainUser && (
                    <Modal
                        showModal={showEditModal}
                        closeModalHandler={closeEditModalHandler}
                    >
                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                            }}
                            className="flex flex-col gap-4"
                            action="#"
                        >
                            <Input
                                value={formData.userName ?? ""}
                                type="text"
                                onInput={onChangeHandler}
                                label="نام کاربری"
                                name="userName"
                            />
                            <Input
                                value={formData.email ?? ""}
                                type="text"
                                onInput={onChangeHandler}
                                label="ایمیل"
                                name="email"
                            />
                            <Input
                                value={formData.phoneNumber ?? ""}
                                type="text"
                                onInput={onChangeHandler}
                                label="شماره تماس"
                                name="phoneNumber"
                            />
                            <div className="flex justify-between">
                                <Input
                                    type="checkbox"
                                    checkIcon="BiCheck"
                                    uncheckIcon="BiX"
                                    label="تایید ایمیل"
                                    checked={mainUserEmailConfirmed ?? false}
                                    onChange={() =>
                                        setMainUserEmailConfirmed(
                                            (prevState) => !prevState
                                        )
                                    }
                                />
                                <Input
                                    type="checkbox"
                                    checkIcon="BiCheck"
                                    uncheckIcon="BiX"
                                    label="تایید شماره"
                                    checked={mainUserPhoneConfirmed ?? false}
                                    onChange={() =>
                                        setMainUserPhoneConfirmed(
                                            (prevState) => !prevState
                                        )
                                    }
                                />
                            </div>
                            {/* User Gender */}
                            <Accordion
                                items={gendersResult?.response || []}
                                label="جنسیت کاربر"
                                mainItemId={selectedGender}
                                setMainItemId={setSelectedGender}
                            />
                            {/* User Selection Rules */}
                            <Accordion
                                items={rolesList}
                                label="انتخاب سطح دسترسی"
                                mainItemId={userRoles}
                                selectionHandler={(item) =>
                                    userSelectionRole(item)
                                }
                                valueName="roleName"
                            />
                            {/* User Roles */}
                            <div className="flex flex-col gap-4">
                                <span className="font-IranYekan-Medium text-xs">
                                    دسترسی های کاربر
                                </span>
                                <div className="flex gap-4 flex-wrap">
                                    {userRoles.map((role) => (
                                        <div
                                            className="relative bg-secondary text-white px-2 rounded font-IranYekan-Medium text-2xs"
                                            key={role.id}
                                        >
                                            <span>{role.roleName}</span>
                                            {role.roleName !== "User" && (
                                                <span
                                                    onClick={() =>
                                                        removeRoleHandler(
                                                            role.id
                                                        )
                                                    }
                                                    className="flex cursor-pointer items-center justify-center w-5 h-5 rounded-full bg-white text-red absolute -right-3 -top-3"
                                                >
                                                    <BiX size={15} />
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <PrimaryButton
                                onClick={editUserHandler}
                                title="ذخیره اطلاعات"
                            />
                        </form>
                    </Modal>
                )}
            </div>
        </Box>
    );
}

export default Users;
