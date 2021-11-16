import React from 'react';
import { Switch, Route } from 'react-router';
import Submission from './Submission';
import Featured from './Featured';
import Review from './Review';
import About from './About';
import Login from './View/login';
import Logout from './View/logout';
import { Waitlist } from './View/Waitlist';
import Signup from './View/signup';

export const Routes = () => {
  <Switch>
    <Route path="/public" component={Featured} />
    <Route path="/create" component={Submission} />
    <Route path="/review" component={Review} />
    <Route path="/waitlist" component={Waitlist} />
    <Route path="/about" component={About} />
    {/* <Route path="/raghuram.html" component={staticComp} /> */}
    <Route path="/login" component={Login} />
    <Route path="/logout" component={Logout} />
    <Route path="/signup" component={Signup} />
    <Route path="/sitemap.xml" />
    <Route path="*" component={Featured} />
  </Switch>;
};
