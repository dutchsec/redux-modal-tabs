import * as React from 'react';
import { AppState, ModalTab } from '../reducer';
import { connect } from 'react-redux';
import { openModalTab, removeModalTab } from '../actions';

interface Props {
	modalTabs: ModalTab[];
	activeModalTabId: string;
	dispatch: any;
}

interface State {
	expanded: boolean;
}

class ModalTabsHorizontal extends React.Component<Props, State> {
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

	onOpen(modalTab: ModalTab) {
		const { dispatch } = this.props;

		dispatch(openModalTab(modalTab.id));
	}

	onRemove(modalTab: ModalTab) {
		const { dispatch } = this.props;

		dispatch(removeModalTab(modalTab.id));
	}

	render() {
		const { modalTabs, activeModalTabId } = this.props;
		const { expanded } = this.state;

		if (modalTabs.length === 0) {
			return null;
		}

		const active: ModalTab = modalTabs.find(modalTab =>
			modalTab.id === activeModalTabId
		);

		return (
			<div className={'modalTabsHorizontal '+ (expanded ? 'modalTabsExpanded' : ' modalTabsCollapsed')}>
				<header className="modalTabsTop">
					<ul className="modalTabsList">
						{modalTabs.map(modalTab =>
							<li key={modalTab.id}
								className={'modalTabItem' + (modalTab.id === activeModalTabId ? ' modalTabItemActive' : '')}
								onClick={() => this.onOpen(modalTab)}>
								<span>{modalTab.title}</span>

								<button
									className="closeModalTab"
									onClick={() => this.onRemove(modalTab)}>
									<span className="modalTabCross">&#10799;</span>
								</button>
							</li>
						)}
					</ul>

					<button className="toggleModalTabsExpanded" onClick={this.onToggleExpanded.bind(this)}>
						<span className="modalTabArrow" />
					</button>
				</header>

				{(active && expanded) && (
					<main className="modalTabContent">
						{active.content}
					</main>
				)}
			</div>
		);
	}
}

const select = (state: AppState) => ({
	modalTabs: state.reduxModalTabs.modalTabs,
	activeModalTabId: state.reduxModalTabs.activeModalTabId
});

export default connect(select)(ModalTabsHorizontal);