import express from "express";
import rp from 'request-promise';
import cheerio from 'cheerio';

const app = express();

const options = {
    uri: 'https://www.panasonic.com/jp/corporate/history/founders-quotes.html',
    transform: (body) => {
        return cheerio.load(body);
    }
}

app.get('/', (req, res) => {
    rp(options)
        .then(($) => {
            console.log($('title').text());
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    res.send("Hello world.");
});

app.listen(3000, () => {
    console.log("App listening on port 3000!")
});
