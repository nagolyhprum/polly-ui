import round from 'polly-ui/plugins/round'
import Screen from 'screen'
import View from 'view'
describe('round', () => {
  it('draws a round rect', () => {
    const view = View({
      margin: 0
    })
    const screen = Screen({
      active: view
    })
    round(screen)
    screen.round(4)
    view.render(true)
    expect(screen.canvas.drawn).toEqual([
      ['beginPath'],
      ['moveTo', 14, 20],
      ['lineTo', 36, 20],
      ['quadraticCurveTo', 40, 20, 40, 24],
      ['lineTo', 40, 56],
      ['quadraticCurveTo', 40, 60, 36, 60],
      ['lineTo', 14, 60],
      ['quadraticCurveTo', 10, 60, 10, 56],
      ['lineTo', 10, 24],
      ['quadraticCurveTo', 10, 20, 14, 20],
      ['closePath']
    ])
    screen.canvas.clear()
    view.background = 'red'
    view.render(true)
    expect(screen.canvas.drawn).toEqual([
      ['beginPath'],
      ['moveTo', 14, 20],
      ['lineTo', 36, 20],
      ['quadraticCurveTo', 40, 20, 40, 24],
      ['lineTo', 40, 56],
      ['quadraticCurveTo', 40, 60, 36, 60],
      ['lineTo', 14, 60],
      ['quadraticCurveTo', 10, 60, 10, 56],
      ['lineTo', 10, 24],
      ['quadraticCurveTo', 10, 20, 14, 20],
      ['closePath'],
      ['fillStyle', 'red'],
      ['fill']
    ])
  })
})
