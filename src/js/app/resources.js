import colorsComponent from 'app/colors'
import stringsComponent from 'app/strings'
import drawablesComponent from 'app/drawables'
import fontsComponent from 'app/fonts'
import componentsComponent from 'app/components'
export default screen => {
  const {
    container,
    background,
    shadow,
    linear,
    textColor,
    textAlign,
    padding,
    text,
    tabs,
    weight,
    pager,
    MATCH,
    WRAP,
    resources: {
      color
    }
  } = screen
  container(MATCH, MATCH, () => {
    background('white')
    shadow()
    linear()
    const tabs$ = tabs('Components', 'Images', 'Text', 'Colors', 'Fonts', 'State')
    container(MATCH, 0, () => {
      weight(1)
      linear()
      pager(tabs$, () => {
        componentsComponent(screen)
        drawablesComponent(screen)
        stringsComponent(screen)
        colorsComponent(screen)
        fontsComponent(screen)
      })
    })
  })
}
