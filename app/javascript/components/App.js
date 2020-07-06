import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Tasks from './Tasks/Tasks'

const App = () => {
    return (<Switch>
        <Route exact path="/" component={Tasks} />
    </Switch>)
}

export default App;