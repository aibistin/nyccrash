<script>
import { Radar } from "vue-chartjs";

export default {
  extends: Radar,
  props: ["data", "options"],
  mounted() {
    console.log( "Rendering radar chart with data, " + JSON.stringify(this.data));
    console.log( "Rendering radar chart with options, " + JSON.stringify(this.options));
    this.renderChart(this.data, this.options);
  }
};
</script>
