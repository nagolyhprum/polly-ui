import english from './english'
const detectLanguage = () => 'english'

// const base = child => Object.assign({}, english, child.default) //TODO use this for other languages

export default {
  english
}[detectLanguage()]
