import background from "rave/plugins/background"
import Screen from "rave/screen"

describe("background", () => {
  it("sets the background", () => {
    const bg = "red"
    const view = {}
    const screen = {
      active : view
    }
    background(screen)
    screen.background(bg)
    expect(view).toEqual({ background : bg })
  })
  it("prevents screen", () => {
    const screen = {}
    expect(background(screen)(screen)).toEqual(false)
  })
  it("draws the view with margin", done => {
    const canvas = {
      getWidth : () => 0,
      getHeight : () => 0
    }
    const screen = new Screen(canvas)
    const view = {
      bounds : {
        x : 10,
        y : 15,
        width : 40,
        height : 50
      },
      background : "red",
      margin : [10, 12, 5, 13],
      render : (cvs, x, y, width, height, round, background) => {
        expect(canvas).toEqual(cvs)
        expect(x).toEqual(23)
        expect(y).toEqual(25)
        expect(width).toEqual(15)
        expect(height).toEqual(35)
        expect(round).toEqual(0)
        expect(background).toEqual("red")
        done()
      }
    }
    background(screen)(view)
  })
  it("draws the view without margin", done => {
    const canvas = {
      getWidth : () => 0,
      getHeight : () => 0
    }
    const screen = new Screen(canvas)
    const view = {
      bounds : {
        x : 10,
        y : 15,
        width : 40,
        height : 50
      },
      round : 3,
      render : (cvs, x, y, width, height, round, background) => {
        expect(canvas).toEqual(cvs)
        expect(x).toEqual(10)
        expect(y).toEqual(15)
        expect(width).toEqual(40)
        expect(height).toEqual(50)
        expect(round).toEqual(3)
        expect(background).toEqual("transparent")
        done()
      }
    }
    background(screen)(view)
  })
})
