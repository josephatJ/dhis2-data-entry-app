import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { State } from "src/app/store/reducers";
import * as _ from "lodash";
import { loadFormInfos } from "../../store/actions/forms.actions";
import {
  getFormInfos,
  getFormEntities,
  getLoadingState
} from "../../store/selectors/forms-info.selector";
import { loadEvents } from "../../store/actions/event-analytics.actions";
import {
  getAllEventsData,
  getEventsDataEntities
} from "../../store/selectors/events-data.selectors";
import { drawTable } from "../../helpers/draw-table.helpers";
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: "Hydrogen", weight: 1.0079, symbol: "H" },
  { position: 2, name: "Helium", weight: 4.0026, symbol: "He" },
  { position: 3, name: "Lithium", weight: 6.941, symbol: "Li" },
  { position: 4, name: "Beryllium", weight: 9.0122, symbol: "Be" },
  { position: 5, name: "Boron", weight: 10.811, symbol: "B" },
  { position: 6, name: "Carbon", weight: 12.0107, symbol: "C" },
  { position: 7, name: "Nitrogen", weight: 14.0067, symbol: "N" },
  { position: 8, name: "Oxygen", weight: 15.9994, symbol: "O" },
  { position: 9, name: "Fluorine", weight: 18.9984, symbol: "F" },
  { position: 10, name: "Neon", weight: 20.1797, symbol: "Ne" }
];

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ["position", "name", "weight", "symbol"];
  orgUnitObject: any;
  action: string;
  orgUnitFilterConfig: any = {
    singleSelection: true,
    showUserOrgUnitSection: false,
    showOrgUnitLevelGroupSection: false,
    showOrgUnitGroupSection: false,
    showOrgUnitLevelSection: false
  };
  selectedOrgUnitItems: any[] = [
    { id: "WoDcP1GEqm3", name: "Buguruni Mills", level: 4 }
  ];
  dataSource = ELEMENT_DATA;
  pageEvent: any;
  dataElements = [];
  formType: string = "event";
  htmlCustomForm: any = "";
  statusArr = [];
  statusUpdateOnDomElement = {
    domElementId: "",
    id: "",
    status: "",
    colorKey: ""
  };
  selectedFormReady: boolean = false;
  selectedOuId: string;
  formsInfo$: Observable<any>;
  formsInfoEntities$: Observable<any>;
  loadedEvents$: Observable<any>;
  loadedEventEntities$: Observable<any>;
  loaded$: Observable<any>;
  tableConfigurations: any;
  tableObject: any = {};
  elementsToShow = ["created"];
  isEvent: boolean = false;
  isAggregate: boolean = false;
  isTracker: boolean = false;

  constructor(private _snackBar: MatSnackBar, private store: Store<State>) {}
  ngOnInit() {}

  openSnackBar() {
    this._snackBar.open("This is working", "OK", {
      duration: 2000
    });
  }

  onOrgUnitUpdate(e, action) {
    this.selectedFormReady = false;
    this.selectedOuId = e.items[0].id;
    this.store.dispatch(loadFormInfos({ ou: e.items[0].id }));
    this.formsInfoEntities$ = this.store.select(getFormEntities);
    this.formsInfo$ = this.store.select(getFormInfos);
    this.loaded$ = this.store.select(getLoadingState);
  }

  detailsOfTheChangedValue(e) {
    const domElementId = e.domElementId;
    this.statusUpdateOnDomElement.domElementId = e.domElementId;
    this.statusUpdateOnDomElement.id = e.id;
    this.statusUpdateOnDomElement.colorKey = "OK";
    this.statusUpdateOnDomElement.status = "synched";
    const newObject = {};
    newObject[domElementId] = this.statusUpdateOnDomElement;
    this.statusArr.push(this.statusUpdateOnDomElement);
  }

  getSelectedForm(selectedFormId, allForms: Observable<any>) {
    this.selectedFormReady = false;
    allForms.subscribe(forms => {
      let key = "";
      if (this.isAggregate) {
        key = "dataSets";
      } else {
        key = "programs";
      }
      _.map(forms[this.selectedOuId][key], (form: any) => {
        if (form.id == selectedFormId) {
          if (this.isEvent) {
            this.htmlCustomForm =
              form["programStages"][0].dataEntryForm.htmlCode;
            this.dataElements = this.getDataElements(
              form["programStages"][0]["programStageDataElements"]
            );
          } else if (this.isAggregate) {
            this.htmlCustomForm = form.dataEntryForm.htmlCode;
            this.dataElements = this.getDataElements(form.dataSetElements);
          }
          this.selectedFormReady = true;
          // load data for the selected form
          let dxDimensionString = "&dimension=";
          let checkCount = 0;
          _.map(this.dataElements, dataElement => {
            checkCount++;
            if (checkCount < this.dataElements.length) {
              dxDimensionString += dataElement.id + "&dimension=";
            } else {
              dxDimensionString += dataElement.id;
            }
          });
          const dimensions = {
            ou: this.selectedOuId,
            program: selectedFormId,
            stage: form["programStages"][0].id,
            pe: "THIS_YEAR",
            dx: dxDimensionString
          };
          this.tableConfigurations = {
            title: form.name,
            subtitle: "",
            showHierarchy: false,
            displayList: false,
            rows: ["ou"],
            columns: ["dx"],
            legendSet: null,
            styles: null
          };
          this.store.dispatch(loadEvents({ dimensions: dimensions }));
          this.loadedEvents$ = this.store.select(getAllEventsData);
          this.loadedEventEntities$ = this.store.select(getEventsDataEntities);
          this.loadedEventEntities$.subscribe(entities => {
            const key =
              this.selectedOuId + "-" + "THIS_YEAR" + "-" + selectedFormId;
            if (entities && entities[key]) {
              this.tableObject = drawTable(
                entities[key]["data"] ? entities[key]["data"] : {},
                this.tableConfigurations,
                this.elementsToShow,
                this.selectedOuId
              )[this.selectedOuId];
            }
          });
        }
      });
    });
  }

  getDataElements(programStageDataElements) {
    let formattedDataElements = [];
    _.map(programStageDataElements, PStageDataElement => {
      formattedDataElements.push(PStageDataElement.dataElement);
      this.elementsToShow.push(PStageDataElement.dataElement.id);
    });
    return formattedDataElements;
  }

  setFormType(type) {
    this.selectedFormReady = false;
    if (type == "event") {
      this.isEvent = true;
      this.isAggregate = false;
      this.isTracker = false;
    } else if (type == "aggregate") {
      this.isEvent = false;
      this.isAggregate = true;
      this.isTracker = false;
    } else if (type == "tracker") {
      this.isEvent = false;
      this.isAggregate = false;
      this.isTracker = true;
    }
  }
}
