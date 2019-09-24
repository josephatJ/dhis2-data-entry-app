import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { State } from "src/app/store/reducers";
import * as _ from "lodash";
import { loadFormInfos } from "../../store/actions/forms.actions";
import { getFormInfos } from "../../store/selectors/forms-info.selector";
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
  selectedOrgUnitItems: any[] = [{ id: "O6uvpzGd5pu", name: "Bo", level: 2 }];
  dataSource = ELEMENT_DATA;
  pageEvent: any;
  dataElements = [
    {
      name: "Testing long text dataelement tracker",
      id: "zZtyRZUfG2Y",
      valueType: "LONG_TEXT"
    },
    {
      name: "Testing number data element tracker",
      id: "B9eHqRhpnPw",
      valueType: "NUMBER"
    },
    {
      name: "Testing option set dataelement tracker",
      id: "PGfbYUFddzH",
      valueType: "TEXT",
      optionSet: {
        name: "Testing option set",
        id: "NOthbW9JKkJ",
        options: [
          {
            code: "Option 1",
            name: "Option 1",
            id: "t8K5lrgTAlO"
          },
          {
            code: "Option 2",
            name: "Option 2",
            id: "UVs0yEN4Fi0"
          },
          {
            code: "Yes",
            name: "Yes Option",
            id: "CBZBKtd91yG"
          },
          {
            code: "No",
            name: "No Option",
            id: "ObNFCQ6tA9T"
          }
        ]
      }
    },
    {
      name: "Testing postive integer dataelement tracker",
      id: "QBrj6pw4Jxc",
      valueType: "INTEGER_ZERO_OR_POSITIVE"
    },
    {
      name: "Testing text dataelement tracker",
      id: "QSLEfRfa8p9",
      valueType: "TEXT"
    }
  ];
  formType: string = "event";
  htmlCustomForm: any =
    '<style type="text/css">.main-header{\n\t\tbackground-color:#ececec;\n\t\t}\n\t.sub-header{\n\t\tbackground-color:#C3E5FB;\n\t\t}\n\ttd input {\n    display: block;\n    width: 100%;\n    height: 34px;\n    padding: 6px 12px;\n    font-size: 14px;\n    line-height: 1.428571429;\n    color: #555;\n    vertical-align: middle;\n    background-color: #fff;\n    background-image: none;\n    border: 1px solid #ccc;\n    border-radius: 4px;\n    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,0.075);\n    box-shadow: inset 0 1px 1px rgba(0,0,0,0.075);\n    -webkit-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;\n    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;\n}\n</style>\n<div class="cde" id="opd">\n<table class="table table-condensed table-bordered table-responsive">\n\t<thead>\n\t\t<tr>\n\t\t\t<th class="main-header" colspan="4">Testing custom event form</th>\n\t\t</tr>\n\t</thead>\n\t<tbody>\n\t\t<tr class="sub-header">\n\t\t\t<td>A</td>\n\t\t\t<td colspan="3">Header 1</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td>1</td>\n\t\t\t<td>Number data element</td>\n\t\t\t<td colspan="2"><input id="Ny8qhGGKa9Z-B9eHqRhpnPw-val" name="entryfield" title="Testing number data element tracker" value="[ Testing number data element tracker ]"/></td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td>2</td>\n\t\t\t<td>Positive integer data element</td>\n\t\t\t<td colspan="2"><input id="Ny8qhGGKa9Z-QBrj6pw4Jxc-val" name="entryfield" title="Testing postive integer dataelement tracker" value="[ Testing postive integer dataelement tracker ]"/></td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td>3</td>\n\t\t\t<td>Text data element</td>\n\t\t\t<td colspan="2"><input id="Ny8qhGGKa9Z-QSLEfRfa8p9-val" name="entryfield" title="Testing text dataelement tracker" value="[ Testing text dataelement tracker ]"/></td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td>4</td>\n\t\t\t<td>Long text data element</td>\n\t\t\t<td colspan="2"><input id="Ny8qhGGKa9Z-zZtyRZUfG2Y-val" name="entryfield" title="Testing long text dataelement tracker" value="[ Testing long text dataelement tracker ]"/></td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td>5</td>\n\t\t\t<td>Option set based data element</td>\n\t\t\t<td colspan="2"><input id="Ny8qhGGKa9Z-PGfbYUFddzH-val" name="entryfield" title="Testing option set dataelement tracker" value="[ Testing option set dataelement tracker ]"/></td>\n\t\t</tr>\n\t</tbody>\n</table>\n</div>\n';
  statusArr = [];
  statusUpdateOnDomElement = {
    domElementId: "",
    id: "",
    status: "",
    colorKey: ""
  };
  formsInfo$: Observable<any>;

  constructor(private _snackBar: MatSnackBar, private store: Store<State>) {}
  ngOnInit() {}

  openSnackBar() {
    this._snackBar.open("This is working", "OK", {
      duration: 2000
    });
  }

  onOrgUnitUpdate(e, action) {
    this.store.dispatch(loadFormInfos({ ou: e.items[0].id }));
    this.formsInfo$ = this.store.select(getFormInfos);
  }

  detailsOfTheChangedValue(e) {
    console.log("on your app", e);
    const domElementId = e.domElementId;
    this.statusUpdateOnDomElement.domElementId = e.domElementId;
    this.statusUpdateOnDomElement.id = e.id;
    this.statusUpdateOnDomElement.colorKey = "OK";
    this.statusUpdateOnDomElement.status = "synched";
    const newObject = {};
    newObject[domElementId] = this.statusUpdateOnDomElement;
    this.statusArr.push(this.statusUpdateOnDomElement);
  }
}
