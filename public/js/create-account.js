let firstName = document.querySelector("#firstName");
let lastName = document.querySelector("#lastName");
let bi = document.querySelector("#bi");
let birthday = document.querySelector("#birthday");
let nationality = document.querySelector("#nationality");
let address = document.querySelector("#address");
let phoneNumber = document.querySelector("#phoneNumber");
let nativeLanguage = document.querySelector("#nativeLanguage");
let gender = document.querySelector("#gender");
let maritalStatus = document.querySelector("#maritalStatus");
let username = document.querySelector("#username");
let email = document.querySelector("#email");
let password1 = document.querySelector("#password1");
let password2 = document.querySelector("#password2");
let form = document.querySelector("#formulario");
let button = document.querySelector("#buttonCreateAccount");


window.addEventListener('load', ()=>{
    loadCountry();
});

button.addEventListener("click", () => {
    let result = validateForm();
    if (result === null) {
        let formObj = {
            firstName: firstName.value,
            lastName: lastName.value,
            bi: bi.value,
            birthday: birthday.value,
            nationality: nationality.value,
            address: address.value,
            phoneNumber: phoneNumber.value,
            nativeLanguage: nativeLanguage.value,
            gender: gender.value,
            maritalStatus: maritalStatus.value,
            username: username.value,
            email: email.value,
            password1: password1.value,
            password2: password2.value,
        }
        sendData(formObj);
    }
    else
        Swal.fire('Cadastro!', result, 'warning');
});

function validateForm() {
    const TAM = 2;
    let regex = /\S+@\S+\.\S+/;

    if(!regex.test(email.value))
        return "O email não está no formato: name@example.com! Retifique por favor.";
    else if (password1.value.length < TAM)
        return ("A senha deve conter no minimo " + TAM + "caracteres");
    else if (password1.value !== password2.value)
        return "As senhas introduzidas são diferentes";
    return null;
}


function sendData(data = {}) {
    fetch("/user/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then((response)=>response.json())
        .then((result)=>{
            console.log("Success:", result);
            Swal.fire('Cadastro!', result.message, result.status);
        })
        .catch ((error)=>{
            Swal.fire('Cadastro!', 'Tempo Limite Excedido. Server não respondendo!', 'error');
        });
}



function loadCountry() {
    for (let countryCod in paises) {
        let selected = (countryCod === "pt-PT" )? 'selected' : '';
        let option = `<option ${selected} value="${countryCod}">${paises[countryCod]}</option>`;
        nativeLanguage.insertAdjacentHTML("beforeend", option);
    }
}