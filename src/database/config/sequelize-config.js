const path = require('path')

require('ts-node').register({
  console: true,
  project: path.join(__dirname, '..', '..', '..', 'tsconfig.json'),
})

// Adjust the path according to your structure
const config = require('./config.ts')

module.exports = config['default']
