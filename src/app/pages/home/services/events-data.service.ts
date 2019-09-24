import { Injectable } from "@angular/core";
import { NgxDhis2HttpClientService } from "@iapps/ngx-dhis2-http-client";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class EventsDataService {
  constructor(private httpClientService: NgxDhis2HttpClientService) {}

  getEventsData(dimensions): Observable<any> {
    console.log("dimensions", dimensions);
    return this.httpClientService.get(
      "analytics/events/query/" +
        dimensions.program +
        ".json?dimension=pe:" +
        dimensions.pe +
        "&dimension=ou:" +
        dimensions.ou +
        dimensions.dx +
        "&stage=" +
        dimensions.stage +
        "&displayProperty=NAME&outputType=EVENT&pageSize=100&page=1"
    );
  }
}
