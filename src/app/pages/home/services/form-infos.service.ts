import { Injectable } from "@angular/core";
import { NgxDhis2HttpClientService } from "@iapps/ngx-dhis2-http-client";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class FormInfosService {
  constructor(private httpClientService: NgxDhis2HttpClientService) {}

  getFormsInfo(ou): Observable<any> {
    console.log("ou", ou);
    return this.httpClientService.get(
      "organisationUnits/" +
        ou +
        ".json?fields=id,name,dataSets[id,name,dataSetElements[dataElement[id,name,valueType,optionSetValue]],dataEntryForm[id,name,htmlCode]],programs[id,name,programStages[dataEntryForm[id,htmlCode],programStageDataElements[dataElement[id,name,code,valueType,optionSet[id,name,options[id,name,code]]]]]]"
    );
  }
}
