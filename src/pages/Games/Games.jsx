import React, { useEffect, useState } from "react";
import Box from "../../components/Box/Box.jsx";
import PrimaryButton from "../../components/Buttons/PrimaryButton/PrimaryButton.jsx";
import Modal from "../../components/Modal/Modal.jsx";
import {
    useAddGameMutation,
    useUpdateGameMutation,
    useGetGameQuery,
    useGetGamesQuery,
} from "../../redux/api/gamesApi.js";
import { useGetGameTypesQuery } from "../../redux/api/typesApi.js";
import Accordion from "../../components/Accordion/Accordion.jsx";
import { PiUpload } from "react-icons/pi";
import Input from "../../components/Input/Input.jsx";
import Swal from "sweetalert2";
import { BiEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedGameId } from "../../redux/Game/gameSlice.js";
// import Pagination from "../../components/Pagination/Pagination.jsx";

const gameTypeText = (type) => {
    return (
        (type === 1 && "All") ||
        (type === 2 && "Battle Royal") ||
        (type === 3 && "Multiplayer")
    );
};

function Games() {
    const [showGameModal, setShowGameModal] = useState(false);
    const [formData, setFormData] = useState({
        gameType: null,
        icon: null,
        limitPlayer: 0,
        name: "",
    });

    const [currentPage, setCurrentPage] = useState(1);
    const { data: gamesResult, isLoading: loadingGamesResult } =
        useGetGamesQuery(currentPage);
    const { data: gameTypesResult } = useGetGameTypesQuery();
    const [addGame] = useAddGameMutation();
    const dispatch = useDispatch();
    const selectedGameId = useSelector((state) => state.game.selectedGameId);
    const { data: mainGame } = useGetGameQuery(selectedGameId, {
        skip: !selectedGameId,
    });
    const [updateGame] = useUpdateGameMutation();
    
    console.log("Games Result :", gamesResult);

    useEffect(() => {
        if (mainGame) {
            console.log("Main Game :", mainGame);
            setFormData({
                gameType: mainGame.response.gameType,
                icon: mainGame.response.icon,
                limitPlayer: mainGame.response.limitPlayer,
                name: mainGame.response.name,
            });
        }
    }, [mainGame]);

    // Add Game Function

    const addNewGameHandler = async () => {
        const gameFormData = new FormData();
        gameFormData.append("GameType", formData.gameType);
        gameFormData.append("Name", formData.name);
        gameFormData.append("Icon", formData.icon);
        gameFormData.append("LimitPlayer", parseInt(formData.limitPlayer));

        try {
            const response = await addGame(gameFormData).unwrap();
            if (response.httpCode !== 200) {
                throw new Error("خطایی رخ داد");
            } else {
                Swal.fire({
                    title: "بازی با موفقیت اضافه شد",
                    icon: "success",
                    confirmButtonText: "بستن",
                }).then((res) => {
                    if (res.isConfirmed) {
                        closeModalHandler();
                    }
                });
            }
            console.log("Add Game Response :", response);
        } catch (error) {
            Swal.fire({
                title: "هنگام افزودن بازی خطایی رخ داد",
                icon: "error",
                confirmButtonText: "فهمیدم",
            }).then((res) => {
                if (res.isConfirmed) {
                    closeModalHandler();
                }
            });
            // console.log(error);
        }
    };

    // Show Edit Modal Function

    const editModalHandler = (gameId) => {
        console.log("Game Id:", gameId);
        dispatch(setSelectedGameId(gameId));
        setShowGameModal(true);
    };

    // Edit Game Function

    const editGameHandler = async () => {
        const editFormData = new FormData();
        editFormData.append("Name", formData.name);
        editFormData.append("GameType", formData.gameType);
        editFormData.append("LimitPlayer", formData.limitPlayer);
        editFormData.append("Icon", formData.icon);
        editFormData.append("Id", selectedGameId);

        console.log("name", editFormData.get("Name"));
        console.log("limitPlayer", editFormData.get("LimitPlayer"));
        console.log("icon", editFormData.get("Icon"));
        console.log("gameType", editFormData.get("GameType"));
        console.log("id", editFormData.get("Id"));

        try {
            const response = await updateGame(editFormData).unwrap();
            if (response.httpCode !== 200) {
                throw new Error("خطایی رخ داد");
            } else {
                Swal.fire({
                    title: "تغییرات ذخیره شد",
                    icon: "success",
                    confirmButtonText: "بستن",
                }).then((res) => {
                    if (res.isConfirmed) {
                        closeModalHandler();
                    }
                });
            }
        } catch (error) {
            Swal.fire({
                title: "هنگام ویرایش بازی خطایی رخ داد",
                icon: "error",
                confirmButtonText: "فهمیدم",
            }).then((res) => {
                if (res.isConfirmed) {
                    closeModalHandler();
                }
            });
        }
    };

    // Close Modal Function

    const closeModalHandler = () => {
        setFormData({
            gameType: null,
            icon: null,
            limitPlayer: null,
            name: null,
        });
        setShowGameModal(false);
    };

    const setFormDataHandler = (dataLabel, value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [dataLabel]: value,
        }));
    };

    return (
        <Box>
            {/* avatars Page Header */}
            <div className="flex-col sm:flex-row gap-6 flex items-center justify-between mb-6">
                <h2 className="font-Estedad-Bold text-xl text-black">
                    لیست بازی ها
                </h2>
                {/* Show Add Game Modal Button */}
                <PrimaryButton
                    onClick={() => setShowGameModal(true)}
                    className="!w-auto shrink-0"
                    title="افزودن بازی"
                />
                {/* Game Modal */}
                <Modal
                    showModal={showGameModal}
                    closeModalHandler={closeModalHandler}
                >
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                        }}
                        className="flex flex-col gap-4"
                        action="#"
                    >
                        {/* Game Name Input */}
                        <Input
                            type="text"
                            onInput={(e) =>
                                setFormDataHandler("name", e.target.value)
                            }
                            placeholder="نام بازی را وارد کنید"
                            label="نام بازی"
                            name="name"
                            value={formData.name || ""}
                        />
                        {/* Game Limit Player Input */}
                        <Input
                            type="number"
                            onInput={(e) =>
                                setFormDataHandler(
                                    "limitPlayer",
                                    e.target.value
                                )
                            }
                            placeholder="تعداد بازیکن ها را وارد کنید"
                            label="حداکثر تعداد بازیکن"
                            name="limitPlayer"
                            value={formData.limitPlayer || ""}
                        />
                        {/* Game Type Accordion */}
                        <Accordion
                            items={gameTypesResult || []}
                            label="نوع بازی"
                            mainItemId={formData.gameType}
                            setMainItemId={(item) => {
                                console.log("Item", item);
                                setFormDataHandler("gameType", item);
                            }}
                        />
                        {/* Game Image Input */}
                        <div className="flex flex-col gap-2">
                            <span className="text-2sm font-IranYekan-Medium">
                                انتخاب ایکون
                            </span>
                            <label
                                htmlFor="file-input"
                                className="py-[30px] flex items-center justify-center rounded-xl border-2 border-dashed border-zinc"
                            >
                                <div className="flex flex-col items-center gap-4">
                                    <PiUpload size={24} />
                                    {formData.icon && (
                                        <span className="text-2sm font-IranYekan-Medium">
                                            {formData.icon.name}
                                        </span>
                                    )}
                                </div>
                                <input
                                    id="file-input"
                                    className="hidden"
                                    type="file"
                                    name="icon"
                                    onChange={(e) =>
                                        setFormDataHandler(
                                            "icon",
                                            e.target.files[0]
                                        )
                                    }
                                />
                            </label>
                        </div>
                        {/* Add New Game Button */}
                        <>
                            {mainGame ? (
                                <PrimaryButton
                                    onClick={editGameHandler}
                                    title="ذخیره اطلاعات"
                                />
                            ) : (
                                <PrimaryButton
                                    onClick={addNewGameHandler}
                                    title="افزودن بازی"
                                />
                            )}
                        </>
                    </form>
                </Modal>
            </div>
            {/* Table */}
            <div className="w-full mt-10 overflow-auto">
                {loadingGamesResult ? (
                    <div className="bg-red-50 text-black font-IranYekan-Bold text-xl p-2 rounded-md">
                        <h4>اطلاعاتی وجود ندارد</h4>
                    </div>
                ) : (
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
                                        تصویر
                                    </span>
                                </th>
                                <th>
                                    <span className="text-title text-lg">
                                        نام
                                    </span>
                                </th>
                                <th>
                                    <span className="text-title text-lg">
                                        تعداد بازیکن ها
                                    </span>
                                </th>
                                <th>
                                    <span className="text-title text-lg">
                                        نوع بازی
                                    </span>
                                </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="font-IranYekan-Medium text-2sm">
                            {gamesResult?.response?.length !== 0 &&
                                gamesResult?.response?.map((game, index) => (
                                    <tr
                                        key={game.id}
                                        className="*:px-6 *:py-3.5 border-b border-zinc"
                                    >
                                        <td className="hidden md:table-cell">
                                            {index + 1}
                                        </td>
                                        <td>
                                            <img
                                                className="w-16 h-12 rounded"
                                                src={`${game.image}`}
                                                alt={game.name}
                                            />
                                        </td>
                                        <td>{game.name}</td>
                                        <td>{game.limitPlayer}</td>
                                        <td>
                                            <span
                                                className={`font-IranYekan-Bold text-xs rounded py-1 px-2.5 inline-flex items-center justify-center`}
                                            >
                                                {gameTypeText(game.gameType)}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="flex items-center justify-center gap-2">
                                                <span
                                                    onClick={() =>
                                                        editModalHandler(
                                                            game.id
                                                        )
                                                    }
                                                    className="w-6 h-6 flex items-center justify-center cursor-pointer"
                                                >
                                                    <BiEdit size="20px" />
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                )}

                {/* Table Pagination */}

                {/* <Pagination /> */}
            </div>
        </Box>
    );
}

export default Games;
