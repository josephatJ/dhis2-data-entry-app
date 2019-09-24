import { StoreModule } from "@ngrx/store";
import { formInfosReducer } from "./forms-info.reducer";

export const homeReducers: any[] = [
  StoreModule.forFeature("formInfos", formInfosReducer)
];
