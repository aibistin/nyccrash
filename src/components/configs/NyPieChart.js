/* 
 *  NyPieChart
 *  Config layouts for NY Collision Data Pie Charts.
 *  See: https://www.chartjs.org/ 
 *  and: https://vue-chartjs.org/
 * 
 */
import { nyColor } from "./Variables";

const defaultPieChartConfig = {
  datasetConfig: [
    {
      data: [],
      backgroundColor: [
        nyColor.pedestrianColor,
        nyColor.cyclistColor,
        nyColor.motoristColor
      ]
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

class NyPieChart {
  constructor(
    dataset = defaultPieChartConfig.dataset,
    options = defaultPieChartConfig.options
  ) {
    this.dataset = JSON.parse(JSON.stringify(dataset));
    this.options = JSON.parse(JSON.stringify(options));
    /*
    this.categories = this.datasets.map(ds => {
      return {
        name: ds.name,
        total: 0,
        maxOneTime: 0
      };
    });
    */
  }

  /* Label Methods */
  labels(newLabels) {
    return newLabels ? (this.labels = newLabels) : this.labels;
  }

  /* Dataset Methods */
  setData(name = null, newData = []) {
    if (!name) {
      this.datasets.forEach(ds => (ds.data = newData));
    } else {
      let thisDs = this.datasets.find(ds => ds.name === name);
      if (thisDs) {
        thisDs.data = newData;
      } else {
        throw `Error: No dataset with name ${name}`;
      }
    }
  }

  setBoroughTotals(newBoroughData) {
    newBoroughData.forEach(rec => {
      this.datasets.forEach(ds => {
        let catBoroughTot = rec["tot_" + ds.name + "_killed"];
        ds.data.push(catBoroughTot);
        const thisCat = this.categories.find(cat => cat.name === ds.name);
        if (thisCat) {
          thisCat.total += Number(catBoroughTot);
        } else {
          throw `Error: No cateory with name ${ds.name}`;
        }
      });
    });
  }

  setCollisionMax(newBoroughData) {
    newBoroughData.forEach(rec => {
      this.datasets.forEach(ds => {
        // "max_persons_killed_in_single_accident": "5",
        let catBoroughMax =
          rec["max_" + ds.name + "_killed_in_single_accident"];
        const thisCat = this.categories.find(cat => cat.name === ds.name);
        console.count(
          `thisCat: ${thisCat.name} maxOnetime: ${thisCat.maxOneTime}`
        );

        ds.data.push(catBoroughMax);

        /* Also get the Grand Max for each Category */
        thisCat.maxOneTime =
          Number(catBoroughMax) > thisCat.maxOneTime
            ? Number(catBoroughMax)
            : thisCat.maxOneTime;
      });
    });
  }

  chartData() {
    return {
      labels: this.labels,
      datasets: this.datasets
    };
  }

  /* Options Methods */
  title(newTitle) {
    if (!newTitle) return this.options.newTitle;
    if (typeof newTitle === "object") {
      return (this.options.title = newTitle);
    } else {
      /* Hack to get around normal assumption that "title" is a string */
      return (this.options.title.text = newTitle);
    }
  }

  titleText(newText) {
    return newText ? this.title(newText) : this.options.title.txt;
  }

  layout(newLayout) {
    return newLayout ? (this.options.layout = newLayout) : this.options.layout;
  }
}

export { NyPieChart };
