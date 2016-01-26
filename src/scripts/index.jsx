// dependencies --------------------------------------------------------------

import React        from 'react';
import Navbar       from './nav/navbar.jsx';
import LeftNavbar   from './nav/left-navbar.jsx';
import userActions  from './user/user.actions.js';
import bowser  		from 'bowser';
import Happybrowser from './common/partials/happybrowser.jsx';
import {RouteHandler, State} from 'react-router';

// component setup -----------------------------------------------------------

let App = React.createClass({

	mixins: [State],

// life cycle methods --------------------------------------------------------

	componentDidMount () {
		userActions.initOAuth();
	},

	render () {

		let pageClasses = ' ';
		let routeGetter = this.getRoutes();
		
		for(var i = 0; i < routeGetter.length; i++){
			pageClasses += routeGetter[i].name+' ';
		}

		let showLeftNav 	= !this.isActive('signIn');
		let is_front 		= this.isActive('signIn');
		let leftnav;

		if (showLeftNav) {
			leftnav = <div className="left-nav"><LeftNavbar /></div>
		}

		return (
			<div className={is_front ? "page is-front" + pageClasses : "page" + pageClasses}>
				{!bowser.chrome ?  <Happybrowser /> : null }
				<div className="full-col">
					<Navbar/>
					<div className="main view container">
						<div className={showLeftNav ? "route-wrapper" : null}>
							{leftnav}
							<RouteHandler/>
						</div>
					</div>
				</div>
			</div>
		);
	},

// custom methods ------------------------------------------------------------


});

export default App;