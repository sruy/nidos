export const sortAsc = (property) => (first, second) => {
    if (first[property] > second[property]) {
        return 1;
    } else if (first[property] < second[property]) {
        return -1;
    } else {
        return 0;
    }
};

export const sortDesc = (property) => (first, second) => {
    if (first[property] < second[property]) {
        return 1;
    } else if (first[property] > second[property]) {
        return -1;
    } else {
        return 0;
    }
};
