<template>
  <div>
    <main-layout>
      <div class="grid-container">
        <template v-if="isFatalitySummary">
            <div class="item item--header notification is-light">
              <h3 class="subtitle is-3">Collision Fatalities From {{ timeRange.startingAt | formatYYMMDD }} to {{ timeRange.endingAt | formatYYMMDD }}</h3>
            </div>
            <BoroughTotals
              :Categories=Categories
              :fatalitySummary=fatalitySummary
              :titleDateStr=titleDateStr
            /> 

            <YearlySummary
              :Categories=Categories
              :fatalitySummaryYearly=fatalitySummaryYearly
              :titleDateStr=titleDateStr
            /> 

            <BoroughSummary
              :Categories=Categories
              :fatalitySummary=fatalitySummary
              :titleDateStr=titleDateStr
            /> 

            <BoroCollisionMax
              :fatalitySummary=fatalitySummary
              :Categories=Categories
              :titleDateStr=titleDateStr
            />
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
</style>
