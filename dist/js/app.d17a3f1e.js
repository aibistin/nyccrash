(function(t){function e(e){for(var o,s,i=e[0],l=e[1],c=e[2],d=0,f=[];d<i.length;d++)s=i[d],r[s]&&f.push(r[s][0]),r[s]=0;for(o in l)Object.prototype.hasOwnProperty.call(l,o)&&(t[o]=l[o]);u&&u(e);while(f.length)f.shift()();return n.push.apply(n,c||[]),a()}function a(){for(var t,e=0;e<n.length;e++){for(var a=n[e],o=!0,i=1;i<a.length;i++){var l=a[i];0!==r[l]&&(o=!1)}o&&(n.splice(e--,1),t=s(s.s=a[0]))}return t}var o={},r={app:0},n=[];function s(e){if(o[e])return o[e].exports;var a=o[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=t,s.c=o,s.d=function(t,e,a){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)s.d(a,o,function(e){return t[e]}.bind(null,o));return a},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=e,i=i.slice();for(var c=0;c<i.length;c++)e(i[c]);var u=l;n.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"10ae":function(t,e,a){},"14df":function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("main-layout",[a("h1",[t._v(t._s(t.msg))]),t.fatalitySummary?[a("div",{staticClass:"grid-container"},[t.fatalitySummary?[a("div",{staticClass:"item item--header notification is-light"},[a("h3",{staticClass:"subtitle is-3"},[t._v("Collision Fatalities From "+t._s(t._f("formatYYMMDD")(t.timeRange.startingAt))+" to "+t._s(t._f("formatYYMMDD")(t.timeRange.endingAt)))])])]:t._e(),a("div",{staticClass:"item item--1-1"},[a("ul",{},t._l(t.Categories.categories,function(e){return a("li",{},[t._v("Total "+t._s(t._f("uCaseFirst")(e.name))+" killed, "+t._s(e.total))])}))]),a("div",{staticClass:"item item--1-2"},[a("pie-chart",{attrs:{data:t.fatalityTotalsBorough.chartData,options:t.fatalityTotalsBorough.chartOptions}})],1),t.fatalitySummaryYearly?[a("div",{staticClass:"item item--2"},[a("bar-chart",{attrs:{data:t.fatalityYearly.chartData,options:t.fatalityYearly.chartOptions,height:600,width:800}})],1)]:t._e(),a("div",{staticClass:"item item--3"},[a("radar-chart",{attrs:{data:t.fatalitySummaryBorough.chartData,options:t.fatalitySummaryBorough.chartOptions,height:700,width:700}})],1),a("div",{staticClass:"item item--4"},[a("radar-chart",{attrs:{data:t.maxFatalityByCollision.chartData,options:t.maxFatalityByCollision.chartOptions,height:700,width:700}})],1)],2)]:t._e()],2)},r=[],n=(a("cadf"),a("551c"),a("097d"),a("bc3a")),s=a.n(n),i=a("70f2"),l=a.n(i),c=a("8e31"),u={boroughs:[{name:"BRONX",label:"Bronx",total:0,avg:0,maxOneTime:0},{name:"BROOKLYN",label:"Brooklyn",total:0,avg:0,maxOneTime:0},{name:"MANHATTAN",label:"Manhattan",total:0,avg:0,maxOneTime:0},{name:"QUEENS",label:"Queens",total:0,avg:0,maxOneTime:0},{name:"STATEN ISLAND",label:"Staten Island",total:0,avg:0,maxOneTime:0},{name:"UNKNOWN",label:"Unknown Borough",total:0,avg:0,maxOneTime:0}],clone:function(){return JSON.parse(JSON.stringify(this.boroughs))}},d=u,f=(a("7f7f"),a("7514"),a("c665")),h=a("aa9a"),m=["persons","pedestrians","cyclists","motorists"],b=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:m;Object(f["a"])(this,t),this.names=e,this.categories=this._toCategories()}return Object(h["a"])(t,[{key:"clone",value:function(){return JSON.parse(JSON.stringify(this.categories))}},{key:"getCat",value:function(t){return this.categories.find(function(e){return e.name===t})}},{key:"getTotals",value:function(){return this.categories.map(function(t){return t.total})}},{key:"getLabels",value:function(t){return t?t.map(function(t){return t.label}):this.categories.map(function(t){return t.label})}},{key:"toLabel",value:function(t){if(t)return t.charAt(0).toUpperCase()+t.slice(1).toLowerCase()}},{key:"_toCategories",value:function(){var t=this;return this.names.map(function(e){return{name:e,label:t.toLabel(e),total:0,avg:0,maxOneTime:0}})}}]),t}(),p=b,g=(a("c5f6"),a("ac6a"),a("dc0a")),y=a("d328"),j=a("11d9"),v=a("6bde"),C=function(){function t(e,a,o,r){Object(f["a"])(this,t),this.Categories=e,this.datasets=a,this.options=o,this.labels=r}return Object(h["a"])(t,[{key:"labels",value:function(t){return t?this.labels=t:this.labels}},{key:"chartData",value:function(){return{labels:this.labels,datasets:this.datasets}}},{key:"chartOptions",value:function(){return this.options}},{key:"title",value:function(t){return t?"object"===Object(v["a"])(t)?this.options.title=t:this.options.title.text=t:this.options.newTitle}},{key:"titleText",value:function(t){return t?this.title(t):this.options.title.txt}},{key:"layout",value:function(t){return t?this.options.layout=t:this.options.layout}},{key:"cloneObj",value:function(t){return JSON.parse(JSON.stringify(t))}}]),t}(),_=C,k={fontColor:"#333",persons:{color:"rgb(255,255,0)",colorBackground:"rgba(255, 255,0, 0.2)"},pedestrians:{color:"rgb(255,0,0)",colorBackground:"rgba(255,0,0,0.2)"},cyclists:{color:"rgb(0,255,0)",colorBackground:"rgba(0,255,0,0.2)"},motorists:{color:"rgb(0,0,255)",colorBackground:"rgba(0,0,255,0.2)"},pointBorderColor:"rgb(169,169,169)"},O=[{name:"persons",label:"People",data:[],backgroundColor:[],borderColor:[],borderWidth:1},{name:"pedestrians",label:"Pedestrians",stack:"people",data:[],backgroundColor:[],borderColor:[],borderWidth:1},{name:"cyclists",label:"Cyclists",stack:"people",data:[],backgroundColor:[],borderColor:[],borderWidth:1},{label:"Motorists",name:"motorists",stack:"people",data:[],backgroundColor:[],borderColor:[],borderWidth:1}],S={title:{display:!0,text:"",fontSize:18,lineHeight:1.8,fontColor:k.fontColor},layout:{padding:{top:1,bottom:1,left:1,right:1}},scales:{xAxes:[{stacked:!0,ticks:{beginAtZero:!0}}],yAxes:[{stacked:!0,ticks:{beginAtZero:!0}}]}},B=function(t){function e(t,a){var o,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:O.map(function(t){return JSON.parse(JSON.stringify(t))}),n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:JSON.parse(JSON.stringify(S)),s=arguments.length>4&&void 0!==arguments[4]?arguments[4]:[];return Object(f["a"])(this,e),o=Object(y["a"])(this,Object(j["a"])(e).call(this,t,r,n,s)),o.yearlyTotals=[],o.boroughs=a,o}return Object(h["a"])(e,[{key:"setYearlyTotals",value:function(t){var e=this,a=null,o={};t.map(function(t){a&&t.year===a||(a&&e.yearlyTotals.push(e.cloneObj(o)),a=t.year,e.Categories.names.forEach(function(t){return o[t]=0})),e.Categories.names.forEach(function(e){o[e]+=Number(t["tot_"+e+"_killed"])})}),a&&this.yearlyTotals.push(this.cloneObj(o)),this.yearlyTotals.forEach(function(t){e.datasets.forEach(function(e){e.data.push(t[e.name]),e.backgroundColor.push(k[e.name].colorBackground),e.borderColor.push(k[e.name].color)})})}}]),Object(g["a"])(e,t),e}(_);var x={datasets:[{data:[],backgroundColor:[]}],options:{elements:{line:{tension:.1,borderWidth:2}},title:{display:!0,text:"",fontSize:18,lineHeight:1.8,fontColor:"#333"},layout:{padding:{top:5,bottom:5,left:5,right:5}}}},N=function(t){function e(t){var a,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:JSON.parse(JSON.stringify(x.datasets)),r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:JSON.parse(JSON.stringify(x.options)),n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[];return Object(f["a"])(this,e),a=Object(y["a"])(this,Object(j["a"])(e).call(this,t,o,r,n)),a._setChartColors(),a.labels=n.length?n:a.setLabels(),a}return Object(h["a"])(e,[{key:"setCategoryTotals",value:function(){this.datasets[0].data=this.Categories.getTotals().slice(1)}},{key:"setLabels",value:function(){return this.labels=this.Categories.getLabels().slice(1)}},{key:"_setChartColors",value:function(){var t=this;this.Categories.names.slice(1).forEach(function(e){t.datasets[0].backgroundColor.push(k[e].color)})}}]),Object(g["a"])(e,t),e}(_),w=[{name:"persons",label:"People",data:[],fill:!1,backgroundColor:k.persons.colorBackground,borderColor:k.persons.color,pointBackgroundColor:k.persons.color,pointBorderColor:k.pointBorderColor,pointHoverBackgroundColor:k.persons.colorBackground,pointHoverBorderColor:k.persons.color,pointStyle:"circle"},{name:"pedestrians",label:"Pedestrians",data:[],fill:"origin",backgroundColor:k.pedestrians.colorBackground,borderColor:k.pedestrians.color,pointBackgroundColor:k.pedestrians.colorBackground,pointBorderColor:k.pointBorderColor,pointHoverBackgroundColor:k.pedestrians.colorBackground,pointHoverBorderColor:k.pedestrians.color,pointStyle:"circle"},{name:"cyclists",label:"Cyclists",data:[],fill:"origin",backgroundColor:k.cyclists.colorBackground,borderColor:k.cyclists.color,borderWidth:2,pointBackgroundColor:k.cyclists.color,pointBorderColor:k.pointBorderColor,pointHoverBackgroundColor:k.cyclists.colorBackground,pointHoverBorderColor:k.cyclists.color,pointStyle:"circle"},{label:"Motorists",name:"motorists",data:[],fill:"origin",backgroundColor:k.motorists.colorBackground,borderColor:k.motorists.colorBackground,pointBackgroundColor:k.motorists.color,pointBorderColor:k.pointBorderColor,pointHoverBackgroundColor:k.motorists.colorBackground,pointHoverBorderColor:k.motorists.color,pointStyle:"circle"}],T={responsive:!1,maintainAspectRatio:!1,elements:{line:{tension:.1,borderWidth:1}},title:{display:!0,text:"",fontSize:18,lineHeight:1.8,fontColor:k.fontColor},layout:{padding:{top:4,bottom:1,left:1,right:1}},scale:{display:!0}},M=function(t){function e(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:w.map(function(t){return JSON.parse(JSON.stringify(t))}),o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:JSON.parse(JSON.stringify(T)),r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[];return Object(f["a"])(this,e),Object(y["a"])(this,Object(j["a"])(e).call(this,t,a,o,r))}return Object(h["a"])(e,[{key:"setBoroughTotals",value:function(t){var e=this;t.forEach(function(t){e.datasets.forEach(function(a){var o=t["tot_"+a.name+"_killed"];a.data.push(o);var r=e.Categories.getCat(a.name);if(!r)throw"Error: No cateory with name ".concat(a.name);r.total+=Number(o)})})}},{key:"setCollisionMax",value:function(t){var e=this;t.forEach(function(t){e.datasets.forEach(function(a){var o=t["max_"+a.name+"_killed_in_single_accident"],r=e.Categories.getCat(a.name);a.data.push(o),r.maxOneTime=Number(o)>r.maxOneTime?Number(o):r.maxOneTime})})}}]),Object(g["a"])(e,t),e}(_),Y=a("3fdc"),D=a("748a"),A=a("93f3"),E={methods:{getCollisionFatalitySummary:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{groupByBorough:!0},a="https://data.cityofnewyork.us/resource/",o="/qiz3-axqb.json?$select="+this.getSocSQL(e);s()({method:"get",baseURL:a,url:o}).then(function(a){console.log("Summary ct from NYC : "+a.data.length),e.groupByBorough?(localStorage.fatalitySummary=JSON.stringify(a.data),t.fatalitySummary=a.data):(localStorage.fatalitySummaryYearly=JSON.stringify(a.data),t.fatalitySummaryYearly=a.data)}).catch(function(t){console.log("Got an error!"),t.response?(console.log("Error Data"+JSON.stringify(t.response.data,null,2)),console.log("Error status",t.response.status),console.log("Error headers"+JSON.stringify(t.response.headers,null,2))):t.request?console.log("Error req: ",JSON.stringify(t.request,null,2)):console.log("Error in your response logic: ",t)})},getSocSQL:function(t){var e="",a="",o="";return t.groupByBorough?(console.count("Group by borough"),a="&$group=borough",o="&$order=borough"):(console.count("Group by year"),e="date_extract_y(date) AS year,",a="&$group=borough,year",o="&$order=year,borough"),"MIN(date) AS starting_at,MAX(date) AS ending_at,\n                    ".concat(e,'\n                    coalesce(borough,"Unknown Borough") AS borough,\n                    SUM(number_of_persons_killed) as tot_persons_killed,\n                    SUM(number_of_pedestrians_killed) as tot_pedestrians_killed,\n                    SUM(number_of_cyclist_killed) as tot_cyclists_killed,\n                    SUM(number_of_motorist_killed) as tot_motorists_killed,\n                    MAX(number_of_persons_killed) as max_persons_killed_in_single_accident,\n                    MAX(number_of_pedestrians_killed) as max_pedestrians_killed_in_single_accident,\n                    MAX(number_of_cyclist_killed) as max_cyclists_killed_in_single_accident,\n                    MAX(number_of_motorist_killed) as max_motorists_killed_in_single_accident\n                    ').concat(a,"\n                    ").concat(o,"\n                    &$$app_token=").concat("UVwtDmFxvFl0hxOApBSrvuz3j","\n                    ")}}},z=E,J={name:"Collision",props:{msg:String},mixins:[z],data:function(){return{fatalitySummary:null,fatalitySummaryYearly:null,Categories:new p,boroughs:d.clone()}},mounted:function(){localStorage.fatalitySummary?this.fatalitySummary=JSON.parse(localStorage.fatalitySummary):this.getCollisionFatalitySummary(),localStorage.fatalitySummaryYearly?this.fatalitySummaryYearly=JSON.parse(localStorage.fatalitySummaryYearly):this.getCollisionFatalitySummary({groupByYear:!0})},components:{BarChart:Y["default"],MainLayout:c["a"],PieChart:D["default"],RadarChart:A["default"]},methods:{},computed:{timeRange:function(){return{startingAt:this.fatalitySummary[0].starting_at,endingAt:this.fatalitySummary[0].ending_at}},titleDateStr:function(){return"from ".concat(l()(this.timeRange.startingAt,"YYYY/MM/DD")," To ").concat(l()(this.timeRange.endingAt,"YYYY/MM/DD"))},fatalityTotalsBorough:function(){var t=new N(this.Categories);return t.setCategoryTotals(this.fatalitySummary),t.title("Total Collision Fatalities "+this.titleDateStr),console.count("FatilityTotal Pie chart called!"),{chartData:t.chartData(),chartOptions:t.chartOptions()}},fatalitySummaryBorough:function(){var t=new M(this.Categories);return t.labels=this.fatalitySummary.map(function(t){return t.borough}),t.setBoroughTotals(this.fatalitySummary),t.title("Fatalities by Borough "+this.titleDateStr),{chartData:t.chartData(),chartOptions:t.chartOptions()}},maxFatalityByCollision:function(){var t=new M(this.Categories);return t.labels=this.fatalitySummary.map(function(t){return t.borough}),t.setCollisionMax(this.fatalitySummary),t.title("Max Single Collision Fatalities "+this.titleDateStr),{chartData:t.chartData(),chartOptions:t.chartOptions()}},fatalityYearly:function(){var t=new B(this.Categories,this.boroughs);return t.labels=this.fatalitySummaryYearly.reduce(function(t,e){return t.length&&e.year===t[t.length-1]||t.push(e.year),t},[]),t.setYearlyTotals(this.fatalitySummaryYearly),t.title("Yearly fatalities "+this.titleDateStr),{chartData:t.chartData(),chartOptions:t.chartOptions()}}},filters:{formatYYMMDD:function(t){return t?l()(t,"YYYY/MM/DD"):""},uCaseFirst:function(t){return t&&t.charAt(0).toUpperCase()+t.slice(1).toLowerCase()}}};var L=J,F=(a("a1a4"),a("2877")),H=Object(F["a"])(L,o,r,!1,null,"6d0bcf7e",null);H.options.__file="Collision.vue";e["default"]=H.exports},"280e":function(t,e,a){"use strict";var o=a("516f"),r=a.n(o);r.a},"361d":function(t,e,a){"use strict";var o=a("10ae"),r=a.n(o);r.a},"3d7c":function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("a",{class:{active:t.isActive},attrs:{href:t.href},on:{click:t.go}},[t._t("default")],2)},r=[],n=(a("cadf"),a("551c"),a("097d"),a("5665")),s={name:"Vlink",props:{href:{type:String,required:!0}},computed:{isActive:function(){return this.href==this.$root.currentRoute}},methods:{go:function(t){t.preventDefault(),this.$root.currentRoute=this.href,window.history.pushState(null,n["a"][this.href],this.href)}}},i=s,l=(a("dabf"),a("2877")),c=Object(l["a"])(i,o,r,!1,null,"ad0b7cb6",null);c.options.__file="VLink.vue";e["default"]=c.exports},"3fdc":function(t,e,a){"use strict";a.r(e);a("cadf"),a("551c"),a("097d");var o,r,n=a("1fca"),s={extends:n["a"],props:["data","options"],mounted:function(){this.options,this.renderChart(this.data,this.options)}},i=s,l=a("2877"),c=Object(l["a"])(i,o,r,!1,null,null,null);c.options.__file="BarChart.vue";e["default"]=c.exports},4678:function(t,e,a){var o={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-nz":"6f50","./en-nz.js":"6f50","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-tw":"90ea","./zh-tw.js":"90ea"};function r(t){var e=n(t);return a(e)}function n(t){var e=o[t];if(!(e+1)){var a=new Error("Cannot find module '"+t+"'");throw a.code="MODULE_NOT_FOUND",a}return e}r.keys=function(){return Object.keys(o)},r.resolve=n,t.exports=r,r.id="4678"},"4ceb":function(t,e,a){},"516f":function(t,e,a){},5665:function(t,e,a){"use strict";e["a"]={"/":"Home","/stats":"Collision"}},"56d7":function(t,e,a){"use strict";a.r(e);a("cadf"),a("551c"),a("097d");var o=a("2b0e"),r=(a("6597"),a("5665")),n=a("14df"),s=a("57da");o["a"].config.productionTip=!1;var i=new o["a"]({el:"#app",data:{currentRoute:window.location.pathname},components:{Collision:n["default"],Home:s["default"]},computed:{VueComponent:function(){console.log("Current route: "+this.currentRoute);var t=r["a"][this.currentRoute];return t?(console.log("Component: "+t),a("bff8")("./"+t+".vue"),t):"Not Found"}},render:function(t){return t(this.VueComponent)}});window.addEventListener("popstate",function(){i.currentRoute=window.location.pathname})},"57da":function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("main-layout",[a("h3",[t._v("NYC Collisions Home")])])},r=[],n=(a("cadf"),a("551c"),a("097d"),a("8e31")),s={name:"Home",components:{MainLayout:n["a"]}},i=s,l=(a("280e"),a("2877")),c=Object(l["a"])(i,o,r,!1,null,"61ce92c3",null);c.options.__file="Home.vue";e["default"]=c.exports},"748a":function(t,e,a){"use strict";a.r(e);a("cadf"),a("551c"),a("097d");var o,r,n=a("1fca"),s={extends:n["b"],props:["data","options"],mounted:function(){this.renderChart(this.data,this.options)}},i=s,l=a("2877"),c=Object(l["a"])(i,o,r,!1,null,null,null);c.options.__file="PieChart.vue";e["default"]=c.exports},7746:function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("main-layout",[a("p",[t._v("Page not found")])])},r=[],n=(a("cadf"),a("551c"),a("097d"),a("8e31")),s={name:"404",components:{MainLayout:n["a"]}},i=s,l=a("2877"),c=Object(l["a"])(i,o,r,!1,null,null,null);c.options.__file="404.vue";e["default"]=c.exports},"877b":function(t,e,a){},"8e31":function(t,e,a){"use strict";var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container has-background-white-bis"},[a("section",{staticClass:"hero is-light is-small is-bold"},[a("div",{staticClass:"hero-body"},[a("h1",{staticClass:"title"},[t._v("New York City Collisions")]),a("div",{staticClass:"field is-grouped"},[a("p",{staticClass:"control"},[a("v-link",{staticClass:"button",attrs:{href:"/"}},[t._v("Home")])],1),a("p",{staticClass:"control"},[a("v-link",{staticClass:"button",attrs:{href:"/stats"}},[t._v("NYC Traffic Fatalities Summary")])],1)])])]),t._t("default")],2)},r=[],n=a("3d7c"),s={name:"MainLayout",components:{VLink:n["default"]}},i=s,l=(a("361d"),a("2877")),c=Object(l["a"])(i,o,r,!1,null,null,null);c.options.__file="Main.vue";e["a"]=c.exports},"93f3":function(t,e,a){"use strict";a.r(e);a("cadf"),a("551c"),a("097d");var o,r,n=a("1fca"),s={extends:n["c"],props:["data","options"],mounted:function(){this.renderChart(this.data,this.options)}},i=s,l=a("2877"),c=Object(l["a"])(i,o,r,!1,null,null,null);c.options.__file="RadarChart.vue";e["default"]=c.exports},a1a4:function(t,e,a){"use strict";var o=a("877b"),r=a.n(o);r.a},bff8:function(t,e,a){var o={"./404.vue":"7746","./BarChart.vue":"3fdc","./Collision.vue":"14df","./Home.vue":"57da","./PieChart.vue":"748a","./RadarChart.vue":"93f3","./VLink.vue":"3d7c"};function r(t){var e=n(t);return a(e)}function n(t){var e=o[t];if(!(e+1)){var a=new Error("Cannot find module '"+t+"'");throw a.code="MODULE_NOT_FOUND",a}return e}r.keys=function(){return Object.keys(o)},r.resolve=n,t.exports=r,r.id="bff8"},dabf:function(t,e,a){"use strict";var o=a("4ceb"),r=a.n(o);r.a}});
//# sourceMappingURL=app.d17a3f1e.js.map