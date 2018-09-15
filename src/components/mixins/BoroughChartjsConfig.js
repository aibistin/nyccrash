/* 
 *  BoroughChartjsConfig Mixin 
 *  Config layout for BoroughStatsChart
 *  See: https://www.chartjs.org/ 
 *  and: https://vue-chartjs.org/
 * 
 *  RadiusChart
 */
/* Borough Radius Chart */
export const boroughRadiusChartConfig = {
  data: function() {
    return {
      /* By Borough */
      boroughChartDataConfig: {
        labels: [],
        datasets: [
          {
            label: "People Killed",
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
            label: "Pedestrians Killed",
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
            label: "Cyclists Killed",
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
            label: "Motorists Killed",
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
        ]
      },
      boroughChartOptions: {
        elements: {
          line: { tension: 0.1, borderWidth: 2 }
          //line: { stepped: true, borderWidth: 2 }
        },
        title: {
          display: true,
          text: "Fatalities By Borough",
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
  }
};
