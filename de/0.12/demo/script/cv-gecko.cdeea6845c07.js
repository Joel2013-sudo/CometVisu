//PROCESSED
qx.$$packageData['16384']={"locales":{},"resources":{"plugins/openweathermap/owm_basic_style.css":"cv","plugins/openweathermap/owm_core.js":"cv","plugins/openweathermap/owm_weathericon.css":"cv"},"translations":{"de":{},"en":{}}};
qx.Part.$$notifyLoad("16384", function() {
(function(){var a='"><div id="owm_',b='cssClass',c="openweathermap",d='<div class="',e='plugins/openweathermap/owm_core.js',f="setup.dom.finished",g=" ",h='cv.plugins.OpenweatherMap',i='plugins/openweathermap/owm_basic_style.css',j='plugins/openweathermap/owm_weathericon.css',k='" class="openweathermap_value"></div></div>',l="String",m="widget clearfix text openweathermap",n='interval';qx.Class.define(h,{extend:cv.ui.structure.AbstractWidget,include:cv.ui.common.Refresh,construct:function(o){o.refresh=o.refresh*60;cv.ui.structure.AbstractWidget.call(this,o);this.__uH={};Object.keys(o).forEach(function(p){if(o[p]){this.__uH[p]=o[p];};},this);if(cv.TemplateEngine.getInstance().isDomFinished()){this._refreshAction();}else {qx.event.message.Bus.subscribe(f,function(){this._refreshAction();},this);};},statics:{parse:function(q,u,s,r){var t=cv.parser.WidgetParser.parseElement(this,q,u,s,r,this.getAttributeToPropertyMappings());cv.parser.WidgetParser.parseRefresh(q,u);return t;},getAttributeToPropertyMappings:function(){return {'class':{target:b},'lang':{},'owID':{},'q':{},'lat':{},'lon':{},'units':{},'type':{},'forecast24hItems':{},'forecastDailyItems':{},'detailItems':{},'showSunrise':{},'appid':{},'description':{}};}},properties:{cssClass:{check:l,nullable:true},lang:{check:l,nullable:true},owID:{check:l,nullable:true},q:{check:l,nullable:true},lat:{check:l,nullable:true},lon:{check:l,nullable:true},units:{check:l,nullable:true},type:{check:l,nullable:true},forecast24hItems:{check:l,nullable:true},forecastDailyhItems:{check:l,nullable:true},showSunrise:{check:l,nullable:true},detailItems:{check:l,nullable:true},appid:{check:l,nullable:true},description:{check:l,nullable:true}},members:{__uH:null,_getInnerDomString:function(){var v=m;if(this.getCssClass()){v+=g+this.getCssClass();};return d+v+a+this.getPath()+k;},_setupRefreshAction:function(){this._timer=new qx.event.Timer(this.getRefresh());this._timer.addListener(n,this._refreshAction,this);this._timer.start();this._refreshAction();},_refreshAction:function(){var w=$(this.getDomElement());w.openweathermap(this.__uH);}},defer:function(x){var y=cv.util.ScriptLoader.getInstance();y.addStyles(i);y.addStyles(j);y.addScripts(e);cv.parser.WidgetParser.addHandler(c,cv.plugins.OpenweatherMap);cv.ui.structure.WidgetFactory.registerClass(c,x);}});})();
}); var jOWM=jOWM||{};(function($){$.fn.openweathermap=function(options,fn){var defaults={baseURL:'https://api.openweathermap.org/data/2.5/',detailItems:1,forecast24hItems:8,forecastDailyItems:4,showSunrise:"true",forecastToday:true,units:'metric',type:'like',refresh:30,appid:'',description:''};var options=$.extend(defaults,options);options.detailItems=parseInt(options.detailItems,10);if(options.detailItems<0){options.detailItems=0;}
if(options.detailItems>1){options.detailItems=1;}
options.forecast24hItems=parseInt(options.forecast24hItems,10);if(options.forecast24hItems<0){options.forecast24hItems=0;}
if(options.forecast24hItems>8){options.forecast24hItems=8;}
options.forecastDailyItems=parseInt(options.forecastDailyItems,10);if(options.forecastDailyItems<0){options.forecastDailyItems=0;}
if(options.forecastDailyItems>4){options.forecastDailyItems=4;}
if(options.showSunrise!=="false"){options.showSunrise="true";}
Date.ext.locales['de']={a:['So','Mo','Di','Mi','Do','Fr','Sa'],A:['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'],b:['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'],B:['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],};return this.each(function(i,e){$element=$(e);if(!$element.hasClass('jowm')){$element.addClass('jowm');}
_process(e,options);});};var _process=function(e,options){var html='';var paramsDefault=_parametersFromOptions(options);var currentURL=options.baseURL+'weather?'+paramsDefault.join('&');var forecastURL=options.baseURL+'forecast/?'+paramsDefault.join('&')+'&cnt=8';var forecastDailyURL=options.baseURL+'forecast/?'+paramsDefault.join('&')+'&cnt=39';if($('ul.detailed',$(e)).length===0){$('<ul>').addClass('detailed').addClass('clearfix').appendTo($(e).children(":first"));}
if(options.forecast24hItems>0){if($('ul.forecast',$(e)).length===0){$('<ul>').addClass('forecast').addClass('clearfix').appendTo($(e).children(":first"));}}
if(options.forecastDailyItems>0){if($('ul.forecastDaily',$(e)).length===0){$('<ul>').addClass('forecastDaily').addClass('clearfix').appendTo($(e).children(":first"));}}
_request(options.baseURL+'weather?'+paramsDefault.join('&'),function(data){if(data.cod==200){options.sunrise=data.sys.sunrise;options.sunset=data.sys.sunset;options.cityname=data.name;options.id=data.id;if(options.description===''){$('div.openweathermap_value').html("<p>"+options.cityname+"</p>");}else if(options.description==='false'){$('div.openweathermap_value').parent().css('display','none');}else{$('div.openweathermap_value').html("<p>"+options.description+"</p>");}
_processDataDetailed(e,currentURL,options);if(options.forecast24hItems>0){_processDataForecast(e,forecastURL,options);}
if(options.forecastDailyItems>0){_processDataDaily(e,forecastDailyURL,options);}}else{$(e).after('<!-- Failed to fetch detailed weather data. -->');}});};var _processDataDetailed=function(e,url,options){$('ul.detailed',$(e)).html('');if(options.detailItems===0){return;}
_request(url,function(data){if(data.cod==200){$item=$('<li>');if(data.dt<options.sunrise||data.dt>options.sunset){$item.addClass('night');}
$item.addClass('first');$item.addClass('last');$item.html(jOWM.theme('weatherDetailItem',data,options));$item.appendTo($('ul.detailed',$(e)));}else{$(e).after('<!-- Failed to fetch detailed weather data. -->');}});if(options.showSunrise==="true"){var html=_proccessSunrise(options);$item=$(html);$item.appendTo($('ul.detailed',$(e)));}};var _processDataForecast=function(e,url,options){$('ul.forecast',$(e)).html('');$('ul.forecast',$(e)).append('<div class="separationLine clearfix">');if(options.forecast24hItems===0){return;}
_request(url,function(data){if(data.cod==200){var dataItems=data.list;$.each(dataItems,function(index,elem){if(index<(options.forecast24hItems)){$item=$('<li>');if(elem.dt<options.sunrise||elem.dt>options.sunset){$item.addClass('night');}
if(index===0){$item.addClass('first');}
if(index===(options.forecast24hItems-1)){$item.addClass('last');}
$item.html(jOWM.theme('weatherForecastItem',elem,options));$item.appendTo($('ul.forecast',$(e)));}});}else{$(e).after('<!-- Failed to fetch forecast weather data. -->');}});};var _processDataDaily=function(e,url,options){$('ul.forecastDaily',$(e)).html('');$('ul.forecastDaily',$(e)).append('<div class="separationLine clearfix">');if(options.forecastDailyItems===0){return;}
_request(url,function(data){if(data.cod==200){var dataItems=data.list;var daily=_generateDaily(dataItems,options);var output='<li><div class="weather-forecast weather-thermo clearfix">';output+=' <div class="day">-</div>';output+=' <div class="weather-icon legend" ></div>';output+=' <div class="temperature high">'+"max"+'</div>';output+=' <div class="temperature low">'+"min"+'</div>';output+='</div></li>';$item=$('<li>');$item.append(output);$item.appendTo($('ul.forecastDaily',$(e)));$.each(daily,function(index,elem){if(index<(options.forecastDailyItems)){$item=$('<li>');if(index===0){$item.addClass('first');}
if(index===(options.forecastDailyItems-1)){$item.addClass('last');}
$item.html(jOWM.theme('weatherForecastDailyItem',elem,options));$item.appendTo($('ul.forecastDaily',$(e)));}});}else{$(e).after('<!-- Failed to fetch forecast weather data. -->');}});};function _proccessSunrise(options){var d=new Date(options.sunrise*1000);var output='<li class="sunrise-sunset"><div class="weather-forecast weather-sunrise clearfix" style="float: left;">';output+='<div class="weather-icon"></div>';output+='<div class="sunrise-sunset">'+d.strftime('%H:%M')+'</div> </div>';d=new Date(options.sunset*1000);output+='<div class="weather-forecast weather-sunset clearfix" style="float: left;">';output+='<div class="weather-icon"></div>';output+='<div class="sunrise-sunset">'+d.strftime('%H:%M')+'</div> </div></li>';return output;}
function _generateDaily(dataItems,options){var arrDailyWeather=new Array();var minTemp,maxTemp;var newDay=false;var weather;$.each(dataItems,function(index,elem){var d=new Date(dataItems[index].dt*1000);d.locale=options.lang;if(d.getHours()<3){minTemp=dataItems[index].main.temp_min;maxTemp=dataItems[index].main.temp_max;newDay=true;}else if(newDay){if(minTemp>dataItems[index].main.temp_min){minTemp=dataItems[index].main.temp_min;}
if(maxTemp<dataItems[index].main.temp_max){maxTemp=dataItems[index].main.temp_max;}
if((d.getHours()>10)&&(d.getHours()<14)){weather=dataItems[index].weather;}
if(d.getHours()>=21){arrDailyWeather.push({day:d.strftime('%a'),min_temp:minTemp,max_temp:maxTemp,weather:weather});newDay=false;}}});return arrDailyWeather;}
var _parametersFromOptions=function(options){var items=[];if(options.hasOwnProperty('lang')){items.push('lang='+options.lang);}
if(options.hasOwnProperty('owID')){items.push('id='+options.owID);}else if(options.hasOwnProperty('q')){items.push('q='+options.q);}else if(options.hasOwnProperty('lat')&&options.hasOwnProperty('lon')){items.push('lat='+options.lat);items.push('lon='+options.lon);}
if(options.hasOwnProperty('units')){items.push('units='+options.units);}
if(options.hasOwnProperty('type')){items.push('type='+options.type);}
if(options.hasOwnProperty('appid')){items.push('appid='+options.appid);}
return items;};var _request=function(url,callback){var req=new qx.io.request.Xhr(url);req.setAccept("application/json");req.addListener("success",function(ev){var req=ev.getTarget();var data=req.getResponse();if(typeof data==='string'){data=JSON.parse(data);}
callback(data);},this);req.addListener("error",function(ev){console.log('error requesting',url,ev.getData());},this);req.send();};jOWM.theme=function(func){var args=Array.prototype.slice.apply(arguments,[1]);return(jOWM.theme[func]||jOWM.theme.prototype[func]).apply(this,args);};jOWM.theme.prototype.weatherTemperature=function(temperature,precision,suffix){suffix=suffix||'°';return parseFloat(temperature).toFixed(precision)+suffix;}
jOWM.theme.prototype.weatherDetailItem=function(data,options){var weather=data.weather[0];var temperature=data.main;var d=new Date(data.dt*1000);d.locale=options.lang;var output='<div class="weather-detailed weather-'+weather.id+' clearfix">';output+=' <div class="weather">';output+='  <span class="weather-icon" data-weather-text="'+weather.description+'" data-weather-code="'+weather.id+'"></span>';output+=' </div>';output+=' <div class="temperature">'+jOWM.theme('weatherTemperature',temperature.temp,1)+'</div>';output+='</div>';return output;};jOWM.theme.prototype.weatherForecastItem=function(data,options){var weather=data.weather[0];var temperature=data.main;var d=new Date(data.dt*1000);d.locale=options.lang;var output='<div class="weather-forecast weather-'+weather.id+' clearfix">';output+=' <div class="day">'+d.strftime('%H:%M')+'</div>';output+=' <div class="weather-icon" data-weather-text="'+weather.description+'" data-weather-code="'+weather.id+'"></div>';output+=' <div class="temperature high">'+jOWM.theme('weatherTemperature',temperature.temp_max,0,' °C')+'</div>';output+='</div>';return output;};jOWM.theme.prototype.weatherForecastDailyItem=function(data,options){var weather=data.weather[0];var output='<div class="weather-forecast weather-'+weather.id+' ">';output+=' <div class="day">'+data.day+'</div>';output+=' <div class="weather-icon" data-weather-text="'+weather.description+'" data-weather-code="'+weather.id+'"></div>';output+=' <div class="temperature high">'+jOWM.theme('weatherTemperature',data.max_temp,0,' °C')+'</div>';output+=' <div class="temperature low">'+jOWM.theme('weatherTemperature',data.min_temp,0,' °C')+'</div>';output+='</div>';return output;};})(jQuery);