import { criarGrafico, getCSS, incluirTexto} from "./common.js"

async function redesSociaisFavoritasMinhaEscola() {
    const dadosLocaisString = localStorage.getItem('respostaRedesSociais')
    if (dadosLocaisString) {
        const dadosLocais = JSON.parse(dadosLocaisString)
        processarDados(dadosLocais)
    } else {
        const url = 'https://script.googleusercontent.com/macros/echo?user_content_key=T9F6XUilMZnVa6zh6LviMNZqMQmXdIKgCiMLdGZltRkxBeBn6-CCrjS84ElOXkwpiwLNDCLS3qbVqpNAhoRIRaaYkX92BUIbm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnPXphcxyGP0K8q8R7hLvvZ0-ISJqbDDUwG0UzeW1tY84rfbAtv9mEApN9utBRv8B2DrFJexGywNgOIiXtcfiF7cqkwovss5GNtz9Jw9Md8uu&lib=Mtafa4MPpRmd5ecaWErNJ8qs1WMgRS7jQ'
        const res = await fetch(url) 
        const dados = await res.json()
        localStorage.setItem('respostaRedesSociais', JSON.stringify(dados))
        processarDados(dadosLocais)
    }
}

function processarDados(dados) {
    const redesSociais = dados.slice(1).map(redes => redes[1])
    const contagemRedesSociais = redesSociais.reduce((acc, redesSociais) => {
        acc[redesSociais] = (acc[redesSociais] || 0 ) + 1
        return acc
    }, {})
    const valores = Object.values(contagemRedesSociais)
    const labels = Object.keys(contagemRedesSociais)
    
    const data = [
        {
            values: valores,
            labels: labels,
            type: 'pie',
            textinfo: 'label+percent'
        }
    ]

    const layout = {
        plot_bgcolor: getCSS('--bg-color'),
        paper_bgcolor: getCSS('--bg-color'),
        height: 710,
        title: {
            text: 'Redes sociais que as pessoas da minha escola mais gostam',
            x: 0,
            font: {
                color: getCSS('--primary-color'),
                family: getCSS('--font'),
                size: 30
            }
        },
        legend: {
            font: {
                color: getCSS('--primary-color'),
                size: 16
            }
        }
    }

    criarGrafico(data, layout)
    incluirTexto(`Como no mundo, a amostra de pessoas entrevistadas por mim, demonstra um apreço pelo <span>Instagram</span> em relação a outras redes`)
}

redesSociaisFavoritasMinhaEscola()