const env = process.env.NODE_ENV
const config = require(`./webpack.${env}`)

module.exports = config