import React, { useEffect, useState } from "react";
import Box from "../../components/Box/Box.jsx";
import PrimaryButton from "../../components/Buttons/PrimaryButton/PrimaryButton.jsx";
import Modal from "../../components/Modal/Modal.jsx";
import {
    useGetPlayerQuery,
    useGetPlayersQuery,
    useUpdatePlayerMutation,
} from "../../redux/api/playersApi.js";
import { BiEdit, BiPlus, BiX } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedPlayerId } from "../../redux/Player/playerSlice.js";
import { useGetStatesQuery } from "../../redux/api/typesApi.js";
import { useGetShortAvatarsQuery } from "../../redux/api/avatarsApi.js";
import Accordion from "../../components/Accordion/Accordion.jsx";
import Input from "../../components/Input/Input.jsx";
import { useGetShortGamesQuery } from "../../redux/api/gamesApi.js";
import Pagination from "../../components/Pagination/Pagination.jsx";
import useDebounce from "../../hooks/useDebounce.js";
import Swal from "sweetalert2";

function Players() {
    const [currentPage, setCurrentPage] = useState(1);
    const { data: statesResult } = useGetStatesQuery();
    const { data: avatarsResult } = useGetShortAvatarsQuery();
    const { data: shortGamesResult } = useGetShortGamesQuery();
    const [selectedState, setSelectedState] = useState(null);
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddMembersModal, setShowAddMembersModal] = useState(false);
    const [gameMembers, setGameMembers] = useState([]);
    const [updatePlayer] = useUpdatePlayerMutation();
    const [selectedGame, setSelectedGame] = useState(null);
    const [searchParam, setSearchParam] = useState("");
    const deBouncedUsername = useDebounce(searchParam, 500);
    const { data: playersResult, isLoading: loadingPlayersResult } =
        useGetPlayersQuery({
            currentPage,
            deBouncedUsername,
        });
    const [formData, setFormData] = useState({
        nickName: "",
    });
    const selectedPlayerId = useSelector(
        (state) => state.player.selectedPlayerId
    );
    const dispatch = useDispatch();
    const { data: mainPlayer } = useGetPlayerQuery(selectedPlayerId, {
        skip: !selectedPlayerId,
    });
    console.log("Players Result :", playersResult);
    // console.log("States Result :", statesResult);
    // console.log("Avatars Result :", avatarsResult);
    // console.log("Main Player :", mainPlayer);
    // console.log("Games Result :", shortGamesResult);

    useEffect(() => {
        if (mainPlayer) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                nickName: mainPlayer.response.nickName,
            }));
            setSelectedAvatar(mainPlayer.response.avatarId);
            setSelectedState(mainPlayer.response.state);
            setGameMembers(mainPlayer.response.nickNames);
        }
    }, [mainPlayer]);

    // Show Edit Modal Function

    const editModalHandler = (playerId) => {
        setShowEditModal(true);
        // console.log(playerId);
        dispatch(setSelectedPlayerId(playerId));
        // console.log("Main Player :", mainPlayer);
    };

    // Edit Player Function

    const editPlayerHandler = async () => {
        const playerData = {
            id: mainPlayer.response.id,
            userId: mainPlayer.response.userId,
            avatarId: selectedAvatar,
            state: selectedState,
            nickName: formData.nickName,
            nickNames: gameMembers,
        };
        try {
            const response = await updatePlayer(playerData).unwrap();
            // console.log(response);
            if (response.httpCode === 200) {
                Swal.fire({
                    title: "تغییرات ذخیره شد",
                    icon: "success",
                    confirmButtonText: "بستن",
                }).then((res) => {
                    if (res.isConfirmed) {
                        setSelectedAvatar(null);
                        setFormData({ nickName: "" });
                        setSelectedState(null);
                        setShowEditModal(false);
                    }
                });
            } else {
                throw new Error("هنگام بروزرسانی بازیکن خطایی رخ داد");
            }
        } catch (error) {
            Swal.fire({
                title: "مشکلی پیش امد",
                icon: "error",
                confirmButtonText: "فهمیدم",
            });
        }
        // console.log("Player Data :", playerData);
        // console.log("Player Response :", response);
    };

    const closeEditModalHandler = () => {
        setShowEditModal(false);
    };

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    return (
        <Box>
            {/* avatars Page Header */}
            <div className="flex-col sm:flex-row gap-6 flex items-center justify-between mb-6">
                <h2 className="font-Estedad-Bold text-xl text-black">
                    لیست بازیکن ها
                </h2>
                <Input
                    className="!w-auto"
                    type="text"
                    onInput={(e) => setSearchParam(e.target.value)}
                    placeholder="جستجو بر اساس نام بازیکن"
                />
            </div>
            {/* Table */}
            <div className="w-full mt-10 overflow-auto">
                {/* Table */}
                {loadingPlayersResult ? (
                    <div className="bg-red-50 text-black font-IranYekan-Bold text-xl p-2 rounded-md">
                        <h4>اطلاعاتی وجود ندارد</h4>
                    </div>
                ) : (
                    <>
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
                                            نام بازیکن
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
                                {playersResult?.response?.length !== 0 &&
                                    playersResult?.response?.map(
                                        (player, index) => (
                                            <tr
                                                key={player.id}
                                                className="*:px-6 *:py-3.5 border-b border-zinc"
                                            >
                                                <td className="hidden md:table-cell">
                                                    {index + 1}
                                                </td>
                                                <td>
                                                    <img
                                                        className="w-16 h-12 rounded"
                                                        src={`${player.avatar}`}
                                                        alt={player.nickName}
                                                    />
                                                </td>
                                                <td>{player.nickName}</td>
                                                <td>
                                                    <span
                                                        className={`${
                                                            (player.state ===
                                                                0 &&
                                                                "bg-success/20 text-success") ||
                                                            (player.state ===
                                                                1 &&
                                                                "bg-yellow/20 text-yellow") ||
                                                            (player.state ===
                                                                2 &&
                                                                "bg-red/20 text-red")
                                                        } font-IranYekan-Bold text-xs rounded py-1 px-2.5 inline-flex items-center justify-center`}
                                                    >
                                                        {(player.state === 0 &&
                                                            "فعال") ||
                                                            (player.state ===
                                                                1 &&
                                                                "غیر فعال") ||
                                                            (player.state ===
                                                                2 &&
                                                                "حذف شده")}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="flex items-center justify-center gap-2">
                                                        <span
                                                            onClick={() =>
                                                                editModalHandler(
                                                                    player.id
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
                            itemsCount={playersResult?.totalPages}
                        />
                    </>
                )}
            </div>
            {/* Edit Avatar Modal */}
            {mainPlayer && (
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
                        {/* Player State */}
                        <Input
                            name="nickName"
                            type="text"
                            label="نام مستعار"
                            onInput={onChangeHandler}
                            value={formData.nickName || ""}
                        />
                        <Accordion
                            items={statesResult || []}
                            label="انتخاب وضعیت"
                            mainItemId={selectedState}
                            setMainItemId={setSelectedState}
                        />
                        {/* Player Avatar */}
                        <Accordion
                            items={avatarsResult?.response || []}
                            label="انتخاب آواتار"
                            mainItemId={selectedAvatar}
                            setMainItemId={setSelectedAvatar}
                            imageItems={true}
                        />
                        {/*  */}
                        <PrimaryButton
                            onClick={editPlayerHandler}
                            title="ذخیره اطلاعات"
                        />
                    </form>
                </Modal>
            )}
        </Box>
    );
}

export default Players;
