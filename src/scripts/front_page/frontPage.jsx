// dependencies -------------------------------------------------------

import React            from 'react';
import Reflux           from 'reflux';
import {Link}           from 'react-router';
import FrontPageTabs    from './frontPageTabs.jsx';
import userStore        from '../user/user.store.js';
import Spinner          from '../common/partials/spinner.jsx';
import Footer           from '../common/partials/footer.jsx';


// component setup ----------------------------------------------------

let FrontPage = React.createClass({

    mixins: [Reflux.connect(userStore)],

// life cycle events --------------------------------------------------

    render () {

        return (
            <span>
                <div className="intro">
                    <div className="container">
                        <div className="intro-inner fade-in clearfix">
                            <div className="clearfix welcome-block">
                                <div className="logo-layers">
                                    <img className="logo-layer-users" src="./assets/logo_users.png" alt="OpenNeuro Logo" />
                                    <img className="logo-layer-cube" src="./assets/logo_cube.png" alt="OpenNeuro Logo" />
                                    <img className="logo-layer-app" src="./assets/logo_app.png" alt="OpenNeuro Logo" />
                                    <img className="logo-layer-data" src="./assets/logo_data.png" alt="OpenNeuro Logo" />
                                </div>
                                <div className="logo-text">Open<span className="logo-end">Neuro</span></div>
                                <h1>A free and open platform that enables the analysis and sharing of neuroimaging data</h1>
                                <div className="sign-in-block fade-in">
                                    {this._error(this.state.signinError, this.state.loading)}
                                    {this._signinForm(this.state.loading)}
                                    <Spinner text="Signing in..." active={this.state.loading} />
                                </div>
                                <div className="browse-publicly">
                                    <Link to="public"><span>Browse Public Datasets</span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <FrontPageTabs />
                {this._browsePipelines()}
                {this._moreInfo()}
                <Footer />
            </span>
        );
    },

// custom methods -------------------------------------------------------

    _signinForm(loadingState){
        if (!loadingState) {
            return(
                <span>
                    <button className="btn-admin" onClick={userStore.signIn} >
                        <i className="fa fa-google" /> Sign in with Google
                    </button>
                </span>
            );
        }
    },

    _error(signinError, loadingState) {
        if (signinError && !loadingState) {
            return <div className="alert alert-danger">{this.state.signinError}</div>;
        }
    },

// template functions ----------------------------------------------------

    _moreInfo(){
        return (
            <div className="more-info">
                <div className="container">
                    <span className="openneuro-more">
                        <div className="col-xs-12">
                            <div className="logo-text">Open<span className="logo-end">Neuro</span></div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                    <p>A free and open platform that enables the analysis and sharing of neuroimaging data</p>
                                </div>
                                <div className="col-sm-6">
                                <p>View more information about<br/>
                                <a href="#">Stanford Center for Reproducible Neuroscience</a></p>
                            </div>
                        </div>
                    </span>
                    <span className="bids-more">
                        <div className="col-xs-12">
                            <h3>Brain Imaging Data Structure (BIDS) </h3>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                    <p>A Validator for the Brain Imaging Data Structure<br/>
                                        Read more about the <a href="#">BIDS specifications</a></p>
                                </div>
                                <div className="col-sm-6">
                                <p>Want to contribute to BIDS?<br/>
                                    Visit the <a href="#">Google discussion group</a> to contribute.</p>
                            </div>
                        </div>
                    </span>
                    <div className="support-more">
                            <h4>Support for OpenNeuro provided by</h4>
                            <div className="row">
                                <div className="col-sm-3"><img src="./assets/ljaf.png" alt="Arnold Foundation"/></div>
                                <div className="col-sm-3"><img src="./assets/stanford.png" alt="Stanford"/></div>
                                <div className="col-sm-3"><img src="./assets/nsf.png" alt="National Science Foundation"/></div>
                                <div className="col-sm-3"><img src="./assets/nih.png" alt="National Institute on Drug and Abuse"/></div>
                            </div>
                    </div>
                </div>
            </div>
        );
    },

    _browsePipelines() {
        return(
            <div className="browse-pipelines">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 mate-slide">
                            <h3>Check Out Our Pipelines</h3>
                            <p>Lorem analysis pipelines snapshots datasets. Lorem ipsum dolor sit amet, consectetur ad adipiscing elit.</p>
                            <ul>
                                <li>Freesurfer</li>
                                <li>The Human Connectome Project</li>
                                <li>Other</li>
                                <li>mriqc</li>
                            </ul>
                        </div>
                        <div className="col-sm-6 mate-slide">
                            <h3>Or Browse Pipelines</h3>
                            <form>
                                <label>What kinds of pipelines are you interested in?</label>
                                <select>
                                    <option>asdf</option>
                                </select>
                                <br />
                                <label>browse X pipelines</label>
                                <select>
                                    <option>asdf</option>
                                </select>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

});

export default FrontPage;