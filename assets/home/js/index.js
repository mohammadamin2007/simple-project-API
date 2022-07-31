//variables
let profileContainer = document.querySelector(".profile-container");
let firstLogOrSign = document.querySelector(".f-login-signup");
let logInSignUp = document.querySelector(".log-in-sign-up");
let signUpBtns = document.querySelectorAll(".sign-up");
let startLink = document.querySelector(".start-link");
let profileLink = document.querySelector(".profile");
let siteLoader = document.querySelector(".loader");
let getNavbar = document.querySelector("#navbar");
let currentUser = {};
let searchItems = [];
let areEqual = false;
//variables

// site loader
window.addEventListener("load", () => {
    let shouldAnimated = document.querySelectorAll(".should-animated");
    setTimeout(() => {
        siteLoader.classList.add("opacity-0");
        getNavbar.classList.remove("d-none");
        signUpBtns.forEach(element => {
            element.addEventListener("click", () => {
                alert("this page doesn't work\nbut if you want to make an account please call with our support 09109******");
            });
        });
    }, 1000);
    setTimeout(() => {
        shouldAnimated[0].style.transform = "translateY(0)";
        shouldAnimated[0].classList.remove("opacity-0");
        shouldAnimated[1].style.transform = "translateY(0)";
        shouldAnimated[1].classList.remove("opacity-0");
    }, 1700);
    setTimeout(() => {
        siteLoader.classList.add("d-none");
    }, 2000);
});
// site loader

// readApi
async function readApi(url) {
    let getFile = await fetch(url);
    let data = await getFile.json();
    return data;
}
// readApi

// logged in or not
if(localStorage.user != null && localStorage.loggedIn === "true" && typeof JSON.parse(localStorage.user) == "object") {
    currentUser = JSON.parse(localStorage.user)
    readApi("https://jsonplaceholder.typicode.com/users")
        .then(data => {
            searchItems = ["name", "phone","email"];
            data.forEach((user) => {
                if(user.id == currentUser["id"]) {
                    for(let i = 0; i < searchItems.length; i++) {
                        areEqual = (currentUser[searchItems[i]] == eval("user." + searchItems[i]));
                        if(!areEqual) {
                            break;
                        }
                    }
                }
            });
            if(areEqual) {
                logInSignUp.classList.add("d-none");
                profileContainer.classList.remove("d-none");
                profileLink.href = `https://todo.com/profiles/${currentUser.id}${currentUser.name}${currentUser.email}${currentUser.phone}/`;
                // disabled start link
                startLink.classList.remove("disable-link");
                firstLogOrSign.classList.add("d-none");
                profileContainer.classList.remove("d-none");
                logInSignUp.classList.add("d-none");
                // disabled start link
            }
        })
}
// logged in or not

// logout
document.querySelector(".log-out-btn").addEventListener("click", () => {
    localStorage.removeItem("user");
    localStorage.removeItem("loggedIn");
    window.location = "../../../index.html";
});
// logout