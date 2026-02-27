//seria assim se eu estivesse usando o console ao inves do terminal
    //let dia = prompt("Qual é a casa desse número nos dias da semana (de 1 a 7)");

const readline = require('readline-sync');

let dia = readline.question("De qual dia da semana vc quer saber?");

switch(dia) {
    case '1':
        console.log('primeiro dia da semana é o Domingo');
    break;

    case '2':
        console.log('Segundo dia da semana é a Segunda-feira');
    break;

    case '3':
        console.log('Terceiro dia da semana é a Terça-feira');
    break;

    case '4':
        console.log('Quarto dia da semana é a Quarta-feira');
    break;

    case '5':
        console.log('Quinto dia da semana é a Quinta-feira');
    break;

    case '6':
        console.log('Sexto dia da semana é a Sexta-feira');
    break;

    case '7':
        console.log('Sétimo e último dia da semana é o Sabado');
    break;

    default:
        console.log('a semana so tem 7 dias e dia 0 não existe');
        break;
}