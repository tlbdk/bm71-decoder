import { AdvertisingReportEvent, decodeEvents } from './decode'

describe('decode', () => {
  describe('decodeEvent', () => {
    it('should decode response for READ_LOCAL_INFORMATION', () => {
      const events = decodeEvents(Buffer.from('AA000E800100AAAAAAAAFFFFFFFFFFFF01FF', 'hex'))
      expect(events).toMatchSnapshot()
    })

    it('should decode ADVERTISING_REPORT event', () => {
      const events = decodeEvents(
        Buffer.from('aa001e7000012730bb4ce9731302011a020a080cff4c0010073f1f7d9e650118c648', 'hex')
      )
      expect(events).toMatchSnapshot()
    })

    it('should decode many ADVERTISING_REPORT event', () => {
      const events = decodeEvents(
        Buffer.from(
          [
            'aa001e7000012730bb4ce9731302011a020a080cff4c0010073f1f7d9e650118c648',
            'aa000b7004012730bb4ce97300c600',
            'aa002a7003018bb2d6e54a3c1f1eff060001092002c370885c7b74bfeb1523b70c1cdd8f6c0fc1f1d40464fbae31',
            'aa0029700001789c482c62611e0201061aff4c000c0e00844861db7a0681c1c8527e938610054a1cfade6dad8d',
            'aa00197000019f66173bf6740e0201060aff4c001005411c38492ba388',
            'aa0025700000c2b94a29e8181a02010611061745561073ed09a6b34e7ce552',
            'aa001d700400c2b94a29e8181209162a2518e8294ab9c107161820c0a8fe32ba6d',
            'aa002a700301b18b5a325b061f02011a03036ffd17166ffd037e630c6dc980d348892ff5a591d2c91ba49c91bc0b',
            'aa00117000011bfb7848e20806c29584481877bc40',
            'aa000b700401b0a729b9cb5c00a977',
            'aa000b700401c2958448187700a925',
            'aa00117000013858eb15735806789c482c6261b022',
            'aa0028700000bf8a7992bf701d02011a07030f180a18fffe11094a616272612045766f6c766520373565ab34',
            'aa0011700001e1b16801114b068b47b9c9c77eb2d6',
            'aa001c700001321b54f0d7441102011a020a0c0aff4c0010050318bcefc9a2e6',
            'aa00277002014a4e52d342601c03039ffe17169ffe02517a663344714c63775573000001797f7452e2a62e',
            'aa00157004014a4e52d342600a09ffe00006eaca7d3104a514',
            'aa0011700000a23595d0b69c06020102020a02b91f',
            'aa0018700400a23595d0b69c0d0c09736b6e2d6c6170746f7000b902',
            'aa001c700001bb511c0424611102011a020a0c0aff4c0010051b1c81ee0fa5b8',
            'aa0027700300b2f560a468381c1bff750042040180603868a460f5b23a68a460f5b101000000000000a30e',
            'aa002a7003010a3b6e7d97791f1eff060001092006d25714f5a92cbdf7a4f83366af',
            'aa002a700301c3cef39ce04a1f1eff060001092002b9e376356cb0e07a89b57fdc49b0ddbe226d1ff2c5e52fa1a6',
            'aa001c70000122b76024935b1102011a020a0c0aff4c0010051e18ed1b80a218'
          ].join(''),
          'hex'
        )
      )
      const json = JSON.stringify(
        events
          .filter((e): e is AdvertisingReportEvent => e.type === 'advertising_report')
          .map(e => {
            return {
              ...e,
              payload: e.payload.toString('hex')
            }
          }),
        null,
        2
      )
      expect(events).toMatchSnapshot()
    })
  })
})
