import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";

function Accordion({
    className,
    label,
    labelClassName,
    mainItemId,
    setMainItemId,
    renderButton,
    items,
    imageItems,
    selectionHandler,
    valueName,
}) {
    const [showContent, setShowContent] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const mainItem = items.find((item) => item.id === mainItemId);
        setSelectedItem(mainItem);
    }, [mainItemId]);

    return (
        <div className={`relative w-full ${className}`}>
            <div
                className={`flex items-start flex-col ${label ? "gap-2" : ""}`}
            >
                <span
                    className={`font-IranYekan-Medium text-xs ${labelClassName}`}
                >
                    {label}
                </span>
                {renderButton ? (
                    renderButton
                ) : (
                    <button
                        onClick={() =>
                            setShowContent((prevState) => !prevState)
                        }
                        className="flex items-center justify-between w-full h-10 rounded border border-zinc px-3 bg-white"
                    >
                        {imageItems ? (
                            <span className="w-7 h-7 rounded-full flex">
                                <img
                                    className="w-full h-full object-cover"
                                    src={selectedItem?.value}
                                />
                            </span>
                        ) : (
                            <span className="font-IranYekan-Medium text-2sm">
                                {selectedItem?.value || "انتخاب کنید"}
                            </span>
                        )}
                        <span className="text-muted">
                            <BiChevronDown size="20px" />
                        </span>
                    </button>
                )}
            </div>
            <div
                className={`bg-white absolute top-full left-0 right-0 shadow-md shadow-[#939eaa73] transition-all z-50 rounded-b ${
                    showContent ? "visible opacity-100" : "invisible opacity-0"
                }`}
            >
                <ul className="bg-white flex flex-col rounded-b overflow-auto max-h-48">
                    <li
                        onClick={() => {
                            setMainItemId(null);
                            setSelectedItem(null);
                            setShowContent(false);
                        }}
                        className={`flex items-center gap-2 w-full h-9 px-3 transition-colors hover:bg-gray-50 cursor-pointer`}
                    >
                        <span className="font-IranYekan-Medium text-2sm text-inherit">
                            انتخاب کنید
                        </span>
                    </li>
                    {items?.map((item) => (
                        <li
                            key={item.id}
                            onClick={
                                selectionHandler
                                    ? () => {
                                          selectionHandler(item);
                                          setShowContent(false);
                                      }
                                    : () => {
                                          // setMainItemId(item.id);
                                          setSelectedItem(item);
                                          setShowContent(false);
                                          setMainItemId(item.id);
                                          //   console.log(item);
                                      }
                            }
                            className={`flex items-center gap-2 w-full py-1.5 px-3 transition-colors hover:bg-gray-50 cursor-pointer`}
                        >
                            {imageItems ? (
                                <span className="w-7 h-7 rounded-full flex">
                                    <img
                                        className="w-full h-full object-cover"
                                        src={item.value}
                                    />
                                </span>
                            ) : (
                                <span className="font-IranYekan-Medium text-2sm text-inherit">
                                    {valueName
                                        ? item[valueName] !== "Admin" &&
                                          item[valueName] !== "User" &&
                                          item[valueName]
                                        : item.value}
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Accordion;
