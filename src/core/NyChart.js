/* 
 *  NyChart
 *  Base Config layout for NY Collision Data Charts.
 *  See: https://www.chartjs.org/ 
 *  and: https://vue-chartjs.org/
 * 
 */

class NyChart {
  constructor(Categories, datasets, options, labels) {
    this.Categories = Categories;
    this.datasets = datasets;
    this.options = options;
    this.labels = labels;
  }

  /* Label Methods */
  labels(newLabels) {
    return newLabels ? (this.labels = newLabels) : this.labels;
  }

  chartData() {
    return {
      labels: this.labels,
      datasets: this.datasets
    };
  }

  chartOptions() {
    return this.options;
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

  // For simple objects only
  cloneObj(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
}

export default NyChart;
