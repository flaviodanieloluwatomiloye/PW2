//Tabuada basica
const readline = require('readline-sync')

let valorTab;

valorTab = readline.question("Qual tabuada vc quer calcular? ")

for(i=1; i<13; i++) {
    console.log(valorTab,"x",i,"=",valorTab*i)
}

//Foi mal professor, tava sem criatividade hoje