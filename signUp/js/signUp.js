// variables
let formInputs = document.querySelectorAll("form input");
// variables
window.onload = () => {
    setTimeout(() => {
        document.querySelector(".loader").classList.add("opacity-0");
        document.querySelector("#navbar").classList.remove("d-none");
    }, 1000);
    setTimeout(() => {
        document.querySelector(".loader").classList.add("d-none");
    }, 2000);
}
formInputs.forEach(element => {
    element.addEventListener("keyup", (ev) => {
        if(element.value.length != 0) {
            element.style.backgroundColor = "rgba(70, 90, 126, 0.4)";
            element.style.color = "white";
        } else {
            element.style.backgroundColor = "";
            element.style.color = "";
        }
    });
})
// if i had access to jsonplaceholder's Jsons i would add users