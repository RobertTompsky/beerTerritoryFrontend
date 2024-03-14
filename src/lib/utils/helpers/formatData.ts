export const formatData = (defaultDate: string): string => {
    const date = new Date(defaultDate);
    const formattedDate = date.toLocaleString('ru-RU', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    });
    return formattedDate
}