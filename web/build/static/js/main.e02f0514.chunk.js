(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{29:function(e,t,a){e.exports=a(58)},34:function(e,t,a){},36:function(e,t,a){},58:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),i=a(17),r=a.n(i),o=a(2),s=a(3),u=a(5),c=a(4),m=a(6),d=(a(34),a(36),function(){function e(){Object(o.a)(this,e)}return Object(s.a)(e,null,[{key:"request",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return new Promise(function(a,n){var l="string"===typeof t.method?t.method:"GET",i="string"===typeof t.url?t.url:window.location.origin,r="object"===typeof t.headers&&t.headers?t.headers:{},o="object"===typeof t.query&&t.query?t.query:{},s="undefined"!==typeof t.data?t.data:null,u=new XMLHttpRequest;for(var c in u.onload=function(){return a(u)},u.onerror=function(e){return n(e)},o&&(i+=e.queryString(o)),u.open(l,i),r)u.setRequestHeader(c,r[c]);s?"string"!==typeof s?u.send(JSON.stringify(s)):u.send(s):u.send()})}},{key:"get",value:function(t,a,n){return e.request({method:"GET",url:t,headers:a,query:n})}},{key:"post",value:function(t,a,n){return e.request({method:"POST",url:t,headers:a,data:n})}},{key:"queryString",value:function(e){var t="?";for(var a in e)t+="".concat(a,"=").concat(e[a],"&");return t.substring(0,t.length-1)}}]),e}()),h=new(function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(u.a)(this,Object(c.a)(t).call(this))).data=null,e._currentDay=0,e}return Object(m.a)(t,e),Object(s.a)(t,[{key:"load",value:function(e){var t=this;return new Promise(function(a,n){var l=window.location.href.includes("localhost")?"http://localhost:8080/plague":"".concat(window.location.origin,"/plague");d.get(l,null,e).then(function(e){if(200===e.status){try{t.data=JSON.parse(e.response)}catch(l){n(l),t.emit(new Event("error"))}a(),t.emit(new Event("load")),t.emit(new Event("data"))}else n(new Error(e.response||"Bad request")),t.emit(new Event("error"))}).catch(function(e){n(e),t.emit(new Event("error"))})})}},{key:"downloadCSV",value:function(e){var t=window.location.href.includes("localhost")?"http://localhost:8080/plague/csv":"".concat(window.location.origin,"/plague/csv");return d.get(t,null,e)}},{key:"createCSVDownloadURL",value:function(e){var t=d.queryString(e);return window.location.href.includes("localhost")?"http://localhost:8080/plague/csv".concat(t):"".concat(window.location.origin,"/plague/csv").concat(t)}},{key:"autoRun",value:function(){this.currentDay=this.data.length-1}},{key:"nextDay",value:function(){this.currentDay<this.data.length&&this.currentDay++}},{key:"reset",value:function(){this.data=null,this.currentDay=0,this.emit(new Event("reset"))}},{key:"currentDay",set:function(e){this._currentDay=e,this.emit(new Event("update"))},get:function(){return this._currentDay}},{key:"hasData",get:function(){return null!==this.data}}]),t}(function(){function e(){Object(o.a)(this,e),this._listeners={}}return Object(s.a)(e,[{key:"emit",value:function(e){this.willTrigger(e.type)&&this._listeners[e.type].forEach(function(t){return t(e)})}},{key:"on",value:function(e,t){this.willTrigger(e)?this._listeners[e].push(t):this._listeners[e]=[t]}},{key:"off",value:function(e,t){if(this.willTrigger(e))for(var a=this._listeners[e],n=0;n<a.length;n++)if(a[n]===t)return a.splice(n,1),!0;return!1}},{key:"willTrigger",value:function(e){return e in this._listeners}}]),e}())),f=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(u.a)(this,Object(c.a)(t).call(this,e))).intialImmunityRef=l.a.createRef(),a.virilityRef=l.a.createRef(),a.fatalityRef=l.a.createRef(),a.initialInfectedRef=l.a.createRef(),a.intialPopRef=l.a.createRef(),a.infectionLengthRef=l.a.createRef(),a.daysRef=l.a.createRef(),a.state={pending:!1,message:null,lastBtn:null},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){h.on("load",this.onSimulatorLoad.bind(this)),h.on("error",this.onSimulatorError.bind(this))}},{key:"getInputsDictionary",value:function(){return{immune_percent:this.intialImmunityRef.current.value,virility:this.virilityRef.current.value,fatal_percent:this.fatalityRef.current.value,initial_infected:this.initialInfectedRef.current.value,initial_population:this.intialPopRef.current.value,infection_length:this.infectionLengthRef.current.value,simulation_length:this.daysRef.current.value}}},{key:"onSimulatorError",value:function(){this.setState({pending:!1})}},{key:"onSimulatorLoad",value:function(){this.setState({pending:!1})}},{key:"onReset",value:function(){h.reset()}},{key:"dayByDay",value:function(){var e=this;h.hasData?h.nextDay():(this.setState({pending:!0}),h.load(this.getInputsDictionary()).then(function(){e.setState({message:null}),h.nextDay()}).catch(function(t){return e.setState({message:t.message})}))}},{key:"autoRun",value:function(){var e=this;h.hasData?h.autoRun():(this.setState({pending:!0}),h.load(this.getInputsDictionary()).then(function(){e.setState({message:null}),h.autoRun()}).catch(function(t){return e.setState({message:t.message})}))}},{key:"downloadCSV",value:function(){if(!this.state.pending){var e=h.createCSVDownloadURL(this.getInputsDictionary()),t=document.createElement("a");t.setAttribute("href",e),t.setAttribute("target","_blank"),t.setAttribute("download","download"),t.click(),t=null}}},{key:"onSubmit",value:function(e){e.preventDefault(),"day-by-day"===this.state.lastBtn?this.dayByDay():"auto-run"===this.state.lastBtn?this.autoRun():"export-csv"===this.state.lastBtn&&this.downloadCSV()}},{key:"onFormClick",value:function(e){this.setState({lastBtn:e.target.getAttribute("btn")})}},{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement("h5",{className:"text-center"},"Experimental Variables"),l.a.createElement("form",{onSubmit:this.onSubmit.bind(this)},l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Length of Infection (Days)"),l.a.createElement("input",{ref:this.infectionLengthRef,className:"form-control",type:"number",min:"1",max:"365",placeholder:"How many days does the infection last?",required:!0})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Virility"),l.a.createElement("input",{ref:this.virilityRef,className:"form-control",type:"number",min:"0",max:"20",step:"0.01",placeholder:"How infectious (transmission rate)?",required:!0})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Fatality Percentage"),l.a.createElement("input",{ref:this.fatalityRef,className:"form-control",type:"number",min:"0",max:"1",step:"0.001",placeholder:"What % of people die when infected?",required:!0})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Initial Population"),l.a.createElement("input",{ref:this.intialPopRef,className:"form-control",type:"number",min:"1",max:"1000000",placeholder:"How many people in the initial population?",required:!0})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Initial Immunity Percentage"),l.a.createElement("input",{ref:this.intialImmunityRef,className:"form-control",type:"number",min:"0",max:"1",step:"0.01",placeholder:"What % of the intial population people is immune?",required:!0})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Initial Infected"),l.a.createElement("input",{ref:this.initialInfectedRef,className:"form-control",type:"number",min:"0",max:"1000000",placeholder:"How many infected people in the initial population?",required:!0})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Simulation Length (Days)"),l.a.createElement("input",{ref:this.daysRef,className:"form-control",type:"number",min:"1",max:"365",placeholder:"How many days is the simulation?",required:!0})),l.a.createElement("div",{className:"form-group text-center"},l.a.createElement("button",{onClick:this.onFormClick.bind(this),className:"input-btn",disabled:this.state.pending,btn:"day-by-day"},"Day-By-Day"),"\xa0",l.a.createElement("button",{onClick:this.onFormClick.bind(this),className:"input-btn",disabled:this.state.pending,btn:"auto-run"},"Auto Run"),"\xa0",l.a.createElement("button",{onClick:this.onReset.bind(this),className:"input-btn",disabled:this.state.pending,type:"button"},"Reset"),"\xa0",l.a.createElement("button",{onClick:this.onFormClick.bind(this),className:"input-btn",disabled:this.state.pending,btn:"export-csv"},"Export CSV"))),l.a.createElement("div",null,this.state.message))}}]),t}(l.a.Component),p=a(27),y=a.n(p),b=function(e){function t(){return Object(o.a)(this,t),Object(u.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"onClick",value:function(){}},{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement(y.a,{isOpen:this.props.showModal},l.a.createElement("span",{className:"close",onClick:this.props.closeModal},"\xd7"),l.a.createElement("h2",{className:"modalHeader"},"Report Bug or Request New Feature"),l.a.createElement("table",null,l.a.createElement("tr",null,l.a.createElement("td",{className:"bugReport"},l.a.createElement("h5",null,"Report Bug:"),l.a.createElement("textarea",{rows:"4",cols:"100"},"Report Bug Here"),l.a.createElement("br",null),l.a.createElement("button",{onClick:this.onClick.bind(this)},"Submit")),l.a.createElement("td",{className:"featureRequest"},l.a.createElement("h5",null,"Request Feature:"),l.a.createElement("textarea",{rows:"4",cols:"100"},"Request Feature Here"),l.a.createElement("br",null),l.a.createElement("button",{onClick:this.onClick.bind(this)},"Submit"))))))}}]),t}(l.a.Component),v=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(u.a)(this,Object(c.a)(t).call(this,e))).state={showModal:!1,closeModal:!1},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"closeModal",value:function(){this.setState({showModal:!1})}},{key:"openModal",value:function(){this.setState({showModal:!0})}},{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement("nav",{className:"navbar navbar-expand-lg navbar-light bg-light"},l.a.createElement("div",{className:"collapse navbar-collapse",id:"navbarSupportedContent"},l.a.createElement("ul",{className:"navbar-nav mr-auto"},l.a.createElement("li",{className:"nav-item active"},l.a.createElement("span",{className:"nav-link",onClick:this.openModal.bind(this)},"Report Bug ",l.a.createElement("span",{className:"sr-only"},"(current)")))))),l.a.createElement(b,{showModal:this.state.showModal,closeModal:this.closeModal.bind(this)}))}}]),t}(l.a.Component),E=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(u.a)(this,Object(c.a)(t).call(this,e))).state={data:null,day:0},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){h.on("data",this.onSimulatorData.bind(this)),h.on("reset",this.onSimulatorReset.bind(this)),h.on("update",this.onSimulatorUpdate.bind(this))}},{key:"onSimulatorData",value:function(){this.setState({data:h.data})}},{key:"onSimulatorReset",value:function(){this.setState({data:null,day:0})}},{key:"onSimulatorUpdate",value:function(){this.setState({day:h.currentDay})}},{key:"renderRows",value:function(){if(h.hasData){for(var e,t=new Array(h.currentDay+1),a=0;a<h.currentDay;a++){e=h.data[a];var n=Math.floor(e.susceptible),i=Math.floor(e.infected),r=Math.floor(e.immune),o=Math.floor(e.dead),s=Math.floor(e.total_population);t[a]=l.a.createElement("tr",{key:a},l.a.createElement("td",null,a),l.a.createElement("td",null,n),l.a.createElement("td",null,i),l.a.createElement("td",null,r),l.a.createElement("td",null,o),l.a.createElement("td",null,s))}return t}return null}},{key:"render",value:function(){return null!==this.state.data?l.a.createElement("div",null,l.a.createElement("table",{className:"table table-striped overflow-table"},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"Day"),l.a.createElement("th",null,"Susceptible"),l.a.createElement("th",null,"Infected"),l.a.createElement("th",null,"Immune"),l.a.createElement("th",null,"Dead"),l.a.createElement("th",null,"Total Population"))),l.a.createElement("tbody",null,this.renderRows()))):null}}]),t}(l.a.Component),g=a(28),w=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(u.a)(this,Object(c.a)(t).call(this,e))).state={data:null,day:0},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){h.on("data",this.onSimulatorData.bind(this)),h.on("reset",this.onSimulatorReset.bind(this)),h.on("update",this.onSimulatorUpdate.bind(this))}},{key:"onSimulatorData",value:function(){var e=h.data.map(function(e,t){return{x:t,y:e.dead}});this.setState({data:e})}},{key:"onSimulatorReset",value:function(){this.setState({data:null,day:0})}},{key:"onSimulatorUpdate",value:function(){this.setState({day:h.currentDay})}},{key:"getData",value:function(){return!this.state.data||this.state.day<1?null:{values:this.state.data.slice(0,this.state.day+1)}}},{key:"render",value:function(){return null!==this.state.data?l.a.createElement("div",null,l.a.createElement("h5",null),l.a.createElement("div",null,l.a.createElement(g.LineChart,{data:this.getData(),axes:!0,width:400,height:400,margin:{top:10,bottom:50,left:50,right:10},xAxis:{label:"Days"},yAxis:{label:"Dead"}}))):null}}]),t}(l.a.Component),k=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(u.a)(this,Object(c.a)(t).call(this,e))).state={rows:null},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement(v,null),l.a.createElement("br",null),l.a.createElement("main",{className:"container card card-body bg-light"},l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col-lg-6"},l.a.createElement(f,null),l.a.createElement(E,null)),l.a.createElement("div",{className:"col-lg-6"},l.a.createElement(w,{rows:this.state.rows})))))}}]),t}(l.a.Component);r.a.render(l.a.createElement(k,null),document.querySelector("#root"))}},[[29,2,1]]]);
//# sourceMappingURL=main.e02f0514.chunk.js.map