export const getPercentage = (num, total) => {
    if (
        isNaN(parseFloat(num)) ||
        isNaN(parseFloat(total)) ||
        num > total ||
        (num === 0 && total === 0)
    ) {
        return 0;
    }

    return (num / total) * 100;
};
