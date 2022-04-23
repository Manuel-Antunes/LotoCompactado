var emailInput = document.getElementById('emailInput');
var passwordInput = document.getElementById('passwordInput');
var imgInput = document.getElementById('imgInput');
var usernameInput = document.getElementById('usernameInput');
var source;
var createUserButton = document.getElementById('createUserButton');

function imagemdolado() {
    imgInput.style.display = "none";
    var reader = new FileReader();

    if (imgInput.files && imgInput.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            let foto = document.createElement("img");
            foto.src = e.target.result;
            foto.style.width = "100px";
            foto.style.height = "100px";
            foto.style.borderRadius = "100%";
            foto.style.marginLeft = "100px";
            document.getElementById("imgGroup").appendChild(foto);
            source = e.target.result;
            alert(e.target.result)
        }

        reader.readAsDataURL(imgInput.files[0]); // convert to base64 string
    }


}
createUserButton.addEventListener('click', function() {
        firebase.auth().createUserWithEmailAndPassword(emailInput.value, passwordInput.value).then(function(user) {
            // [END createwithemail]
            // callSomeFunction(); Optional
            // var user = firebase.auth().currentUser;
            user.updateProfile({
                    displayName: usernameInput.value,
                    photoURL: imgInput.value
                }).then(function() {

                        alert("O usuário " + usernameInput.value + " foi cadastrado com sucesso");

                        // Update successful.
                    },
                    function(error) {
                        alert("Não foi possivel cadastrar " + error);
                    })
                // An error happened.
        });
    },
    function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
            alert('Essa senha inserida é muito fraca');
        } else {
            console.error(error);
        }
        // [END_EXCLUDE]
    });