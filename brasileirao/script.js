import express from 'express';
import fs from 'fs';

const app = express();
const PORT = 3000;

// Função para ler o JSON e calcular as estatísticas
const processarDados = () => {
    const rawData = fs.readFileSync('./bd.json');
    const times = JSON.parse(rawData);

    return times.map(t => {
        const pts = (t.v * 3) + (t.e * 1);
        const saldo = (t.gp || 0) - (t.gc || 0);
        const desempenho = t.j > 0 ? ((pts / (t.j * 3)) * 100).toFixed(1) : 0;
        
        return { ...t, pts, saldo, desempenho: desempenho + "%" };
    }).sort((a, b) => b.pts - a.pts || b.saldo - a.saldo);
};

// Rota Principal: http://localhost:3000/campeonato
app.get('/campeonato', (req, res) => {
    let tabela = processarDados();

    // Demandas via Query Params (URL)
    const { nome, limite } = req.query;

    // Filtro por nome: ?nome=Santos
    if (nome) {
        tabela = tabela.filter(t => t.time.toLowerCase() === nome.toLowerCase());
    }

    // Filtro por quantidade (8 melhores, etc): ?limite=8
    if (limite) {
        tabela = tabela.slice(0, parseInt(limite));
    }

    // Top 4 Saldo de Gols (calculado separadamente para exibição)
    const top4Saldo = [...processarDados()]
        .sort((a, b) => b.saldo - a.saldo)
        .slice(0, 4);

    // Resposta formatada para o navegador
    res.json({
        classificacao: tabela,
        destaque_saldo: top4Saldo,
        mensagem: "Dados atualizados Paulistão 2026"
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}/campeonato`),
    console.log(`Serevidor rodando em http://localhost:${PORT}/campeonato?nome=Novorizontino`),
    console.log(`Serevidor rodando em http://localhost:${PORT}/campeonato?limite=3`);
});