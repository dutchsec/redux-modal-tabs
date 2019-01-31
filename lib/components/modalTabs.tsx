import * as React from 'react';
import { AppState, ModalTab } from '../reducer';
import ModalTabComponent from './modalTabComponent';
import { connect } from 'react-redux';

interface Props {
	modalTabs: ModalTab[];
}

interface State {
	expanded: boolean;
}

class ModalTabs extends React.Component<Props, State> {
	state: State = {
		expanded: true
	};

	onToggleExpanded() {
		const { expanded } = this.state;

		this.setState({
			expanded: !expanded
		});
	}

	componentDidUpdate(prevProps: Props) {
		const { modalTabs } = this.props;

		if (prevProps.modalTabs.length < modalTabs.length) {
			this.setState({
				expanded: true
			});
		}
	}

	render() {
		const { modalTabs } = this.props;
		const { expanded } = this.state;

		if (modalTabs.length === 0) {
			return null;
		}

		return (
			<div className={'modalTabs '+ (expanded ? '' : ' modalTabsCollapsed')}>
				<ul className="modalTabsList">
					{modalTabs.map(modalTab =>
						<ModalTabComponent
							key={modalTab.id}
							modalTab={modalTab}
						/>
					)}
				</ul>

				<button className="modalTabsMinimize" onClick={this.onToggleExpanded.bind(this)}>
					<span className={'modalTabArrow '
					+ (expanded ? 'modalTabArrowRight' : 'modalTabArrowLeft')} />
				</button>
			</div>
		);
	}
}

const select = (state: AppState): Props => ({
	modalTabs: state.reduxModalTabs.modalTabs
});

export default connect(select)(ModalTabs);