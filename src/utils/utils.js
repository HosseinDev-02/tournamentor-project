export const setStateText = (state) => {
    return (
        (state === 0 && "فعال") ||
        (state === 1 && "غیر فعال") ||
        (state === 2 && "حذف شده")
    );
};

export const setStateStyle = (state) => {
    return (
        (state === 0 && "bg-success/20 text-success") ||
        (state === 1 && "bg-yellow/20 text-yellow") ||
        (state === 2 && "bg-red/20 text-red")
    );
};


