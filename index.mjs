import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import {noteRoutes} from './routes/noteRoutes';

const app = express();

// serve static
app.use(express.static(path.resolve('public')));
app.use(express.static(path.resolve('public/html')));
app.use('/libraries/moment', express.static('node_modules/moment/min'));
app.use('/libraries/handlebars', express.static('node_modules/handlebars/dist'));

app.use(bodyParser.json());

app.get("/", function(req, res){
    res.sendFile("/html/index.html",  {root: __dirname + '/public/'});
});

// routes
app.use("/notes", noteRoutes);

// error handling
app.use((req, res, next) => {
    res.status(404).sendfile('./public/html/error.html');
});

app.use((err, req, res, next) => {
    res.status(500).send('Something broke!')
});


const hostname = '127.0.0.1';
const port = 3001;
app.listen(port, hostname, () => {
    console.log(`Note App running at http://${hostname}:${port}/`);
});
