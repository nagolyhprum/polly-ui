import resourcesComponent from 'app/resources'
import phoneComponent from 'app/phone'
export default screen => {
  const {
    style,
    padding,
    container,
    background,
    text,
    textColor,
    src,
    linear,
    position,
    anchor,
    link,
    weight,
    margin,
    shadow,
    round,
    circle,
    textAlign,
    MATCH,
    WRAP,
    resources: {
      color,
      font,
      drawable
    }
  } = screen
  container(MATCH, MATCH, () => {
    linear()
    container(MATCH, WRAP, () => {
      background(color.primary)
      padding(16)
      container(WRAP, WRAP, () => {
        link('/')
        text('Poly UI')
        textColor(color.text)
        style(font.bold_20)
        anchor(0, 0.5)
        position(0, 0.5)
      })
      container(32, 32, () => {
        src(drawable.action.feedback)
        anchor(1, 0.5)
        position(1, 0.5)
      })
    })
    container(MATCH, 0, () => {
      weight(1)
      background(color.light_primary)
      linear(0, 'horizontal')
      container(WRAP, WRAP, () => {
        padding(16)
        anchor(0, 0.5)
        position(0, 0.5)
        background('black')
        round(20)
        linear(16)
        margin(0, 64, 0, 64)
        container(WRAP, WRAP, () => {
          linear(16, 'horizontal')
          anchor(0.5, 0)
          position(0.5, 0)
          container(10, 10, () => {
            background('#757575')
            circle()
          })
          container(25, 5, () => {
            background('#EDEDED')
            anchor(0, 0.5)
            position(0, 0.5)
          })
          container(10, 10, () => {
            background('#757575')
            circle()
          })
        })
        phoneComponent(screen)
        container(30, 15, () => {
          background('#757575')
          round(5)
          anchor(0.5, 0)
          position(0.5, 0)
        })
      })
      container(0, MATCH, () => {
        weight(1)
        margin(64, 0, 64, 0)
        resourcesComponent(screen)
      })
    })
  })
}
