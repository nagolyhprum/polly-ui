import drawable from 'drawable'
import font from 'font'
import Login from 'views/login'
import LanguagePicker from 'views/languagepicker'

export default (screen, state) => {
  const {
    highlight,
    container,
    background,
    position,
    text,
    onClick,
    anchor,
    start,
    src,
    style,
    linear,
    textColor,
    WRAP,
    MATCH,
    PERCENT,
    button
  } = screen
  background('#2196f3')
  container(PERCENT(40), WRAP, () => {
    highlight()
    anchor(0.5, 0.5)
    position(0.5, 0.25)
    src(drawable.logos.lexicon_white)
  })
  container(WRAP, WRAP, () => {
    linear(16)
    anchor(0.5, 0.5)
    position(0.5, 0.5)
    container(WRAP, WRAP, () => {
      anchor(0.5, 0)
      position(0.5, 0)
      textColor('white')
      text('Lexicon')
      style(font.bold_34)
    })
    container(WRAP, WRAP, () => {
      text('Your language learning buddy')
      textColor('white')
      style(font.bold_20)
    })
  })
  container(PERCENT(50), WRAP, () => {
    linear(16)
    anchor(0.5, 0.5)
    position(0.5, 0.75)
    container(MATCH, WRAP, () => {
      button('#673ab7')
      text('GET STARTED')
      onClick(() => {
        start(LanguagePicker, state)
      })
    })
    container(MATCH, WRAP, () => {
      text('LOGIN')
      button()
      onClick(() => {
        start(Login)
      })
    })
  })
}
