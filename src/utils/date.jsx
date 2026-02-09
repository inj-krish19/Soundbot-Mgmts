
const cleanDate = (date) => {
    return date.split('T')[0]; // yyyy - mm -dd
    return date.split('T')[0].split('-').reverse().join('-'); // dd - mm - yyyy
}

export { cleanDate };