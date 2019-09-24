import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FormsInfoState, formsAdapter } from "../states/forms.states";

const getFormInfosState = createFeatureSelector<FormsInfoState>("formInfos");

export const {
  selectEntities: getFormEntities,
  selectAll: getFormInfos
} = formsAdapter.getSelectors(getFormInfosState);

export const getLoadingState = createSelector(
  getFormInfosState,
  (state: FormsInfoState) => state.loaded
);
