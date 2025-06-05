import React, { useEffect, useState } from "react";
import Box from "../../../components/admin-panel/Box/Box.jsx";
import PrimaryButton from "../../../components/admin-panel/PrimaryButton/PrimaryButton.jsx";
import { BiEdit, BiTrash, BiX } from "react-icons/bi";
import Swal from "sweetalert2";
import Modal from "../../../components/admin-panel/Modal/Modal.jsx";
import { PiUpload } from "react-icons/pi";
import Accordion from "../../../components/admin-panel/Accordion/Accordion.jsx";
import {
    useAddAvatarMutation,
    useGetAvatarQuery,
    useGetAvatarsQuery,
    useUpdateAvatarMutation,
} from "../../../redux/api/avatarsApi.js";
import {
    useGetStatesQuery,
    useGetTypeAvatarsQuery,
} from "../../../redux/api/typesApi.js";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedAvatarId } from "../../../redux/Avatar/avatarSlice.js";
function Avatars() {
    const [showNewAvatarModal, setShowNewAvatarModal] = useState(false);
    const [selectedType, setSelectedType] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedState, setSelectedState] = useState(null);

    const { data: avatarsResult, isLoading: loadingAvatarsResult } =
        useGetAvatarsQuery();
    const { data: typeAvatarsResult } = useGetTypeAvatarsQuery();
    const { data: statesResult } = useGetStatesQuery();
    const dispatch = useDispatch();
    const selectedMainAvatarId = useSelector(
        (state) => state.avatar.selectedAvatarId
    );
    const [addAvatar] = useAddAvatarMutation();
    const [updateAvatar] = useUpdateAvatarMutation();

    const { data: mainAvatar } = useGetAvatarQuery(selectedMainAvatarId, {
        skip: !selectedMainAvatarId,
    });

    const [formData, setFormData] = useState({
        Avatar: null,
        TypeAvatar: null,
        State: null,
        Id: null,
    });

    useEffect(() => {
        if (mainAvatar) {
            setFormData({
                Avatar: mainAvatar.response.avatar,
                TypeAvatar: mainAvatar.response.typeAvatar,
                State: mainAvatar.response.state,
                Id: mainAvatar.response.id,
            });
            console.log("Main Avatar :", mainAvatar);
        }
    }, [mainAvatar]);

    // Add Avatar Function

    const addNewAvatar = async () => {
        const avatarObj = new FormData();
        avatarObj.append("Avatar", formData.Avatar);
        avatarObj.append("TypeAvatar", formData.TypeAvatar ?? selectedType);
        try {
            const response = await addAvatar(avatarObj).unwrap();

            if (response.httpCode !== 200) {
                throw new Error("خطایی رخ داد"); //در صورت خطا به catch منتقل میشود
            } else {
                Swal.fire({
                    title: "آواتار اضافه شد",
                    icon: "success",
                    confirmButtonText: "بستن",
                }).then((res) => {
                    if (res.isConfirmed) {
                        // setAddAvatarIsSucceeded((prevState) => !prevState);
                        setShowNewAvatarModal(false);
                        setSelectedType(null);
                        // setNewAvatarImage(null);
                    }
                });
            }
        } catch (error) {
            Swal.fire({
                title: "مشکلی پیش امد",
                icon: "error",
                confirmButtonText: "فهمیدم",
            });
        }
    };

    // Show Edit Modal Function

    const editModalHandler = (avatarId) => {
        dispatch(setSelectedAvatarId(avatarId));
        setShowEditModal(true);
    };

    // Edit Avatar Function

    const editAvatarHandler = async () => {
        const avatarObj = new FormData();

        avatarObj.append("Id", formData.Id);
        avatarObj.append("Avatar", formData.Avatar);
        avatarObj.append("TypeAvatar", selectedType ?? formData.TypeAvatar);
        avatarObj.append("State", selectedState ?? formData.State);

        console.log("Id", avatarObj.get("Id"));
        console.log("Avatar", avatarObj.get("Avatar"));
        console.log("TypeAvatar", avatarObj.get("TypeAvatar"));
        console.log("State", avatarObj.get("State"));

        try {
            const response = await updateAvatar(avatarObj).unwrap();
            console.log(response);

            if (response.httpCode === 200) {
                Swal.fire({
                    title: "تغییرات اعمال شد",
                    icon: "success",
                    confirmButtonText: "بستن",
                }).then((res) => {
                    if (res.isConfirmed) {
                        // setAddAvatarIsSucceeded((prevState) => !prevState);
                        closeModalHandler();
                    }
                });
            } else {
                throw new Error("هنگام ذخیره تغییرات آواتار خطایی رخ داد");
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
        setShowEditModal(false);
        setSelectedState(null);
        setSelectedType(null);
        setFormData({ Avatar: null, TypeAvatar: null, State: null, Id: null });
    };

    return (
        <Box>
            {/* avatars Page Header */}
            <div className="flex-col sm:flex-row gap-6 flex items-center justify-between mb-6">
                <h2 className="font-Estedad-Bold text-xl text-black">
                    لیست آواتار ها
                </h2>
                <PrimaryButton
                    onClick={() => setShowNewAvatarModal(true)}
                    className="!w-auto shrink-0"
                    title="افزودن آواتار"
                />
                {/* Add Avatar Modal */}
                <Modal
                    showModal={showNewAvatarModal}
                    closeModalHandler={() => {
                        setShowNewAvatarModal(false);
                        setFormData({
                            Avatar: null,
                            TypeAvatar: null,
                            State: null,
                            Id: null,
                        });
                        setSelectedType(null);
                    }}
                >
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                        }}
                        className="flex flex-col gap-4"
                        action="#"
                    >
                        <Accordion
                            items={typeAvatarsResult || []}
                            label="نوع آواتار"
                            mainItemId={selectedType}
                            setMainItemId={setSelectedType}
                        />
                        <div className="flex flex-col gap-2">
                            <span className="text-2sm font-IranYekan-Medium">
                                انتخاب تصویر
                            </span>
                            <label
                                htmlFor="file-input"
                                className="py-[30px] flex items-center justify-center rounded-xl border-2 border-dashed border-zinc"
                            >
                                <div className="flex flex-col items-center gap-4">
                                    <PiUpload size={24} />
                                    {formData.Avatar && (
                                        <span className="text-2sm font-IranYekan-Medium">
                                            {formData.Avatar.name}
                                        </span>
                                    )}
                                </div>
                                <input
                                    id="file-input"
                                    className="hidden"
                                    type="file"
                                    name="Avatar"
                                    onChange={(e) =>
                                        setFormData((prevFormData) => ({
                                            ...prevFormData,
                                            [e.target.name]: e.target.files[0],
                                        }))
                                    }
                                />
                            </label>
                        </div>
                        <PrimaryButton
                            onClick={addNewAvatar}
                            title="افزودن آواتار"
                        />
                    </form>
                </Modal>
            </div>
            {/* avatars Table */}
            <div className="w-full mt-10 overflow-auto">
                <>
                    {loadingAvatarsResult ? (
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
                                                آواتار
                                            </span>
                                        </th>
                                        <th>
                                            <span className="text-title text-lg">
                                                عنوان
                                            </span>
                                        </th>
                                        <th>
                                            <span className="text-title text-lg">
                                                نوع
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
                                    {avatarsResult?.response?.length !== 0 &&
                                        avatarsResult?.response?.map(
                                            (avatar, index) => (
                                                <tr
                                                    key={avatar.id}
                                                    className="*:px-6 *:py-3.5 border-b border-zinc"
                                                >
                                                    <td className="hidden md:table-cell">
                                                        {index + 1}
                                                    </td>
                                                    <td>
                                                        <img
                                                            className="w-16 h-12 rounded"
                                                            src={`${avatar.avatar}`}
                                                            alt={
                                                                avatar.forAvatar
                                                            }
                                                        />
                                                    </td>
                                                    <td>{avatar.forAvatar}</td>
                                                    <td>{avatar.typeAvatar}</td>
                                                    <td>
                                                        <span
                                                            className={`${
                                                                (avatar.state ===
                                                                    0 &&
                                                                    "bg-success/20 text-success") ||
                                                                (avatar.state ===
                                                                    1 &&
                                                                    "bg-yellow/20 text-yellow") ||
                                                                (avatar.state ===
                                                                    2 &&
                                                                    "bg-red/20 text-red")
                                                            } font-IranYekan-Bold text-xs rounded py-1 px-2.5 inline-flex items-center justify-center`}
                                                        >
                                                            {(avatar.state ===
                                                                0 &&
                                                                "فعال") ||
                                                                (avatar.state ===
                                                                    1 &&
                                                                    "غیر فعال") ||
                                                                (avatar.state ===
                                                                    2 &&
                                                                    "حذف شده")}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div className="flex items-center justify-center gap-2">
                                                            <span
                                                                onClick={() =>
                                                                    editModalHandler(
                                                                        avatar.id
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
                {/* Edit Avatar Modal */}
                {mainAvatar && (
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
                            {/* Avatar State */}

                            <Accordion
                                items={statesResult || []}
                                label="وضعیت آواتار"
                                mainItemId={formData.State}
                                setMainItemId={setSelectedState}
                            />
                            {/* Avatar Type */}
                            <Accordion
                                items={typeAvatarsResult || []}
                                label="نوع آواتار"
                                mainItemId={formData.TypeAvatar}
                                setMainItemId={setSelectedType}
                            />
                            <div className="flex flex-col gap-2">
                                <span className="text-2sm font-IranYekan-Medium">
                                    انتخاب تصویر
                                </span>
                                <label
                                    htmlFor="file-input-edit"
                                    className="py-[30px] flex items-center justify-center rounded-xl border-2 border-dashed border-zinc"
                                >
                                    <div className="flex flex-col items-center gap-4">
                                        <PiUpload size={24} />
                                        {formData.Avatar && (
                                            <span className="text-2sm font-IranYekan-Medium">
                                                {formData.Avatar?.name}
                                            </span>
                                        )}
                                    </div>
                                    <input
                                        id="file-input-edit"
                                        className="hidden"
                                        type="file"
                                        name="Avatar"
                                        onChange={(e) => {
                                            setFormData((prevFormData) => ({
                                                ...prevFormData,
                                                [e.target.name]:
                                                    e.target.files[0],
                                            }));
                                        }}
                                    />
                                </label>
                            </div>
                            <PrimaryButton
                                onClick={editAvatarHandler}
                                title="ذخیره اطلاعات"
                            />
                        </form>
                    </Modal>
                )}
            </div>
        </Box>
    );
}

export default Avatars;
