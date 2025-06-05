import React, { useEffect, useState } from "react";
import Box from "../../components/Box/Box.jsx";
import PrimaryButton from "../../Buttons/PrimaryButton/PrimaryButton.jsx";
import Modal from "../../components/Modal/Modal.jsx";
import Pagination from '../../components/Pagination/Pagination.jsx'
function PureLayout() {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false)

    // Add Avatar Function

    const addNewUserHandler = () => {
        
    }

    // Show Edit Modal Function


    // Edit Avatar Function


    // Close Modal Function

    const closeModalHandler = () => {
        setShowModalCreateUser(false)
    }

    return (
        <Box>
            {/* avatars Page Header */}
            <div className="flex-col sm:flex-row gap-6 flex items-center justify-between mb-6">
                <h2 className="font-Estedad-Bold text-xl text-black">
                    لیست کاربران
                </h2>
                <PrimaryButton
                    onClick={() => setShowModalCreateUser(true)}
                    className="!w-auto shrink-0"
                    title="افزودن کاربر"
                />
                {/* Add Avatar Modal */}
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

                {/* Table Pagination */}

                {/* <Pagination /> */}
            </div>
        </Box>
    );
}

export default PureLayout;
