import resourcesComponent from 'app/resources'
import phoneComponent from 'app/phone'
import treeComponent from 'app/tree'
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
    scrollable,
    textAlign,
    card,
    MATCH,
    state$,
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
      container(WRAP, MATCH, () => {
        card()

        scrollable()

        const isArray = input => console.log('isArray', input) || (input instanceof Array ? input : [])

        const resources = [
          'Audio',
          'Colors',
          'Components',
          'Fonts',
          'Images',
          'Scripts',
          'State',
          'Text'
        ].map(key => ({
          key,
          children: isArray(state$.get()[key.toLowerCase()])
        }))

        treeComponent(screen, resources)
      })
      container(WRAP, WRAP, () => {
        position(0, 0.5)
        anchor(0, 0.5)
        padding(16)
        margin(0, 64, 0, 64)
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
    })
  })
}
