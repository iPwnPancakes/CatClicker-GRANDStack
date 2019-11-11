const fs = require('fs');
const path = require('path');

module.exports = fs.readFileSync(path.resolve(__dirname, '..', 'Schema.graphql')).toString('utf-8');