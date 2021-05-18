// Links
// https://ww1.microchip.com/downloads/en/DeviceDoc/BM70-71-Bluetooth-Low-Energy-Module-Users-Guide-DS50002542.pdf

// Request format
// Header(Start(0xAA), Length(0x0001-0xFFFF)), Opcode(0x00-0xFF), Data(0-n bytes), Checksum(0x00)

// Response format
// Header(Start(0xAA), Length(0x0001-0xFFFF)), Data(0-n bytes), Checksum(0x00)

export enum CommandOpcode {
  READ_LOCAL_INFORMATION = 0x01,
  RESET = 0x02,
  STATUS_READ = 0x03,
  ADC_READ = 0x04,
  SHUTDOWN = 0x05,
  DEBUG = 0x06,
  NAME_READ = 0x07,
  NAME_WRITE = 0x08,
  PDL_ERASE = 0x09,
  PAIR_MODE_READ = 0x0a,
  PAIR_MODE_WRITE = 0x0b,
  PDL_READ = 0x0c,
  DEVICE_ERASE = 0x0d,
  DIO_CONTROL = 0x0e,
  PWM_CONTROL = 0x0f,
  RSSI_READ = 0x10,
  ADV_DATA_WRITE = 0x11,
  SCAN_DATA_WRITE = 0x12,
  ADV_PARAM_SET = 0x13,
  SCAN_PARAM_SET = 0x15,
  SCAN_ENABLE_SET = 0x16,
  CONNECT = 0x17,
  CONNECT_CANCEL = 0x18,
  CONNECTION_PARAM_UPDATE = 0x19,
  DISCONNECT = 0x1b,
  SET_ADV_ENABLE = 0x1c,
  REMOTE_NAME_READ = 0x1f,
  CLIENT_WRITE_REQUEST_PREPARE = 0x20,
  CLIENT_WRITE_REQUEST_EXECUTE = 0x21,
  CLIENT_BLOB_REQUEST_READ = 0x22,
  SERVER_WRITE_RESPONSE_PREPARE = 0x28,
  SERVER_WRITE_RESPONSE_EXECUTE = 0x29,
  SERVER_BLOB_RESPONSE_READ = 0x2a,
  CLIENT_HANDLE_VALUE_CONFIRM = 0x2d,
  CLIENT_DISCOVER_ALL_SERVICES = 0x30,
  CLIENT_DISCOVER_CHARACTERISTICS = 0x31,
  CLIENT_CHARACTERISTIC_READ = 0x32,
  CLIENT_CHARACTERISTIC_UUID_READ = 0x33,
  CLIENT_CHARACTERISTIC_WRITE = 0x34,
  TRANSPARENT_ENABLE = 0x35,
  SERVER_ERROR_RESPONSE = 0x37,
  SERVER_CHARACTERISTIC_SEND = 0x38,
  SERVER_CHARACTERISTIC_UPDATE = 0x39,
  SERVER_CHARACTERISTIC_READ = 0x3a,
  SERVER_ALL_SERVICES_READ = 0x3b,
  SERVER_SERVICE_READ = 0x3c,
  SERVER_WRITE_RESPONSE_SEND = 0x3d,
  SERVER_READ_RESPONSE_SEND = 0x3e,
  TRANSPARENT_DATA_SEND = 0x3f,
  PASSKEY_ENTRY = 0x40,
  PASSKEY_YES_NO_CONFIRM = 0x41,
  PAIRING_REQUEST = 0x42,
  CONFIG_MODE_CLOSE = 0x52,
  RECEIVER_TEST = 0x53,
  TRANSMITTER_TEST = 0x54,
  END_TEST = 0x55
}

export enum CommandStatusOpcode {
  COMMAND_SUCCEEDED = 0x00,
  UNKNOWN_COMMAND = 0x01,
  UNKNOWN_CONNECTION_IDENTIFIER = 0x02,
  HARDWARE_FAILURE = 0x03,
  AUTHENTICATION_FAILURE = 0x05,
  PIN_OR_KEY_MISSING = 0x06,
  MEMORY_CAPACITY_EXCEEDED = 0x07,
  CONNECTION_TIMEOUT = 0x08,
  CONNECTION_LIMIT_EXCEEDED = 0x09,
  ACL_CONNECTION_ALREADY_EXISTS = 0x0b,
  COMMAND_DISALLOWED = 0x0c,
  CONNECTION_REJECTED_DUE_TO_LIMITED_RESOURCES = 0x0d,
  CONNECTION_REJECTED_DUE_TO_SECURITY_REASONS = 0x0e,
  CONNECTION_REJECTED_DUE_TO_UNACCEPTABLE_BD_ADDR = 0x0f,
  CONNECTION_ACCEPT_TIMEOUT_EXCEEDED = 0x10,
  UNSUPPORTED_FEATURE_OR_PARAMETER_VALUE = 0x11,
  INVALID_COMMAND_PARAMETERS = 0x12,
  REMOTE_USER_TERMINATED_CONNECTION = 0x13,
  REMOTE_DEVICE_TERMINATED_CONNECTION_DUE_TO_LOW_RESOURCES = 0x14,
  REMOTE_DEVICE_TERMINATED_CONNECTION_DUE_TO_POWER_OFF = 0x15,
  CONNECTION_TERMINATED_BY_LOCAL_HOST = 0x16,
  PAIRING_NOT_ALLOWED = 0x18,
  UNSPECIFIED_ERROR = 0x1f,
  INSTANT_PASSED = 0x28,
  PAIRING_WITH_UNIT_KEY_NOT_SUPPORTED = 0x29,
  INSUFFICIENT_SECURITY = 0x2f,
  CONNECTION_REJECTED_DUE_TO_NO_SUITABLE_CHANNEL_FOUND = 0x39,
  CONTROLLER_BUSY = 0x3a,
  UNACCEPTABLE_CONNECTION_INTERVAL = 0x3b,
  DIRECTED_ADVERTISING_TIMEOUT = 0x3c,
  CONNECTION_TERMINATED_DUE_TO_MIC_FAILURE = 0x3d,
  CONNECTION_FAILED_TO_BE_ESTABLISHED = 0x3e,
  INVALID_OFFSET = 0x77,
  INVALID_HANDLE = 0x81,
  READ_NOT_PERMITTED = 0x82,
  WRITE_NOT_PERMITTED = 0x83,
  INVALID_PDU = 0x84,
  INSUFFICIENT_AUTHENTICATION = 0x85,
  REQUEST_NOT_SUPPORTED = 0x86,
  INSUFFICIENT_AUTHORIZATION = 0x88,
  PREPARE_QUEUE_FULL = 0x89,
  ATTRIBUTE_NOT_FOUND = 0x8a,
  ATTRIBUTE_NOT_LONG = 0x8b,
  INSUFFICIENT_ENCRYPTION_KEY_SIZE = 0x8c,
  INVALID_ATTRIBUTE_VALUE_LENGTH = 0x8d,
  UNLIKELY_ERROR = 0x8e,
  INSUFFICIENT_ENCRYPTION = 0x8f,
  UNSUPPORTED_GROUP_TYPE = 0x90,
  INSUFFICIENT_RESOURCES = 0x91,
  APPLICATION_DEFINED_ERROR = 0xf0,
  UART_CHECKSUM_ERROR = 0xff
}

