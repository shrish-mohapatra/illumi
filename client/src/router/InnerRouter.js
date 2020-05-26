import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from '../components/dash/Home'
import Home2 from '../components/dash/Home2'

const InnerRouter = () => (
    <Switch>
        <Route exact path="/home/" component={Home}></Route>
        <Route exact path="/home/2/" component={Home2}></Route>
        <Route exact path="/home/3/" component={Home}></Route>
    </Switch>
)

export default InnerRouter;