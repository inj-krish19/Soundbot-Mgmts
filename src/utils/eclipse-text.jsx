const eclipseText = (text, limit = 20) => {
    return text.length > limit ? text.substring(0, limit) + "..." : text;
}


const formatter = new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
});

const eclipseNumber = (number) => {
    return formatter.format(number);
}

export { eclipseText, eclipseNumber };