//Calculo de salario liquido
const readline = require('readline-sync')

let i = 1;
let listsalario = [];
while (i <= 4) { 
    let salario = Number(readline.question('Digite o salário do funcionário ',i, ': '));
    let desconto = 0

    if (salario < 2000.0) {
        desconto = salario * 0.085;
    } else {
        desconto = salario * 0.11;
    }
    let salarioFin = salario - desconto

    listsalario.push(salarioFin);
    console.log(salarioFin);
i++;
}
console.log("Salarios Completos");
console.log(listsalario);