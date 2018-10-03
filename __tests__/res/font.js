import font from 'font'
describe('font', () => {
  it('generates a few fonts', () => {
    expect(font.normal_10).toEqual({
      weight: 'normal',
      size: 10
    })
    expect(font.medium_20).toEqual({
      weight: 'medium',
      size: 20
    })
    expect(font.bold_30).toEqual({
      weight: 'bold',
      size: 30
    })
  })
})
