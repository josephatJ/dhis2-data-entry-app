import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { switchMap, map, catchError } from "rxjs/operators";
import {
  loadFormInfos,
  addLoadedFormInfos,
  loadingFormInfosFail
} from "../actions/forms.actions";
import { FormInfosService } from "../../services/form-infos.service";
import { of } from "rxjs";

@Injectable()
export class FormsEffects {
  constructor(
    private actions$: Actions,
    private formInfosService: FormInfosService
  ) {}

  loadedForms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFormInfos),
      switchMap(action =>
        this.formInfosService
          .getFormsInfo(action.ou)
          .pipe(
            map(
              data => addLoadedFormInfos({ formInfos: data }),
              catchError((error: any) => of(loadingFormInfosFail({ error })))
            )
          )
      )
    )
  );
}
