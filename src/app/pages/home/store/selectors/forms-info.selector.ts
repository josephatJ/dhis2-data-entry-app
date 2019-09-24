import { MemoizedSelector, createFeatureSelector } from "@ngrx/store";
import { FormsInfoState, formsAdapter } from "../states/forms.states";

const getFormInfosState: MemoizedSelector<
  object,
  FormsInfoState
> = createFeatureSelector<FormsInfoState>("formInfos");

export const {
  selectEntities: getFormEntities,
  selectAll: getFormInfos
} = formsAdapter.getSelectors(getFormInfosState);
