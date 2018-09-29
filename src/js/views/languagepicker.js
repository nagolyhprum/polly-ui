import drawable from 'drawable'
import font from 'font'
import GoalPicker from 'views/goalpicker'

const LANGUAGES = Array.from({ length: 32 }).map((_, i) => ({
  flag: drawable.languages.english,
  display: 'Chinese - Mandarin ' + (i + 1)
}))

export default function (state) {
  const {
    background,
    padding,
    container,
    src,
    linear,
    text,
    anchor,
    position,
    style,
    back,
    onClick,
    scrollable,
    WRAP,
    MATCH,
    textColor,
    start,
    textAlign,
    weight,
    button,
    card,
    separator
  } = this
  padding(16)
  background('#2196f3')
  linear(16)
  container(MATCH, WRAP, () => {
    textColor('white')
    text('What language do\nyou speak natively?')
    textAlign('center')
    style(font.medium_20)
    container(WRAP, WRAP, () => {
      src(drawable.icons.back_white)
      anchor(0, 0.5)
      position(0, 0.5)
      onClick(back)
    })
  })
  container(MATCH, 0, () => {
    weight(1)
    card()
    linear()
    scrollable()
    separator()
    LANGUAGES.forEach((language, index) => {
      container(MATCH, WRAP, () => {
        onClick(() => {
          start(GoalPicker, {})
        })
        padding(16)
        linear(16, 'horizontal')
        container(WRAP, WRAP, () => {
          src(language.flag)
        })
        container(WRAP, WRAP, () => {
          text(language.display)
          anchor(0, 0.5)
          position(0, 0.5)
        })
      })
    })
  })
  container(WRAP, WRAP, () => {
    text('REQUEST A LANGUAGE')
    button()
    anchor(1, 0)
    position(1, 0)
  })
}
