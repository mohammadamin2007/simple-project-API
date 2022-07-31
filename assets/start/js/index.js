// variables
let alertSound = new Audio("../assets/start/audio/MyRingtone.IR_1559234155_1690.mp3");
let alertTitle = document.querySelector("#alert .container .title ul");
let addNewBtn = document.querySelector(".add-new-activity-form-btn");
let alertContainer = document.querySelector("#alert .container");
let learnHowReturn = document.querySelector(".learn-how-return");
let learnHowRemind = document.querySelector(".learn-how-remind");
let learnHowCheck = document.querySelector(".learn-how-check");
let newActivityError = document.querySelector(".input-error");
let learnHowWork = document.querySelector(".learn-how-work");
let learnHowAdd = document.querySelector(".learn-how-add");
let tableLoader = document.querySelector(".table-loader");
let newActivity = document.querySelector("#new-activity");
let advertiseLogo = document.querySelector(".advertise");
let logOutBtn = document.querySelector(".log-out-btn");
let getTable = document.querySelector(".table tbody");
let profileLink = document.querySelector(".profile");
let customAlert = document.querySelector("#alert");
let getNavbar = document.querySelector("#navbar");
let tableBody = document.querySelector("tbody");
let okBtn = document.querySelector(".OK-btn");
let isComplete = `<i></i>`;
let slideShowEnd = false;
let secoundCounter = 0;
let currentUser = {};
let noReminder = ``;
// variables

//looping alertSound
alertSound.loop = true;
//looping alertSound

//mute alert
okBtn.addEventListener("click", () => {
   alertSound.pause();
   alertContainer.style.transform = "translateY(60px)";
   customAlert.classList.add("opacity-0");
   alertSound = new Audio("../assets/start/audio/MyRingtone.IR_1559234155_1690.mp3");
   setTimeout(() => {
       customAlert.classList.add("d-none");
       alertTitle.innerHTML = "";
   }, 1000);
});
//mute alert

// call API
async function readApi(url) {
    let getFile = await fetch(url);
    let data = await getFile.json();
    return data;
}
// call API

// logout btn
logOutBtn.addEventListener("click", () => {
    localStorage.removeItem("user");
    localStorage.removeItem("loggedIn");
    window.location.href = "../index.html";
});
// logout btn

