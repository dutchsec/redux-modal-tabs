import { AnyAction } from 'redux';
import * as React from 'react';
import {
	ADD_MODAL_TAB,
	CLOSE_MODAL_TAB,
	OPEN_MODAL_TAB,
	REMOVE_MODAL_TAB
} from './constants';
import { ModalTab } from './reducer';

export function addModalTab(
	title: React.ReactNode,
	content: React.ReactNode,
	open: boolean = true,
	id: string = undefined
): AnyAction {
	if (typeof id === 'undefined') {
		id = Date.now().toString();
	}

	const modalTab: ModalTab = {
		title,
		content,
		id
	};

	return {
		type: ADD_MODAL_TAB,
		payload: {
			modalTab,
			open
		}
	};
}

export function removeModalTab(id: string): AnyAction {
	return {
		type: REMOVE_MODAL_TAB,
		payload: {
			id
		}
	};
}

export function openModalTab(id: string): AnyAction {
	return {
		type: OPEN_MODAL_TAB,
		payload: {
			id
		}
	};
}

export function closeModalTab(id: string): AnyAction {
	return {
		type: CLOSE_MODAL_TAB,
		payload: {
			id
		}
	};
}