export interface ReadLocalInformationCommand {
  opcode: 0x01
}

export interface UnknownCommand {
  data: Buffer
}

export type Command = ReadLocalInformationCommand | UnknownCommand

export enum EventOpcode {
  EVENT_NONE = 0x00,
  PASSKEY_REQUEST = 0x60,
  PAIR_COMPLETE = 0x61,
  PASSKEY_YES_NO_REQUEST = 0x62,
  ADVERTISING_REPORT = 0x70,
  LE_CONNECT_COMPLETE = 0x71,
  DISCONNECT_COMPLETE = 0x72,
  CONNECTION_PARAMTER_UPDATE = 0x73,
  SPP_CONNECT_COMPLETE = 0x74,
  COMMAND_COMPLETE = 0x80,
  STATUS_REPORT = 0x81,
  LE_END_TEST_RESULT = 0x82,
  CONFIGURE_MODE_STATUS = 0x8f,
  CLIENT_DISCOVER_ALL_SERVICES_RESULT = 0x90,
  CLIENT_DISCOVER_CHARACTERISTICS_RESULT = 0x91,
  CLIENT_DISCOVER_CHARACTERISTICS_DESCRIPTORS_RESULT = 0x92,
  CLIENT_CHARACTERISTIC_VALUE_RECEIVED = 0x93,
  SERVER_CHARACTERISTIC_VALUE_WRITE = 0x98,
  SERVER_CHARACTERISTIC_VALUE_READ = 0x99,
  TRANSPARENT_DATA_RECEIVED = 0x9a,
  ERROR = 0xff
}

export interface CommandCompleteEvent {
  opcode: EventOpcode.COMMAND_COMPLETE
  commandOpcode: CommandOpcode
  completionStatus: CommandStatusOpcode
}

export interface ReadLocalInformationResponse extends CommandCompleteEvent {
  type: 'read_local_information'
  commandOpcode: CommandOpcode.READ_LOCAL_INFORMATION
  firmwareVersion: number
  macAddress: string
}

export interface UnknownCommandCompleteEvent extends CommandCompleteEvent {
  type: 'unknown_command_complete'
  data: Buffer
}

export enum PacketType {
  CONNECTABLE_UNDIRECTED_ADVERTISING = 0x00,
  CONNECTABLE_DIRECTED_ADVERTISING = 0x01,
  SCANNABLE_UNDIRECTED_ADVERTISING = 0x02,
  NON_CONNECTABLE_UNDIRECTED_ADVERTISING = 0x03,
  SCAN_RESPONSE = 0x04
}

export enum AddressType {
  PUBLIC = 0x00,
  RANDOM = 0x01
}

export interface AdvertisingReportEvent {
  type: 'advertising_report'
  opcode: EventOpcode.ADVERTISING_REPORT
  packetType: string
  addressType: string
  macAddress: string
  payload: Buffer
  rssi: number
}

export interface ShortEvent {
  type: 'short'
  data: Buffer
}

interface UnknownEvent {
  type: 'unknown'
  data: Buffer
}

type Event =
  | ReadLocalInformationResponse
  | UnknownCommandCompleteEvent
  | AdvertisingReportEvent
  | ShortEvent
  | UnknownEvent

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

    if (dataLength + 4 < data.length && data.readUInt8(dataLength + 4) !== 0xaa) {
      // The next message does not start with 0xAA so this message is probably short
      results.push({
        type: 'short',
        data: data.slice(0, dataLength)
      })
      data = sliceToNextStart(data, 1)
      continue
    }

    // TODO Validate checksum
    const checksum = data.readUInt8(dataLength + 3)

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
          opcode: 0x01
        })
        break
      }
      default: {
        results.push({
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

export function checksum(data: Buffer): Buffer {
  return Buffer.alloc(0)
}
