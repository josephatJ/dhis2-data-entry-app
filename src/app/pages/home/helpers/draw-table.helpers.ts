import * as _ from "lodash";

export function drawTable(
  analyticsObject,
  tableConfiguration,
  elementsToShow,
  ou
) {
  const table = {
    headers: [],
    columns: [],
    rows: [],
    titles: {
      columns: []
    },
    titlesAvailable: false,
    hasParentOu: false
  };
  if (tableConfiguration.hasOwnProperty("title")) {
    table["title"] = tableConfiguration.title;
  }
  if (tableConfiguration.hasOwnProperty("subtitle")) {
    table["subtitle"] = tableConfiguration.subtitle;
  }

  let headersArrangement = [];
  analyticsObject.headers.forEach(formtHeader);
  function formtHeader(item, index) {
    if (_.indexOf(elementsToShow, item.name) > -1) {
      let headerConfig = {
        index: index,
        id: item.name,
        name: item.column
      };
      headersArrangement.push(headerConfig);
      table.titles.columns.push({ title: item.column });
    }
  }

  analyticsObject.rows.forEach(row => {
    table.rows.push(createArrangedRowsAsPerHeaders(row, headersArrangement));
  });
  let formattedTableObj = {};
  console.log("table", table);
  formattedTableObj[ou] = table;
  console.log(formattedTableObj);
  return formattedTableObj;
}

function createArrangedRowsAsPerHeaders(row, headerConfig) {
  let items = [];
  headerConfig.forEach(header => {
    let rowItem = {
      id: header.id,
      name: header.name,
      value: row[header.index]
    };
    items.push(rowItem);
  });
  return items;
}

/**
 * finding the position of the item in rows- used when fetching data
 * @param analyticsObjectHeaders : Array
 * @param name : String ['ou','dx','co','pe',....]
 * @returns {number}
 * @private
 */
function getTitleIndex(analyticsObjectHeaders, name: string) {
  let index = 0;
  let counter = 0;
  for (const header of analyticsObjectHeaders) {
    if (header.name === name) {
      index = counter;
    }
    counter++;
  }
  return index;
}

function calculateColSpan(analyticsObject, array, item) {
  let indexOfItem = array.indexOf(item);
  let array_length = array.length;
  let last_index = array_length - 1;
  let dimensions = { col_span: 1, duplication: 1 };
  for (let i = last_index; i > indexOfItem; i--) {
    let arr = prepareSingleCategories(analyticsObject, array[i]);
    dimensions.col_span = dimensions.col_span * arr.length;
  }
  for (let i = 0; i < indexOfItem; i++) {
    let arr = prepareSingleCategories(analyticsObject, array[i]);
    dimensions.duplication = dimensions.duplication * arr.length;
  }
  return dimensions;
}

/**
 * return the meaningful array of single selection only
 * @param analyticsObject
 * @param xAxis
 * @param xAxisItems
 * @returns {{xAxisItems: Array, yAxisItems: Array}}
 */
function prepareSingleCategories(
  initialAnalytics,
  itemIdentifier,
  preDefinedItems = []
) {
  const analyticsObject = _sanitizeIncomingAnalytics(initialAnalytics);
  let structure = [];
  if (preDefinedItems.length === 0) {
    for (let val of getMetadataArray(analyticsObject, itemIdentifier)) {
      structure.push({
        name: analyticsObject.metaData.names[val],
        uid: val,
        type: itemIdentifier
      });
    }
  }
  if (preDefinedItems.length !== 0) {
    for (let val of preDefinedItems) {
      structure.push({
        name: analyticsObject.metaData.names[val],
        uid: val,
        type: itemIdentifier
      });
    }
  }
  return structure;
}

function _sanitizeIncomingAnalytics(analyticsObject: any) {
  // for (let header of analyticsObject.headers) {
  //   if (header.hasOwnProperty('optionSet')) {
  //     if (analyticsObject.metaData[header.name].length == 0) {
  //       analyticsObject.metaData[header.name] = this._getRowItems(getTitleIndex(analyticsObject.headers, header.name), analyticsObject.rows);
  //       for (let item of analyticsObject.metaData[header.name]) {
  //         analyticsObject.metaData.names[item] = item;
  //       }
  //
  //     } else {
  //       for (let item of analyticsObject.metaData[header.name]) {
  //         analyticsObject.metaData.names[item] = item;
  //       }
  //     }
  //   }
  // }

  return analyticsObject;
}

/**
 * Get an array of specified metadata
 * @param analyticsObject : Result from analytics call
 * @param metadataType : String ['ou','dx','co','pe',....]
 * @returns {Array}
 */
function getMetadataArray(analyticsObject, metadataType: string) {
  let metadataArray = [];
  if (metadataType === "dx") {
    metadataArray = analyticsObject.metaData.dx;
  } else if (metadataType === "ou") {
    metadataArray = analyticsObject.metaData.ou;
  } else if (metadataType === "co") {
    metadataArray = analyticsObject.metaData.co;
  } else if (metadataType === "pe") {
    metadataArray = analyticsObject.metaData.pe;
  } else {
    metadataArray = analyticsObject.metaData[metadataType];
  }
  console.log("metadataArray", metadataArray);
  return metadataArray;
}

/**
 * try to find data from the rows of analytics object
 * @param analyticsObject : Result from analytics call
 * @param dataItems : Array of data to check each array item is an object [{'type':'ou','value':'bN5q5k5DgLA'},{'type': 'dx', 'value': 'eLo4RXcQIi5'}....]
 * @returns {number}
 */
function getDataValue(analyticsObject, dataItems = []) {
  let num = null;
  for (let value of analyticsObject.rows) {
    let counter = 0;
    for (let item of dataItems) {
      if (
        value[getTitleIndex(analyticsObject.headers, item.type)] === item.value
      ) {
        counter++;
      }
    }
    if (counter === dataItems.length) {
      if (isNaN(value[getTitleIndex(analyticsObject.headers, "value")])) {
        num = value[getTitleIndex(analyticsObject.headers, "value")];
      } else {
        num += parseFloat(
          value[getTitleIndex(analyticsObject.headers, "value")]
        );
      }
    }
  }
  return num;
}

/**
 * try to find data from the rows of analytics object
 * @param legendClass : Result from analytics call
 * @param datavalue :
 * @returns {string}
 */
function getDataValueColor(legendClasses, value) {
  let color = "";
  if (!isNaN(value) && legendClasses) {
    legendClasses.forEach(legendClass => {
      if (legendClass.startValue <= value && legendClass.endValue > value) {
        color = legendClass.color;
      }

      // if (legendClass.startValue < value && legendClass.endValue >= value) {
      //   console.log(legendClass.color);
      // }
    });
  }
  return color;
}

function checkZeros(stating_length, array): boolean {
  let checker = true;
  for (let i = stating_length; i < array.length; i++) {
    if (array[i].name == "" && array[i].val != null) {
      checker = false;
    }
  }
  return checker;
}
