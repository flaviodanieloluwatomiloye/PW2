//pizza ou hamburger
const readLine = require('readline-sync');

let goat;


do{
    console.log("Tecle '1' se preferir haburger (XTudão não conta) ")
    console.log("Tecle '2' se você prefere Pizza")
    goat = readLine.question("Tecle sua opção ('1' ou '2') ")

    if(goat !== '1' && goat !== '2') {
        console.log("Somente os números '1' ou '2'  devem ser digitados")
    } 
} while (goat !== '1' && goat !== '2')

    if(goat = '1') {
         console.log("Pessima escolha, tente novamente")
        } else if (goat = '2') {
             console.log("Òtima escolha, não tinha outra melhor!")
            }