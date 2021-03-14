import { expect } from 'chai'
import * as StringHelpers from './string.helpers'

describe('StringHelpers', () => {
  describe('createRandomToken', () => {
    it('should return a random token of 55 characters', () => {
      expect(typeof StringHelpers.createRandomToken()).equal('string')
      expect(StringHelpers.createRandomToken().length).equal(55)
    })
  })
})
