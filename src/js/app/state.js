// JSON.parse(localStorage.state || 'false') ||

export default {
  view: 'main',
  state: {
    list: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
  },
  views: [{
    key: 'main',
    value: [
      {
        type: 'container',
        action: 'push',
        width: 'MATCH',
        height: 'MATCH',
        background: 'white',
        linear: []
      },
      {
        type: 'container',
        action: 'push',
        width: 'MATCH',
        height: '16',
        background: 'dark_primary'
      },
      { // status end
        action: 'pop'
      },
      { // action container
        type: 'container',
        action: 'push',
        width: 'MATCH',
        height: '40%',
        background: 'primary',
        padding: [16],
        shadow: true
      },
      { // back
        type: 'image',
        action: 'push',
        width: '32',
        height: '32',
        src: ['back']
      },
      {
        action: 'pop'
      },
      { // more
        type: 'image',
        action: 'push',
        width: '32',
        height: '32',
        src: ['more_vert'],
        anchor: [1, 0],
        position: [1, 0]
      },
      {
        action: 'pop'
      },
      { // title container
        type: 'container',
        action: 'push',
        width: 'WRAP',
        height: 'WRAP',
        anchor: [0.5, 0.5],
        position: [0.5, 0.5],
        linear: [8]
      },
      { // title
        type: 'text',
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
        type: 'text',
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
        type: 'container',
        action: 'push',
        width: 'MATCH',
        height: '0',
        weight: 1
      },
      {// list
        type: 'list',
        action: 'push',
        width: 'MATCH',
        height: 'MATCH',
        linear: [],
        scrollable: true,
        separator: 'vertical',
        adapter: ['subview', ['list']]
      },
      {
        action: 'pop'
      },
      { // fab
        type: 'fab',
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
    ]
  }, {
    key: 'subview',
    value: [{
      type: 'container',
      action: 'push',
      width: 'MATCH',
      height: 'WRAP',
      padding: [16],
      linear: [16, 'horizontal']
    }, {
      type: 'image',
      action: 'push',
      width: '24',
      height: '24',
      src: ['check', 'secondary_text'],
      anchor: [0, 0.5],
      position: [0, 0.5]
    }, {
      action: 'pop'
    }, {
      type: 'container',
      action: 'push',
      width: 'WRAP',
      height: 'WRAP',
      linear: [8]
    }, {
      type: 'text',
      action: 'push',
      width: 'WRAP',
      height: 'WRAP',
      text: 'list_title',
      style: 'list_title',
      textColor: 'primary_text'
    }, {
      action: 'pop'
    }, {
      type: 'text',
      action: 'push',
      width: 'WRAP',
      height: 'WRAP',
      text: 'list_subtitle',
      style: 'list_subtitle',
      textColor: 'secondary_text'
    }, {
      action: 'pop'
    }, {
      action: 'pop'
    }, {
      action: 'pop'
    }]
  }],
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
