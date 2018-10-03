import components from 'rave/plugins/components'
import Screen from 'screen'
import View from 'view'
describe("components", () => {
  it("supports buttons", () => {
    const view = View()
    const screen = Screen({
      active : view
    })
    components(screen)
    screen.button()
  })
})
