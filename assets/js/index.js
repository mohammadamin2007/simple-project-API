// site loader
window.addEventListener("load", () => {
    let shouldAnimated = document.querySelectorAll(".should-animated")
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