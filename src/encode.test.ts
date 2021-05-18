import { encodeCommand } from './encode'

describe('encode', () => {
  describe('encodeCommand', () => {
    it('should encode READ_LOCAL_INFORMATION command', () => {
      const buffer = encodeCommand({ type: 'read_local_information' })
      expect(buffer).toEqual(Buffer.from([0xaa, 0x00, 0x01, 0x01, 0xfe]))
    })
    it('should encode SET_SCAN_ENABLE command', () => {
      const buffer = encodeCommand({ type: 'set_scan_enable', enabled: true, filterDuplicates: true })
      expect(buffer).toEqual(Buffer.from([0xaa, 0x00, 0x03, 0x16, 0x01, 0x01, 0xe5]))
    })
  })
})
