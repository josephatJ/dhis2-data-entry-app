import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  loadEvents,
  addLoadedEvents,
  loadingEventsDataFail
} from "../actions/event-analytics.actions";
import { switchMap, map, catchError } from "rxjs/operators";
import { EventsDataService } from "../../services/events-data.service";
import { of } from "rxjs";

@Injectable()
export class EventsDataEffects {
  constructor(
    private actions$: Actions,
    private eventsDataService: EventsDataService
  ) {}

  eventsData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEvents),
      switchMap(action =>
        this.eventsDataService.getEventsData(action.dimensions).pipe(
          map(data => addLoadedEvents({ eventsData: data })),
          catchError(error => of(loadingEventsDataFail({ error })))
        )
      )
    )
  );
}
