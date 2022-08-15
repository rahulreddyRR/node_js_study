const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write('<html><head><title>first assignment</title></head><body><ul><li>Users</li></ul></body></html>')
        return res.end();
    }
    if (url === '/username') {
        res.write('<html><head><title>Users</title></head><body><form action="/createUsername" method="POST"><input type="text" name="username"><button type="submit">submit</button></form></body></html>')
        return res.end();
    }
    if (url === '/createUsername' && method === "POST") {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        })
        return req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            const message = parseBody.split('=')[1]
            fs.writeFile('message.txt', message, () => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            })
        })
    }
}

module.exports = requestHandler;