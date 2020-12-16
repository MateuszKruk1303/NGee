import {
  styled,
  Avatar as BaseAvatar,
  Button as BaseButton,
  Grid as BaseGrid,
  TextField as BaseTextField,
  Card,
} from '@material-ui/core'

export const Wrapper = styled('div')(() => ({
  marginTop: 30,
}))

export const Avatar = styled(BaseAvatar)(() => ({
  width: 100,
  height: 100,
}))

export const AdminPanel = styled(Card)(() => ({
  minWidth: 340,
  maxWidth: 500,
}))

export const Button = styled(BaseButton)(() => ({
  width: 300,
}))

export const TextField = styled(BaseTextField)(() => ({}))

export const Grid = styled(BaseGrid)(() => ({
  '& .MuiGrid-item': {
    padding: '20px 0px',
  },
}))

export const ChooseFile = styled('input')(() => ({
  width: '80%',
}))
