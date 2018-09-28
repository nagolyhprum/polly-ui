import alpha from "rave/plugins/alpha"

describe("alpha", () => {
  it("defaults to 1", done => {
    const values = [undefined, 1]
    const screen = {
      canvas : {
        alpha : function(alpha) {
          expect(alpha).toEqual(values.shift())
          if(!values.length) {
            done()
          }
          return 1
        }
      }
    }
    const view = {}
    alpha(screen)(view)
  })
  it("uses the alpha", done => {
    const values = [undefined, .5]
    const screen = {
      canvas : {
        alpha : function(alpha) {
          expect(alpha).toEqual(values.shift())
          if(!values.length) {
            done()
          }
          return 1
        }
      }
    }
    const view = { alpha : .5 }
    alpha(screen)(view)
  })
  it("accumulates alpha", done => {
    const values = [undefined, .25]
    const screen = {
      canvas : {
        alpha : function(alpha) {
          expect(alpha).toEqual(values.shift())
          if(!values.length) {
            done()
          }
          return .5
        }
      }
    }
    const view = { alpha : .5 }
    alpha(screen)(view)
  })
})
