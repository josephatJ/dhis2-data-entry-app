import { createReducer, on } from "@ngrx/store";
import {
  initialEventsDataState,
  eventsDataAdapter
} from "../states/events-data.states";
import {
  loadEvents,
  addLoadedEvents,
  loadingEventsDataFail
} from "../actions/event-analytics.actions";
import {
  loadingBaseState,
  loadedBaseState,
  errorBaseState
} from "src/app/store/states/base.state";

export const reducer = createReducer(
  initialEventsDataState,
  on(loadEvents, state => ({
    ...state,
    ...loadingBaseState
  })),
  on(addLoadedEvents, (state, { eventsData }) =>
    eventsDataAdapter.addOne(eventsData, { ...state, ...loadedBaseState })
  ),
  on(loadingEventsDataFail, (state, { error }) => ({
    ...state,
    ...errorBaseState,
    error
  }))
);

export function eventsDataReducer(state, action) {
  return reducer(state, action);
}
