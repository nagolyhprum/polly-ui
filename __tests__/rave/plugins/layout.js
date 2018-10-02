import layout from "rave/plugins/layout"
import Screen from "screen"
import View from "view"
describe("layout", () => {
  it("it draws borders and margins", () => {
    const screen = Screen()
    const view = View()
    layout(true)(screen)
    screen.plugins.render[0](view)
    expect(screen.calls).toEqual([
      [
        "highlightArea",
      	"rgba(0, 255, 0, .7)",
      	50,
      	30,
      	-30,
      	0,
      	90,
      	40,
      	-90,
      	-40
      ],
      [
        "highlightArea",
      	"rgba(0, 0, 255, .7)",
      	10,
      	20,
      	30,
      	40,
      	50,
      	30,
      	-30,
      	0
      ]
    ])
    expect(screen.canvas.drawn).toEqual([
      ["strokeStyle", "rgba(0, 0, 0, .7)"],
      ["setLineDash", [2, 4]],
      ["strokeRect", 10, 20, 30, 40],
      ["setLineDash", []]
    ])
  })
  it("it skips drawing borders and margins", () => {
    const screen = Screen()
    const view = View({ margin : 0, padding : 0 })
    layout(true)(screen)
    screen.plugins.render[0](view)
    expect(screen.calls).toEqual([])
    expect(screen.canvas.drawn).toEqual([
      ["strokeStyle", "rgba(0, 0, 0, .7)"],
      ["setLineDash", [2, 4]],
      ["strokeRect", 10, 20, 30, 40],
      ["setLineDash", []]
    ])
  })
  it("it doesnt do anthing if not debuging", () => {
    const screen = Screen()
    const view = View({ margin : 0, padding : 0 })
    layout(false)(screen)
    screen.plugins.render[0](view)
    expect(screen.calls).toEqual([])
    expect(screen.canvas.drawn).toEqual([])
  })
})
