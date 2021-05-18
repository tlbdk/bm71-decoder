import { AddressType, calculateChecksum, Command, CommandOpcode, Event, EventOpcode, PacketType } from './common'

function sliceToNextStart(data: Buffer, offset = 0): Buffer {
  const nextAA = data.indexOf(0xaa, offset)
  if (nextAA > 0) {
    return data.slice(nextAA)
  } else {
    return Buffer.alloc(0)
  }
}

export function decodeEvents(data: Buffer): Event[] {
  const results: Event[] = []
  while (data.length > 5) {
    // Start byte is always 0xAA
    const startByte = data.readUInt8(0)
    if (startByte !== 0xaa) {
      // Skip to next 0xAA if start byte is wrong
      data = sliceToNextStart(data)
      continue
    }

    const dataLength = data.readUInt16BE(1)
    if (dataLength === 0 || dataLength + 3 > data.length) {
      // Length should always be 1 or larger as opcode is also counted
      data = sliceToNextStart(data, 1)
      continue
    }

    // Validate checksum
    const checksum = data.readUInt8(dataLength + 3)
    const calculatedChecksum = calculateChecksum(data.slice(1, dataLength + 3))
    if (checksum !== calculatedChecksum) {
      // The next message does not start with 0xAA so this message is probably short
      results.push({
        type: 'wrong_checksum',
        data: data.slice(0, dataLength + 4)
      })
      data = sliceToNextStart(data, 1)
      continue
    }

    // Event opcode is the first param
    const opcode = data.readUInt8(3)
    switch (opcode) {
      case EventOpcode.COMMAND_COMPLETE: {
        const commandOpcode = data.readUInt8(4)
        switch (commandOpcode) {
          case CommandOpcode.READ_LOCAL_INFORMATION: {
            results.push({
              type: 'read_local_information',
              opcode: EventOpcode.COMMAND_COMPLETE,
              commandOpcode: CommandOpcode.READ_LOCAL_INFORMATION,
              completionStatus: data.readUInt8(5),
              firmwareVersion: data.readUInt32BE(6),
              macAddress: data.slice(10, 16).toString('hex')
            })
            break
          }
          default: {
            results.push({
              type: 'unknown_command_complete',
              opcode: EventOpcode.COMMAND_COMPLETE,
              commandOpcode: CommandOpcode.READ_LOCAL_INFORMATION,
              completionStatus: data.readUInt8(5),
              data: data.slice(0, dataLength + 3)
            })
          }
        }
        break
      }
      case EventOpcode.ADVERTISING_REPORT: {
        const payloadLength = data.readUInt8(12)
        if (13 + payloadLength + 1 > data.length) {
          // Payload length should be shorter than data else skip to next record
          data = sliceToNextStart(data, 1)
          continue
        }

        results.push({
          type: 'advertising_report',
          opcode: EventOpcode.ADVERTISING_REPORT,
          packetType: PacketType[data.readUInt8(4)],
          addressType: AddressType[data.readUInt8(5)],
          macAddress: data.slice(6, 12).toString('hex'),
          payload: data.slice(13, 13 + payloadLength),
          rssi: data.readInt8(13 + payloadLength + 1)
        })
        break
      }
      default: {
        data = sliceToNextStart(data, 1)
        continue
      }
    }

    const newData = data.slice(dataLength + 4)
    data = newData
  }

  return results
}

export function decodeCommands(data: Buffer): Command[] {
  const results: Command[] = []
  while (data.length > 5) {
    // Start byte is always 0xAA
    const startByte = data.readUInt8(0)
    if (startByte !== 0xaa) {
      // Skip to next 0xAA if start byte is wrong
      data = sliceToNextStart(data)
      continue
    }

    const dataLength = data.readUInt16BE(1)
    if (dataLength === 0) {
      // Length should always be 1 or larger as we need at least one param
      data = sliceToNextStart(data, 1)
      continue
    }

    // TODO: Validate if dataLength is too large
    // TODO Validate checksum
    const checksum = data.readUInt8(dataLength + 3)

    const opcode = data.readUInt8(3)

    switch (opcode) {
      case CommandOpcode.READ_LOCAL_INFORMATION: {
        results.push({
          type: 'read_local_information'
        })
        break
      }
      default: {
        results.push({
          type: 'unknown',
          data: data.slice(0, dataLength + 3)
        })
      }
    }
  }
  return results
}

export function encode(opcode: CommandOpcode): Buffer {
  return Buffer.alloc(0)
}
