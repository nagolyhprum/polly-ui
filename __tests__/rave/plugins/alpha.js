import alpha from 'rave/plugins/alpha'

describe('alpha', () => {
  it('defaults to 1', done => {
    const values = [undefined, 1]
    const screen = {
      canvas: {
        alpha: function (alpha) {
          expect(alpha).toEqual(values.shift())
          if (!values.length) {
            done()
          }
          return 1
        }
      },
      plugins: {
        render: []
      }
    }
    const view = {}
    alpha(screen)
    screen.plugins.render[0](view)
  })
  it('uses the alpha', done => {
    const values = [undefined, 0.5]
    const screen = {
      canvas: {
        alpha: function (alpha) {
          expect(alpha).toEqual(values.shift())
          if (!values.length) {
            done()
          }
          return 1
        }
      },
      plugins: {
        render: []
      }
    }
    const view = { alpha: 0.5 }
    alpha(screen)
    screen.plugins.render[0](view)
  })
  it('accumulates alpha', done => {
    const values = [undefined, 0.25]
    const screen = {
      canvas: {
        alpha: function (alpha) {
          expect(alpha).toEqual(values.shift())
          if (!values.length) {
            done()
          }
          return 0.5
        }
      },
      plugins: {
        render: []
      }
    }
    const view = { alpha: 0.5 }
    alpha(screen)
    screen.plugins.render[0](view)
  })
})
