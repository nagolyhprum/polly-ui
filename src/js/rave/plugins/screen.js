export default parent => {
  parent.extend({
    screen(view, child) {
      view.render = () => {
        child.main = parent
        child.bounds = view.bounds
        child.render(child.bounds.width, child.bounds.height)
      }
    }
  })
}
