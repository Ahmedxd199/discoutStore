

//saving data
function savingLocalStorage(flag){
    localStorage.setItem("username",document.getElementById("name").value);
    localStorage.setItem("email",document.getElementById("mail").value);
    localStorage.setItem("address",document.getElementById("address").value);
    localStorage.setItem("password",document.getElementById("pass").value);
    
    if(flag == 1){
        window.open('homeLog.html' , '_self');
    }
}





var userlog = document.getElementById('name');
var paslog = document.getElementById('pass');

function checkLogin(){

    if(userlog.value == localStorage.username){
        if(paslog.value == localStorage.password){
            window.open('homeLog.html' , '_self');
        }else{
            window.open('signup.html' , '_self');
        }
    }else{
        window.open('signup.html' , '_self');
    }

}



function check(x){
    return x;
}


//password validation
function repeatpas(y){
    var password= document.getElementById("pass").value
    console.log(password)
     if(y.value!==password) {
         document.getElementById("repeatpass").style.display = "inline";
         savingLocalStorage(0);
         return(asmaavalid= false)
     }
     else {
         document.getElementById("repeatpass").style.display = "none";
         savingLocalStorage(1);
         return(asmaavalid= true)
     }
 }