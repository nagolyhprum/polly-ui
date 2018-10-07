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
      linear(16, 'horizontal')
      background(color.primary)
      padding(16)
      container(0, WRAP, () => {
        link('/')
        text('Poly UI')
        textColor(color.text)
        style(font.bold_20)
        anchor(0, 0.5)
        position(0, 0.5)
        weight(1)
      })
      container(32, 32, () => {
        src(drawable.action.feedback)
        anchor(0, 0.5)
        position(0, 0.5)
      })
    })
    container(MATCH, 0, () => {
      weight(1)
      background(color.light_primary)
      linear(0, 'horizontal')
      container(0, MATCH, () => {
        background('white')
        weight(1)
        margin(64, 64, 64, 0)
        shadow()
        container(MATCH, WRAP, () => {
          textColor(color.text)
          textAlign('center')
          padding(16)
          background(color.primary)
          text('Properties')
        })
      })
      container(WRAP, WRAP, () => {
        padding(16)
        anchor(0, 0.5)
        position(0, 0.5)
        background('black')
        round(20)
        linear(16)
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
        weight(2)
        margin(64, 0, 64, 64)
        resourcesComponent(screen)
      })
    })
  })
}
