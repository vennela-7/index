// Get the submit button element
let submitBtn = document.getElementById("submit");

// Object to store form data
const info = {
    student_name: '',
    email: '',
    url: '',
    website: '',
    gender: '',
    skillArr: [],
}

// Function to get form data and store in info object
const getData = () => {
    // Get input values and assign to info object properties
    info.student_name = document.getElementById('name').value;
    info.email = document.getElementById('email').value;
    info.url = document.getElementById('url').value;
    info.website = document.getElementById('website').value;
    info.gender = document.querySelector('input[name="male-female"]:checked').value;

    // Get selected skills checkboxes and assign to info object skillArr property
    let skills = document.querySelectorAll('.checkbox:checked');
    info.skillArr = [];
    skills.forEach((item) => {
        info.skillArr.push(item.value);
    })

    // Check if localStorage has any data, and add info object to it
    if (localStorage.getItem("infoSection") === null) {
        infoItem = [];
    }
    else {
        infoItem = JSON.parse(localStorage.getItem("infoSection"))
    }
    infoItem.push(info);
    localStorage.setItem("infoSection", JSON.stringify(infoItem));
}

// Function to display form data in HTML
const showData = () => {
    // Get the container to display the form data
    let cardContainer = document.getElementById("cardContainer");

    // Initialize an empty string to hold the HTML for each card
    let cards = '';

    // Get data from localStorage
    let getLocalStorage = localStorage.getItem("infoSection");

    // If localStorage is empty, log "null"
    if (getLocalStorage === null) {
        console.log("null");
    }
    // Otherwise, loop through the localStorage array and create a card for each item
    else {
        cardDivArr = JSON.parse(getLocalStorage);
        cardDivArr.forEach((item, index) => {

            // Add HTML for card to cards string
            cards += `<div class="card">
            <img src=${item.url} alt="Profile Picture">
            <div class="info">
                <p><strong>Name</strong> : ${item.student_name}</p>
                <p><strong>Email</strong> : ${item.email}</p>
                <p><strong>Website</strong> : <a href="${item.website}">Click here</a></p>
                <p><strong>Gender</strong> : ${item.gender}</p>
                <p><strong>Skills</strong> : ${item.skillArr.join(", ")}</p>
                <button onclick="deleteData(${index})">Delete</button>
            </div>
        </div>`;
        })
    }
    // Add the HTML for all cards to the container
    cardContainer.innerHTML = cards;
}

// Function to delete form data from localStorage
const deleteData = (index) => {
    let getList = JSON.parse(localStorage.getItem("infoSection"));
    getList.splice(index, 1);

    localStorage.setItem("infoSection", JSON.stringify(getList));
    // Reload the page to show updated form data
    window.location.reload();
}

// Event listener for submit button click
submitBtn.addEventListener(('click'), () => {
    // Call getData and showData functions to update the form data display
    getData();
    showData();
})
