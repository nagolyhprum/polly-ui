import image from 'polly-ui/plugins/image'
import Screen from 'screen'
import View from 'view'
describe('image', () => {
  it('sets the src', done => {
    const view = View()
    const screen = Screen({
      active: view,
      render: () => {
        expect(view.image).toEqual('cool')
        done()
      }
    })
    image(screen)
    screen.src('cool')
  })
  it('draws with margin and padding', done => {
    const screen = new Screen({
      canvas: {
        drawImage (image, x, y, w, h) {
          expect(image).toEqual(view.image)
          expect(x).toEqual(90)
          expect(y).toEqual(40)
          expect(w).toEqual(-90)
          expect(h).toEqual(-40)
          done()
        }
      }
    })
    const view = View({
      image: {
        complete: true
      }
    })
    image(screen)
    screen.plugins.render[0](view)
  })
  it('skips drawing', () => {
    const screen = Screen()
    const view = View()
    image(screen)
    screen.plugins.render[0](view)
  })
  it('draws without margin or padding', done => {
    const screen = new Screen({
      canvas: {
        drawImage (image, x, y, w, h) {
          expect(image).toEqual(view.image)
          expect(x).toEqual(10)
          expect(y).toEqual(20)
          expect(w).toEqual(30)
          expect(h).toEqual(40)
          done()
        }
      }
    })
    const view = View({
      margin: null,
      padding: null,
      image: {
        complete: true
      }
    })
    image(screen)
    screen.plugins.render[0](view)
  })
})
