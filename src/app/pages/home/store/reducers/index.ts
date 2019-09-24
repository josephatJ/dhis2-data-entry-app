import { StoreModule } from "@ngrx/store";
import { formInfosReducer } from "./forms-info.reducer";
import { eventsDataReducer } from "./events-data.reducer";

export const homeReducers: any[] = [
  StoreModule.forFeature("formInfos", formInfosReducer),
  StoreModule.forFeature("eventsData", eventsDataReducer)
];
