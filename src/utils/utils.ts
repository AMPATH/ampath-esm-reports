export const getCell = (key = "", label = "", colSpan = 1, rowSpan = 1, strong = false) => ({
    key,
    label,
    strong,
    colSpan,
    rowSpan
});