export const formatDate = (dateString?: string) => {
    if (!dateString) return "-";

    const d = new Date(dateString);
    return d.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });
};

export const formatTimeRange = (
    start?: string,
    end?: string,
) => {
    if (!start || !end) return "-";

    const s = new Date(start);
    const e = new Date(end);

    return `${s.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
    })} - ${e.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
    })}`;
};