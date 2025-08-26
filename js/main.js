let intval;

function comeBack(oldtitle) {
    const combacktitle = "Prosím přijďte zpět!";

    document.title = combacktitle;
    setTimeout(() => {
        document.title = oldtitle;
    },5000);
}

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        const oldtitle = document.title;
        intval = setInterval(comeBack, 5000)
    } else {
        clearInterval(intval);
    }
});