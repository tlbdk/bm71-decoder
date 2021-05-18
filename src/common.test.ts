import { calculateChecksum } from './common'

describe('common', () => {
  describe('checksum', () => {
    it('should calculate checksum of simple example', () => {
      const sum = calculateChecksum(Buffer.from('00020100', 'hex'))
      expect(sum).toBe(0xfd)
    })
    it('should calculate checksum of ADVERTISING_REPORT example', () => {
      const sum = calculateChecksum(
        Buffer.from('001e7000012730bb4ce9731302011a020a080cff4c0010073f1f7d9e650118c6', 'hex')
      )
      expect(sum).toBe(0x48)
    })
  })
})
