export const formatDate = (currentDate: Date) => {
  return `${currentDate.getSeconds()}${currentDate.getHours()}${currentDate.getMinutes()}${currentDate.getDay()}${currentDate.getMonth()}${currentDate.getFullYear()}`
}
