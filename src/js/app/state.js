export default JSON.parse(localStorage.state || "false") || {
  fonts : [{
    key : "title",
    value : {
      size : 36,
      weight : "bold"
    }
  }, {
    key : "subtitle",
    value : {
      size : 16
    }
  }, {
    key : "list_title",
    value : {
      size : 14
    }
  }, {
    key : "list_subtitle",
    value : {
      size : 12
    }
  }],
  drawables: [{
    key : "back",
    value: require("../res/drawable/back.svg")
  }, {
    key : "more_vert",
    value: require("../res/drawable/more_vert.svg")
  }, {
    key: "add",
    value: require("../res/drawable/add.svg")
  }, {
    key: "check",
    value: require("../res/drawable/check.svg")
  }],
  strings: [{
    key : "title",
    value : "Poly UI"
  }, {
    key : "subtitle",
    value : "Demo of color pallette"
  }, {
    key : "list_title",
    value : "Demo capabilities of Poly UI"
  }, {
    key : "list_subtitle",
    value : "By showing a list"
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
    value : "#ffffff",
    key: "text"
  }]
}
