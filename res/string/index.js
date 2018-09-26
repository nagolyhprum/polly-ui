const detectLanguage = () => 'english'
const english = require('string/english').default

const base = child => Object.assign({}, english, child.default)

export default {
  english,
  spanish: base(require('string/spanish')),
  chinese: base(require('string/chinese')),
  arabic: base(require('string/arabic'))
}[detectLanguage()]
