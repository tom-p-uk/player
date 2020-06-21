export const getFormattedTime = timeInSeconds => {
    if (isNaN(parseFloat(timeInSeconds))) {
        return '';
    }

    const hours = String(Math.floor(timeInSeconds / 3600)).padStart(2, 0);
    const mins = String(Math.floor((timeInSeconds % 3600) / 60)).padStart(2, 0);
    const secs = String(Math.floor((timeInSeconds % 3600) % 60)).padStart(2, 0);

    return `${hours}:${mins}:${secs}`;
};
