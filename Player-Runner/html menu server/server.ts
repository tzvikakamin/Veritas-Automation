import htmlText from "./html";
import * as express from 'express';
// const http = require('http')
// const fs = require('fs')
// const path = require('path')
export const port = 4007;

export default async function serverUp(orgName = '', posName = '') {
    return new Promise<any>((resolve) => {
        const app = express();

        const server = app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}/`);
        });
        
        app.get('/close', (req, res) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('<h1>Closing....</h1>');
            res.write('<h2 id="results">{"operation":"0"}</h2>');
            res.end();

            console.log('server closed');
            server.close();

            resolve({operation:0})
        })
        
        app.get('/results', (req, res) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('<h1>Closing....</h1>');
            res.write(`<h2 id="results">${JSON.stringify(req.query, null, 2)}</h2>`);
            res.end();

            console.log('server closed');
            server.close();

            resolve(req.query)
        })

        app.get('/*',(req, res) => {
            const data = htmlText(orgName, posName)
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        })


    });
}