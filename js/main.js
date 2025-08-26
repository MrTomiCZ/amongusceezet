let nvbr;
(async () =>{
    const res = await fetch("/pages/navbar.html");
    nvbr = await res.text();
})();

document.querySelector(".navbar").innerHTML = nvbr;




let intval;
let oldtitle;

function comeBack() {
    document.title = "Prosím přijďte zpět!";

    setTimeout(() => {
        document.title = oldtitle;
    }, 2000); // change back after 2s (adjust as you like)
}

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        oldtitle = document.title; // save the original title
        intval = setInterval(comeBack, 5000); // flash every 5s
    } else {
        clearInterval(intval);
        document.title = oldtitle; // restore original title
    }
});