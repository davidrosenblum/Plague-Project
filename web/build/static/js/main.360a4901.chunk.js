(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{107:function(e,t,n){e.exports=n(246)},112:function(e,t,n){},114:function(e,t,n){},116:function(e,t,n){},242:function(e,t,n){},244:function(e,t,n){},246:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),i=n(20),l=n.n(i),s=n(7),o=n(8),c=n(11),u=n(10),h=n(12),m=(n(112),n(114),n(5)),d=function(){function e(){Object(s.a)(this,e)}return Object(o.a)(e,null,[{key:"request",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return new Promise(function(n,a){var r="string"===typeof t.method?t.method:"GET",i="string"===typeof t.url?t.url:window.location.origin,l="object"===typeof t.headers&&t.headers?t.headers:{},s="object"===typeof t.query&&t.query?t.query:{},o="undefined"!==typeof t.data?t.data:null,c=new XMLHttpRequest;for(var u in c.onload=function(){return n(c)},c.onerror=function(e){return a(e)},s&&(i+=e.queryString(s)),c.open(r,i),l)c.setRequestHeader(u,l[u]);o?"string"!==typeof o?c.send(JSON.stringify(o)):c.send(o):c.send()})}},{key:"get",value:function(t,n,a){return e.request({method:"GET",url:t,headers:n,query:a})}},{key:"post",value:function(t,n,a){return e.request({method:"POST",url:t,headers:n,data:a})}},{key:"queryString",value:function(e){var t="?";for(var n in e)t+="".concat(n,"=").concat(e[n],"&");return t.substring(0,t.length-1)}}]),e}(),p=function(){function e(){Object(s.a)(this,e),this._listeners={}}return Object(o.a)(e,[{key:"emit",value:function(e){this.willTrigger(e.type)&&this._listeners[e.type].forEach(function(t){return t(e)})}},{key:"on",value:function(e,t){this.willTrigger(e)?this._listeners[e].push(t):this._listeners[e]=[t]}},{key:"off",value:function(e,t){if(this.willTrigger(e))for(var n=this._listeners[e],a=0;a<n.length;a++)if(n[a]===t)return n.splice(a,1),!0;return!1}},{key:"willTrigger",value:function(e){return e in this._listeners}}]),e}(),f=new(function(e){function t(){var e;return Object(s.a)(this,t),(e=Object(c.a)(this,Object(u.a)(t).call(this))).data=null,e._firstInvalidDay=-1,e._useErrCorrecting=!0,e}return Object(h.a)(t,e),Object(o.a)(t,[{key:"load",value:function(e){var t=this;return new Promise(function(n,a){var r=window.location.href.includes("localhost")?"http://localhost:8080/plague":"".concat(window.location.origin,"/plague"),i={"Access-Control-Allow-Origin":window.location.origin,"Error-Correction":t.isErrCorrecting};d.get(r,i,e).then(function(e){if(200===e.status){try{t.data=JSON.parse(e.response),t._firstInvalidDay=parseInt(e.getResponseHeader("First-Invalid-Day"))||-1}catch(r){a(r),t.emit(new Event("error"))}n(),t.emit(new Event("load")),t.emit(new Event("data"))}else a(new Error(e.response||"Bad request")),t.emit(new Event("error"))}).catch(function(e){a(e),t.emit(new Event("error"))})})}},{key:"downloadCSVFile",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return new Promise(function(a,r){var i=window.location.origin.includes("localhost")?"http://localhost:8080":window.location.origin,l="".concat(i,"/plague"),s={"Access-Control-Allow-Origin":window.location.origin,"Content-Type":"text/csv","Error-Correction":t.isErrCorrecting};n&&".csv"!==n.substring(n.length-4,n.length)&&(n+=".csv"),d.get(l,s,e).then(function(e){if(200===e.status){var t=new Blob([e.response],{type:"octet/stream"}),i=document.createElement("a"),l=window.URL.createObjectURL(t);i.setAttribute("download",n||"data_".concat(Date.now(),".csv")),i.setAttribute("href",l),i.click(),window.URL.revokeObjectURL(l),a("File downloaded.")}else console.log(e.response),r(new Error("Error downloading CSV file."))}).catch(function(e){console.log(e.message),r(new Error("Unable to download CSV file."))})})}},{key:"reset",value:function(){this.data=null,this.emit(new Event("reset"))}},{key:"isErrCorrecting",set:function(e){if("boolean"!==typeof e)throw new Error("isErrCorrecting must be set to a boolean value.");this._useErrCorrecting=e},get:function(){return this._useErrCorrecting}},{key:"hasData",get:function(){return null!==this.data}},{key:"firstInvalidDay",get:function(){return this._firstInvalidDay}}]),t}(p)),v=new(function(){function e(){Object(s.a)(this,e),this._numParamSets=0,this._lastParamSet=null,this._currDay=0,window.sessionStorage.clear()}return Object(o.a)(e,[{key:"saveParamsInputsDict",value:function(e){var t=this.convertToTitleCase(e);return!!this.paramsNotLastSave(t)&&(window.sessionStorage.setItem(++this._numParamSets,JSON.stringify(t)),this._currDay=this.numParamSets,this._lastParamSet=t,this.numParamSets>100&&window.sessionStorage.removeItem(this.numParamSets-100),!0)}},{key:"saveParams",value:function(e,t,n,a,r,i,l,s){return this.saveParamsInputsDict({infection_length:e,transmission_rate:t,virulence:n,initial_population:a,immune_percent:r,initial_infected:i,simulation_length:l,preset:s})}},{key:"convertToTitleCase",value:function(e){return{infectionLength:e.infection_length,transmissionRate:e.transmission_rate,virulence:e.virulence,initialPopulation:e.initial_population,immunePercent:e.immune_percent,initialInfected:e.initial_infected,simulationLength:e.simulation_length,preset:e.preset}}},{key:"paramsNotLastSave",value:function(e){if(!this._lastParamSet)return!0;for(var t in this._lastParamSet)if(this._lastParamSet[t]!==e[t])return!0;return!1}},{key:"getSavedParams",value:function(e){var t=window.sessionStorage.getItem(e)||null;return t?JSON.parse(t):null}},{key:"stepBackwards",value:function(){this._currDay-1>=this.firstStoredDay&&--this._currDay}},{key:"stepForwards",value:function(){this._currDay+1<=this.numParamSets&&++this._currDay}},{key:"firstStoredDay",get:function(){return this.numParamSets>100?this.numParamSets-100:0}},{key:"currentParams",get:function(){return this.getSavedParams(this._currDay)}},{key:"currentDay",get:function(){return this._currDay}},{key:"numParamSets",get:function(){return this._numParamSets}}]),e}()),g=(n(116),function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(c.a)(this,Object(u.a)(t).call(this,e))).numRef=r.a.createRef(),n.rangeRef=r.a.createRef(),n}return Object(h.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){this.numRef.current.value=this.props.init||this.props.min,this.rangeRef.current.value=this.props.init||this.props.min}},{key:"onNumber",value:function(e){var t=parseFloat(e.target.value);t?(t=Math.min(Math.max(t,this.props.min),this.props.max),this.numRef.current.value=t,this.rangeRef.current.value=t):this.rangeRef.current.value=this.props.min}},{key:"onSlide",value:function(e){var t=e.target.value;t=Math.min(Math.max(t,this.props.min),this.props.max),this.numRef.current.value=t}},{key:"render",value:function(){return r.a.createElement("div",{className:"num-slider-container"},r.a.createElement("div",null,r.a.createElement("label",null,this.props.label),this.props.showRange?" ".concat(this.minText,"-").concat(this.maxText):null),r.a.createElement("div",null,r.a.createElement("input",{ref:this.numRef,onChange:this.onNumber.bind(this),type:"number",min:this.props.min,max:this.props.max,step:this.props.step,placeholder:this.props.placeholder,required:this.props.required,disabled:this.props.disabled})),r.a.createElement("div",null,r.a.createElement("input",{ref:this.rangeRef,onChange:this.onSlide.bind(this),type:"range",min:this.props.min,max:this.props.max,step:this.props.step,disabled:this.props.disabled,className:"num-slider-slider"})))}},{key:"value",set:function(e){e=Math.max(this.props.min,e),e=Math.min(e,this.props.max),this.numRef.current.value=e,this.rangeRef.current.value=e},get:function(){return this.numRef.current.value}},{key:"minText",get:function(){return this.props.minText?this.props.minText:this.props.min}},{key:"maxText",get:function(){return this.props.maxText?this.props.maxText:this.props.max}}]),t}(r.a.Component)),b={"Seasonal Flu":{"Infection Length":8,Transmission:1.2,Virulence:.01},Smallpox:{"Infection Length":14,Transmission:2.5,Virulence:.25},Polio:{"Infection Length":18,Transmission:1,Virulence:.01},Measles:{"Infection Length":8,Transmission:10,Virulence:.01},Ebola:{"Infection Length":13,Transmission:1.5,Virulence:.75},"H1N1 Flu":{"Infection Length":8,Transmission:1.6,Virulence:.01},"H5N1 Flu":{"Infection Length":8,Transmission:.1,Virulence:.6},"1918 Flu":{"Infection Length":8,Transmission:2,Virulence:.03}},y=new(function(e){function t(){var e;return Object(s.a)(this,t),(e=Object(c.a)(this,Object(u.a)(t).call(this)))._startDay=-1,e._endDay=Number.MAX_SAFE_INTEGER,e._trendLineY=0,e.extractTrendLine(),e}return Object(h.a)(t,e),Object(o.a)(t,[{key:"extractTrendLine",value:function(){var e=new URLSearchParams(window.location.search),t=parseFloat(e.get("trend_line"))||0;this._trendLineY=t}},{key:"getData",value:function(e){var t=this,n=f.data,a={},r=0;if(n){for(var i=this.startDay>-1?this.startDay:0,l=this.endDay<n.length?this.endDay:n.length-1,s=i;s<=l;s++){var o=n[s];for(var c in e)if(!0===e[c]){var u=parseFloat(o[c]),h={x:s,y:u};c in a?a[c].push(h):a[c]=[h],r=Math.max(r,u)}}this.trendLineY>0&&(a.TrendLine=new Array(l-i).fill(null).map(function(e,n){return{x:n+i,y:t.trendLineY}}))}var m=[];Object.keys(a).forEach(function(e){return m.push(a[e])});var d=Object.keys(e).filter(function(t){return!0===e[t]});return{values:m,largestY:r,labels:d}}},{key:"setDaysRange",value:function(e,t){this._startDay=e,this._endDay=t,this.emit(new Event("update"))}},{key:"startDay",set:function(e){this._startDay=e,this.emit(new Event("update"))},get:function(){return Math.max(0,this._startDay)}},{key:"endDay",set:function(e){this._endDay=e,this.emit(new Event("update"))},get:function(){return Math.min(this._endDay,f.data?f.data.length:0)}},{key:"trendLineY",set:function(e){this._trendLineY=e,this.emit(new Event("update"))},get:function(){return this._trendLineY}}]),t}(p)),E=[1,365,1],R=[0,20,.01],w=[0,1,.001],S=[1,1e6,1],k=[0,1,.01],x=[0,1e6,1],D=[1,365,1],O=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(c.a)(this,Object(u.a)(t).call(this,e))).intialImmunityRef=r.a.createRef(),n.transmissionRef=r.a.createRef(),n.virulenceRef=r.a.createRef(),n.initialInfectedRef=r.a.createRef(),n.intialPopRef=r.a.createRef(),n.infectionLengthRef=r.a.createRef(),n.daysRef=r.a.createRef(),n.presetRef=r.a.createRef(),n.exportUrlRef=r.a.createRef(),n.csvFilenameElement=null,n.state={pending:!1,message:null,isDisabled:!1,exportModal:!1,exportOption:null,exportDropdown:!1},n}return Object(h.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){f.on("load",this.onSimulatorLoad.bind(this)),f.on("error",this.onSimulatorError.bind(this)),this.extractQueryStringParams(),"true"===new URLSearchParams(window.location.search).get("test")&&this.useTestValues()}},{key:"extractQueryStringParams",value:function(){var e=new URLSearchParams(window.location.search);this.initialInfectedRef.current.value=parseInt(e.get("initial_infected"))||-1,this.intialImmunityRef.current.value=parseFloat(e.get("immune_percent"))||-1,this.intialPopRef.current.value=parseInt(e.get("initial_population"))||-1,this.virulenceRef.current.value=parseFloat(e.get("virulence"))||-1,this.daysRef.current.value=parseInt(e.get("simulation_length"))||-1,this.infectionLengthRef.current.value=parseInt(e.get("infection_length"))||-1,this.transmissionRef.current.value=parseFloat(e.get("transmission_rate"))||-1}},{key:"useTestValues",value:function(){this.initialInfectedRef.current.value=500,this.intialImmunityRef.current.value=.1,this.intialPopRef.current.value=1e6,this.virulenceRef.current.value=.25,this.daysRef.current.value=365,this.infectionLengthRef.current.value=100,this.transmissionRef.current.value=.2,v.saveParamsInputsDict(this.getInputsDictionary())}},{key:"getInputsDictionary",value:function(){var e=this.intialImmunityRef.current.value,t=this.transmissionRef.current.value,n=this.virulenceRef.current.value,a=this.initialInfectedRef.current.value,r=this.intialPopRef.current.value,i=this.infectionLengthRef.current.value,l=this.daysRef.current.value,s=this.presetRef.current.value,o=(r-(a=Math.min(a,r)))/r;return{immune_percent:e=Math.min(e,o),transmission_rate:t,virulence:n,initial_infected:a,initial_population:r,infection_length:i,simulation_length:l,preset:s}}},{key:"onSimulatorError",value:function(){this.setState({pending:!1})}},{key:"onSimulatorLoad",value:function(){this.setState({pending:!1})}},{key:"onReset",value:function(){f.reset()}},{key:"downloadCSV",value:function(){var e=this;if(!this.state.pending){this.setState({pending:!0});var t=this.csvFilenameElement?this.csvFilenameElement.value:null;f.downloadCSVFile(this.getInputsDictionary(),t).catch(function(t){e.setState({message:t.message})}).then(function(){e.setState({pending:!1})})}}},{key:"runSimulation",value:function(){var e=this;if(f.hasData){var t=v.convertToTitleCase(this.getInputsDictionary());v.paramsNotLastSave(t)&&(f.reset(),this.runSimulation())}else this.setState({pending:!0}),f.load(this.getInputsDictionary()).then(function(){e.setState({message:null}),v.saveParamsInputsDict(e.getInputsDictionary())}).catch(function(t){return e.setState({message:t.message})})}},{key:"onSubmit",value:function(e){e.preventDefault(),this.runSimulation()}},{key:"onPresetChange",value:function(){var e=this.presetRef.current.value;"Custom"!==e?(this.setState({isDisabled:!0}),this.infectionLengthRef.current.value=b[e]["Infection Length"],this.transmissionRef.current.value=b[e].Transmission,this.virulenceRef.current.value=b[e].Virulence):this.setState({isDisabled:!1})}},{key:"toggleExportModal",value:function(){this.setState(function(e){return{exportModal:!e.exportModal}})}},{key:"toggleExportDropdown",value:function(){this.setState(function(e){return{exportDropdown:!e.exportDropdown}})}},{key:"switchParamSet",value:function(e){if("backwards"===e)v.stepBackwards();else{if("forwards"!==e)throw new Error("Parameter switch direction must be 'forwards' or 'backwards'.");v.stepForwards()}var t=v.currentParams||null;t&&(this.infectionLengthRef.current.value=t.infectionLength,this.transmissionRef.current.value=t.transmissionRate,this.virulenceRef.current.value=t.virulence,this.intialPopRef.current.value=t.initialPopulation,this.intialImmunityRef.current.value=t.immunePercent,this.initialInfectedRef.current.value=t.initialInfected,this.daysRef.current.value=t.simulationLength,this.presetRef.current.value=t.preset,this.onPresetChange())}},{key:"getExportURL",value:function(){var e=this.getInputsDictionary(),t="".concat(window.location.origin,"?");for(var n in e)t+="".concat(n,"=").concat(e[n],"&");return t+="trend_line=".concat(y.trendLineY)}},{key:"copyLinkText",value:function(){var e=this.exportUrlRef.current;e&&(e.select(),document.execCommand("copy"))}},{key:"renderExportOptBody",value:function(){var e=this;return"csv"===this.state.exportOption?r.a.createElement("div",null,r.a.createElement("div",null,"Exports a comma separated value (.csv) file containing the results displayed in the table. This file is easily accesible in Excel."),r.a.createElement("br",null),r.a.createElement("div",null,r.a.createElement(m.k,{innerRef:function(t){return e.csvFilenameElement=t},placeholder:"Optional filename (.csv automatically appended)",type:"text",maxLength:25})),r.a.createElement("br",null),r.a.createElement("div",null,r.a.createElement(m.a,{color:"fade",onClick:this.downloadCSV.bind(this)},"Download CSV"))):"sim-link"===this.state.exportOption?r.a.createElement("div",null,r.a.createElement("div",null,"Exports a URL for this application with preset values that can be shared."),r.a.createElement("br",null),r.a.createElement("div",null,r.a.createElement("textarea",{ref:this.exportUrlRef,className:"modal-url-text",defaultValue:this.getExportURL(),readOnly:!0})),r.a.createElement("br",null),r.a.createElement("div",null,r.a.createElement(m.a,{color:"fade",onClick:this.copyLinkText.bind(this)},"Copy Link"))):r.a.createElement("div",null,"Please select an export option.")}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("div",{id:"inputs-header-container",className:"text-center"},r.a.createElement("button",{onClick:function(){return e.switchParamSet("backwards")}},"\u2190"),r.a.createElement("h5",{className:"text-center"},"Experimental Variables"),r.a.createElement("button",{onClick:function(){return e.switchParamSet("forwards")}},"\u2192")),r.a.createElement("br",null),r.a.createElement("form",{onSubmit:this.onSubmit.bind(this)},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"form-group col-lg-6"},r.a.createElement(g,{label:"Length of Infection (Days)",showRange:!0,min:E[0],max:E[1],step:E[2],required:!0,ref:this.infectionLengthRef,disabled:this.state.isDisabled})),r.a.createElement("div",{className:"form-group col-lg-6"},r.a.createElement(g,{label:"Transmission Rate",showRange:!0,min:R[0],max:R[1],step:R[2],required:!0,ref:this.transmissionRef,disabled:this.state.isDisabled}))),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"form-group col-lg-6"},r.a.createElement(g,{label:"Virulence",showRange:!0,min:w[0],max:w[1],step:w[2],required:!0,ref:this.virulenceRef,disabled:this.state.isDisabled})),r.a.createElement("div",{className:"form-group col-lg-6"},r.a.createElement(g,{label:"Initial Population",showRange:!0,min:S[0],max:S[1],step:S[2],required:!0,ref:this.intialPopRef}))),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"form-group col-lg-6"},r.a.createElement(g,{label:"Initial Immunity Percent",showRange:!0,min:k[0],max:k[1],step:k[2],required:!0,ref:this.intialImmunityRef})),r.a.createElement("div",{className:"form-group col-lg-6"},r.a.createElement(g,{label:"Initial Infected",showRange:!0,min:x[0],max:x[1],step:x[2],maxText:"Population",required:!0,ref:this.initialInfectedRef}))),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"form-group col-lg-6"},r.a.createElement(g,{label:"Simulation Length (Days)",showRange:!0,min:D[0],max:D[1],step:D[2],required:!0,ref:this.daysRef})),r.a.createElement("div",{className:"form-group col-lg-6"},r.a.createElement("label",null,"Presets:"),r.a.createElement("select",{ref:this.presetRef,className:"form-control",onChange:this.onPresetChange.bind(this)},r.a.createElement("option",null,"Custom"),r.a.createElement("option",null,"Seasonal Flu"),r.a.createElement("option",null,"Smallpox"),r.a.createElement("option",null,"Polio"),r.a.createElement("option",null,"Measles"),r.a.createElement("option",null,"Ebola"),r.a.createElement("option",null,"H1N1 Flu"),r.a.createElement("option",null,"H5N1 Flu"),r.a.createElement("option",null,"1918 Flu")))),r.a.createElement("div",{className:"form-group text-center"},r.a.createElement("button",{className:"input-btn",disabled:this.state.pending},"Run"),"\xa0",r.a.createElement("button",{onClick:this.onReset.bind(this),className:"input-btn",disabled:this.state.pending,type:"button"},"Reset"),"\xa0",r.a.createElement("button",{onClick:this.toggleExportModal.bind(this),className:"input-btn",disabled:this.state.pending,type:"button"},"Exports"))),r.a.createElement("div",null,this.state.message),r.a.createElement(m.l,{isOpen:this.state.exportModal},r.a.createElement(m.n,{toggle:this.toggleExportModal.bind(this)},r.a.createElement(m.g,{isOpen:this.state.exportDropdown,toggle:this.toggleExportDropdown.bind(this)},r.a.createElement(m.j,{color:"fade",caret:!0},"Export Options"),r.a.createElement(m.i,null,r.a.createElement(m.h,{onClick:function(){return e.setState({exportOption:"csv"})}},"Table CSV"),r.a.createElement(m.h,{onClick:function(){return e.setState({exportOption:"sim-link"})}},"Simulation Link")))),r.a.createElement(m.m,null,r.a.createElement("div",null,this.renderExportOptBody()))))}}]),t}(r.a.Component),C=n(105),L=n.n(C),I=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(c.a)(this,Object(u.a)(t).call(this,e))).textRef=r.a.createRef(),n.errorRef=r.a.createRef(),n.headerRef=r.a.createRef(),n.type=null,n.typeError=!0,n.errorTime=!1,n.errorMsg="",n.state={other:!1,errMessage:null,successMessage:null,disabled:!1},n}return Object(h.a)(t,e),Object(o.a)(t,[{key:"componentDidUpdate",value:function(e){e.showModal&&!this.props.showModal&&this.setState({errMessage:null,successMessage:null})}},{key:"submitClick",value:function(e){var t=this;this.setState({errMessage:null}),e.preventDefault();var n=!this.headerRef.current||this.headerRef.current.value.length>0;if(null!=this.type&&""!=this.textRef.current.value&&n){var a=this.BuildArray(),r=window.location.origin.includes("localhost")?"http://localhost:8080":window.location.origin;this.setState({successMessage:"Sending...",errMessage:null,disabled:!0}),d.post("".concat(r,"/mail"),null,a).then(function(e){200===e.status?t.setState({successMessage:"Submit Successful",errMessage:null,disabled:!1}):t.setState({errMessage:"Bad Request Error",successMessage:null,disabled:!1}),t.headerRef.current&&(t.headerRef.current.value=""),t.textRef.current.value=""}).catch(function(e){t.setState({errMessage:"Cannot reach server",disabled:!1})})}}},{key:"BuildArray",value:function(){var e=this.textRef.current.value;return{type:this.state.other?this.headerRef.current.value:this.type,text:e}}},{key:"onTypeSelect",value:function(e){this.type=e,this.setState({other:"other"===this.type}),this.typeError=!1}},{key:"TypeOther",value:function(){return this.state.other?r.a.createElement("div",null,r.a.createElement("label",null,"Other: ")," ",r.a.createElement("input",{type:"text",placeholder:"Input for other",ref:this.headerRef,required:!0})):null}},{key:"render",value:function(){var e=this;return this.props.showModal?r.a.createElement("div",null,r.a.createElement(L.a,{isOpen:this.props.showModal},r.a.createElement("div",{className:"col-lg-1"},r.a.createElement("span",{className:"pointer",onClick:this.props.closeModal},"\xd7")),r.a.createElement("div",{className:"container border"},r.a.createElement("form",{onSubmit:this.submitClick.bind(this)},r.a.createElement("div",null,r.a.createElement("div",{className:"header center"},r.a.createElement("h2",{className:"modalHeader"},"Contact Us"),r.a.createElement("div",null,r.a.createElement("span",{className:"error"},this.state.errMessage),r.a.createElement("span",{className:"success"},this.state.successMessage))),r.a.createElement("div",{className:"form-group center"},r.a.createElement("input",{type:"radio",onChange:function(){return e.onTypeSelect("Bug Report")},name:"types",value:"problem",required:!0}),"Have a problem? \xa0",r.a.createElement("input",{type:"radio",onChange:function(){return e.onTypeSelect("Feature Request")},name:"types",value:"idea",required:!0}),"Have an idea? \xa0",r.a.createElement("input",{type:"radio",onChange:function(){return e.onTypeSelect("other")},name:"types",value:"other",required:!0}),"Other"),r.a.createElement("div",{className:"form-group center"},this.TypeOther()),r.a.createElement("div",{className:"form-group center"},r.a.createElement("textarea",{className:"modal-text-area",placeholder:"Type message in here.",ref:this.textRef,required:!0})),r.a.createElement("div",{className:"form-group center"},r.a.createElement("input",{className:"input-btn",type:"submit",disabled:this.state.disabled}))))))):null}}]),t}(r.a.Component),j=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={showNav:!1,showModal:!1,showAdvanced:!1},n}return Object(h.a)(t,e),Object(o.a)(t,[{key:"closeModal",value:function(){this.setState({showModal:!1})}},{key:"openModal",value:function(){this.setState({showModal:!0})}},{key:"toggleNavbar",value:function(){this.setState(function(e){return{showNav:!e.showNav}})}},{key:"toggleDropdown",value:function(){this.setState(function(e){return{showAdvanced:!e.showAdvanced}})}},{key:"toggleErrorCorrection",value:function(){f.isErrCorrecting=!f.isErrCorrecting}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(m.r,{color:"light",light:!0,expand:"md"},r.a.createElement(m.s,{color:"dark",onClick:this.toggleNavbar.bind(this)}),r.a.createElement(m.e,{isOpen:this.state.showNav,navbar:!0},r.a.createElement(m.o,{navbar:!0},r.a.createElement(m.p,null,r.a.createElement(m.q,{className:"pointer",selected:!0,onClick:this.openModal.bind(this)},"Contact Us")),r.a.createElement(m.p,null,r.a.createElement(m.g,{isOpen:this.state.showAdvanced,toggle:this.toggleDropdown.bind(this)},r.a.createElement(m.j,{caret:!0,color:"light"},"Advanced"),r.a.createElement(m.i,null,r.a.createElement(m.h,{onClick:this.toggleErrorCorrection.bind(this)},"Toggle Error Correction (Currently ",f.isErrCorrecting?"Enabled":"Disabled",")"))))))),r.a.createElement(I,{showModal:this.state.showModal,closeModal:this.closeModal.bind(this)}))}}]),t}(r.a.Component),M=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(c.a)(this,Object(u.a)(t).call(this,e))).state={visible:!1},n}return Object(h.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;f.on("data",function(){return e.setState({visible:!0})}),f.on("reset",function(){return e.setState({visible:!1})})}},{key:"getStyleForDay",value:function(e){var t=null;return f.firstInvalidDay>-1&&(e===f.firstInvalidDay?t={borderLeft:"5px solid red",borderRight:"5px solid red"}:e>f.firstInvalidDay&&(t={borderLeft:"1px solid red",borderRight:"1px solid red"})),t}},{key:"renderRows",value:function(){var e=this,t=f.data;if(t){var n=new Array(t.length+1);return t.forEach(function(t,a){var i=Math.round(t.Susceptible),l=Math.round(t.Infected),s=Math.round(t.Immune),o=Math.round(t.Dead),c=Math.round(t.TotalPopulation),u=e.getStyleForDay(a);n[a]=r.a.createElement("tr",{key:a,style:u},r.a.createElement("td",null,a),r.a.createElement("td",null,i.toLocaleString()),r.a.createElement("td",null,l.toLocaleString()),r.a.createElement("td",null,s.toLocaleString()),r.a.createElement("td",null,o.toLocaleString()),r.a.createElement("td",null,c.toLocaleString()))}),n}return null}},{key:"render",value:function(){return this.state.visible?r.a.createElement("div",null,r.a.createElement("table",{className:"table table-striped overflow-table"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Day"),r.a.createElement("th",null,"Susceptible"),r.a.createElement("th",null,"Infected"),r.a.createElement("th",null,"Immune"),r.a.createElement("th",null,"Dead"),r.a.createElement("th",null,"Total Population"))),r.a.createElement("tbody",null,this.renderRows())),r.a.createElement("div",{className:"text-center"},f.firstInvalidDay>-1?"* Error correction begins on day ".concat(f.firstInvalidDay," *"):null)):null}}]),t}(r.a.Component),N=n(106),_=(n(242),function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(c.a)(this,Object(u.a)(t).call(this,e))).lowerRef=r.a.createRef(),n.upperRef=r.a.createRef(),n}return Object(h.a)(t,e),Object(o.a)(t,[{key:"onChangeLow",value:function(){var e=this.lowerRef.current.value,t=parseInt(e);if(e.length){var n=this.selectedMax||this.props.max;t=Math.max(this.props.min,t),t=Math.min(t,n-1),this.lowerRef.current.value=t,y.startDay=t}}},{key:"onChangeHigh",value:function(){var e=this.upperRef.current.value,t=parseInt(e);if(e.length){var n=this.selectedMin||this.props.min;t=Math.max(n+1,t),t=Math.min(t,this.props.max),this.upperRef.current.value=t,y.endDay=t}}},{key:"onSubmit",value:function(e){e.preventDefault()}},{key:"render",value:function(){return r.a.createElement("div",{className:"graph-range-container"},r.a.createElement("form",{onSubmit:this.onSubmit.bind(this)},r.a.createElement("input",{ref:this.lowerRef,min:this.props.min,max:this.props.max,step:1,defaultValue:this.props.min,placeholder:"Start",type:"number",required:!0,onChange:this.onChangeLow.bind(this)}),"\xa0",r.a.createElement("input",{ref:this.upperRef,min:this.props.min,max:this.props.max,step:1,defaultValue:this.props.max,placeholder:"End",type:"number",required:!0,onChange:this.onChangeHigh.bind(this)})))}},{key:"selectedMin",get:function(){return parseFloat(this.lowerRef.current.value)||this.props.min}},{key:"selectedMax",get:function(){return parseFloat(this.upperRef.current.value)||this.props.max}}]),t}(r.a.Component)),P=(n(244),function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(c.a)(this,Object(u.a)(t).call(this,e))).rangeRef=r.a.createRef(),n.numRef=r.a.createRef(),n}return Object(h.a)(t,e),Object(o.a)(t,[{key:"onSlide",value:function(){var e=this.rangeRef.current.value;y.trendLineY=parseInt(e)}},{key:"render",value:function(){return r.a.createElement("div",{className:"trend-line-container"},r.a.createElement("input",{className:"trend-slider",ref:this.rangeRef,type:"range",min:this.props.min||0,max:this.props.max,step:100,defaultValue:this.props.defaultValue||0,onChange:this.onSlide.bind(this)}),r.a.createElement("div",{className:"trend-line-text"},"Trend Line"))}},{key:"value",get:function(){return this.rangeRef.current.value}}]),t}(r.a.Component)),T=540,q={Infected:"green",Susceptible:"red",Immune:"steelblue",Dead:"gray",TrendLine:"black"},F=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(c.a)(this,Object(u.a)(t).call(this,e))).graphContainerRef=r.a.createRef(),n.state={visible:!1,tooltip:null,containerWidth:T,graphLabels:{}},n}return Object(h.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.toggleLabel("Infected"),f.on("data",function(){return e.setState({visible:!0})}),f.on("reset",function(){return e.setState({visible:!1})}),y.on("update",function(){return e.forceUpdate()}),window.addEventListener("resize",this.onResize.bind(this)),this.onResize()}},{key:"componentDidUpdate",value:function(e,t){t.yLabel!==this.state.yLabel&&this.setState({tooltip:null})}},{key:"toggleLabel",value:function(e){var t=Object.assign({},this.state.graphLabels);t[e]=!(e in t)||!t[e],this.setState({graphLabels:t})}},{key:"onGraphClick",value:function(e,t){var n=e.x,a=e.y;this.setState({tooltip:"".concat(Math.round(a)," people on day ").concat(n,".")})}},{key:"onResize",value:function(){var e=this.graphContainerRef.current;e&&this.setState({containerWidth:e.getBoundingClientRect().width})}},{key:"renderLabelButtons",value:function(){var e=this,t=this.state.graphLabels,n=[!0===t.Infected?"2px solid ".concat(q.Infected):null,!0===t.Susceptible?"2px solid ".concat(q.Susceptible):null,!0===t.Immune?"2px solid ".concat(q.Immune):null,!0===t.Dead?"2px solid ".concat(q.Dead):null];return r.a.createElement("div",null,r.a.createElement("button",{style:{color:q.Infected,borderBottom:n[0]},onClick:function(){return e.toggleLabel("Infected")},className:"pointer graph-button"},"Infected"),r.a.createElement("button",{style:{color:q.Susceptible,borderBottom:n[1]},onClick:function(){return e.toggleLabel("Susceptible")},className:"pointer graph-button"},"Susceptible"),r.a.createElement("button",{style:{color:q.Immune,borderBottom:n[2]},onClick:function(){return e.toggleLabel("Immune")},className:"pointer graph-button"},"Immune"),r.a.createElement("button",{style:{color:q.Dead,borderBottom:n[3]},onClick:function(){return e.toggleLabel("Dead")},className:"pointer graph-button"},"Dead"))}},{key:"downloadJPG",value:function(){var e=this.graphContainerRef.current;if(e){var t=e.querySelector("svg"),n=document.createElement("canvas"),a=n.getContext("2d");n.width=t.getAttribute("width"),n.height=t.getAttribute("height");var r=(new XMLSerializer).serializeToString(t),i=new Blob([r],{type:"image/svg+xml"}),l=window.URL.createObjectURL(i),s=document.createElement("img");s.onload=function(){a.imageSmoothingEnabled=!0,a.imageSmoothingQuality="high",a.drawImage(s,0,0),a.globalCompositeOperation="destination-over",a.fillStyle="white",a.fillRect(0,0,n.width,n.height);var e=document.createElement("img");e.onload=function(){window.URL.revokeObjectURL(l)},e.setAttribute("src",n.toDataURL("image/jpeg"))},s.setAttribute("src",l)}}},{key:"render",value:function(){if(this.state.visible){var e=y.getData(this.state.graphLabels),t=e.values.length?e.values[0].length:0,n=Math.min(this.state.containerWidth,T);return r.a.createElement("div",null,r.a.createElement("h5",null,e.labels.join(" + ")||"(Nothing Selected)"),this.renderLabelButtons(),r.a.createElement("div",{ref:this.graphContainerRef},r.a.createElement("div",null,r.a.createElement(N.LineChart,{data:e.values,width:n,height:475,margin:{top:10,bottom:50,left:80,right:10},axes:!0,axisLabels:{x:"Days Elapsed",y:"People"},dataPoints:t<0,xDomainRange:[y.startDay,y.endDay],yDomainRange:[0,e.largestY],lineColors:e.labels.map(function(e){return q[e]}),clickHandler:this.onGraphClick.bind(this),style:{".label":{fill:"black"},".axis":{fontSize:"0.75em",fontFamily:"arial"}}}),r.a.createElement(P,{max:e.largestY}))),r.a.createElement("div",null,r.a.createElement(_,{min:0,max:f.data.length-1||0})),r.a.createElement("div",{className:"text-center"},this.state.tooltip))}return r.a.createElement("div",{ref:this.graphContainerRef})}}]),t}(r.a.Component),V=function(e){function t(){return Object(s.a)(this,t),Object(c.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(j,null),r.a.createElement("br",null),r.a.createElement("span",{className:"Version"},"V0.2"),r.a.createElement("main",null,r.a.createElement(m.f,null,r.a.createElement(m.b,{color:"light"},r.a.createElement(m.c,null,r.a.createElement(m.t,{className:"text-center"},r.a.createElement(m.d,{lg:6},r.a.createElement(O,null)),r.a.createElement(m.d,{lg:6},r.a.createElement(F,null))),r.a.createElement("br",null),r.a.createElement("div",null,r.a.createElement(M,null)))))),r.a.createElement("footer",null,r.a.createElement(m.f,{className:"text-center"},r.a.createElement("hr",null),r.a.createElement(m.t,null,r.a.createElement(m.d,{lg:6},"Juall | Rosenblum | Pojero | Erry"),r.a.createElement(m.d,{lg:6},r.a.createElement("a",{href:"https://opensource.org/licenses/MIT",target:"_blank"},"MIT License"))))))}}]),t}(r.a.Component);l.a.render(r.a.createElement(V,null),document.querySelector("#root"))}},[[107,2,1]]]);
//# sourceMappingURL=main.360a4901.chunk.js.map