//Pra ser sincero, não sei direito o que fiz mas tá funcionado, vou estudar mais JSON, muito chato mas bem organizado

import express from 'express';
import { 
    AritmeticaAdd, AritmeticaSub, AritmeticaDiv, 
    AritmeticaMulti, AritmeticaPot, AritmeticaRaiz, 
    AritmeticaFrac, AritmeticaVPorc, AritmeticaEqui 
} from './Aritmetica.js'
import { caso } from './Case.js'
import { verificarComida } from './DoWhile.js'
import { tabuada } from './For.js'
import { idadeValidade } from './IfElse.js'
import { textos } from './String.js'
import { adivinhar } from './Whille.js'
import { calcularSalarios } from './Vetor.js'

const app = express()
const PORT = 3000

// Middleware para aceitar JSON no corpo das requisições
//Middleware é um software "intermediário" que conecta componentes, aplicativos ou sistemas distribuídos, facilitando a troca de dados e a comunicação
app.use(express.json())

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 1. Aritmetica

// 1. Soma (/soma/81/12)
app.get('/soma/:n1/:n2', (req, res) => {
    const n1 = Number(req.params.n1);
    const n2 = Number(req.params.n2);
    res.json({ operacao: 'soma', n1, n2, resultado: AritmeticaAdd(n1, n2) });
});

// 2. Subtração (/sub/126/53)
app.get('/sub/:n1/:n2', (req, res) => {
    const n1 = Number(req.params.n1);
    const n2 = Number(req.params.n2);
    res.json({ operacao: 'subtracao', n1, n2, resultado: AritmeticaSub(n1, n2) });
});

// 3. Divisão (/div/120/20)
app.get('/div/:n1/:n2', (req, res) => {
    const n1 = Number(req.params.n1);
    const n2 = Number(req.params.n2);
    res.json({ operacao: 'divisao', n1, n2, resultado: AritmeticaDiv(n1, n2) });
});

// 4. Multiplicação (/multi/5/16)
app.get('/multi/:n1/:n2', (req, res) => {
    const n1 = Number(req.params.n1);
    const n2 = Number(req.params.n2);
    res.json({ operacao: 'multiplicacao', n1, n2, resultado: AritmeticaMulti(n1, n2) });
});

// 5. Potência (/pot/4/6)
app.get('/pot/:base/:exp', (req, res) => {
    const base = Number(req.params.base);
    const exp = Number(req.params.exp);
    res.json({ operacao: 'potencia', base, expoente: exp, resultado: AritmeticaPot(base, exp) });
});

// 6. Raiz (/raiz/144)
app.get('/raiz/:n', (req, res) => {
    const n = Number(req.params.n);
    res.json({ operacao: 'raiz', valor: n, resultado: AritmeticaRaiz(n) });
});

// 7. Fração (/fracao/12/5)
app.get('/fracao/:nume/:deno', (req, res) => {
    const nume = Number(req.params.nume);
    const deno = Number(req.params.deno);
    res.json({ operacao: 'fracao', numerador: nume, denominador: deno, resultado: AritmeticaFrac(nume, deno) });
});

// 8. Porcentagem (/porcentagem/129/20 -> 20% de 129)
app.get('/porcentagem/:valor/:porcent', (req, res) => {
    const v = Number(req.params.valor);
    const p = Number(req.params.porcent);
    res.json({ operacao: 'valor_porcentagem', total: v, porcentagem: p, resultado: AritmeticaVPorc(v, p) });
});

