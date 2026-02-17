const API = "http://localhost:5000";


// REGISTER
function register()
{
    fetch(API + "/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        window.location.href = "login.html";
    });
}


// LOGIN
function login()
{
    fetch(API + "/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        })
    })
    .then(res => res.json())
    .then(data => {

        if(data.userId)
        {
            localStorage.setItem("userId", data.userId);
            window.location.href = "dashboard.html";
        }
        else
        {
            alert(data.message);
        }

    });
}


// CHECK IN
function checkIn()
{
    fetch(API + "/checkin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: localStorage.getItem("userId")
        })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        loadHistory();
    });
}


// CHECK OUT
function checkOut()
{
    fetch(API + "/checkout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: localStorage.getItem("userId")
        })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        loadHistory();
    });
}


// LOAD HISTORY
function loadHistory()
{
    const userId = localStorage.getItem("userId");

    fetch(API + "/history/" + userId)
    .then(res => res.json())
    .then(data => {

        let html = "";

        data.forEach(row => {
            html += `
            <tr>
            <td>${row.date}</td>
            <td>${row.checkin}</td>
            <td>${row.checkout || "-"}</td>
            </tr>
            `;
        });

        document.getElementById("history").innerHTML = html;

    });
}


// LOGOUT
function logout()
{
    localStorage.removeItem("userId");
    window.location.href = "login.html";
}


// AUTO LOAD
if(window.location.pathname.includes("dashboard.html"))
{
    loadHistory();
}




