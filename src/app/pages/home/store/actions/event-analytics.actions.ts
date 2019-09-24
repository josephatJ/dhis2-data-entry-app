import { createAction, props } from "@ngrx/store";

export enum EventAnalyticsActionsTypes {
  LoadEvents = "[Event data] load events by program id and org unit id",
  AddLoadedEvents = "[Event data] add loaded events data",
  LoadingEventsDataFail = "[Event data] loading events data fail"
}

export const loadEvents = createAction(
  "[Event data] load events by program id and org unit id",
  props<{ dimensions: any }>()
);

export const addLoadedEvents = createAction(
  "[Event data] add loaded events data",
  props<{ eventsData: any }>()
);

export const loadingEventsDataFail = createAction(
  "[Event data] loading events data fail",
  props<{ error: any }>()
);
