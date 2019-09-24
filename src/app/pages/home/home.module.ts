import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { SharedModule } from "src/app/shared/shared.module";
import { pages } from "./pages";

import { NgxDhis2CustomFormsEntryModule } from "ngx-dhis2-custom-forms-entry";
import { NgxDhis2OrgUnitFilterModule } from "@iapps/ngx-dhis2-org-unit-filter";
import { homeReducers } from "./store/reducers";
import { EffectsModule } from "@ngrx/effects";
import { FormsEffects, EventsDataEffects } from "./store/effects";

@NgModule({
  declarations: [...pages],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    NgxDhis2OrgUnitFilterModule,
    NgxDhis2CustomFormsEntryModule,
    ...homeReducers,
    EffectsModule.forFeature([FormsEffects, EventsDataEffects])
  ]
})
export class HomeModule {}
