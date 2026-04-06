import express from 'express';
import cors from 'cors';
import Tesseract from 'tesseract.js';
import sharp from 'sharp';

const app = express();
const port = 3000;

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/orc', express.raw({ type: '*/*' }), async (req, res) => {
    const buffer = req.body;

    const processed = await sharp(buffer).resize(800).grayscale().threshold(150).toFile("output_file_name.jpg");


    // const result = await Tesseract.recognize(processed, 'eng');
    // const worker = await Tesseract.createWorker('eng');
    // await worker.setParameters({
    //     tessedit_char_whitelist: '0123456789'
    // });
    // const {
    //     data: { text }
    // } = await worker.recognize(buffer);
    // await worker.terminate();

    // console.log(text);

    res.send('Hello World!');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening on port ${port}`);
});
