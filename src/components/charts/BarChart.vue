<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  props: ["data", "options"],
  mounted() {
   // console.log("Bar chart data, " + JSON.stringify(this.data));
    if (this.options) {
    //  console.log("Bar chart options, " + JSON.stringify(this.options));
    }
    this.renderChart(this.data, this.options);
  }
};
</script>