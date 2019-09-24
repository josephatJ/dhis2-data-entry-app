import { BaseState, initialBaseState } from "src/app/store/states/base.state";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export interface EventsDataState extends BaseState, EntityState<any> {}

export const eventsDataAdapter: EntityAdapter<any> = createEntityAdapter<any>();

export const initialEventsDataState: EventsDataState = eventsDataAdapter.getInitialState(
  {
    ...initialBaseState
  }
);
