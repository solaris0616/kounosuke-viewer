import express from "express";
import rp from 'request-promise';
import cheerio from 'cheerio';
import Iconv from 'iconv';

const app = express();

const options = {
    uri: 'https://www.panasonic.com/content/dam/panasonic/jp/corporate/history/founders-quotes/resource/DS0730.HTML',
    encoding: null,
    transform: (body) => {
        const iconv = Iconv.Iconv('SHIFT_JIS', 'UTF-8');
        const utf8Body = iconv.convert(body).toString();
        return cheerio.load(utf8Body, {decodeEntities: false});
    }
}

app.get('/', (req, res) => {
    rp(options)
        .then(($) => {
            const header = $('h1').html();
            const content = $('p').html();
            res.send({
                title: header,
                contents: content
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

app.listen(3000, () => {
    console.log("App listening on port 3000!")
});
