import { Typography } from '@material-ui/core'
import React from 'react'

export default () => {
  return (
    <div>
      <Typography>Lalala</Typography>
      <Typography>Lalala</Typography>
      <Typography>Lalala</Typography>
      <Typography>Lalala</Typography>
      <Typography>Lalala</Typography>
      <Typography>Lalala</Typography>
      <input
        type="file"
        onChange={e => {
          console.log(e)
        }}
      ></input>
    </div>
  )
}
