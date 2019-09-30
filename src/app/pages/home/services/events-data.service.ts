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
      "events/query.json?orgUnit=" +
        dimensions.ou +
        "&programStage=" +
        dimensions.stage +
        "&order=lastUpdated:desc&pageSize=50&page=1&totalPages=true"
    );
  }
}
