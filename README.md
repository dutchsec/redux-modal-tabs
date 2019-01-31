# Redux Modal Tabs

A sidebar with multiple tabs for projects with React and Redux.

## Dependencies

There are a number of peer dependencies that your project needs to
include:
* react
* react-redux
* redux

## Installation

```bash
npm install redux-modal-tabs
```

## Usage

### 1. Configure the reducer
```js
import { reduxModalTabsReducer } from 'redux-modal-tabs';

export const rootReducer = (history) => combineReducers({
    ...
	reduxModalTabs: reduxModalTabsReducer
	...
});
```

### 2. Import the css (optional)
```js
// in index.tsx or app.tsx, wherever makes most sense for you
import 'redux-modal-tabs/css/style.css';
```

### 3. Opening tabs
```js
import { addModalTab } from 'redux-modal-tabs';

class MyComponent extends React.Component {
    ...

    onClick() {
        const { dispatch } = this.props;

        dispatch(addModalTab(
            'My title',
            <MyContentComponent />
        ));
    }

    ...
}
```
