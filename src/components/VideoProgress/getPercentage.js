export const getPercentage = (num, total) => {
    if (typeof num !== 'number' || typeof total !== 'number' || num > total) {
        return 0;
    }

    return (num / total) * 100;
};
