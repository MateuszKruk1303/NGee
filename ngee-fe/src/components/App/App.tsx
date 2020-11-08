import React from 'react'
import { BrowserRouter, Route, Switch, RouteProps } from 'react-router-dom'
import { modules, routes } from '../../modules'
import AppBar from '../AppBar'
import { Provider } from 'react-redux'
import { store } from '../../store'
import '../../config/style.css'

export default () => {
  console.log(routes)
  console.log(modules)
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <AppBar />
          <Switch>
            {routes.map((route: string, i: number) => (
              <Route exact path={route} component={modules[i]} />
            ))}
          </Switch>
        </BrowserRouter>
      </Provider>
    </>
  )
}
