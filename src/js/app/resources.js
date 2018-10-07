import colorsComponent from 'app/colors'
import stringsComponent from 'app/strings'
import drawablesComponent from 'app/drawables'
import fontsComponent from 'app/fonts'
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
    container(MATCH, WRAP, () => {
      textColor(color.text)
      textAlign('center')
      padding(16)
      background(color.primary)
      text('Resources')
    })
    const tabs$ = tabs('Screens', 'Images', 'Text', 'Colors', 'Fonts')
    container(MATCH, 0, () => {
      weight(1)
      linear()
      padding(0, 16, 16, 16)
      pager(tabs$, () => {
        container(0, 0, () => {})
        drawablesComponent(screen)
        stringsComponent(screen)
        colorsComponent(screen)
        fontsComponent(screen)
      })
    })
  })
}
