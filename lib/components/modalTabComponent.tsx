import * as React from 'react';
import { AppState, ModalTab } from '../reducer';
import { connect } from 'react-redux';
import { closeModalTab, openModalTab, removeModalTab } from '../actions';

interface OwnProps {
	modalTab: ModalTab;
}

interface Props extends OwnProps {
	activeModalTabId: string;
	dispatch: any;
}

class ModalTabComponent extends React.Component<Props> {
	onToggleOpen() {
		const { modalTab, activeModalTabId, dispatch } = this.props;

		if (modalTab.id === activeModalTabId) {
			dispatch(closeModalTab(modalTab.id));
		} else {
			dispatch(openModalTab(modalTab.id));
		}
	}

	onRemove(event: any) {
		event.stopPropagation();

		const { modalTab, dispatch } = this.props;

		dispatch(removeModalTab(modalTab.id));
	}

	render() {
		const { modalTab, activeModalTabId } = this.props;
		const isActive: boolean = modalTab.id === activeModalTabId;

		return (
			<li className={'modalTab' + (isActive ? ' modalTabActive' : '')}>
				<header className="modalTabHeader" onClick={this.onToggleOpen.bind(this)}>
					<div className="modalTabTitle">
						{modalTab.title}
					</div>

					<div className="modalTabButtons">
						<button className="modalTabButton modalTabToggleOpen">
							<span className="modalTabArrow" />
						</button>
						<button className="modalTabButton modalTabRemove" onClick={this.onRemove.bind(this)}>
							<span className="modalTabCross">&#10799;</span>
						</button>
					</div>
				</header>

				{isActive && (
					<main className="modalTabContent">
						{modalTab.content}
					</main>
				)}
			</li>
		);
	}
}

const select = (state: AppState, ownProps: OwnProps) => ({
	activeModalTabId: state.reduxModalTabs.activeModalTabId
});

export default connect(select)(ModalTabComponent);