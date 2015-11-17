// dependencies -------------------------------------------------------

import React     from 'react';
import Reflux    from 'reflux';
import Actions   from './user.actions.js';
import userStore from './user.store.js';
import {Link} 	 from 'react-router';
import Spinner   from '../common/partials/spinner.jsx';

// component setup ----------------------------------------------------

let Signin = React.createClass({

    mixins: [Reflux.connect(userStore)],

// life cycle events --------------------------------------------------

	statics: {
		willTransitionTo(transition) {
			if (userStore.data.token) {
				transition.redirect('dashboard');
			}
		}
	},

	render () {
		let browse = (
			<Link to="public" className="btn-admin">
				<span>Browse Publicly</span>
			</Link>
		);
		let google = (
			<button className="btn-admin" onClick={Actions.signIn} >
				<i className="fa fa-google" />
				<span> Google</span>
			</button>
		);
		let form;
		if (!this.state.loading) {
			form = (
				<div className="form col-xs-12 clearfix">
					{google}
					 <span className="conjunction">or</span>
					{browse}
				</div>
			)
		}
		let error;
		if (this.state.signinError && !this.state.loading) {
			error = <div className="alert alert-danger">{this.state.signinError}</div>;
		}


		return (
			<div className="sign-in">
				<div className="intro">
					<div className="introBG">
						<div className="intro-inner fadeIn clearfix">
							<div className="welcomeBlock flipInX">
								<h1>Welcome to CRN</h1>
								<h2>A free and open platform that enables the analysis and sharing of neuroimaging data</h2>
							</div>
							<div className="col-sm-12 signInBlock fadeIn">
								<h2>Sign in with</h2>
								{error}
								{form}
								<Spinner text="Signing in..." active={this.state.loading} />
							</div>
						</div>
					</div>
					<div className="more-info col-xs-12">
						View more information about <a href="http://reproducibility.stanford.edu/" target="_blank">Stanford Center for Reproducible Neuroscience</a> and <a href="http://bids.neuroimaging.io/" target="_blank">BIDS Specifications</a>
					</div>
				</div>
			</div>
    	);
	},

});

export default Signin;