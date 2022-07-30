// variables
let getTable = document.querySelector(".table tbody");
let slideShowEnd = false
let isComplete = `<i></i>`;
let noReminder = ``;
let logOutBtn = document.querySelector(".log-out-btn");
let secoundCounter = 0;
let addNewBtn = document.querySelector(".add-new-activity-form-btn")
let profileLink = document.querySelector(".profile");
let newActivity = document.querySelector("#new-activity");
let newActivityError = document.querySelector(".input-error");
let customAlert = document.querySelector("#alert");
let okBtn = document.querySelector(".OK-btn");
let alertTitle = document.querySelector("#alert .container .title");
let currentUser = {};
let remindersObjct = {};
let reminderContent = {};
// variables
// graduate
window.onload = () => {
    setTimeout(() => {
        if(! localStorage.getItem("graduated") ===  true) {
            document.querySelector(".learn-how-reminde").classList.remove("opacity-0");
            let learnInterval = setInterval(() => {
                secoundCounter += 1;
                if(secoundCounter === 5) {
                    document.querySelector(".learn-how-reminde").classList.add("opacity-0");
                }
                if(secoundCounter === 6) {
                    document.querySelector(".learn-how-reminde").classList.add("d-none");
                    document.querySelector(".learn-how-check").classList.remove("d-none");
                }
                if(secoundCounter === 7) {
                    document.querySelector(".learn-how-check").classList.remove("opacity-0");
                }
                if(secoundCounter === 12) {
                    document.querySelector(".learn-how-check").classList.add("opacity-0");
                }
                if(secoundCounter === 13) {
                    document.querySelector(".learn-how-check").classList.add("d-none");
                    document.querySelector(".learn-how-add").classList.remove("d-none");
                }
                if(secoundCounter === 14) {
                    document.querySelector(".learn-how-add").classList.remove("opacity-0");
                }
                if(secoundCounter === 19) {
                    document.querySelector(".learn-how-add").classList.add("opacity-0");
                }
                if(secoundCounter === 20) {
                    document.querySelector(".learn-how-add").classList.add("d-none");
                    document.querySelector(".learn-how-return").classList.remove("d-none");
                }
                if(secoundCounter === 21) {
                    document.querySelector(".learn-how-return").classList.remove("opacity-0");
                }
                if(secoundCounter === 26) {
                    document.querySelector(".learn-how-return").classList.add("opacity-0");
                }
                if(secoundCounter === 27) {
                    document.querySelector(".learn-how-return").classList.add("d-none");
                    document.querySelector(".advertise").classList.remove("d-none");
                }
                if(secoundCounter === 28) {
                    document.querySelector(".advertise").classList.remove("opacity-0");
                }
                if(secoundCounter === 29) {
                    document.querySelector(".advertise").classList.add("animated-logo");
                }
                if(secoundCounter === 39) {
                    document.querySelector(".advertise").classList.remove("animated-logo");
                }
                if(secoundCounter === 40) {
                    document.querySelector(".advertise").classList.add("opacity-0");
                }
                if(secoundCounter === 41) {
                    document.querySelector(".learn-how-work").classList.add("opacity-0");
                    document.querySelector("#navbar").classList.remove("d-none");
                }
                if(secoundCounter === 42) {
                    document.querySelector(".learn-how-work").classList.add("d-none");
                    slideShowEnd = true;
                    clearInterval(learnInterval);
                }
                if(slideShowEnd === true) {
                    localStorage.setItem("graduated", true);
                }
            }, 1000);
        } else {
            document.querySelector(".learn-how-work").classList.add("opacity-0");
            setTimeout(() => {
                document.querySelector(".learn-how-work").classList.add("d-none");
            }, 1000);
            document.querySelector("#navbar").classList.remove("d-none");
        }
    },2000);
};
// graduate
// call API
async function readApi(url) {
    let getFile = await fetch(url);
    let data = await getFile.json();
    return data;
}
// call API
// log out btn
logOutBtn.addEventListener("click", () => {
    localStorage.removeItem("user");
    localStorage.removeItem("loggedIn");
    window.location = "file:///D:/mohamamdamin/simple-project-API/index.html"
});
// log out btn
// make the table
// read users and check whether that user exist or not
if(localStorage.user !== null && localStorage.loggedIn === "true" && typeof JSON.parse(localStorage.user) == "object") {
    currentUser = JSON.parse(localStorage.user)
    profileLink.href = `https://todo.com/profiles/${currentUser.id}${currentUser.name}${currentUser.email}${currentUser.phone}/`
    readApi("https://jsonplaceholder.typicode.com/users")
        .then(data => {
            // show loading icon
            document.querySelector(".table-loader").classList.remove("opacity-0");
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
                                    reminderContent = {
                                        time: parseInt(document.querySelector(`#row-${i} td:nth-child(4) input`).value),
                                        title: document.querySelector(`#row-${i} td:nth-child(2)`).textContent
                                    }
                                    remindersObjct[i] = reminderContent;
                                } else {
                                    alert("You didn't entered any time");
                                    document.querySelector(`#row-${i} td:nth-child(3) input`).checked = false;
                                }
                            } else {
                                document.querySelector(`#row-${i} td:nth-child(4) input`).value = "";
                                delete remindersObjct[i];
                            }
                        })
                    }
                }
                setTimeout(() => {
                    document.querySelector(".table-loader").classList.add("opacity-0");
                }, 3000);
                setTimeout(() => {
                    document.querySelector("tbody").classList.remove("d-none");
                    document.querySelector(".table-loader").classList.add("d-none");
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
                        }
                        if(document.querySelector(`#row-${i} td:nth-child(3) input`) !== null) {
                            document.querySelector(`#row-${i} td:nth-child(3) input`).addEventListener("change", () => {
                                if (document.querySelector(`#row-${i} td:nth-child(3) input`).checked) {
                                    if (document.querySelector(`#row-${i} td:nth-child(4) input`).value !== "") {
                                        reminderContent = {
                                            time: parseInt(document.querySelector(`#row-${i} td:nth-child(4) input`).value),
                                            title: document.querySelector(`#row-${i} td:nth-child(2)`).textContent
                                        }
                                        remindersObjct[i] = reminderContent;
                                    } else {
                                        alert("You didn't entered any time");
                                        document.querySelector(`#row-${i} td:nth-child(3) input`).checked = false;
                                    }
                                } else {
                                    document.querySelector(`#row-${i} td:nth-child(4) input`).value = "";
                                    delete remindersObjct[i];
                                }
                            })
                        }
                        newActivity.value = ""
                    } else {
                        newActivityError.classList.remove("d-none");
                        setTimeout(() => {
                            newActivityError.classList.add("d-none");
                        }, 6000);
                    }
                });
                //                 for (let i = 0; i < countId; i++) {
                //                     if (document.querySelector(`#row-${i} td:nth-child(3) input`) !== null) {
                //                         document.querySelector(`#row-${i} td:nth-child(3) input`).addEventListener("change", () => {
                //                             if (document.querySelector(`#row-${i} td:nth-child(3) input`).checked) {
                //                                 secoundCounter = 0;
                //                                 let alertInterval = setInterval(() => {
                //                                     secoundCounter += 1;
                //                                     if (secoundCounter == x) {
                //                                         customAlert.classList.remove("d-none");
                //                                         setTimeout(() => {
                //                                             document.querySelector("#alert .container").style.transform = "translateY(0px)";
                //                                             customAlert.classList.remove("opacity-0");
                //                                             let newAudio = new Audio("./assets/audio/MyRingtone.IR_1559234155_1690.mp3");
                //                                             newAudio.play();
                //                                             newAudio.loop = true;
                //                                             alertTitle.textContent = document.querySelector(`#row-${i} td:nth-child(2)`).textContent;
                //                                             okBtn.addEventListener("click", function clickedOkBtn() {
                //                                                 customAlert.classList.add("opacity-0");
                //                                                 document.querySelector("#alert .container").style.transform = "translateY(60px)";
                //                                                 setTimeout(() => {
                //                                                     customAlert.classList.add("d-none");
                //                                                     newAudio.pause();
                //                                                     removeEventListener("click", this);
                //                                                 }, 1000);
                //                                             });
                //                                         }, 500);
                //                                         clearInterval(alertInterval);
                //                                     }
                //                                 }, 1000);
                //                                 secoundCounter = 0;
                //                             }
                //                         });
                //                     }
                //                 }
                //                 newActivity.value = "";
                //             }
                //         }
                //     });
                //     })// read todos and add them if they are that user's todos
            })
        })
} else {
    window.location = "file:///D:/mohamamdamin/simple-project-API/index.html"
}
// read users and check whether that user exist or not
// make the table