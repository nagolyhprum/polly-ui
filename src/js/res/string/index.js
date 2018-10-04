const detectLanguage = () => 'english'
import english from 'string/english'

// const base = child => Object.assign({}, english, child.default) //TODO use this for other languages

export default {
  english
}[detectLanguage()]
