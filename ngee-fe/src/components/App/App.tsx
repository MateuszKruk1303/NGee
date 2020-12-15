import React from 'react'
import { BrowserRouter, Route, Switch, RouteProps } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core'
import theme from '../../config'
import { Wrapper } from './App.style'
import { modules, routes } from '../../modules'
import AppBar from '../AppBar'
import { Provider } from 'react-redux'
import { store } from '../../store'
import '../../config/style.css'

export default () => {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <AppBar />
            <Wrapper>
              <Switch>
                {routes.map((route: string, i: number) => (
                  <Route exact path={route} component={modules[i]} />
                ))}
              </Switch>
            </Wrapper>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </>
  )
}
