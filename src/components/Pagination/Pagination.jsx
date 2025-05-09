import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Pagination({
    currentPage,
    setCurrentPage,
    itemsCount,
}) {
    console.log(Array(itemsCount).fill(0));

    return (
        <div className="mt-6 flex gap-2 py-2">
            {itemsCount === 0 ? (
                <>
                    <button
                        className={`px-2 md:px-3 py-0.5 md:py-1 rounded bg-blue text-white`}
                    >
                        <span className="text-2sm font-IranYekan-Medium inline-block min-w-2">
                            1
                        </span>
                    </button>
                    <button
                        className={`text-caption bg-[#eeeff1] px-2 md:px-3 py-0.5 md:py-1 rounded`}
                    >
                        <span className="text-2sm font-IranYekan-Medium inline-block min-w-2">
                            2
                        </span>
                    </button>
                    <button
                        className={`text-caption bg-[#eeeff1] px-2 md:px-3 py-0.5 md:py-1 rounded`}
                    >
                        <span className="text-2sm font-IranYekan-Medium inline-block min-w-2">
                            3
                        </span>
                    </button>
                </>
            ) : (
                <>
                    {Array(itemsCount)
                        .fill(0)
                        .map((btn, index) => (
                            <button key={index + 1}
                                onClick={() => setCurrentPage(index + 1)}
                                className={`px-2 md:px-3 py-0.5 md:py-1 rounded cursor-pointer ${
                                    index + 1 === currentPage
                                        ? "bg-blue text-white"
                                        : "text-caption bg-[#eeeff1]"
                                }`}
                            >
                                <span className="text-2sm font-IranYekan-Medium inline-block min-w-2">
                                    {index + 1}
                                </span>
                            </button>
                        ))}
                </>
            )}
        </div>
    );
}
