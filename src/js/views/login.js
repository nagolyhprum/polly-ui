import drawable from 'drawable'
import font from 'font'
import Overview from 'views/overview'
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
    WRAP,
    MATCH,
    textColor,
    input,
    button,
    card,
    start
  } = this
  padding(16)
  background('#2196f3')
  linear(16)
  container(MATCH, WRAP, () => {
    linear(16, 'horizontal')
    container(WRAP, WRAP, () => {
      src(drawable.icons.back_white)
      anchor(0, 0.5)
      position(0, 0.5)
      onClick(back)
    })
    container(WRAP, WRAP, () => {
      textColor('white')
      text('Login')
      anchor(0, 0.5)
      position(0, 0.5)
      style(font.medium_20)
    })
  })
  container(MATCH, WRAP, () => {
    card()
    padding(16)
    linear(16)
    container(MATCH, WRAP, () => {
      text('Username')
      input()
    })
    container(MATCH, WRAP, () => {
      text('Password')
      input('password')
    })
    container(MATCH, WRAP, () => {
      text('Login')
      button('#673ab7')
      onClick(() => {
        start(Overview)
      })
    })
    container(MATCH, WRAP, () => {
      container(MATCH, 1, () => {
        position(0, 0.5)
        anchor(0, 0.5)
        background('black')
      })
      container(WRAP, WRAP, () => {
        position(0.5, 0)
        anchor(0.5, 0)
        text('OR')
        background('white')
        padding(0, 16, 0, 16)
      })
    })
    container(MATCH, WRAP, () => {
      text('CONNECT WITH GOOGLE')
      button('#673ab7')
      onClick(() => {
        start(Overview)
      })
    })
    container(MATCH, WRAP, () => {
      button('#673ab7')
      text('CONNECT WITH FACEBOOK')
      onClick(() => {
        start(Overview)
      })
    })
  })
}
