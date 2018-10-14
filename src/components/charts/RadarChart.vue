<script>
import { Radar } from "vue-chartjs";

export default {
  extends: Radar,
  props: ["data", "options"],
  mounted() {
    //console.log("Radar chart data, " + JSON.stringify(this.data));
    //console.log("Radar chart options, " + JSON.stringify(this.options));
    this.renderChart(this.data, this.options);
  }
};
</script>
