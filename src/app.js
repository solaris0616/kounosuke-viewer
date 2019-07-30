import express from "express";
import rp from 'request-promise';
import cheerio from 'cheerio';
import Iconv from 'iconv';

const app = express();

const createOptions = () => {
    const jstOffsetMs = (-9) * 60 * 60 * 1000;
    const localOffsetMs = (new Date().getTimezoneOffset()) * 60 * 1000;
    const todayJST = new Date(Date.now() - localOffsetMs + jstOffsetMs);

    const month = (('00' + (todayJST.getMonth() + 1)).slice(-2));
    const date = (('00' + todayJST.getDate()).slice(-2));
    const filename = `https://www.panasonic.com/content/dam/panasonic/jp/corporate/history/founders-quotes/resource/DS${month}${date}.HTML`

    const option = {
        uri: filename,
        encoding: null,
        transform: (body) => {
            const iconv = Iconv.Iconv('SHIFT_JIS', 'UTF-8');
            const utf8Body = iconv.convert(body).toString();
            return cheerio.load(utf8Body, {decodeEntities: false});
        }
    };
    return option;
}

app.get('/', (req, res) => {
    const options = createOptions();

    rp(options)
        .then(($) => {
            const header = $('h1').html();
            const content = $('p').html();
            res.send({
                header: header,
                content: content
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

app.listen(3000, () => {
    console.log("App listening on port 3000!")
});
