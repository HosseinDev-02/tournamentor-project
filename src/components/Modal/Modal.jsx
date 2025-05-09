import { BiX } from "react-icons/bi";
import Box from "../Box/Box";

export default function Modal({ children, showModal, closeModalHandler }) {
    return (
        <div
                    className={`fixed z-[1000] inset-0 flex items-center justify-center bg-black/50 transition-all duration-300 ${
                        showModal
                            ? "!visible !opacity-100"
                            : "!invisible !opacity-0"
                    }`}
                >
                    <Box
                        className={`!m-0 !h-auto !transition-all !duration-300 min-w-xl relative`}
                    >
                        {children}
                        <span
                            onClick={closeModalHandler}
                            className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center cursor-pointer absolute -top-10 left-0 right-0 mx-auto"
                        >
                            <BiX size="20px" />
                        </span>
                    </Box>
                </div>
    )
}