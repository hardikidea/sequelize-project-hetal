import { sum } from '../utils/sum'

describe('sum', () => {
  it('adds two numbers correctly', () => {
    expect(sum(1, 2)).toBe(3)
  })
})
