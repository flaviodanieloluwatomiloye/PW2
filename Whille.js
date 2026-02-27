//Adivinha o numero
const readline = require('readline-sync');

let num=26
let acerto=false

while(!acerto) {
    let tenta = readline.question('Adivinhe o número registrado:');

    if(tenta == num) {
        console.log("Aeeeee!! Acertou!!");
        acerto=true
    } else {
        console.log("Tente novamente.")
    }
}