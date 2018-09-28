import drawable from 'drawable'
import font from 'font'
import Observable from 'rave/observable'

const CHAPTER = {
  icon: drawable.chapters.possessive,
  name: 'Possessive',
  description: 'To have'
}

const CHAPTERS = [CHAPTER, CHAPTER, CHAPTER]

const SECTION = {
  icon: drawable.sections.beginner,
  name: 'Beginner',
  chapters: CHAPTERS
}

const SECTIONS = [SECTION, SECTION, SECTION]

const PHRASE = {
  translation: {
    english: 'TO OWN',
    mandarin: 'you'
  }
}

const PHRASES = {
  a: [PHRASE, PHRASE, PHRASE],
  b: [PHRASE, PHRASE, PHRASE],
  c: [PHRASE, PHRASE, PHRASE]
}

const MENU_ITEM = {
  icon: drawable.icons.settings,
  text: 'Settings',
  onClick: () => {
    console.log('Settings')
  }
}

const MENU = [MENU_ITEM, MENU_ITEM, MENU_ITEM, MENU_ITEM, MENU_ITEM, MENU_ITEM, MENU_ITEM, MENU_ITEM, MENU_ITEM, MENU_ITEM, MENU_ITEM, MENU_ITEM, MENU_ITEM, MENU_ITEM, MENU_ITEM, MENU_ITEM]

