import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { SharedModule } from "src/app/shared/shared.module";
import { pages } from "./pages";

import { NgxDhis2CustomFormsEntryModule } from "@josephatj/ngx-dhis2-custom-forms-entry";
import { NgxDhis2OrgUnitFilterModule } from "@iapps/ngx-dhis2-org-unit-filter";
import { homeReducers } from "./store/reducers";
import { EffectsModule } from "@ngrx/effects";
import { FormsEffects, EventsDataEffects } from "./store/effects";
import { ReportTableComponent } from "./pages/home/report-table/report-table.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatIconModule } from "@angular/material/icon";
import { MatNativeDateModule } from "@angular/material";
import { NgxDhis2PeriodFilterModule } from "@iapps/ngx-dhis2-period-filter";

@NgModule({
  declarations: [...pages, ReportTableComponent],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    NgxDhis2OrgUnitFilterModule,
    NgxDhis2PeriodFilterModule,
    NgxDhis2CustomFormsEntryModule,
    ...homeReducers,
    EffectsModule.forFeature([FormsEffects, EventsDataEffects]),
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class HomeModule {}
