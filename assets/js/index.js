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
if(localStorage.user != null && localStorage.loggedIn === "true" && typeof JSON.parse(localStorage.user) == "object") {
    let currentUser = JSON.parse(localStorage.user);
    document.querySelector(".log-in-sign-up").classList.add("d-none");
    document.querySelector(".profile-container").classList.remove("d-none");
    document.querySelector(".profile").href = `https://todo.com/profiles/${currentUser.id}${currentUser.name}${currentUser.email}${currentUser.phone}/`;
}
// loged in or not
// disable start link
if(localStorage.user != null && localStorage.loggedIn === "true" && typeof JSON.parse(localStorage.user) == "object") {
    document.querySelector(".start-link").classList.remove("disable-link");
    document.querySelector(".f-login-signup").classList.add("d-none");
    document.querySelector(".profile-container").classList.remove("d-none");
    document.querySelector(".log-in-sign-up").classList.add("d-none");
}
// disable start link
// logout
document.querySelector(".log-out-btn").addEventListener("click", () => {
    localStorage.removeItem("user");
    localStorage.removeItem("loggedIn");
    window.location = "file:///D:/mohamamdamin/simple-project-API/index.html"
});
// logout