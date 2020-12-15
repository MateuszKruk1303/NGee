export const normalizeImagePath = (imagePath: string) => {
  if (imagePath) return imagePath.split('\\')[imagePath.split('\\').length - 1]
  return null
}
