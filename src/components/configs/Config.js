/* 
 *  Config 
 *  Config layouts for Charts.
 *  See: https://www.chartjs.org/ 
 *  and: https://vue-chartjs.org/
 * 
 */

const peopleColor = "rgb(255,255,0)";
const peopleBackColor = "rgba(255, 255,0, 0.2)";
const pedestrianColor = "rgb(255,0,0)";
const pedestrianBackColor = "rgba(255,0,0,0.2)";
const cyclistColor = "rgb(0,255,0)";
const cyclistBackColor = "rgba(0,255,0,0.2)";
const motoristColor = "rgb(0,0,255)";
const motoristBackColor = "rgba(0,0,255,0.2)";

/* Borough Radius Chart */
const boroughRadiusChartConfig = {
  datasetConfig: [
    {
      label: "People",
      data: [],
      fill: false,
      backgroundColor: peopleBackColor,
      borderColor: peopleColor,
      pointBackgroundColor: peopleColor,
      pointBorderColor: "rgb(169,169,169)",
      pointHoverBackgroundColor: peopleBackColor,
      pointHoverBorderColor: peopleColor,
      pointStyle: "cross"
    },
    {
      label: "Pedestrians",
      data: [],
      fill: "+2",
      backgroundColor: pedestrianBackColor,
      borderColor: pedestrianColor,
      pointBackgroundColor: pedestrianColor,
      pointBorderColor: "rgb(169,169,169)",
      pointHoverBackgroundColor: pedestrianBackColor,
      pointHoverBorderColor: pedestrianColor,
      pointStyle: "cross"
    },
    {
      label: "Cyclists",
      data: [],
      fill: "+2",
      backgroundColor: cyclistBackColor,
      borderColor: cyclistColor,
      //borderWidth: 1,
      pointBackgroundColor: cyclistColor,
      pointBorderColor: "rgb(169,169,169)",
      pointHoverBackgroundColor: cyclistBackColor,
      pointHoverBorderColor: cyclistColor,
      pointStyle: "cross"
    },
    {
      label: "Motorists",
      data: [],
      fill: "+2",
      backgroundColor: motoristBackColor,
      borderColor: motoristColor,
      pointBackgroundColor: motoristColor,
      pointBorderColor: "rgb(169,169,169)",
      pointHoverBackgroundColor: motoristBackColor,
      pointHoverBorderColor: motoristColor,
      pointStyle: "cross"
    }
  ],
  options: {
    elements: {
      line: { tension: 0.1, borderWidth: 2 }
      //line: { stepped: true, borderWidth: 2 }
    },
    title: {
      display: true,
      text: "Borough Fatalities",
      fontSize: 18,
      lineHeight: 1.8,
      fontColor: "#333"
    },
    layout: {
      padding: {
        top: 1,
        bottom: 1,
        left: 1,
        right: 1
      }
    },
    scale: {
      display: true
    }
  }
};

const categoryPieChartConfig = {
  datasetConfig: [
    {
      data: [],
      backgroundColor: [pedestrianColor, cyclistColor, motoristColor]
    }
  ],
  options: {
    elements: {
      line: { tension: 0.1, borderWidth: 2 }
    },
    title: {
      display: true,
      text: "Fatalities",
      fontSize: 18,
      lineHeight: 1.8,
      fontColor: "#333"
    },
    layout: {
      padding: {
        top: 5,
        bottom: 5,
        left: 5,
        right: 5
      }
    }
  }
};

export { boroughRadiusChartConfig, categoryPieChartConfig };
