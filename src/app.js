import express from "express";
import rp from 'request-promise';
import cheerio from 'cheerio';
import Iconv from 'iconv';

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('static'));

const createOptions = (dateStr) => {
    const option = {
        uri: `https://www.panasonic.com/content/dam/panasonic/jp/corporate/history/founders-quotes/resource/DS${dateStr}.HTML`,
        encoding: null,
        transform: (body) => {
            const iconv = Iconv.Iconv('SHIFT_JIS', 'UTF-8');
            const utf8Body = iconv.convert(body).toString();
            return cheerio.load(utf8Body);
        }
    };
    return option;
}

app.get('/', (req, res) => {
    res.render("index", {});
});

app.get('/api/story', (req, res) => {
    const options = createOptions(req.query.dateStr);
    rp(options)
        .then(($) => {
            const title = $('h1').text();
            const content = $('p').text();
            res.json({
                title: title,
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
