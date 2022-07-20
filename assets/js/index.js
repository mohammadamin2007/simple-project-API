// site loader
window.addEventListener("load", () => {
    let shouldAnimated = document.querySelectorAll(".should-animated");
    setTimeout(() => {
        document.querySelector(".loader").classList.add("opacity-0");
        document.querySelector("#navbar").classList.remove("d-none");
    }, 1000);
    setTimeout(() => {
        shouldAnimated[0].style.transform = "translateY(0)";
        shouldAnimated[0].classList.remove("opacity-0");
        shouldAnimated[1].style.transform = "translateY(0)";
        shouldAnimated[1].classList.remove("opacity-0");
    }, 1700);
    setTimeout(() => {
        document.querySelector(".loader").classList.add("d-none");
    }, 2000);
});
// site loader
// loged in or not
if(localStorage.getItem("name") !== null) {
    document.querySelectorAll(".log-in-sign-up")[0].classList.add("d-none");
    document.querySelector(".profile-container").classList.remove("d-none");
    document.querySelector(".profile-container a").href = `www.todo.com/profiles/${localStorage.getItem("name")}%20${localStorage.getItem("id")}%20${localStorage.getItem("phone")}%20${localStorage.getItem("email")}`;
};
// loged in or not