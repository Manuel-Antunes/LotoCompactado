// Buttons
var authEmailPassButton = document.getElementById('authEmailPassButton');
var authGoogleButton = document.getElementById('authGoogleButton');
var createUserButton = document.getElementById('createUserButton');
var logOutButton = document.getElementById('logOutButton');
logOutButton.style.display = "none";
// Inputs
var emailInput = document.getElementById('emailInput');
var passwordInput = document.getElementById('passwordInput');
var user;
// Displays
var displayName = document.getElementById('displayName');
// Criar novo usuário
firebase.auth().onAuthStateChanged(() => {
        if (firebase.auth().currentUser) {
            user = firebase.auth().currentUser.toJSON();
            console.log(user.displayName);
            let profile = document.createElement("img");
            profile.src = user.photoURL;
            profile.style.width = "50px";
            profile.style.height = "50px";
            profile.style.borderRadius = "100%";
            let newString = "";

            for (let i = 0; i < 30; i++) {
                if (user.displayName[i] != " ") {
                    newString = newString + user.displayName[i];
                } else {
                    break;
                }
            }
            document.getElementById("logcamp").style.display = "none";
            document.getElementById("displayName").innerHTML = newString + "       ";
            document.getElementById("displayName").appendChild(profile);
            logOutButton.style.display = "block";
        }
    })
    // Autenticar com E-mail e Senha
authEmailPassButton.addEventListener('click', function() {
    firebase
        .auth()
        .signInWithEmailAndPassword(emailInput.value, passwordInput.value)
        .then(function(result) {
            console.log(result);
            window.location.href = './home.html';
        })
        .catch(function(error) {
            console.error(error.code);
            console.error(error.message);
            alert('Falha ao autenticar')
        });
});

// Logout
logOutButton.addEventListener('click', function() {
    firebase
        .auth()
        .signOut()
        .then(function() {
            displayName.innerText = 'Você não está autenticado';
            window.location.href = '/';
        }, function(error) {
            console.error(error);
        });

});




// Autenticar com Google
authGoogleButton.addEventListener('click', function() {
    // Providers
    var provider = new firebase.auth.GoogleAuthProvider();
    signIn(provider);
});



function signIn(provider) {
    firebase.auth()
        .signInWithPopup(provider)
        .then(function(result) {
            console.log(result);
            var token = result.credential.accessToken;
            displayName.innerText = 'Bem vindo, ' + result.user.email;
            let usuario = result.user;
            $.get("/logar", {
                "name": usuario.displayName,
                "uid": usuario.uid,
                "email": usuario.email
            });
        }).catch(function(error) {
            console.log(error);

            alert('Falha na autenticação');
        });
}