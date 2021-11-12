import { combineReducers } from 'redux';

import { SnippetReducer } from './snippets';
import { isToggledReducer } from './isToggled';

export default combineReducers({
  snippets: SnippetReducer,
  isToggled: isToggledReducer,
});
