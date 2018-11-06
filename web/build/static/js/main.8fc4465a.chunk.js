(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{29:function(e,t,a){e.exports=a(60)},34:function(e,t,a){},36:function(e,t,a){},38:function(e,t,a){},60:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(17),l=a.n(i),s=a(1),o=a(2),c=a(5),u=a(4),h=a(6),m=(a(34),a(36),function(){function e(){Object(s.a)(this,e)}return Object(o.a)(e,null,[{key:"request",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return new Promise(function(a,n){var r="string"===typeof t.method?t.method:"GET",i="string"===typeof t.url?t.url:window.location.origin,l="object"===typeof t.headers&&t.headers?t.headers:{},s="object"===typeof t.query&&t.query?t.query:{},o="undefined"!==typeof t.data?t.data:null,c=new XMLHttpRequest;for(var u in c.onload=function(){return a(c)},c.onerror=function(e){return n(e)},s&&(i+=e.queryString(s)),c.open(r,i),l)c.setRequestHeader(u,l[u]);o?"string"!==typeof o?c.send(JSON.stringify(o)):c.send(o):c.send()})}},{key:"get",value:function(t,a,n){return e.request({method:"GET",url:t,headers:a,query:n})}},{key:"post",value:function(t,a,n){return e.request({method:"POST",url:t,headers:a,data:n})}},{key:"queryString",value:function(e){var t="?";for(var a in e)t+="".concat(a,"=").concat(e[a],"&");return t.substring(0,t.length-1)}}]),e}()),d=function(){function e(){Object(s.a)(this,e),this._listeners={}}return Object(o.a)(e,[{key:"emit",value:function(e){this.willTrigger(e.type)&&this._listeners[e.type].forEach(function(t){return t(e)})}},{key:"on",value:function(e,t){this.willTrigger(e)?this._listeners[e].push(t):this._listeners[e]=[t]}},{key:"off",value:function(e,t){if(this.willTrigger(e))for(var a=this._listeners[e],n=0;n<a.length;n++)if(a[n]===t)return a.splice(n,1),!0;return!1}},{key:"willTrigger",value:function(e){return e in this._listeners}}]),e}(),f=function(){function e(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;Object(s.a)(this,e),this._type=t,this._day=a}return Object(o.a)(e,[{key:"type",get:function(){return this._type}},{key:"day",get:function(){return this._day}}]),e}(),p=new(function(e){function t(){var e;return Object(s.a)(this,t),(e=Object(c.a)(this,Object(u.a)(t).call(this))).data=null,e._currentDay=0,e._firstInvalidDay=-1,e}return Object(h.a)(t,e),Object(o.a)(t,[{key:"load",value:function(e){var t=this;return new Promise(function(a,n){var r=window.location.href.includes("localhost")?"http://localhost:8080/plague":"".concat(window.location.origin,"/plague"),i={"Access-Control-Allow-Origin":window.location.origin};m.get(r,i,e).then(function(e){if(200===e.status){try{t.data=JSON.parse(e.response),t._firstInvalidDay=parseInt(e.getResponseHeader("First-Invalid-Day"))||-1}catch(r){n(r),t.emit(new Event("error"))}a(),t.emit(new Event("load")),t.emit(new Event("data"))}else n(new Error(e.response||"Bad request")),t.emit(new Event("error"))}).catch(function(e){n(e),t.emit(new Event("error"))})})}},{key:"downloadCSVFile",value:function(e){return new Promise(function(t,a){var n=window.location.origin.includes("localhost")?"http://localhost:8080":window.location.origin,r="".concat(n,"/plague"),i={"Access-Control-Allow-Origin":window.location.origin,"Content-Type":"text/csv"};m.get(r,i,e).then(function(e){if(200===e.status){var n=new Blob([e.response],{type:"octet/stream"}),r=document.createElement("a"),i=window.URL.createObjectURL(n);r.setAttribute("download","data.csv"),r.setAttribute("href",i),r.click(),window.URL.revokeObjectURL(i),t("File downloaded.")}else a(new Error(e.response||"Error downloading CSV file."))}).catch(function(e){a(new Error(e.message||"Unable to download CSV file."))})})}},{key:"autoRun",value:function(){this.currentDay=this.data.length-1}},{key:"nextDay",value:function(){this.currentDay<this.data.length&&this.currentDay++}},{key:"reset",value:function(){this.data=null,this.currentDay=0,this.emit(new Event("reset"))}},{key:"setGraphDay",value:function(e){this.emit(new f("update-graph",e))}},{key:"currentDay",set:function(e){var t=this.hasData?this.data.length-1:0;this._currentDay=Math.min(e,t),this.emit(new f("update",this.currentDay))},get:function(){return this._currentDay}},{key:"hasData",get:function(){return null!==this.data}},{key:"firstInvalidDay",get:function(){return this._firstInvalidDay}}]),t}(d)),v=(a(38),function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).numRef=r.a.createRef(),a.rangeRef=r.a.createRef(),a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){this.numRef.current.value=this.props.init||this.props.min,this.rangeRef.current.value=this.props.init||this.props.min}},{key:"onNumber",value:function(e){var t=parseFloat(e.target.value);t?(t=Math.min(Math.max(t,this.props.min),this.props.max),this.numRef.current.value=t,this.rangeRef.current.value=t):this.rangeRef.current.value=this.props.min}},{key:"onSlide",value:function(e){var t=e.target.value;t=Math.min(Math.max(t,this.props.min),this.props.max),this.numRef.current.value=t}},{key:"render",value:function(){return r.a.createElement("div",{className:"num-slider-container"},r.a.createElement("div",null,r.a.createElement("label",null,this.props.label),this.props.showRange?" ".concat(this.minText,"-").concat(this.maxText):null),r.a.createElement("div",null,r.a.createElement("input",{ref:this.numRef,onChange:this.onNumber.bind(this),type:"number",min:this.props.min,max:this.props.max,step:this.props.step,placeholder:this.props.placeholder,required:this.props.required,disabled:this.props.disabled})),r.a.createElement("div",null,r.a.createElement("input",{ref:this.rangeRef,onChange:this.onSlide.bind(this),type:"range",min:this.props.min,max:this.props.max,step:this.props.step,disabled:this.props.disabled,className:"num-slider-slider"})))}},{key:"value",set:function(e){this.numRef.current.value=e,this.rangeRef.current.value=e},get:function(){return this.numRef.current.value}},{key:"minText",get:function(){return this.props.minText?this.props.minText:this.props.min}},{key:"maxText",get:function(){return this.props.maxText?this.props.maxText:this.props.max}}]),t}(r.a.Component)),y={"Seasonal Flu":{"Infection Length":8,Transmission:1.2,Virulence:.01},Smallpox:{"Infection Length":14,Transmission:2.5,Virulence:.25},Polio:{"Infection Length":18,Transmission:1,Virulence:.01},Measles:{"Infection Length":8,Transmission:10,Virulence:.01}},g=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).intialImmunityRef=r.a.createRef(),a.transmissionRef=r.a.createRef(),a.virulenceRef=r.a.createRef(),a.initialInfectedRef=r.a.createRef(),a.intialPopRef=r.a.createRef(),a.infectionLengthRef=r.a.createRef(),a.daysRef=r.a.createRef(),a.state={pending:!1,message:null,lastBtn:null,isDisabled:!1},a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){p.on("load",this.onSimulatorLoad.bind(this)),p.on("error",this.onSimulatorError.bind(this)),"true"===new URLSearchParams(window.location.search).get("test")&&(this.initialInfectedRef.current.value=500,this.intialImmunityRef.current.value=.1,this.intialPopRef.current.value=1e6,this.virulenceRef.current.value=.25,this.daysRef.current.value=365,this.infectionLengthRef.current.value=100,this.transmissionRef.current.value=.2)}},{key:"getInputsDictionary",value:function(){var e=this.intialImmunityRef.current.value,t=this.transmissionRef.current.value,a=this.virulenceRef.current.value,n=this.initialInfectedRef.current.value,r=this.intialPopRef.current.value,i=this.infectionLengthRef.current.value,l=this.daysRef.current.value;return{immune_percent:e,transmission_rate:t,virulence:a,initial_infected:n=Math.min(n,r),initial_population:r,infection_length:i,simulation_length:l}}},{key:"onSimulatorError",value:function(){this.setState({pending:!1})}},{key:"onSimulatorLoad",value:function(){this.setState({pending:!1})}},{key:"onReset",value:function(){p.reset()}},{key:"dayByDay",value:function(){var e=this;p.hasData?p.nextDay():(this.setState({pending:!0}),p.load(this.getInputsDictionary()).then(function(){e.setState({message:null}),p.nextDay()}).catch(function(t){return e.setState({message:t.message})}))}},{key:"autoRun",value:function(){var e=this;p.hasData?p.autoRun():(this.setState({pending:!0}),p.load(this.getInputsDictionary()).then(function(){e.setState({message:null}),p.autoRun()}).catch(function(t){return e.setState({message:t.message})}))}},{key:"downloadCSV",value:function(){var e=this;this.state.pending||(this.setState({pending:!0}),p.downloadCSVFile(this.getInputsDictionary()).catch(function(t){e.setState({message:t.message})}).then(function(){e.setState({pending:!1})}))}},{key:"onSubmit",value:function(e){e.preventDefault(),"day-by-day"===this.state.lastBtn?this.dayByDay():"auto-run"===this.state.lastBtn?this.autoRun():"export-csv"===this.state.lastBtn&&this.downloadCSV()}},{key:"onFormClick",value:function(e){this.setState({lastBtn:e.target.getAttribute("btn")})}},{key:"onPresetChange",value:function(e){"Custom"!=e.target.value?(this.setState({isDisabled:!0}),this.infectionLengthRef.current.value=y[e.target.value]["Infection Length"],this.transmissionRef.current.value=y[e.target.value].Transmission,this.virulenceRef.current.value=y[e.target.value].Virulence):this.setState({isDisabled:!1})}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h5",{className:"text-center"},"Experimental Variables"),r.a.createElement("form",{onSubmit:this.onSubmit.bind(this)},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"form-group col-lg-6"},r.a.createElement(v,{label:"Length of Infection (Days)",showRange:!0,min:1,max:365,step:1,required:!0,ref:this.infectionLengthRef,disabled:this.state.isDisabled})),r.a.createElement("div",{className:"form-group col-lg-6"},r.a.createElement(v,{label:"Transmission Rate",showRange:!0,min:0,max:20,step:.01,required:!0,ref:this.transmissionRef,disabled:this.state.isDisabled}))),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"form-group col-lg-6"},r.a.createElement(v,{label:"Virulence",showRange:!0,min:0,max:1,step:.001,required:!0,ref:this.virulenceRef,disabled:this.state.isDisabled})),r.a.createElement("div",{className:"form-group col-lg-6"},r.a.createElement(v,{label:"Initial Population",showRange:!0,min:1,max:1e6,step:1,required:!0,ref:this.intialPopRef}))),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"form-group col-lg-6"},r.a.createElement(v,{label:"Initial Immunity Percent",showRange:!0,min:0,max:1,step:.01,required:!0,ref:this.intialImmunityRef})),r.a.createElement("div",{className:"form-group col-lg-6"},r.a.createElement(v,{label:"Initial Infected",showRange:!0,min:0,max:1e6,maxText:"Population",step:1,required:!0,ref:this.initialInfectedRef}))),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"form-group col-lg-6"},r.a.createElement(v,{label:"Simulation Length (Days)",showRange:!0,min:1,max:365,step:1,required:!0,ref:this.daysRef})),r.a.createElement("div",{className:"form-group col-lg-6"},r.a.createElement("label",null,"Presets:"),r.a.createElement("select",{className:"form-control",onChange:this.onPresetChange.bind(this)},r.a.createElement("option",null,"Custom"),r.a.createElement("option",null,"Seasonal Flu"),r.a.createElement("option",null,"Smallpox"),r.a.createElement("option",null,"Polio"),r.a.createElement("option",null,"Measles")))),r.a.createElement("div",{className:"form-group text-center"},r.a.createElement("button",{onClick:this.onFormClick.bind(this),className:"input-btn",disabled:this.state.pending,btn:"day-by-day"},"Day-By-Day"),"\xa0",r.a.createElement("button",{onClick:this.onFormClick.bind(this),className:"input-btn",disabled:this.state.pending,btn:"auto-run"},"Auto Run"),"\xa0",r.a.createElement("button",{onClick:this.onReset.bind(this),className:"input-btn",disabled:this.state.pending,type:"button"},"Reset"),"\xa0",r.a.createElement("button",{onClick:this.onFormClick.bind(this),className:"input-btn",disabled:this.state.pending,btn:"export-csv"},"Export CSV"))),r.a.createElement("div",null,this.state.message))}}]),t}(r.a.Component),b=a(28),E=a.n(b),R=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).textRef=r.a.createRef(),a.errorRef=r.a.createRef(),a.headerRef=r.a.createRef(),a.type=null,a.typeError=!0,a.errorTime=!1,a.errorMsg="",a.state={other:!1,errMessage:null,successMessage:null},a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"submitClick",value:function(e){var t=this;this.setState({errMessage:null}),e.preventDefault();var a=!this.headerRef.current||this.headerRef.current.value.length>0;if(null!=this.type&&""!=this.textRef.current.value&&a){var n=this.BuildArray(),r=window.location.origin.includes("localhost")?"http://localhost:8080":window.location.origin;m.post("".concat(r,"/mail"),null,{message:n}).then(function(e){if(200===e.status)try{t.setState({successMessage:"Submit Successful"})}catch(a){t.setState({errMessage:JSON.parse(a)})}else t.setState({errMessage:"Bad Request Error"})}).catch(function(e){t.setState({errMessage:"Cannot reach server"})})}}},{key:"BuildArray",value:function(){var e=this.textRef.current.value;return{type:this.state.other?this.headerRef.current.value:this.type,text:e}}},{key:"onTypeSelect",value:function(e){this.type=e,"other"==this.type?this.setState({other:!0}):this.setState({other:!1}),this.typeError=!1}},{key:"TypeOther",value:function(){return this.state.other?r.a.createElement("div",null,r.a.createElement("label",null,"Other: ")," ",r.a.createElement("input",{type:"text",placeholder:"Input for other",ref:this.headerRef,required:!0})):null}},{key:"render",value:function(){var e=this;return this.props.showModal?r.a.createElement("form",null,r.a.createElement(E.a,{isOpen:this.props.showModal},r.a.createElement("div",{className:"col-lg-1"},r.a.createElement("span",{className:"nav-link",onClick:this.props.closeModal},"\xd7")),r.a.createElement("div",{className:"container border"},r.a.createElement("form",{onSubmit:this.submitClick.bind(this)},r.a.createElement("div",{className:"col-lg-12 header center"},r.a.createElement("h2",{className:"modalHeader"},"Contact Us"),r.a.createElement("div",null,r.a.createElement("span",{className:"error"},this.state.errMessage),r.a.createElement("span",{className:"success"},this.state.successMessage))),r.a.createElement("div",{className:"col-lg-12 center"},r.a.createElement("input",{type:"radio",onChange:function(t){return e.onTypeSelect("Bug Report")},name:"types",value:"problem",required:!0}),"Have a problem? \xa0",r.a.createElement("input",{type:"radio",onChange:function(t){return e.onTypeSelect("Feature Request")},name:"types",value:"idea",required:!0}),"Have an idea? \xa0",r.a.createElement("input",{type:"radio",onChange:function(t){return e.onTypeSelect("other")},name:"types",value:"other",required:!0}),"Other"),r.a.createElement("div",{className:"col-lg-12 center"},this.TypeOther()),r.a.createElement("div",{className:"col-lg-12 center"},r.a.createElement("textarea",{rows:"4",cols:"100",placeholder:"Type message in here.",ref:this.textRef,required:!0})),r.a.createElement("div",{className:"col-lg-12 center"},r.a.createElement("input",{type:"submit"})))))):null}}]),t}(r.a.Component),w=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={showModal:!1,closeModal:!1},a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"closeModal",value:function(){this.setState({showModal:!1})}},{key:"openModal",value:function(){this.setState({showModal:!0})}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("nav",{className:"navbar navbar-expand-lg navbar-light bg-light"},r.a.createElement("div",{className:"collapse navbar-collapse",id:"navbarSupportedContent"},r.a.createElement("ul",{className:"navbar-nav mr-auto"},r.a.createElement("li",{className:"nav-item active"},r.a.createElement("span",{className:"nav-link",onClick:this.openModal.bind(this)},"Contact Us ",r.a.createElement("span",{className:"sr-only"},"(current)")))))),r.a.createElement(R,{showModal:this.state.showModal,closeModal:this.closeModal.bind(this)}))}}]),t}(r.a.Component),S=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={data:null,day:0},a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){p.on("data",this.onSimulatorData.bind(this)),p.on("reset",this.onSimulatorReset.bind(this)),p.on("update",this.onSimulatorUpdate.bind(this))}},{key:"onSimulatorData",value:function(){this.setState({data:p.data})}},{key:"onSimulatorReset",value:function(){this.setState({data:null,day:0})}},{key:"onSimulatorUpdate",value:function(){this.setState({day:p.currentDay})}},{key:"renderRows",value:function(){if(p.hasData){for(var e=new Array(p.currentDay+1),t=function(t){var a=p.data[t],n=Math.round(a.Susceptible),i=Math.round(a.Infected),l=Math.round(a.Immune),s=Math.round(a.Dead),o=Math.round(a.TotalPopulation),c=null,u=null;t===p.firstInvalidDay&&(c={borderLeft:"5px solid red",borderRight:"5px solid red"},u="Data correction begins at day ".concat(t,".")),e[t]=r.a.createElement("tr",{key:t,style:c,title:u},r.a.createElement("td",{onClick:function(){return p.setGraphDay(t)}},t),r.a.createElement("td",null,n),r.a.createElement("td",null,i),r.a.createElement("td",null,l),r.a.createElement("td",null,s),r.a.createElement("td",null,o))},a=0;a<=p.currentDay;a++)t(a);return e}return null}},{key:"render",value:function(){return null!==this.state.data?r.a.createElement("div",null,r.a.createElement("table",{className:"table table-striped overflow-table"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Day"),r.a.createElement("th",null,"Susceptible"),r.a.createElement("th",null,"Infected"),r.a.createElement("th",null,"Immune"),r.a.createElement("th",null,"Dead"),r.a.createElement("th",null,"Total Population"))),r.a.createElement("tbody",null,this.renderRows()))):null}}]),t}(r.a.Component),k=a(18),D=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={data:null,day:0,yLabel:"Infected"},a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){p.on("data",this.onSimulatorData.bind(this)),p.on("reset",this.onSimulatorReset.bind(this)),p.on("update",this.onSimulatorUpdate.bind(this)),p.on("update-graph",this.onSimulatorUpdateGraph.bind(this))}},{key:"onSimulatorData",value:function(){this.setState({data:p.data})}},{key:"onSimulatorReset",value:function(){this.setState({data:null,day:0})}},{key:"onSimulatorUpdate",value:function(){this.setState({day:p.currentDay})}},{key:"onSimulatorUpdateGraph",value:function(e){"number"===typeof e.day&&this.setState({day:e.day})}},{key:"onYLabelChange",value:function(e){this.setState({yLabel:e.target.value})}},{key:"getData",value:function(){var e=this;if(!this.state.data||this.state.day<1)return null;var t=0;return{values:this.state.data.map(function(a,n){var r=parseFloat(a[e.state.yLabel]);return t=Math.max(t,r),{x:n,y:r}}).slice(0,this.state.day+1),largestY:t}}},{key:"render",value:function(){var e=this.getData();if(e){var t=k.d3.scale.linear().domain([0,e.values.length-1]).range([0,450]),a=k.d3.scale.linear().domain([e.largestY,0]).range([0,465]);return r.a.createElement("div",null,r.a.createElement("h5",null),r.a.createElement("div",{className:"GraphDropdown",onChange:this.onYLabelChange.bind(this)},r.a.createElement("select",{className:"form-control"},r.a.createElement("option",null,"Infected"),r.a.createElement("option",null,"Susceptible"),r.a.createElement("option",null,"Immune"),r.a.createElement("option",null,"Dead"))),r.a.createElement("div",null,r.a.createElement(k.LineChart,{data:e,axes:!0,width:540,height:525,margin:{top:10,bottom:50,left:80,right:10},xAxis:{label:"Day"},yAxis:{label:this.state.yLabel},xScale:t,yScale:a})))}return null}}]),t}(r.a.Component),x=function(e){function t(){return Object(s.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(w,null),r.a.createElement("br",null),r.a.createElement("span",{className:"Version"},"V0.1"),r.a.createElement("main",{className:"container card card-body bg-light"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-lg-6"},r.a.createElement(g,null)),r.a.createElement("div",{className:"col-lg-6 graph"},r.a.createElement(D,null))),r.a.createElement("div",{className:"col-lg-12"},r.a.createElement(S,null))),r.a.createElement("footer",{className:"container text-center"},r.a.createElement("hr",null),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-lg-6"},"Juall | Rosenblum | Pojero | Erry"),r.a.createElement("div",{className:"col-lg-6"},r.a.createElement("a",{href:"https://opensource.org/licenses/MIT",target:"_blank"},"MIT License")))))}}]),t}(r.a.Component);l.a.render(r.a.createElement(x,null),document.querySelector("#root"))}},[[29,2,1]]]);
//# sourceMappingURL=main.8fc4465a.chunk.js.map