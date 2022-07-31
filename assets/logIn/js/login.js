// variables
let dontHaveAccount = document.querySelector(".have-account a");
let formInputs = document.querySelectorAll("form input");
let siteLoader = document.querySelector(".loader");
let getNavbar = document.querySelector("#navbar");
let goBtn = document.querySelector("button");
let areEqual = false;
let currentUser = "";
let inputList = {};
// variables

// remove loader
window.onload = () => {
    setTimeout(() => {
        siteLoader.classList.add("opacity-0");
        getNavbar.classList.remove("d-none");
    }, 1000);
    setTimeout(() => {
        siteLoader.classList.add("d-none");
    }, 2000);
};
// remove loader

// form effect
formInputs.forEach(element => {
    element.addEventListener("keyup", (ev) => {
        if(element.value.length !== 0) {
            element.style.backgroundColor = "rgba(0 0 0 / 40%)";
            element.style.color = "white";
        } else {
            element.style.backgroundColor = "";
            element.style.color = "";
        }
    });
});
// form effect

// readApi
async function readApi(url) {
    let getFile = await fetch(url);
    let data = await getFile.json();
    return data;
}
// readApi

//don't have account
dontHaveAccount.addEventListener("click", () => {
    alert("this page doesn't work\nbut if you want to make an account please call with our support 09109******");
});
//don't have account

// check user exist or not and other operations
goBtn.addEventListener("click", (e) => {
    e.preventDefault();
    readApi("https://jsonplaceholder.typicode.com/users")
    .then(data => {
        inputList["name"] = formInputs[0].value;
        inputList["id"] = formInputs[3].value;
        inputList["phone"] = formInputs[1].value;
        inputList["email"] = formInputs[2].value;
        let searchItems = ["name", "phone","email"];
        data.forEach((user) => {
            if(user.id == inputList["id"]) {
                for(let i = 0; i < searchItems.length; i++) {
                    areEqual = (inputList[searchItems[i]] == eval("user." + searchItems[i]));
                    currentUser  = user
                    if(!areEqual) {
                        break;
                    }
                }
            }
        });
        if(areEqual) {
            localStorage.setItem("user", JSON.stringify(currentUser));
            localStorage.setItem("loggedIn", "true")
            window.location.href = "../index.html";
        } else {
            alert("user doesnt exist");
        }
    })
});
// check user exist or not and other operations