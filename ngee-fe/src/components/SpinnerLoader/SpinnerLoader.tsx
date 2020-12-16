import React from 'react'
import { Backdrop, CircularProgress } from './SpinnerLoader.style'

export default ({ isLoading }: any) => {
  return (
    <Backdrop open={isLoading}>
      <CircularProgress />
    </Backdrop>
  )
}
