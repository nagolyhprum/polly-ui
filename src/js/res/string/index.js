const detectLanguage = () => 'english'
const english = require('string/english').default

// const base = child => Object.assign({}, english, child.default) //TODO use this for other languages

export default {
  english
}[detectLanguage()]
