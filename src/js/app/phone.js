const LIST = [{
  title: 'Demo Capabilities of Poly UI',
  description: 'By showing a list'
}, {
  title: 'Demo Capabilities of Poly UI',
  description: 'By showing a list'
}, {
  title: 'Demo Capabilities of Poly UI',
  description: 'By showing a list'
}, {
  title: 'Demo Capabilities of Poly UI',
  description: 'By showing a list'
}, {
  title: 'Demo Capabilities of Poly UI',
  description: 'By showing a list'
}, {
  title: 'Demo Capabilities of Poly UI',
  description: 'By showing a list'
}, {
  title: 'Demo Capabilities of Poly UI',
  description: 'By showing a list'
}, {
  title: 'Demo Capabilities of Poly UI',
  description: 'By showing a list'
}, {
  title: 'Demo Capabilities of Poly UI',
  description: 'By showing a list'
}]

const content = screen => {
  const {
    fab,
    scrollable,
    separator,
    container,
    background,
    linear,
    src,
    anchor,
    position,
    padding,
    margin,
    text,
    style,
    textColor,
    weight,
    shadow,
    MATCH,
    WRAP,
    resources: {
      color,
      drawable,
      font
    }
  } = screen
  container(MATCH, MATCH, () => {
    linear()
    container(MATCH, 16, () => {
      background(color.dark_primary)
    })
    container(MATCH, 16 * 16, () => {
      background(color.primary)
      padding(16)
      shadow()
      container(32, 32, () => {
        src(drawable.navigation.back)
      })
      container(32, 32, () => {
        src(drawable.navigation.more_vert)
        anchor(1, 0)
        position(1, 0)
      })
      container(WRAP, WRAP, () => {
        anchor(0.5, 0.5)
        position(0.5, 0.5)
        linear(8)
        container(WRAP, WRAP, () => {
          text('Poly UI')
          style(font.bold_36)
          textColor(color.text)
        })
        container(WRAP, WRAP, () => {
          text('Demo of color pallette')
          style(font.regular_16)
          textColor(color.light_primary)
        })
      })
    })
    container(MATCH, 0, () => {
      weight(1)
      container(MATCH, MATCH, () => {
        linear()
        scrollable()
        separator()
        LIST.forEach(it => {
          container(MATCH, WRAP, () => {
            padding(16)
            linear(16, 'horizontal')
            container(24, 24, () => {
              src(drawable.navigation.check, color.secondary_text)
              anchor(0, 0.5)
              position(0, 0.5)
            })
            container(WRAP, WRAP, () => {
              linear(8)
              container(WRAP, WRAP, () => {
                text(it.title)
                textColor(color.primary_text)
                style(font.regular_16)
              })
              container(WRAP, WRAP, () => {
                text(it.description)
                textColor(color.secondary_text)
                style(font.regular_12)
              })
            })
          })
        })
      })
      container(72, 56, () => {
        fab()
        margin(0, 16, 0, 0)
        anchor(1, 0.5)
        position(1, 0)
      })
    })
  })
}

export default screen => {
  const {
    container,
    background,
    include
  } = screen
  container(_ => child => ({ width: child.bounds.height * 480 / 856 }), _ => child => ({ height: child.parent.parent.bounds.height * 0.75 }), () => {
    background('white')
    include(content)
  })
}
