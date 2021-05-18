import { calculateChecksum, Command, CommandOpcode } from './common'

export function encodeCommand(command: Command): Buffer {
  let commandParameters: Buffer
  switch (command.type) {
    case 'read_local_information': {
      commandParameters = Buffer.from([CommandOpcode.READ_LOCAL_INFORMATION])
      break
    }
    case 'set_scan_enable': {
      commandParameters = Buffer.from([
        CommandOpcode.SET_SCAN_ENABLE,
        command.enabled ? 0x01 : 0x00,
        command.filterDuplicates ? 0x01 : 0x00
      ])
      break
    }
    default: {
      throw new Error('Unknown command')
    }
  }

  // Build command
  const result = Buffer.alloc(commandParameters.length + 4)
  result.writeUInt8(0xaa)
  result.writeUInt16BE(commandParameters.length, 1)
  commandParameters.copy(result, 3, 0)
  result.writeUInt8(calculateChecksum(result.slice(1, result.length - 1)), commandParameters.length + 3)

  return result
}
