import image from 'rave/plugins/image'
import Screen from 'screen'
describe('image', () => {
  it('sets the src', done => {
    const view = {}
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
        drawImage: function (image, x, y, w, h) {
          expect(image).toEqual(view.image)
          expect(x).toEqual(90)
          expect(y).toEqual(40)
          expect(w).toEqual(-90)
          expect(h).toEqual(-40)
          done()
        }
      }
    })
    const view = {
      padding: [10, 20, 30, 40],
      margin: [10, 20, 30, 40],
      bounds: {
        x: 10,
        y: 20,
        width: 30,
        height: 40
      },
      image: {
        complete: true
      }
    }
    image(screen)
    screen.plugins.render[0](view)
  })
  it('skips drawing', () => {
    const screen = Screen()
    const view = {}
    image(screen)
    screen.plugins.render[0](view)
  })
  it('draws without margin or padding', done => {
    const screen = new Screen({
      canvas: {
        drawImage: function (image, x, y, w, h) {
          expect(image).toEqual(view.image)
          expect(x).toEqual(10)
          expect(y).toEqual(20)
          expect(w).toEqual(30)
          expect(h).toEqual(40)
          done()
        }
      }
    })
    const view = {
      bounds: {
        x: 10,
        y: 20,
        width: 30,
        height: 40
      },
      image: {
        complete: true
      }
    }
    image(screen)
    screen.plugins.render[0](view)
  })
})
