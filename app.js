// THEME SWITCHING SECTION
const themeSwitch = document.getElementById("themeSwitch");

//to change CSS variables
const colorChanger = (previous, current) => {
  document.documentElement.style.setProperty(`--${previous}`, `${current}`);
}

themeSwitch.onclick = () => {
  if (themeSwitch.style.backgroundImage == 'url("assets/icon-sun.svg")') {
    themeSwitch.style.backgroundImage = 'url("assets/icon-moon.svg")';
    themeSwitch.textContent = "dark";
    themeSwitch.style.width = "calc(78rem/16)";
    colorChanger("box-shadow", "0 16px 30px -10px hsla(226, 46%, 50%, 0.2)");
    colorChanger("not-available", `#697C9A`);
    colorChanger("font-color", `#4B6A9B`);
    colorChanger("header-color", `#2B3442`);
    colorChanger("background-color", `#F6F8FF`);
    colorChanger("card-color", `#FEFEFE`);
  } else {
    themeSwitch.style.backgroundImage = 'url("assets/icon-sun.svg")';
    themeSwitch.textContent = "light";
    themeSwitch.style.width = "calc(89rem/16)";
    colorChanger("box-shadow", "none");
    colorChanger("not-available", `#697C9A`);
    colorChanger("font-color", `#FFFFFF`);
    colorChanger("header-color", `#FFFFFF`);
    colorChanger("background-color", `#141D2F`);
    colorChanger("card-color", `#1E2A47`);
  }
  themeSwitch.classList.toggle("dark--btn");
  themeSwitch.classList.toggle("light--btn");
};

// API SECTION
const search = document.getElementById("search");
const myForm = document.getElementById("myForm");
const errorMessage = document.getElementById("error");

// elements to be displayed
const avatar = document.getElementById("avatar");
const userName = document.getElementById("userName");
const login = document.getElementById("login");
const text = document.getElementById("text");
const repos = document.getElementById("repos");
const followers = document.getElementById("followers");
const following = document.getElementById("following");
const userLocation = document.getElementById("location");
const twitter = document.getElementById("twitter");
const website = document.getElementById("website");
const company = document.getElementById("company");
const joined = document.getElementById("joined");

//to get data from form
search.onclick = () => {
  const input = document.getElementById("inputUsername");
  if (input.value == "") {
    errorMessage.classList.remove("hidden");
    errorMessage.textContent = "Type a name"
  } else {
    requestUser(input.value);
    errorMessage.classList.add("hidden");
    errorMessage.textContent = "No results";
    //how to display error message when there is no response from API?
  }
}

//to get response from API
let requestUser = (username) => {
  const xhr = new XMLHttpRequest();
  const url = `https://api.github.com/users/${username}`;
  xhr.open('GET', url, true);
  xhr.onload = function() {
    const data = JSON.parse(this.response);
    avatar.style.backgroundImage = `url(${data.avatar_url})`
    userName.textContent = username;
    login.textContent = `@${data.login}`;
    text.textContent = data.bio;
    repos.textContent = data.public_repos;
    followers.textContent = data.followers;
    following.textContent = data.following;
    userLocation.textContent = data.location;
    twitter.textContent = data.twitter_username;
    website.textContent = data.blog;
    company.textContent = data.company;
    let date = new Date(data.created_at);
    joined.textContent = `${date.getDate()} ${getMonthString(date.getMonth())} ${date.getFullYear()}`
  }
  xhr.send();
}

// to get month from number
const getMonthString = (month) => {
  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return months[month];
}