export default function (state) {
  const {
    margin,
    background,
    padding,
    container,
    src,
    linear,
    text,
    anchor,
    position,
    style,
    onClick,
    scrollable,
    WRAP,
    MATCH,
    PERCENT,
    textColor,
    textAlign,
    input,
    card,
    weight,
    separator,
    tabs,
    visibility,
    animateVisibility,
    observe,
    timeout,
    animate
  } = this
  const drawer$ = new Observable(false)
  container(MATCH, MATCH, () => {
    background('#2196f3')
    linear(0)
    container(MATCH, WRAP, () => {
      padding(16, 16, 0, 16)
      linear(8, 'horizontal')
      container(WRAP, WRAP, () => {
        src(drawable.icons.menu)
        onClick(() => {
          drawer$.set(true)
        })
      })
      container(0, WRAP, () => {
        position(0, 0.5)
        anchor(0, 0.5)
        weight(1)
        textColor('white')
        text('Chinese - Mandarin')
        style(font.medium_20)
      })
      container(WRAP, PERCENT(50), () => {
        src(drawable.languages.english)
        position(0, 0.5)
        anchor(0, 0.5)
      })
      container(WRAP, WRAP, () => {
        position(0, 0.5)
        anchor(0, 0.5)
        textColor('white')
        text('100%')
        style(font.normal_12)
      })
      container(WRAP, PERCENT(50), () => {
        src(drawable.streak.normal)
        position(0, 0.5)
        anchor(0, 0.5)
      })
      container(WRAP, WRAP, () => {
        position(0, 0.5)
        anchor(0, 0.5)
        textColor('white')
        text('1')
        style(font.normal_12)
      })
    })
    const tab$ = tabs('LEARN', 'REVIEW')
    container(MATCH, 0, () => {
      weight(1)
      container(MATCH, MATCH, () => {
        observe(tab$, tab => {
          animateVisibility(tab === 0)
        })
        linear()
        scrollable()
        background('#f1f9ff')
        SECTIONS.forEach(section => {
          container(MATCH, WRAP, () => {
            padding(16)
            linear(8)
            container(PERCENT(25), WRAP, () => {
              position(0.5, 0)
              anchor(0.5, 0)
              src(section.icon)
            })
            container(WRAP, WRAP, () => {
              position(0.5, 0)
              anchor(0.5, 0)
              text(section.name)
            })
          })
          container(MATCH, WRAP, () => {
            card()
            linear()
            separator()
            section.chapters.forEach(chapter => {
              container(MATCH, WRAP, () => {
                onClick(() => {
                  console.log('chapter')
                })
                padding(16)
                linear(16, 'horizontal')
                container(WRAP, WRAP, () => {
                  position(0, 0.5)
                  anchor(0, 0.5)
                  src(chapter.icon)
                })
                container(0, WRAP, () => {
                  position(0, 0.5)
                  anchor(0, 0.5)
                  weight(1)
                  linear(8)
                  container(WRAP, WRAP, () => {
                    text(chapter.name)
                  })
                  container(WRAP, WRAP, () => {
                    text(chapter.description)
                  })
                })
                container(WRAP, WRAP, () => {
                  padding(8)
                  position(0, 0.5)
                  anchor(0, 0.5)
                  src(drawable.download.normal)
                  onClick(() => {
                    console.log('download')
                  })
                })
              })
            })
          })
        })
      })
      container(MATCH, MATCH, () => {
        background('#f1f9ff')
        observe(tab$, tab => {
          animateVisibility(tab === 1)
        })
        linear()
        container(MATCH, WRAP, () => {
          padding(16)
          background('white')
          container(MATCH, WRAP, () => {
            input()
            text('Search all vocabulary')
          })
        })
        container(MATCH, 0, () => {
          weight(1)
          scrollable()
          linear()
          Object.keys(PHRASES).forEach(letter => {
            container(WRAP, WRAP, () => {
              padding(16)
              text(letter)
            })
            container(MATCH, WRAP, () => {
              card()
              separator()
              linear()
              PHRASES[letter].forEach(phrase => {
                container(MATCH, WRAP, () => {
                  padding(16)
                  linear(8)
                  container(WRAP, WRAP, () => {
                    text(phrase.translation.english)
                  })
                  container(WRAP, WRAP, () => {
                    text(phrase.translation.mandarin)
                  })
                })
              })
            })
          })
        })
      })
    })
  })
  container(64, 64, () => {
    // fab()
    padding(8, 8, 8, 8)
    src(drawable.icons.add_white)
    background("gold")
    margin(0, 16, 16, 0)
    position(1, 1)
    anchor(1, 1)
    onClick(() => {
      console.log("fab")
    })
  })

  // DRAWER
  container(MATCH, MATCH, () => {
    observe(drawer$, drawer => {
      if (drawer) {
        visibility(true)
      } else {
        if (this.firstRender) {
          visibility(false)
        } else {
          timeout(() => visibility(false), 300)
        }
      }
    })
    container(MATCH, MATCH, () => {
      background('rgba(0,0,0,.7)')
      observe(drawer$, drawer => {
        animateVisibility(drawer)
      })
      onClick(() => {
        drawer$.set(false)
      })
    })
    container(PERCENT(80), MATCH, () => {
      observe(drawer$, drawer => {
        const view = this.active
        if (drawer) {
          animate({
            x: -view.bounds.width
          }, {
            x: 0
          }, 300)
        } else {
          animate({
            x: 0
          }, {
            x: -view.bounds.width
          }, 300)
        }
      })
      background('white')
      linear()
      container(MATCH, WRAP, () => {
        padding(16)
        linear(8)
        background('#2196f3')
        container(PERCENT(40), WRAP, () => {
          src(drawable.languages.english)
          position(0.5, 0)
          anchor(0.5, 0)
        })
        container(MATCH, WRAP, () => {
          text('Chinese - Mandarin')
          textAlign('center')
          textColor('white')
        })
      })
      container(MATCH, 0, () => {
        weight(1)
        scrollable()
        linear()
        MENU.forEach(item => {
          container(MATCH, WRAP, () => {
            onClick(item.onClick)
            padding(16)
            linear(16, 'horizontal')
            container(WRAP, WRAP, () => {
              src(item.icon)
            })
            container(WRAP, WRAP, () => {
              text(item.text)
              position(0, 0.5)
              anchor(0, 0.5)
            })
          })
        })
      })
    })
  })
}
