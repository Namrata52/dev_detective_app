//variables
const root =document.documentElement.style;
const searchbar= document.querySelector(".searchbar-container");
const profileContainer =document.querySelector(".profile-container");
const get = (param) => document.getElementById(`${param}`);
const url ="https://api.github.com/users/";
const noresults =get("no-results");
const btnMode =get("btn-mode");
const modeText =get("mode-text");
const modeIcon =get("mode-icon");
const btnSubmit =get("submit");

const input =get("input");
const avatar =get("avatar");
const userName =get("name");
const user =get("user");
const date =get("date");
const months =["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const bio =get("bio");
const repos =get("repos");
const followers =get("followers");
const following =get("following");

const userLocation =get("location");
const page =get("page");
const twitter =get("twitter");
const company =get("company");

let darkMode =false;

//eventlisteners

btnMode.addEventListener("click", function(){
    if(darkMode == false ){
        darkModeActivate();
    }
    else{
        lightModeActivate();
    }
});

//submit btn listener- calls API
btnSubmit.addEventListener("click", function(){
    getUserData(url + input.value);
});

//agar input form me kuch aur type kiya

input.addEventListener("keydown",function(e){
    if(e.key =="Enter"){
        if(input.value!== ""){
            getUserData(url + input.value);
        }
    }
},false);

input.addEventListener("input",function(){
    noresults.style.display ="none";
});

//function

function getUserData(gitUrl){
    fetch(gitUrl)
    .then((response)=>response.json())
    .then((data=>{
        console.log(data);
        updateProfile(data);
    }))
    .catch((error)=>{
        throw error;
    });
}

//render
function updateProfile(data){
    if(data.message !== "Not Found"){
       noresults.style.display ="none";
       function checkNull(param1,param2){
        if(param1 === "" || param2 === null){
            param2.style.opacity =0.5;
            param2.previousElementSibling.style.opacity =0.5;
            return false;
        }else{
            return true;
        }
       }

       avatar.src =`${data.avatar_url}`;
       userName.innerText =`${data.name === null ? data.login:data.name}`;
       user.innerText =`@${data.login}`;
       user.href=`${data.html_url}`;

    //    datesegments =data.created_at.split("T").shift().split("-");
       datasegments = data.created_at.split("T").shift().split("-");
    //    date.innerText =`Joined ${datesegments[2]} ${months[datesegments[1]-1]} ${datesegments[0]}`;
       date.innerText = `Joined ${datasegments[2]} ${months[datasegments[1] - 1]} ${datasegments[0]}`;
       bio.innerText =data.bio == null?"This profile has no bio":`${data.bio}`;
       repos.innerText =`${data.public_repos}`;
       followers.innerText =`${data.followers}`;
       following.innerText =`${data.following}`;
       userLocation.innerText =checkNull(data.location,userLocation)?data.location:"Not available";

       page.innerText =checkNull(data.blog,page)?data.blog:"Not available";
       page.href =checkNull(data.blog,page)?data.blog:"#";
       twitter.innerText = checkNull(data.twitter_username, twitter) ? data.twitter_username : "Not Available";
       twitter.href = checkNull(data.twitter_username, twitter) ? `https://twitter.com/${data.twitter_username}` : "#";
       company.innerText = checkNull(data.company, company) ? data.company : "Not Available";
       searchbar.classList.toggle("active");
       profileContainer.classList.toggle("active");

    }
}

function darkModeActivate(){
    //change color of each element
    //use root properties here to change
    root.setProperty("--lm-bg","#141D2F");
    root.setProperty("--lm-bg-content","#1E24A7");
    root.setProperty("--lm-text","white");
    root.setProperty("--lm-text-alt","white");
    root.setProperty("--lm-shadow-xl","rgba(70,86,109,0.15");
    root.setProperty("--lm-icon-bg","brighness(1000%)");
    modeText.innerText ="LIGHT";
    modeIcon.src = "./assets/images/sun-icon.svg";
    darkMode =true;
    console.log("darkmode changed to "+darkMode);
    localStorage.setItem("dark-mode",true);
}

function lightModeActivate(){
    //change back to default 
    root.setProperty("--lm-bg","#f6f8ff");
    root.setProperty("--lm-bg-content","#fefefe");
    root.setProperty("--lm-text","#4b6a9b");
    root.setProperty("--lm-text-alt","#2b3442");

    root.setProperty("--lm-shadow","0px 16px 30px -10px rgba(70, 96, 187,0.2)");
    root.setProperty("--lm-icon-bg","brightness(100%");
    
    modeText.innerText ="DARK";
    modeIcon.src ="./assets/images/moon-icon.svg";
    darkMode =false;
    console.log("darkmode changed to "+darkMode);
    localStorage.setItem("dark-mode",false);
}

function init(){
    const value =localStorage.getItem("dark-mode");
    darkMode =false;

    if(value === null){
        console.log("log ke andar");
        localStorage.setItem("dark-mode",darkMode);
        lightModeActivate();

    }else if(value == "true"){
       console.log("truer k andar");
       darkModeActivate();
    }else if(value == "false"){
        console.log("falser k andar");
        lightModeActivate();
    }

    getUserData(url + "thepranaygupta");
}
init();