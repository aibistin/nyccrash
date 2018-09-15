<script>
import { Pie } from "vue-chartjs";

export default {
  extends: Pie,
  props: ["data", "options"],
  mounted() {
    console.log("Rendering pie chart with data, " + JSON.stringify(this.data));
    console.log(
      "Rendering pie chart with options, " + JSON.stringify(this.options)
    );
    this.renderChart(this.data, this.options);
  }
};
</script>