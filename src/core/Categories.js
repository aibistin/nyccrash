/* 
 *  Categories
 *  Keep track of data based on "Categories" for NycCrach Data
 * 
 */

const Categories = {
  categories: [
  {
    name: "persons",
    total: 0,
    avg: 0,
    maxOneTime: 0
  },
  {
    name: "pedestrians",
    total: 0,
    avg: 0,
    maxOneTime: 0
  },
  {
    name: "cyclists",
    total: 0,
    avg: 0,
    maxOneTime: 0
  },
  {
    name: "motorists",
    total: 0,
    avg: 0,
    maxOneTime: 0
  }
],
  clone() {
    return JSON.parse(JSON.stringify(this.categories));
  }
}
;

export default Categories;
