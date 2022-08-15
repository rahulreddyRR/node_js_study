const express = require('express');
const path = require('path')
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const rootDir = require('./utils/path');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use('/admin', adminRoutes);
app.use(express.static(path.join(__dirname, 'public')));
app.use([shopRoutes]);

app.use((req, res) => {
    res.status(404).sendFile(path.join(rootDir, 'views', '404.html'))
});

app.listen(3000);