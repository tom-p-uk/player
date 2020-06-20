export const convertPercentageToNumber = (percentage, total) => {
    if (
        typeof percentage !== 'number' ||
        typeof total !== 'number' ||
        percentage > 100
    ) {
        return 0;
    }

    return (total / 100) * percentage;
};
