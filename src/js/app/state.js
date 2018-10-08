// JSON.parse(localStorage.state || 'false') ||

const LIST = [{}, {}, {}, {}, {}, {}, {}, {}]

/*

  container(MATCH, WRAP, () => {
    padding(16)
    linear(16, 'horizontal')
    container(24, 24, () => {
      src(drawable.check, color.secondary_text)
      anchor(0, 0.5)
      position(0, 0.5)
    })
    container(WRAP, WRAP, () => {
      linear(8)
      container(WRAP, WRAP, () => {
        text(string.list_title)
        textColor(color.primary_text)
        style(font.list_title)
      })
      container(WRAP, WRAP, () => {
        text(string.list_subtitle)
        textColor(color.secondary_text)
        style(font.list_subtitle)
      })
    })
  })
*/

export default {
  views: [
    {
      action: 'push',
      width: 'MATCH',
      height: 'MATCH',
      background: 'white',
      linear: []
    },
    {
      action: 'push',
      width: 'MATCH',
      height: '16',
      background: 'dark_primary'
    },
    { // status end
      action: 'pop'
    },
    { // action container
      action: 'push',
      width: 'MATCH',
      height: '40%',
      background: 'primary',
      padding: [16],
      shadow: true
    },
    { // back
      action: 'push',
      width: '32',
      height: '32',
      src: 'back'
    },
    {
      action: 'pop'
    },
    { // more
      action: 'push',
      width: '32',
      height: '32',
      src: 'more_vert',
      anchor: [1, 0],
      position: [1, 0]
    },
    {
      action: 'pop'
    },
    { // title container
      action: 'push',
      width: 'WRAP',
      height: 'WRAP',
      anchor: [0.5, 0.5],
      position: [0.5, 0.5],
      linear: [8]
    },
    { // title
      action: 'push',
      width: 'WRAP',
      height: 'WRAP',
      text: 'title',
      style: 'title',
      textColor: 'text'
    },
    {
      action: 'pop'
    },
    { // subtitle
      action: 'push',
      width: 'WRAP',
      height: 'WRAP',
      text: 'subtitle',
      style: 'subtitle',
      textColor: 'light_primary'
    },
    {
      action: 'pop'
    },
    { // title container end
      action: 'pop'
    },
    { // action container end
      action: 'pop'
    },
    { // list container
      action: 'push',
      width: 'MATCH',
      height: '0',
      weight: 1,
      background: 'yellow'
    },
    {// list
      action: 'push',
      background: 'blue',
      width: 'MATCH',
      height: 'MATCH',
      linear: [],
      scrollable: true,
      separator: 'vertical'
    },
    // TODO add list here
    {
      action: 'pop'
    },
    { // fab
      action: 'push',
      width: '72',
      height: '56',
      fab: ['add'],
      margin: [0, 16, 0, 0],
      anchor: [1, 0.5],
      position: [1, 0]
    },
    {
      action: 'pop'
    },
    { // list container
      action: 'pop'
    },
    { // main
      action: 'pop'
    }
  ],
  fonts: [{
    key: 'title',
    value: {
      size: 36,
      weight: 'bold'
    }
  }, {
    key: 'subtitle',
    value: {
      size: 16
    }
  }, {
    key: 'list_title',
    value: {
      size: 14
    }
  }, {
    key: 'list_subtitle',
    value: {
      size: 12
    }
  }],
  drawables: [{
    key: 'back',
    value: require('../res/drawable/back.svg')
  }, {
    key: 'more_vert',
    value: require('../res/drawable/more_vert.svg')
  }, {
    key: 'add',
    value: require('../res/drawable/add.svg')
  }, {
    key: 'check',
    value: require('../res/drawable/check.svg')
  }],
  strings: [{
    key: 'title',
    value: 'Poly UI'
  }, {
    key: 'subtitle',
    value: 'Demo of color pallette'
  }, {
    key: 'list_title',
    value: 'Demo capabilities of Poly UI'
  }, {
    key: 'list_subtitle',
    value: 'By showing a list'
  }],
  colors: [{
    value: '#00796B',
    key: 'dark_primary'
  }, {
    value: '#B2DFDB',
    key: 'light_primary'
  }, {
    value: '#009688',
    key: 'primary'
  }, {
    value: '#FF9800',
    key: 'accent'
  }, {
    value: '#212121',
    key: 'primary_text'
  }, {
    value: '#757575',
    key: 'secondary_text'
  }, {
    value: '#BDBDBD',
    key: 'divider_color'
  }, {
    value: '#ffffff',
    key: 'text'
  }]
}
