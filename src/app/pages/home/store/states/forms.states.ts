import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { BaseState, initialBaseState } from "src/app/store/states/base.state";

export interface FormsInfoState extends EntityState<any>, BaseState {}

export const formsAdapter: EntityAdapter<any> = createEntityAdapter<any>({});

export const initialFormInfosState: FormsInfoState = formsAdapter.getInitialState(
  {
    ...initialBaseState
  }
);
