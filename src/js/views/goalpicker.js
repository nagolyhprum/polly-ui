import font from 'font'
import drawable from 'drawable'
import Overview from 'views/overview'

const GOALS = [{
  months: 15,
  words: 3
}, {
  months: 10,
  words: 6
}, {
  months: 5,
  words: 9
}]

export default function (state) {
  const {
    start,
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
    PERCENT,
    WRAP,
    MATCH,
    textColor,
    textAlign,
    card,
    separator
  } = this
  padding(16)
  background('#2196f3')
  linear(16)
  container(MATCH, WRAP, () => {
    textColor('white')
    text('How quickly would you\nlike to learn?')
    textAlign('center')
    style(font.medium_20)
    container(WRAP, WRAP, () => {
      src(drawable.icons.back_white)
      anchor(0, 0.5)
      position(0, 0.5)
      onClick(back)
    })
  })
  container(PERCENT(40), WRAP, () => {
    src(drawable.languages.english)
    position(0.5, 0)
    anchor(0.5, 0)
  })
  container(WRAP, WRAP, () => {
    text('Chinese (Mandarin)')
    textColor('white')
    position(0.5, 0)
    anchor(0.5, 0)
  })
  container(MATCH, WRAP, () => {
    card()
    linear()
    separator()
    GOALS.forEach(goal => {
      container(MATCH, WRAP, () => {
        padding(16)
        linear(8)
        container(WRAP, WRAP, () => {
          text(`I want to be conversational in ${goal.months} months`)
        })
        container(WRAP, WRAP, () => {
          text(`${goal.words} words per day`)
        })
        onClick(() => {
          start(Overview)
        })
      })
    })
  })
}
