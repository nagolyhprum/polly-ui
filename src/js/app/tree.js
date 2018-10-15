
const tree = (screen, branches) => {
  const {
    container,
    text,
    linear,
    padding,
    onClick,
    background,
    state$,
    observe,
    margin,
    resources: {
      color
    },
    WRAP,
    MATCH
  } = screen
  container(WRAP, WRAP, () => {
    margin(0, 0, 0, 16)
    linear()
    branches.forEach(branch => {
      container(WRAP, WRAP, () => {
        linear(4)
        container(WRAP, WRAP, () => {
          padding(4)
          text(branch.key)
        })
        branch.children && tree(screen, branch.children)
      })
    })
  })
}

export default tree
