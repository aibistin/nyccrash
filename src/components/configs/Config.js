/* 
 *  Config 
 *  Config layouts for Charts.
 *  See: https://www.chartjs.org/ 
 *  and: https://vue-chartjs.org/
 * 
 */

/* Borough Radius Chart */
const boroughRadiusChartConfig = {
  datasetConfig: [
    {
      label: "People",
      data: [],
      fill: false,
      backgroundColor: "rgba(255, 255,0, 0.4)",
      borderColor: "rgb(255,255,0)",
      pointBackgroundColor: "rgb(255,255,0)",
      pointBorderColor: "rgb(169,169,169)",
      pointHoverBackgroundColor: "rgba(255,255,0,0.4)",
      pointHoverBorderColor: "rgb(255,255,0)",
      pointStyle: "cross"
    },
    {
      label: "Pedestrians",
      data: [],
      fill: "+2",
      backgroundColor: "rgba(255,0,0,0.2)",
      borderColor: "rgb(255,0,0)",
      pointBackgroundColor: "rgb(255,0,0)",
      pointBorderColor: "rgb(169,169,169)",
      pointHoverBackgroundColor: "rgba(255,0,0,0.2)",
      pointHoverBorderColor: "rgb(255,0,0)",
      pointStyle: "cross"
    },
    {
      label: "Cyclists",
      data: [],
      fill: "+2",
      backgroundColor: "rgba(0,255,0,0.4)",
      borderColor: "rgb(0,255,0)",
      //borderWidth: 1,
      pointBackgroundColor: "rgb(0,255,0)",
      pointBorderColor: "rgb(169,169,169)",
      pointHoverBackgroundColor: "rgba(0,255,0,0.4)",
      pointHoverBorderColor: "rgb(0,255,0)",
      pointStyle: "cross"
    },
    {
      label: "Motorists",
      data: [],
      fill: "+2",
      backgroundColor: "rgba(0,0,255,0.4)",
      borderColor: "rgb(0,0,255)",
      pointBackgroundColor: "rgb(0,0,255)",
      pointBorderColor: "rgb(169,169,169)",
      pointHoverBackgroundColor: "rgba(0,0,255,0.4)",
      pointHoverBorderColor: "rgb(0,0,255)",
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
        top: 5,
        bottom: 5,
        left: 5,
        right: 5
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
      backgroundColor: ["rgb(255,0,0)", "rgb(0,255,0)", "rgb(0,0,255)"]
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
