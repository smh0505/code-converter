import { encode, decode } from 'iconv-lite'

const types = ['utf8', 'utf16be', 'hex', 'base64']

const str2bin = (inputType: number, input: string) => {
    return encode(input, types[inputType])
}

const bin2str = (outputType: number, binary: Buffer) => {
    return decode(binary, types[outputType])
}

export const convert = (inputType: number, outputType: number, input: string) => {
    return bin2str(outputType, str2bin(inputType, input))
}
