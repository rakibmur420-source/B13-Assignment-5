

document.getElementById("login-btn").addEventListener("click", function(){
// get text input
const textInput = document.getElementById("input-text");
const name = textInput.value;
console.log(name);

// get pin input
const inputPin= document.getElementById("input-password");
const pin=inputPin.value
console.log(pin);
//match  pin & num
if(name=="admin" && pin=="admin123"){
    alert("login Success");
    window.location.assign("./home.html")
}else{
    alert("login Failed");
    return;
}

});

