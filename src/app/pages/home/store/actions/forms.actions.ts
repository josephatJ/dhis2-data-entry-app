import { createAction, props } from "@ngrx/store";

export enum FormsActionsTypes {
  LoadFormInfos = "[Form Infos] load form infos",
  AddLoadedFormInfos = "[Form Infos] add loaded form infos",
  LoadingFormInfoFail = "[Form Infos] loading form info fail"
}

export const loadFormInfos = createAction(
  "[Form Infos] load form infos",
  props<{ ou: string }>()
);

export const addLoadedFormInfos = createAction(
  "[Form Infos] add loaded form infos",
  props<{ formInfos: any }>()
);

export const loadingFormInfosFail = createAction(
  "[Form Infos] loading form info fail",
  props<{ error: any }>()
);
