// dependencies -------------------------------------------------------

import React        					from 'react';
import Reflux       					from 'reflux';
import datasetStore 					from './dataset.store';
import actions      					from './dataset.actions.js';
import WarnButton   					from '../common/forms/warn-button.jsx';
import Share        					from './dataset.tools.share.jsx';
import Jobs         					from './dataset.tools.jobs.jsx';
import moment                           from 'moment';

let Tools = React.createClass({

    mixins: [Reflux.connect(datasetStore)],

// life cycle events --------------------------------------------------

	componentDidMount() {
		let dataset = this.state.dataset;
		if (dataset && (dataset.access === 'rw' || dataset.access == 'admin')) {
			actions.loadUsers();
		}
	},

	render() {
		let dataset = this.state.dataset;
		let users   = this.state.users;
		let snapshots = this.state.snapshots;

		let tools = [
			{
				tooltip: 'Download Dataset',
				icon: 'fa-download',
				action: actions.downloadDataset.bind(this, this.state.snapshot),
				display: true,
				warn: false
			},
			{
				tooltip: 'Make Dataset Public',
				icon: 'fa-globe',
				action: actions.publish.bind(this, dataset._id),
				display: dataset.access == 'admin' && !dataset.public && !dataset.status.uploadIncomplete,
				warn: true
			},
			{
				tooltip: 'Delete Dataset',
				icon: 'fa-trash',
				action: actions.deleteDataset.bind(this, dataset._id),
				display: dataset.access == 'admin' && !dataset.public,
				warn: true
			},
			{
				tooltip: 'Share Dataset',
				icon: 'fa-user-plus',
				action: actions.toggleModal.bind(null, 'Share'),
				display: dataset.access == 'admin',
				warn: false
			},
			{
				tooltip: 'Run Analysis',
				icon: 'fa-tasks',
				action: actions.toggleModal.bind(null, 'Jobs'),
				display: dataset && (dataset.access === 'rw' || dataset.access == 'admin') && !dataset.public,
				warn: false
			},
			{
				tooltip: 'Create Snapshot',
				icon: 'fa-camera-retro',
				action: actions.createSnapshot,
				display: dataset.access == 'admin' && !dataset.public && !dataset.status.uploadIncomplete,
				warn: true
			},
		];

		tools = tools.map((tool, index) => {
			if (tool.display) {
				return (
					<div role="presentation" className="tool" key={index}>
						<WarnButton tooltip={tool.tooltip} icon={tool.icon} action={tool.action} warn={tool.warn} />
		            </div>
				);
			}
		});


		let snapshotOptions = snapshots.map((snapshot) => {
			return (
				<option key={snapshot._id} value={JSON.stringify(snapshot)}>
					{snapshot.isOriginal ? 'original' : 'v' + snapshot.snapshot_version + ' (' + moment(snapshot.modified).format('lll') + ')'}
				</option>
			)
		});

		return (
			<div className="tools clearfix">
				{tools}
				<Share dataset={dataset} users={users} show={this.state.showShareModal} onHide={actions.toggleModal.bind(null, 'Share')}/>
				<Jobs dataset={dataset} apps={this.state.apps} loadingApps={this.state.loadingApps} show={this.state.showJobsModal} onHide={actions.toggleModal.bind(null, 'Jobs')} />

				<div role="presentation" className="tool" >
					<select onChange={this._selectSnapshot} defaultValue="">
						<option value="" disabled>Select a snapshot</option>
						{snapshotOptions}
					</select>
	            </div>
	        </div>
    	);
	},

// custon methods -----------------------------------------------------

	_selectSnapshot: (e) => {
		let snapshot = JSON.parse(e.target.value);
		actions.loadSnapshot(snapshot.isOriginal, snapshot._id);
	}

});

export default Tools;