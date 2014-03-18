var LamassuConfig = require('lamassu-config');
var psql = process.env.DATABASE_URL || 'postgres://lamassu:lamassu@localhost/lamassu';
module.exports = new LamassuConfig(psql);
