import { expect } from 'chai'
import * as DateHelpers from './date.helpers'

describe('StringHelpers', () => {
  describe('timeToHuman', () => {
    it('should return a string', () => {
      const mockEpoch = 1615723200000
      expect(typeof DateHelpers.timeToHuman(mockEpoch)).equal('string')
    })

    it('should return a the correct human displayable date', () => {
      const mockEpoch = 1615723200000
      const expected = 'søndag kl. 13:00'

      expect(DateHelpers.timeToHuman(mockEpoch)).equal(expected)
    })
  })
})
