import express from 'express'
import bodyParser from 'body-parser'
import { readFileSync } from 'fs'
import puppeteer from 'puppeteer'
import axios from 'axios'
import Mustache from 'mustache'

const apiUrl = 'https://api.adalo.com/v0/apps/35538164-b2d4-42d6-b3e4-ae3ef2a9f8e5/collections/t_f078e1a9b3f446b780fe026b12642665'
const apiUrlPost = 'https://api.adalo.com/v0/apps/35538164-b2d4-42d6-b3e4-ae3ef2a9f8e5/collections/t_f078e1a9b3f446b780fe026b12642665'
const token = 'aeetonwnsmfg78z9315z8cy8f'

let config = {
    headers: {
        'Authorization': 'Bearer ' + token
    }
}

const app = express();
app.use(bodyParser.json());

app.get('/teste', async (req, res) => {
    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    await axios.get(apiUrl, config)
        .then(function (response) {
            // manipula o sucesso da requisição
            console.log(response.data);
            res.send(response.data)
        })
        .catch(function (error) {
            // manipula erros da requisição
            console.error(error);
        })
        .finally(function () {
            // sempre será executado
        });
})

app.post('/testePost', async (req, res) => {
    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    const { data } = req.body
    for (let i = 0; i < 1000; i++)
        await axios.post(apiUrlPost, data, config)
            .then(function (response) {
                // manipula o sucesso da requisição
                console.log(response.data);
                // res.send(response.data)
            })
            .catch(function (error) {
                // manipula erros da requisição
                console.error(error);
            })
            .finally(function () {
                // sempre será executado
            });
})

app.get('/generate-pdf', async (req, res) => {
    const browser = await puppeteer.launch({ headless: 'new' });
    // Create a new page
    const page = await browser.newPage();
    //Get HTML content from HTML file
    const html = readFileSync('./temp/sample.html', 'utf-8');

    // var rendered

    // await axios.get(apiUrl, config)
    //     .then(function (response) {
    //         // manipula o sucesso da requisição
    //         console.log(response.data.records);
    //         rendered = Mustache.render(html,{});
    //     })
    //     .catch(function (error) {
    //         res.send('error')
    //     })

    await page.setContent(html, { waitUntil: 'domcontentloaded' });

    // To reflect CSS used for screens instead of print
    await page.emulateMediaType('screen');

    // Downlaod the PDF
    await page.pdf({
        path: './temp/result.pdf',
        margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
        printBackground: true,
        format: 'A4',
    })

    await browser.close();
    const pdf = readFileSync('./temp/result.pdf');
    res.contentType("application/pdf")
    res.send(pdf);
})

app.get('/getLink', async (req, res) => {
    res.send({ message: 'https://google.com.br' })
})

app.listen(process.env.PORT || '3333', () => {
    console.log(`Servidor rodando na porta 3333`)
})