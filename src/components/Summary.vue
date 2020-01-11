<template>
  <div>
    <main-layout>
      <div class="grid-container">
        <template v-if="isFatalitySummary">
            <div class="heading notification is-light">
              <h3 class="subtitle is-3">Collision Fatalities From {{ timeRange.startingAt | formatYYMMDD }} to {{ timeRange.endingAt | formatYYMMDD }}</h3>
            </div>

            <div class="row_chart row_chart--1">
              <div class="chart_display">
                   <ul>
                       <li v-for="cat in Categories.categories" class="" >Total {{cat.name | uCaseFirst}} killed, {{ cat.total }}</li>
                   </ul> 
                   <BoroughTotals
                     :Categories=Categories
                     :fatalitySummary=fatalitySummary
                     :titleDateStr=titleDateStr
                   /> 
              </div>
            </div>

            <div class="row_chart row_chart--2">
                 <YearlySummary
                   :Categories=Categories
                   :fatalitySummaryYearly=fatalitySummaryYearly
                   :titleDateStr=titleDateStr
                 /> 
            </div>

            <div class="row_chart row_chart--3">
                 <BoroughSummary
                   :Categories=Categories
                   :fatalitySummary=fatalitySummary
                   :titleDateStr=titleDateStr
                 /> 
            </div>

            <div class="row_chart row_chart--4">
                 <BoroCollisionMax
                   :fatalitySummary=fatalitySummary
                   :Categories=Categories
                   :titleDateStr=titleDateStr
                 />
            </div>

        </template>
      </div>
    </main-layout>
  </div>
</template>

<script>
import format from "date-fns/format";
/* Local Imports */
import MainLayout from "../layouts/Main.vue";
import Categories from "../core/Categories";
import FatalitySummary from "../mixins/FatalitySummary";
import Filters from "../mixins/Filters";
import BoroughTotals from "./BoroughTotals.vue";
import BoroughSummary from "./BoroughSummary.vue";
import BoroCollisionMax from "./BoroCollisionMax.vue";
import YearlySummary from "./YearlySummary.vue";

export default {
  name: "Summary",
  props: {
    msg: String
  },
  data: function() {
    return {
      Categories: new Categories(),
      fatalitySummary: [],
      fatalitySummaryYearly: []
    };
  },
  mixins: [FatalitySummary, Filters],
  components: {
    MainLayout,
    BoroughTotals,
    BoroughSummary,
    BoroCollisionMax,
    Categories,
    YearlySummary
  },
  beforeMount() {
    if (localStorage.fatalitySummary) {
      this.fatalitySummary = JSON.parse(localStorage.fatalitySummary);
    } else {
      this.getCollisionFatalitySummary();
    }
    if (localStorage.fatalitySummaryYearly) {
      this.fatalitySummaryYearly = JSON.parse(
        localStorage.fatalitySummaryYearly
      );
    } else {
      this.getCollisionFatalitySummary({ groupByYear: true });
    }
  },
  computed: {
    isFatalitySummary() {
      if (this.fatalitySummary.length) {
        console.count("Updating totals");
        this.setBoroughTotals();
        this.setCollisionMax();
      }
      return this.fatalitySummary.length;
    },
    /* Date range */
    timeRange() {
      return {
        startingAt: this.startDate,
        endingAt: this.endDate
      };
    },
    titleDateStr() {
      return `from ${format(
        this.timeRange.startingAt,
        "YYYY/MM/DD"
      )} To ${format(this.timeRange.endingAt, "YYYY/MM/DD")}`;
    },
    startDate() {
      return this.isFatalitySummary
        ? this.fatalitySummary[0].starting_at
        : null;
    },
    endDate() {
      return this.isFatalitySummary ? this.fatalitySummary[0].ending_at : null;
    }
  }
};
</script>

<style scoped lang="scss">
.grid-container {
  display: grid;
  grid-column-gap: 1 rem;
  grid-row-gap: 2rem;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: minmax(5rem, min-content) auto;

  margin: 2rem;
  padding: 2rem;
}

.heading {
  grid-column: 1/4;
  grid-row: 1/2;
}

.row_chart {
  margin: 2rem;
  padding: 4rem;
}
.row_chart--1 {
  grid-column: 1/4;
  grid-row: 2/3;
}

.row_chart--2 {
  grid-column: 1/4;
  grid-row: 3/4;
}

.row_chart--3 {
  grid-column: 1/4;
  grid-row: 4/5;
}

.row_chart--4 {
  grid-column: 1/4;
  grid-row: 5/6;
}

.chart_display {
  align-items: center;
  justify-items: center;
  display: grid;
  grid-template-columns: 20rem 1fr;
  grid-template-rows: 1fr;
}
</style>
