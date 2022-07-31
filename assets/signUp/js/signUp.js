// variables
let formInputs = document.querySelectorAll("form input");
let siteLoader = document.querySelector(".loader");
let getNavbar = document.querySelector("#navbar");
// variables

//  remove loader when site loaded
window.onload = () => {
    setTimeout(() => {
        siteLoader.classList.add("opacity-0");
        getNavbar.classList.remove("d-none");
    }, 1000);
    setTimeout(() => {
        siteLoader.classList.add("d-none");
    }, 2000);
}
//remove loader when site loaded

// change the color of inputs when user enter something
formInputs.forEach(element => {
    element.addEventListener("keyup", (ev) => {
        if(element.value.length !== 0) {
            element.style.backgroundColor = "rgba(70, 90, 126, 0.4)";
            element.style.color = "white";
        } else {
            element.style.backgroundColor = "";
            element.style.color = "";
        }
    });
});
// change the color of inputs when user enter something