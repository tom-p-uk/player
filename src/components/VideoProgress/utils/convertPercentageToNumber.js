export const convertPercentageToNumber = (percentage, total) => {
    if (
        isNaN(parseFloat(percentage)) ||
        isNaN(parseFloat(total)) ||
        percentage > 100
    ) {
        return 0;
    }

    return (total / 100) * percentage;
};