// make the table
// read users and check whether that user exist or not
function mainCodes() {
    if(localStorage.user != null && localStorage.loggedIn === "true" && typeof JSON.parse(localStorage.user) == "object") {
        currentUser = JSON.parse(localStorage.user)
        readApi("https://jsonplaceholder.typicode.com/users")
            .then(data => {
                let searchItems = ["name", "phone","email"];
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
                    currentUser = JSON.parse(localStorage.user)
                    profileLink.href = `https://todo.com/profiles/${currentUser.id}${currentUser.name}${currentUser.email}${currentUser.phone}/`
                    readApi("https://jsonplaceholder.typicode.com/users")
                        .then(data => {
                            // show loading icon
                            tableLoader.classList.remove("opacity-0");
                            // show loading icon
                            // read todos and add them if they are that user's todos
                            readApi("https://jsonplaceholder.typicode.com/todos").then(toDos => {
                                let countId = 1;
                                toDos.forEach((toDosItem) => {
                                    if (toDosItem.userId === currentUser.id) {
                                        if (toDosItem.completed) {
                                            isComplete = `<i class="fa fa-check table-icon" aria-hidden="true"></i>`;
                                            noReminder = [``, ``];
                                        } else {
                                            isComplete = `<i class="fa fa-times table-icon" aria-hidden="true"></i>`;
                                            noReminder = [`<input type="checkbox" class="form-check-input table-reminders">`, `<input type="text" class="form-control table-input table-reminders">`];
                                        }
                                        getTable.innerHTML += `
                            <tr id="row-${toDosItem.id}">
                                <td>${countId}</td>
                                <td>${toDosItem.title}</td>
                                <td>${noReminder[0]}</td>
                                <td>${noReminder[1]}</td>
                                <td>${isComplete}</td>
                            </tr>
                        `;
                                        countId += 1;
                                    }
                                });
                                return countId;
                            }).then((countId) => {
                                for (let i = 1; i < countId; i++) {
                                    document.querySelector(`#row-${i} td:last-child`).addEventListener("click", () => {
                                        if (document.querySelector(`#row-${i} td:last-child i`).classList.contains("fa-times")) {
                                            document.querySelector(`#row-${i} td:last-child i`).classList.remove("fa-times");
                                            document.querySelector(`#row-${i} td:last-child i`).classList.add("fa-check");
                                            document.querySelector(`#row-${i} td:nth-child(3) input`).classList.add("d-none");
                                            document.querySelector(`#row-${i} td:nth-child(4) input`).classList.add("d-none");
                                        }
                                    });
                                    if(document.querySelector(`#row-${i} td:nth-child(3) input`) !== null) {
                                        document.querySelector(`#row-${i} td:nth-child(3) input`).addEventListener("change", () => {
                                            if (document.querySelector(`#row-${i} td:nth-child(3) input`).checked) {
                                                if (document.querySelector(`#row-${i} td:nth-child(4) input`).value !== "") {
                                                    eval(`
                                                    let secoundCounter${i} = 0;
                                                    setInterval(() => {
                                                        secoundCounter${i} += 1;
                                                        if(secoundCounter${i} == parseInt(document.querySelector(\`#row-${i} td:nth-child(4) input\`).value)) {
                                                            customAlert.classList.remove("d-none");
                                                            setTimeout(() => {
                                                                customAlert.classList.remove("opacity-0");
                                                                alertContainer.style.transform = "translateY(0px)";
                                                                alertSound.play();
                                                                alertTitle.innerHTML += \`<li class="opacity-0" style="transition-duration: 500ms; transform: translateY(10px);">${document.querySelector(`#row-${i} td:nth-child(2)`).textContent}</li>\`
                                                                setTimeout(() => {
                                                                    document.querySelectorAll("#alert .container .title ul li").forEach(element => {
                                                                        element.classList.remove("opacity-0");
                                                                        element.style.transform = "translateY(0px)";
                                                                    });
                                                                }, 1000)
                                                            }, 500);
                                                        }
                                                    }, 1000);
                                                `);
                                                } else {
                                                    alert("You didn't enter any time");
                                                    document.querySelector(`#row-${i} td:nth-child(3) input`).checked = false;
                                                }
                                            } else {
                                                document.querySelector(`#row-${i} td:nth-child(4) input`).value = "";
                                            }
                                        })
                                    }
                                }
                                setTimeout(() => {
                                    tableLoader.classList.add("opacity-0");
                                }, 3000);
                                setTimeout(() => {
                                    tableBody.classList.remove("d-none");
                                    tableLoader.classList.add("d-none");
                                }, 4000);
                                addNewBtn.addEventListener("click", (e) => {
                                    e.preventDefault();
                                    if (newActivity.value !== "") {
                                        getTable.innerHTML += `
                                <tr id="row-${countId}">
                                    <td>${countId}</td>
                                    <td>${newActivity.value}</td>
                                    <td><input type="checkbox" class="form-check-input table-reminders"></td>
                                    <td><input type="text" class="form-control table-input table-reminders"></td>
                                    <td><i class="fa fa-times table-icon" aria-hidden="true"></i></td>
                                </tr>
                            `;
                                        window.scrollTo(0, document.querySelector(`#row-${countId}`).getBoundingClientRect().top);
                                        countId += 1;
                                        for (let i = 1; i < countId; i++) {
                                            document.querySelector(`#row-${i} td:last-child`).addEventListener("click", () => {
                                                if (document.querySelector(`#row-${i} td:last-child i`).classList.contains("fa-times")) {
                                                    document.querySelector(`#row-${i} td:last-child i`).classList.remove("fa-times");
                                                    document.querySelector(`#row-${i} td:last-child i`).classList.add("fa-check");
                                                    document.querySelector(`#row-${i} td:nth-child(3) input`).classList.add("d-none");
                                                    document.querySelector(`#row-${i} td:nth-child(4) input`).classList.add("d-none");
                                                }
                                            });
                                            if(document.querySelector(`#row-${i} td:nth-child(3) input`) !== null) {
                                                document.querySelector(`#row-${i} td:nth-child(3) input`).addEventListener("change", () => {
                                                    if (document.querySelector(`#row-${i} td:nth-child(3) input`).checked) {
                                                        if (document.querySelector(`#row-${i} td:nth-child(4) input`).value !== "") {
                                                            eval(`
                                                    let secoundCounter${i} = 0;
                                                    setInterval(() => {
                                                        secoundCounter${i} += 1;
                                                        if(secoundCounter${i} == parseInt(document.querySelector(\`#row-${i} td:nth-child(4) input\`).value)) {
                                                            customAlert.classList.remove("d-none");
                                                            setTimeout(() => {
                                                                customAlert.classList.remove("opacity-0");
                                                                alertContainer.style.transform = "translateY(0px)";
                                                                alertSound.play();
                                                                alertTitle.innerHTML += \`<li class="opacity-0" style="transition-duration: 500ms; transform: translateY(10px);">${document.querySelector(`#row-${i} td:nth-child(2)`).textContent}</li>\`
                                                                setTimeout(() => {
                                                                    document.querySelectorAll("#alert .container .title ul li").forEach(element => {
                                                                        element.classList.remove("opacity-0");
                                                                        element.style.transform = "translateY(0px)";
                                                                    });
                                                                }, 1000)
                                                            }, 500);
                                                        }
                                                    }, 1000);
                                                `);
                                                        } else {
                                                            alert("You didn't enter any time");
                                                            document.querySelector(`#row-${i} td:nth-child(3) input`).checked = false;
                                                        }
                                                    } else {
                                                        document.querySelector(`#row-${i} td:nth-child(4) input`).value = "";
                                                    }
                                                });
                                            }
                                        }
                                        newActivity.value = ""
                                    } else {
                                        newActivityError.classList.remove("d-none");
                                        setTimeout(() => {
                                            newActivityError.classList.add("d-none");
                                        }, 6000);
                                    }
                                });
                            });
                        });
                } else {
                    window.location.href = "../index.html";
                }
            })
    } else {
        window.location.href = "../index.html";
    }
}
// read users and check whether that user exist or not
// make the table

