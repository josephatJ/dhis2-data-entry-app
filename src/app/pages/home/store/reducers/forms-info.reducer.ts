import { createReducer, on } from "@ngrx/store";
import { initialFormInfosState, formsAdapter } from "../states/forms.states";
import {
  loadFormInfos,
  addLoadedFormInfos,
  loadingFormInfosFail
} from "../actions/forms.actions";
import {
  loadingBaseState,
  loadedBaseState,
  errorBaseState
} from "src/app/store/states/base.state";

export const reducer = createReducer(
  initialFormInfosState,
  on(loadFormInfos, state => ({
    ...state,
    ...loadingBaseState
  })),
  on(addLoadedFormInfos, (state, { formInfos }) =>
    formsAdapter.addOne(formInfos, { ...state, ...loadedBaseState })
  ),
  on(loadingFormInfosFail, (state, { error }) => ({
    ...state,
    ...errorBaseState,
    error
  }))
);

export function formInfosReducer(state, action) {
  return reducer(state, action);
}
