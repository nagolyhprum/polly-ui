import image from 'rave/plugins/image'
import Screen from 'rave/screen'
describe('image', () => {
  it('sets the src', done => {
    const canvas = {
      image: (src, callback) => {
        setTimeout(callback)
        return src
      }
    }
    const view = {}
    const screen = {
      canvas,
      active: view,
      render: () => {
        expect(view.image).toEqual('cool')
        done()
      },
      plugins: {
        render: []
      }
    }
    image(screen)
    screen.src('cool')
  })
  it('draws with margin and padding', done => {
    const canvas = {
      getWidth: () => 0,
      getHeight: () => 0,
      drawImage: function (image, x, y, w, h) {
        expect(image).toEqual(view.image)
        expect(x).toEqual(90)
        expect(y).toEqual(40)
        expect(w).toEqual(-90)
        expect(h).toEqual(-40)
        done()
      }
    }
    const screen = new Screen(canvas)
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
    const screen = {
      plugins: {
        render: []
      }
    }
    const view = {}
    image(screen)
    screen.plugins.render[0](view)
  })
  it('draws without margin or padding', done => {
    const canvas = {
      getWidth: () => 0,
      getHeight: () => 0,
      drawImage: function (image, x, y, w, h) {
        expect(image).toEqual(view.image)
        expect(x).toEqual(10)
        expect(y).toEqual(20)
        expect(w).toEqual(30)
        expect(h).toEqual(40)
        done()
      }
    }
    const screen = new Screen(canvas)
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
