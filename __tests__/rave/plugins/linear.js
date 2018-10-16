import linear from 'polly-ui/plugins/linear'
import Screen from 'screen'
import View from 'view'
describe('linear', () => {
  it('it can set the weight and align', () => {
    const view = View({
      bounds: {
        x: 0,
        y: 0,
        width: 300,
        height: 300
      },
      padding: 0,
      margin: 0,
      children: [
        View(),
        View(),
        View()
      ]
    })
    const screen = Screen()
    linear(screen)
    view.children.forEach((child, i) => {
      if (i % 2 === 0) {
        screen.active = child
        expect(child.weight).toEqual(undefined)
        screen.weight(i + 1)
        expect(child.weight).toEqual(i + 1)
      }
    })
    screen.active = view
    screen.linear()
    screen.linear(10, 'horizontal')
    view.managers.forEach(manager => manager(view))
    expect(view.children[0].y).toEqual(0)
    expect(view.children[0].height).toEqual(65)
    expect(view.children[1].y).toEqual(40)
    expect(view.children[1].height).toEqual(0)
    expect(view.children[2].y).toEqual(80)
    expect(view.children[2].height).toEqual(195)

    expect(view.children[0].x).toEqual(0)
    expect(view.children[0].width).toEqual(62.5)
    expect(view.children[1].x).toEqual(40)
    expect(view.children[1].width).toEqual(0)
    expect(view.children[2].x).toEqual(80)
    expect(view.children[2].width).toEqual(187.5)

    view.children.forEach((child, i) => {
      screen.active = child
      screen.weight(0)
      expect(child.weight).toEqual(0)
    })

    view.managers.forEach(manager => manager(view)) // add for coverage only
  })
})