// graduate
window.onload = () => {
    setTimeout(() => {
        if(! localStorage.getItem("graduated") ===  true) {
            learnHowRemind.classList.remove("opacity-0");
            let learnInterval = setInterval(() => {
                secoundCounter += 1;
                if(secoundCounter === 5) {
                    learnHowRemind.classList.add("opacity-0");
                }
                if(secoundCounter === 6) {
                    learnHowRemind.classList.add("d-none");
                    learnHowCheck.classList.remove("d-none");
                }
                if(secoundCounter === 7) {
                    learnHowCheck.classList.remove("opacity-0");
                }
                if(secoundCounter === 12) {
                    learnHowCheck.classList.add("opacity-0");
                }
                if(secoundCounter === 13) {
                    learnHowCheck.classList.add("d-none");
                    learnHowAdd.classList.remove("d-none");
                }
                if(secoundCounter === 14) {
                    learnHowAdd.classList.remove("opacity-0");
                }
                if(secoundCounter === 19) {
                    learnHowAdd.classList.add("opacity-0");
                }
                if(secoundCounter === 20) {
                    learnHowAdd.classList.add("d-none");
                    learnHowReturn.classList.remove("d-none");
                }
                if(secoundCounter === 21) {
                    learnHowReturn.classList.remove("opacity-0");
                }
                if(secoundCounter === 26) {
                    learnHowReturn.classList.add("opacity-0");
                }
                if(secoundCounter === 27) {
                    learnHowReturn.classList.add("d-none");
                    advertiseLogo.classList.remove("d-none");
                }
                if(secoundCounter === 28) {
                    advertiseLogo.classList.remove("opacity-0");
                }
                if(secoundCounter === 29) {
                    advertiseLogo.classList.add("animated-logo");
                }
                if(secoundCounter === 39) {
                    advertiseLogo.classList.remove("animated-logo");
                }
                if(secoundCounter === 40) {
                    advertiseLogo.classList.add("opacity-0");
                }
                if(secoundCounter === 41) {
                    learnHowWork.classList.add("opacity-0");
                    getNavbar.classList.remove("d-none");
                    mainCodes();
                }
                if(secoundCounter === 42) {
                    learnHowWork.classList.add("d-none");
                    slideShowEnd = true;
                    clearInterval(learnInterval);
                }
                if(slideShowEnd === true) {
                    localStorage.setItem("graduated", true);
                }
            }, 1000);
        } else {
            learnHowWork.classList.add("opacity-0");
            setTimeout(() => {
                learnHowWork.classList.add("d-none");
            }, 1000);
            getNavbar.classList.remove("d-none");
            mainCodes();
        }
    },2000);
};
// graduate