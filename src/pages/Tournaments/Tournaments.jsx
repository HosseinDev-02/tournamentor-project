import React, { useEffect, useState } from "react";
import Box from "../../components/Box/Box.jsx";
import PrimaryButton from "../../components/Buttons/PrimaryButton/PrimaryButton.jsx";
import Modal from "../../components/Modal/Modal.jsx";
import Pagination from '../../components/Pagination/Pagination.jsx'
import { useGetTournamentsQuery } from "../../redux/api/tournamentsApi.js";
import { useGetTeamsQuery } from "../../redux/api/teamsApi.js";
function Tournaments() {

    const [showModalCreateTournament, setShowModalCreateTournament] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const {data: teamsResult, isLoading: isLoadingTeamsResult} = useGetTeamsQuery(currentPage)

    // Add Tournament Function

    useEffect(() => {
        if(teamsResult) {
            console.log('Teams Result :', teamsResult)
        }
    }, [teamsResult])

    const addNewTournamentHandler = () => {
        
    }

    // Show Edit Modal Function


    // Edit Tournament Function


    // Close Modal Function

    const closeModalHandler = () => {
      setShowModalCreateTournament(false)
    }

    return (
        <Box>
            {/* tournaments Page Header */}
            <div className="flex-col sm:flex-row gap-6 flex items-center justify-between mb-6">
                <h2 className="font-Estedad-Bold text-xl text-black">
                    لیست مسابقات
                </h2>
                <PrimaryButton
                    onClick={() => setShowModalCreateUser(true)}
                    className="!w-auto shrink-0"
                    title="افزودن مسابقه"
                />
                {/* Add Tournament Modal */}
                <Modal
                    showModal={showModalCreateTournament}
                    closeModalHandler={closeModalHandler}
                >
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                        }}
                        className="flex flex-col gap-4"
                        action="#"
                    >
                    
                        <PrimaryButton
                            onClick={addNewTournamentHandler}
                            title="افزودن مسابقه"
                        />
                    </form>
                </Modal>
            </div>
            {/* Table */}
            <div className="w-full mt-10 overflow-auto">
                {/* Table */}

                {/* Table Pagination */}

                {/* <Pagination /> */}
            </div>
        </Box>
    );
}

export default Tournaments;
