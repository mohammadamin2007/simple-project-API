// variables
let formInputs = document.querySelectorAll("form input");
let areEqual = false;
let inputList = {};
let goBtn = document.querySelector("button");
let currentUser = "";
// variables
// remove loader
window.onload = () => {
    setTimeout(() => {
        document.querySelector(".loader").classList.add("opacity-0");
        document.querySelector("#navbar").classList.remove("d-none");
    }, 1000);
    setTimeout(() => {
        document.querySelector(".loader").classList.add("d-none");
    }, 2000);
};
// remove loader
// form effect
formInputs.forEach(element => {
    element.addEventListener("keyup", (ev) => {
        if(element.value.length != 0) {
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
};
// readApi
// check user exist or not and other oparations
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
                    };
                };
            };
        });
        if(areEqual) {
            localStorage.setItem("user", currentUser);
            window.location = "http://127.0.0.1:5500/"
        } else {
            alert("user doesnt exist");
        }
    })
});
// check user exist or not and other oparations