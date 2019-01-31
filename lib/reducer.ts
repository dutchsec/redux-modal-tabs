import { AnyAction } from 'redux';
import * as React from 'react';
import {
	ADD_MODAL_TAB, CLOSE_MODAL_TAB, OPEN_MODAL_TAB, REMOVE_MODAL_TAB
} from './constants';

export interface ModalTab {
	title: React.ReactNode;
	content: React.ReactNode;
	id: string;
}

export interface ReduxModalTabsState {
	modalTabs: ModalTab[];
	activeModalTabId: string;
}

export interface AppState {
	reduxModalTabs: ReduxModalTabsState;
	[key: string]: any;
}

export const defaultReduxModalTabsState: ReduxModalTabsState = {
	modalTabs: [],
	activeModalTabId: null
};

export function reduxModalTabsReducer(
	state: ReduxModalTabsState = defaultReduxModalTabsState,
	action: AnyAction
): ReduxModalTabsState {
	switch (action.type) {
		case ADD_MODAL_TAB: {
			const modalTabs = state.modalTabs.concat([]);
			const modalTab: ModalTab = action.payload.modalTab;
			const existing = modalTabs.findIndex(search =>
				search.id === modalTab.id
			);

			if (existing !== -1) {
				// If the id already exists, replace it
				modalTabs[existing] = modalTab;
			} else {
				modalTabs.push(modalTab);
			}

			let activeModalTabId = state.activeModalTabId;

			if (action.payload.open) {
				activeModalTabId = modalTab.id;
			}

			return {
				...state,
				modalTabs,
				activeModalTabId
			}
		}

		case REMOVE_MODAL_TAB: {
			const modalTabs = state.modalTabs.filter(modalTab =>
				modalTab.id !== action.payload.id
			);

			return {
				...state,
				modalTabs
			};
		}

		case OPEN_MODAL_TAB: {
			const activeModalTabId: string = action.payload.id;

			return {
				...state,
				activeModalTabId
			};
		}

		case CLOSE_MODAL_TAB: {
			return {
				...state,
				activeModalTabId: null
			};
		}

		default: {
			return state;
		}
	}
}