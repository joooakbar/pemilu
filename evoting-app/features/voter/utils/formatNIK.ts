export const formatNIK = (value: string): string => {
    return value.replace(/\D/g, "").slice(0, 16);
}