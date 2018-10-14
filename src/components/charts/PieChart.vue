<script>
import { Pie } from "vue-chartjs";

export default {
  extends: Pie,
  props: ["data", "options"],
  mounted() {
    /*
    console.log("Pie chart data, " + JSON.stringify(this.data));
    if (this.options) {
      console.log("Pie chart options, " + JSON.stringify(this.options));
    }
    */
    this.renderChart(this.data, this.options);
  }
};
</script>