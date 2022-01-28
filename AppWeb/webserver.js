const http = require('http');
const os = require("os");

const port = process.argv[2] || 3000;
const api = process.env.API || 'http://localhost:5000'
var hostname = os.hostname();

const server = http.createServer((req, res) => {
    var host = server.address().address;
    var port = server.address().port;
    var time =  new Date();

    var html = `
    <div>
    hostname : <strong>${hostname}</strong> ${time}<br>
    webserver: <strong>http://${host}:${port}</strong><br>
    apiserver: <strong>${api}</strong><br>
    <button id='btn' title='API'>fetch API</button><hr>
    </div>
    <ul id='lista'></ul>
    <style>* { font-size: xx-large; font-family: monospace; } </style>
    <script type='text/javascript'>
    document.getElementById('btn').onclick = callAPI;
    function callAPI() {
        fetch('${api}')
        .then(data => {
            console.log(data);
            return data.json();
        })
        .then(data => {
            console.log(data);
            for (var item of data) 
                addData(JSON.stringify(item));
        })
        .catch(error => addData(error))  
    }
    function addData(txt) {    
        var ul = document.getElementById('lista');
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(txt));
        ul.appendChild(li); 
    }    
    </script>
    `;
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200;
    res.end(html)
});

server.listen(port, '0.0.0.0', () => {
    console.log(`WEB Server running at http://${hostname}:${port}/`);
    console.log(`API Server fetch from ${api}/`);
});