// 9. Equivalência (/equivalencia/23/263)
app.get('/equivalencia/:parte/:total', (req, res) => {
    const parte = Number(req.params.parte);
    const total = Number(req.params.total);
    // Note que aqui usei o template string para adicionar o símbolo de %
    res.json({ 
        operacao: 'equivalencia', 
        parte, 
        total, 
        resultado: `${AritmeticaEqui(parte, total)}%` 
    });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// 2. ROTA DE DIA DA SEMANA (Case)
app.get('/dia/:valor', (req, res) => {
    res.json({
        Entrada: req.params.valor,
        Resultado: caso(req.params.valor)
    })
})

// 3. ROTA DE SALÁRIOS (Vetor)
app.get('/salarios', (req, res) => {
    const listaStr = req.query.lista;
    if (!listaStr) {
        return res.status(400).json({ erro: "Parâmetro 'lista' é obrigatório. Ex: ?lista=1000,2000" });
    }
    
    const numeros = listaStr.split(',').map(Number)
    const resultados = calcularSalarios(numeros)

    res.json({
        SalariosBrutos: numeros,
        SalariosLiquidos: resultados,
        TotalProcessado: resultados.length
    })
})

// 4. ROTA DE COMIDA (DoWhile)
app.get('/comida', (req, res) => {
    const escolha = req.query.escolha;
    res.json({
        ItemEscolhido: escolha || "Nenhum",
        MensagemSistema: verificarComida(escolha)
    })
})

// 5. ROTA DE TABUADA (For)
app.get('/tabuada/:num', (req, res) => {
    const numero = req.params.num;
    res.json({
        TabuadaDo: numero,
        ResultadoFormatado: tabuada(numero)
    })
})

// 6. ROTA DE IDADE (IfElse)
app.get('/idade', (req, res) => {
    const valorIdade = Number(req.query.v);
    
    if (isNaN(valorIdade)) {
        return res.status(400).json({ erro: "Por favor, informe um número válido em ?v=" });
    }

    res.json({
        IdadeDigitada: valorIdade,
        ResultadoValidacao: idadeValidade(valorIdade)
    })
})

// 7. ROTA DE SAUDAÇÃO (String)
app.get('/ola/:nome', (req, res) => {
    res.json({
        Usuario: req.params.nome,
        Introducao: textos(req.params.nome)
    })
})

// 8. ROTA DE ADIVINHAÇÃO (Whille)
app.get('/chute/:rand', (req, res) => {
    const palpite = req.params.rand;

    res.json({
        jogo: "Adivinhação",
        PalpiteUsuario: palpite,
        ResultadoSistema: adivinhar(palpite)
    })
})


app.listen(PORT, () => {
    console.log(`\nSERVIDOR ONLINE: http://localhost:${PORT}`);
    console.log(`\n--- LINKS PARA TESTAR (Geral) ---`);
    console.log(`Case:      http://localhost:${PORT}/dia/1`);
    console.log(`Do While:  http://localhost:${PORT}/comida?escolha=Pizza`);
    console.log(`For:       http://localhost:${PORT}/tabuada/7`);
    console.log(`If Else:   http://localhost:${PORT}/idade?v=20`);
    console.log(`String:    http://localhost:${PORT}/ola/SeuNome`);
    console.log(`Vetor:     http://localhost:${PORT}/salarios?lista=1200,3500,5000`);
    console.log(`While:     http://localhost:${PORT}/chute/5`);

    console.log(`\n--- LINKS PARA TESTAR (Aritmética via Rota) ---`);
    console.log(`Soma:           http://localhost:${PORT}/soma/81/12`);
    console.log(`Subtração:      http://localhost:${PORT}/sub/126/53`);
    console.log(`Divisão:        http://localhost:${PORT}/div/120/20`);
    console.log(`Multiplicação:  http://localhost:${PORT}/multi/5/16`);
    console.log(`Potência:       http://localhost:${PORT}/pot/4/6`);
    console.log(`Raiz:           http://localhost:${PORT}/raiz/144`);
    console.log(`Fração:         http://localhost:${PORT}/fracao/12/5`);
    console.log(`Porcentagem:    http://localhost:${PORT}/porcentagem/129/20`);
    console.log(`Equivalência:   http://localhost:${PORT}/equivalencia/23/263`);
});


// --- EXPLICAÇÃO: req.params (Parâmetros de Rota) ---
// Use quando o dado faz parte do "endereço" fixo da página.
// Identificado pelo ":" na rota. Ex: /tabuada/:num

// --- EXPLICAÇÃO: req.query (Query Strings / Consulta) ---
// Use para dados opcionais, filtros ou listas que vêm após o "?"
// Não precisa de ":" na definição da rota.

//7 horas de conversao de JS para JSON, tenho que programar mais rapido, gastando muito tempo