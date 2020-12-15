import sharp from 'sharp'
import { resolve } from 'path'
import fs from 'fs'
import { promisify } from 'util'

const unlinkAsync = promisify(fs.unlink)

export const processProfilePhoto = async (
  path: string,
  destination: string,
  originalName: string,
  oldPath: string | null
) => {
  await sharp(path)
    .resize(100, 100)
    .toFormat('jpg')
    .jpeg({ quality: 90 })
    .toFile(resolve(destination, `${originalName}.jpg`))
  await unlinkAsync(path)
  if (oldPath) await unlinkAsync(oldPath)
  return resolve(destination, `${originalName}.jpg`)
}

export const processPostPhoto = async (
  path: string,
  destination: string,
  originalName: string
) => {
  await sharp(path)
    .toFormat('jpg')
    .jpeg({ quality: 100 })
    .toFile(resolve(destination, `${originalName}.jpg`))
  await unlinkAsync(path)
  return resolve(destination, `${originalName}.jpg`)
}
