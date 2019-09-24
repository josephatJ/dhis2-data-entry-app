import { createFeatureSelector, createSelector } from "@ngrx/store";
import {
  EventsDataState,
  eventsDataAdapter
} from "../states/events-data.states";

const getEventsDataState = createFeatureSelector<EventsDataState>("eventsData");

export const {
  selectEntities: getEventsDataEntities,
  selectAll: getAllData
} = eventsDataAdapter.getSelectors(getEventsDataState);

export const getEventsDataLoadingState = createSelector(
  getEventsDataState,
  (state: EventsDataState) => state.loaded
);
