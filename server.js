const app = require('./app');

const port = process.env.PORT || 3001;
const url = process.env.URL || 'http://localhost';

app.set('port', port);

app.listen(port, () => console.log(`App is listening at ${url}:${port}`));
