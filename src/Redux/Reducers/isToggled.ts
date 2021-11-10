interface State {}

export interface Context {
  dispatch: Function;
  state: State;
}

export const initialToggledState = {
  isToggled: false,
};

export interface Action {
  type: string;
  payload: any;
}

export const isToggledReducer = (
  state = initialToggledState,
  action: Action
) => {
  console.log(action, 'ACTION');
  switch (action.type) {
    case 'TOGGLE':
      return !state;

    default:
      return state;
  }
};
