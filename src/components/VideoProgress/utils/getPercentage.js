export const getPercentage = (num, total) => {
    if (isNaN(parseFloat(num)) || isNaN(parseFloat(total)) || num > total) {
        return 0;
    }

    return (num / total) * 100;
};
