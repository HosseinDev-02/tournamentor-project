import React, { useEffect, useState } from "react";
import Box from "../../components/Box/Box.jsx";
import PrimaryButton from "../../components/Buttons/PrimaryButton/PrimaryButton.jsx";
import SecondaryButton from "../../components/Buttons/SecondaryButton/SecondaryButton.jsx";
import Modal from "../../components/Modal/Modal.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";
import {
    useAddPlayerToTeamMutation,
    useAddTeamMutation,
    useGetTeamQuery,
    useGetTeamShortPlayersQuery,
    useGetTeamsQuery,
    useUpdateTeamMutation,
} from "../../redux/api/teamsApi.js";
import {
    useGetShortAvatarsQuery,
    useGetShortTeamAvatarsQuery,
} from "../../redux/api/avatarsApi.js";
import Input from "../../components/Input/Input.jsx";
import inputValueChangeHandler from "../../utils/inputHandler.js";
import Accordion from "../../components/Accordion/Accordion.jsx";
import { useGetShortPlayersQuery } from "../../redux/api/playersApi.js";
import { useGetShortGamesQuery } from "../../redux/api/gamesApi.js";
import useDebounce from "../../hooks/useDebounce.js";
import Swal from "sweetalert2";
import { setStateStyle, setStateText } from "../../utils/utils.js";
import { BiEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
    clearSelectedTeamId,
    setSelectedTeamId,
} from "../../redux/Team/teamSlice.js";
import { useGetStatesQuery } from "../../redux/api/typesApi.js";
function Teams() {
    const [showModal, setShowModal] = useState(false);
    const [showPlayerModal, setShowPlayerModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [formData, setFormData] = useState({
        title: null,
        description: null,
        score: null,
        avatarId: null,
        player: null,
        gameId: null,
        state: null,
        addPlayerDescription: null,
    });
    const [searchPlayerParam, setSearchPlayerParam] = useState("");
    const [showContent, setShowContent] = useState(false);
    const [showPlayerContent, setShowPlayerContent] = useState(false);
    const deBouncedSearchPlayerParam = useDebounce(searchPlayerParam, 500);
    const dispatch = useDispatch();
    const selectedTeamId = useSelector((state) => state.team.selectedTeamId);
    const { data: teamsResult, isLoading: isLoadingTeams } =
        useGetTeamsQuery(currentPage);

    const { data: avatarsResult, isLoading: isLoadingAvatars } =
        useGetShortTeamAvatarsQuery();
    const { data: playersResult, isLoading: isLoadingPlayers } =
        useGetShortPlayersQuery(deBouncedSearchPlayerParam);
    const { data: gamesResult, isLoading: isLoadingGames } =
        useGetShortGamesQuery();
    const { data: teamPlayersResult, isLoading: isLoadingTeamPlayers } =
        useGetTeamShortPlayersQuery(selectedTeamId, {
            skip: !selectedTeamId,
        });

    const { data: statesResult, isLoading: isLoadingStatesResult } =
        useGetStatesQuery();
    const [updateTeam] = useUpdateTeamMutation();
    const [addPlayerToTeam] = useAddPlayerToTeamMutation();

    const [addTeam, { isLoading: isLoadingAddTeam }] = useAddTeamMutation();

    const { data: mainTeam, isLoading: isLoadingTeam } = useGetTeamQuery(
        selectedTeamId,
        {
            skip: !selectedTeamId,
        }
    );

    useEffect(() => {
        if ((teamsResult, teamPlayersResult)) {
            console.log("Teams Result :", teamsResult);
            console.log("Team Players Result :", teamPlayersResult);
        }
    }, [teamsResult, teamPlayersResult]);

    useEffect(() => {
        console.log("Short Players Result :", playersResult);
        if (playersResult?.response?.length > 1) {
            setShowContent(true);
            setShowPlayerContent(true);
        }
    }, [playersResult]);

    // Set Form Data With Team Data

    useEffect(() => {
        if (mainTeam) {
            console.log("Team Result :", mainTeam);
            setFormData({
                title: mainTeam.response.title,
                description: mainTeam.response.description,
                score: mainTeam.response.score,
                avatarId: mainTeam.response.avatarId,
                state: mainTeam.response.state,
            });
        }
        console.log("Team Players Result :", teamPlayersResult);

    }, [mainTeam]);
    // Add Team Function

    const addNewTeamHandler = async () => {
        const newTeam = {
            title: formData.title,
            description: formData.description,
            score: parseInt(formData.score),
            avatarId: formData.avatarId,
            playerId: formData.player.id,
            gameId: formData.gameId,
        };
        console.log("New Team :", newTeam);
        try {
            const response = await addTeam(newTeam).unwrap();
            const { httpCode } = response;

            console.log("response :", response);

            if (httpCode === 200) {
                Swal.fire({
                    title: "تیم با موفقیت ایجاد شد",
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
                title: "خطایی رخ داد",
                icon: "error",
                confirmButtonText: "بستن",
            }).then((res) => {
                if (res.isConfirmed) {
                    closeModalHandler();
                }
            });
        }
    };

    // Get Team Data Function

    const getTeamData = (teamId) => {
        dispatch(setSelectedTeamId(teamId));
        setShowModal(true);
    };

    // Update Team Function

    const updateTeamHandler = async () => {
        const teamInfo = {
            id: selectedTeamId,
            title: formData.title,
            description: formData.description,
            score: formData.score,
            state: formData.state,
            avatarId: formData.avatarId,
        };
        try {
            const response = await updateTeam(teamInfo).unwrap();
            const { httpCode } = response;

            if (httpCode === 200) {
                Swal.fire({
                    title: "تیم با موفقیت ویرایش شد",
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
                title: "خطایی رخ داد",
                icon: "error",
                confirmButtonText: "بستن",
            }).then((res) => {
                if (res.isConfirmed) {
                    closeModalHandler();
                }
            });
        }
    };

    // Close Modal Function

    const closeModalHandler = () => {
        setShowModal(false);
        setFormData({
            title: null,
            description: null,
            score: null,
            avatarId: null,
            player: null,
            gameId: null,
        });
        dispatch(clearSelectedTeamId());
    };

    // Add Player Handler

    const addPlayerHandler = async () => {
        const playerInfo = {
            teamId: selectedTeamId,
            playerId: formData.player.id,
            description: formData.addPlayerDescription,
        };
        console.log("Add Player :", playerInfo);

        try {
            const response = await addPlayerToTeam(playerInfo).unwrap();
            console.log("Add Player Response :", response);
            const { httpCode } = response;
            if (httpCode === 200) {
                Swal.fire({
                    title: "بازیکن با موفقیت اضافه شد",
                    icon: "success",
                    confirmButtonText: "بستن",
                }).then((res) => {
                    if (res.isConfirmed) {
                        closePlayerModalHandler();
                    }
                });
            } else {
                throw new Error("خطایی رخ داد");
            }
        } catch (error) {
            Swal.fire({
                title: "خطایی رخ داد",
                icon: "error",
                confirmButtonText: "بستن",
            }).then((res) => {
                if (res.isConfirmed) {
                    closePlayerModalHandler();
                }
            });
        }
    };

    // Add Player Modal Handler

    const addPlayerModalHandler = () => {
        setShowPlayerModal(true);
    };

    // Close Player Modal Handler

    const closePlayerModalHandler = () => {
        setShowPlayerModal(false);
    };

    return (
        <Box>
            {/* avatars Page Header */}
            <div className="flex-col sm:flex-row gap-6 flex items-center justify-between mb-6">
                <h2 className="font-Estedad-Bold text-xl text-black">
                    لیست تیم ها
                </h2>
                <PrimaryButton
                    onClick={() => setShowModal(true)}
                    className="!w-auto shrink-0"
                    title="افزودن تیم"
                />
                {/* Add Avatar Modal */}
                <Modal
                    showModal={showModal}
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
                            type="number"
                            onInput={(e) =>
                                inputValueChangeHandler(e, setFormData)
                            }
                            placeholder="امتیاز تیم"
                            label="امتیاز تیم"
                            name="score"
                            value={formData?.score || ""}
                        />
                        <Input
                            type="text"
                            onInput={(e) =>
                                inputValueChangeHandler(e, setFormData)
                            }
                            placeholder="عنوان تیم"
                            label="عنوان تیم"
                            name="title"
                            value={formData?.title || ""}
                        />
                        <Input
                            type="textarea"
                            onInput={(e) =>
                                inputValueChangeHandler(e, setFormData)
                            }
                            placeholder="توضیحات"
                            label="توضیحات تیم"
                            name="description"
                            value={formData?.description || ""}
                        />
                        <>
                            {!selectedTeamId ? (
                                <>
                                    <div className="flex flex-col gap-2 relative">
                                        <Input
                                            type="text"
                                            onInput={(e) =>
                                                setSearchPlayerParam(
                                                    e.target.value
                                                )
                                            }
                                            placeholder="نام بازیکن"
                                            label="نام بازیکن"
                                            name="player"
                                            value={searchPlayerParam}
                                        />
                                        <div
                                            className={`absolute top-16 left-0 right-0 w-full bg-white shadow-md z-50 shadow-[#939eaa73] transition-all rounded-b  ${
                                                showContent
                                                    ? "visible opacity-100"
                                                    : "invisible opacity-0"
                                            }`}
                                        >
                                            <ul className="bg-white flex flex-col rounded-b overflow-auto max-h-36">
                                                {playersResult?.response?.map(
                                                    (player) => (
                                                        <li
                                                            key={player.id}
                                                            onClick={() => {
                                                                setSearchPlayerParam(
                                                                    player.title
                                                                );
                                                                setFormData({
                                                                    ...formData,
                                                                    player: player,
                                                                });
                                                                setShowContent(
                                                                    false
                                                                );
                                                            }}
                                                            className={`flex items-center gap-2 w-full py-1.5 px-3 transition-colors hover:bg-gray-50 cursor-pointer`}
                                                        >
                                                            <span className="font-IranYekan-Medium text-2sm text-inherit">
                                                                {player.title}
                                                            </span>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                    <Accordion
                                        items={gamesResult?.response || []}
                                        label="انتخاب بازی"
                                        mainItemId={formData?.gameId}
                                        setMainItemId={(item) => {
                                            setFormData((prevFormData) => ({
                                                ...prevFormData,
                                                gameId: item,
                                            }));
                                        }}
                                    />
                                </>
                            ) : (
                                <Accordion
                                    items={statesResult || []}
                                    label="انتخاب وضعیت"
                                    mainItemId={formData?.state}
                                    setMainItemId={(item) => {
                                        setFormData((prevFormData) => ({
                                            ...prevFormData,
                                            state: item,
                                        }));
                                    }}
                                />
                            )}
                        </>
                        <Accordion
                            items={avatarsResult?.response || []}
                            label="انتخاب آواتار"
                            mainItemId={formData?.avatarId}
                            setMainItemId={(item) => {
                                setFormData((prevFormData) => ({
                                    ...prevFormData,
                                    avatarId: item,
                                }));
                            }}
                            imageItems={true}
                        />
                        <>
                            {selectedTeamId ? (
                                <>
                                    <PrimaryButton
                                        onClick={updateTeamHandler}
                                        title="ویرایش تیم"
                                    />
                                    <SecondaryButton
                                        onClick={addPlayerModalHandler}
                                        icon="BiPlus"
                                        title="افزودن بازیکن"
                                    />
                                </>
                            ) : (
                                <PrimaryButton
                                    onClick={addNewTeamHandler}
                                    title="افزودن تیم"
                                />
                            )}
                        </>
                    </form>
                </Modal>
            </div>
            {/* Table */}
            <div className="w-full mt-10 overflow-auto">
                {/* Table */}
                <>
                    {isLoadingTeams ? (
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
                                                تگ تیم
                                            </span>
                                        </th>
                                        <th className="hidden md:table-cell">
                                            <span className="text-title text-lg">
                                                آواتار
                                            </span>
                                        </th>
                                        <th>
                                            <span className="text-title text-lg">
                                                نام تیم
                                            </span>
                                        </th>

                                        <th>
                                            <span className="text-title text-lg">
                                                بازی
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
                                    {teamsResult?.response.map((team) => (
                                        <tr
                                            key={team.id}
                                            className="*:px-6 *:py-3.5 border-b border-zinc"
                                        >
                                            <td className="hidden md:table-cell">
                                                {team.tag}
                                            </td>
                                            <td>
                                                <img
                                                    className="w-16 h-12 rounded"
                                                    src={`${team.avatar}`}
                                                    alt={team.title}
                                                />
                                            </td>
                                            <td>{team.title}</td>
                                            <td>{team.game}</td>
                                            <td>
                                                <span
                                                    className={`${setStateStyle(
                                                        team.state
                                                    )} font-IranYekan-Bold text-xs rounded py-1 px-2.5 inline-flex items-center justify-center`}
                                                >
                                                    {setStateText(team.state)}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="flex items-center justify-center gap-2">
                                                    <span
                                                        onClick={() =>
                                                            getTeamData(team.id)
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
                            {/* Table Pagination */}

                            {/* <Pagination
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                itemsCount={usersResult?.totalPages}
                            /> */}
                        </>
                    )}
                </>
                {/* Table Pagination */}

                {/* <Pagination /> */}
            </div>

            {/* Add Player Modal */}
            <Modal
                showModal={showPlayerModal}
                closeModalHandler={closePlayerModalHandler}
            >
                <form
                    className="flex flex-col gap-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <>
                        <div className="flex flex-col gap-2 relative">
                            <Input
                                type="text"
                                onInput={(e) =>
                                    setSearchPlayerParam(e.target.value)
                                }
                                placeholder="نام بازیکن"
                                label="نام بازیکن"
                                name="player"
                                value={searchPlayerParam}
                            />
                            <div
                                className={`absolute top-16 left-0 right-0 w-full bg-white shadow-md z-50 shadow-[#939eaa73] transition-all rounded-b  ${
                                    showPlayerContent
                                        ? "visible opacity-100"
                                        : "invisible opacity-0"
                                }`}
                            >
                                <ul className="bg-white flex flex-col rounded-b overflow-auto max-h-36">
                                    {playersResult?.response?.map((player) => (
                                        <li
                                            key={player.id}
                                            onClick={() => {
                                                setSearchPlayerParam(
                                                    player.title
                                                );
                                                setFormData({
                                                    ...formData,
                                                    player: player,
                                                });
                                                setShowPlayerContent(false);
                                            }}
                                            className={`flex items-center gap-2 w-full py-1.5 px-3 transition-colors hover:bg-gray-50 cursor-pointer`}
                                        >
                                            <span className="font-IranYekan-Medium text-2sm text-inherit">
                                                {player.title}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </>
                    <Input
                        type="textarea"
                        onInput={(e) => inputValueChangeHandler(e, setFormData)}
                        placeholder="توضیحات"
                        label="توضیحات تیم"
                        name="addPlayerDescription"
                        value={formData?.addPlayerDescription || ""}
                    />
                    <PrimaryButton
                        onClick={addPlayerHandler}
                        title="افزودن بازیکن"
                    />
                    <div className="w-full mt-10 overflow-auto">
                        {/* Table */}
                        <>
                            {isLoadingTeams ? (
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
                                                <th>
                                                    <span className="text-title text-lg">
                                                        شناسه
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
                                            </tr>
                                        </thead>
                                        <tbody className="font-IranYekan-Medium text-2sm">
                                            {teamsResult?.response.map(
                                                (team) => (
                                                    <tr
                                                        key={team.id}
                                                        className="*:px-6 *:py-3.5 border-b border-zinc"
                                                    >
                                                        <td className="hidden md:table-cell">
                                                            {team.tag}
                                                        </td>
                                                        <td>
                                                            <span
                                                                className={`${setStateStyle(
                                                                    team.state
                                                                )} font-IranYekan-Bold text-xs rounded py-1 px-2.5 inline-flex items-center justify-center`}
                                                            >
                                                                {setStateText(
                                                                    team.state
                                                                )}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </>
                            )}
                        </>
                    </div>
                </form>
            </Modal>
        </Box>
    );
}

export default Teams;
