/* 
 *  Mixin: Filters
 * 
 */
import format from "date-fns/format";

const Filters = {
  filters: {
    formatYYMMDD(inDateStr) {
      return inDateStr ? format(inDateStr, "YYYY/MM/DD") : "";
    },
    uCaseFirst(inStr) {
      return (
        inStr && inStr.charAt(0).toUpperCase() + inStr.slice(1).toLowerCase()
      );
    }
  }
};

export default Filters;
