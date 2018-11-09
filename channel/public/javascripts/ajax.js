// JavaScript Document
/*
v2018, Kyaw Kyaw
ActiveXObject support for earlier IE browsers is removed
*/
//var currentURL = document.domain;
//var currentDomain = currentURL.split('.');
//var newDomain = "";
//var index = 0;
//if (currentDomain.length > 2)
//{
//    currentDomain.forEach(function(partDomain){
//        if (index !== 0){
//            if (newDomain === ""){
//                newDomain = partDomain;
//            }
//            else{
//                newDomain += "." + partDomain;
//            }
//        }
//        index++;
//    });
//    document.domain = newDomain;
//}

function BrowserInfo()
{
	this.is_ie = false;
	this.is_firefox = false;
	this.is_safari = false;
	this.is_opera = false;
	this.is_chrome = false;
	
	var agent = navigator.userAgent;
	if(agent.match(/opera/gi))
		this.is_opera = true;
	else if(agent.match(/chrome/gi))
		this.is_chrome = true;
	else if(agent.match(/safari/gi))
		this.is_safari = true;
	else if(agent.match(/firefox/gi))
		this.is_firefox = true;
	else if(agent.match(/msie/gi))
		this.is_ie = true;
}
function makeReq()
{
	var xmlHttpReq = null;
	
	if(window.XMLHttpRequest)
	{
  		xmlHttpReq = new XMLHttpRequest();
	}
	return xmlHttpReq;
}

function createXMLDocument()
{
	var xmlDoc;

	if (document.implementation && document.implementation.createDocument)
	{
		xmlDoc = document.implementation.createDocument("", "", null);
	}
	else
	{
		alert('Your browser cannot handle this script');
		return null;
	}
	return xmlDoc;
}

function loadXMLDoc(file)
{
	var xmlDoc = createXMLDocument();
	
	xmlDoc.async = true;
	xmlDoc.load(file);
	
	return xmlDoc;
}

function loadXMLStr(text)
{
	var doc
	text = text.replace(/<br>/g,"");

	try {
		var parser = new DOMParser();
		doc = parser.parseFromString(text, "text/xml");
	}
	catch (e) {
        var parser = new DOMParser();
        doc = parser.parseFromString("<root></root>", "text/xml");
		doc = null;
		//alert(e)
	}

	return doc;
}

function XMLtoString(xmldoc)
{
	var s = new XMLSerializer();
	return s.serializeToString(xmldoc);
}

function createElementWithName(tag, name)
{
	var object = document.createElement(tag);
	object.setAttribute("name", name);
	return object;

}

function setCookie(c_name, value, expiredays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString() + ";path=/");
}

function getCookie(c_name)
{
	if (document.cookie.length>0)
	{
		c_start=document.cookie.indexOf(c_name + "=");
		if (c_start!=-1)
		{ 
			c_start=c_start + c_name.length+1; 
			c_end=document.cookie.indexOf(";",c_start);
			if (c_end == -1) 
				c_end=document.cookie.length;
			return unescape(document.cookie.substring(c_start,c_end));
		} 
	}
	return "";
}


	Element.prototype.__defineGetter__("innerText", function (){
           var r = this.ownerDocument.createRange();
           r.selectNodeContents(this);
           return r.toString();
    });
    
	Element.prototype.selectNodes = function(sXPath) 
	{
		if (typeof XPathEvaluator != "undefined")
		{
            var oEvaluator = new XPathEvaluator();
            var oResult = oEvaluator.evaluate(sXPath, this, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);

            var aNodes = new Array();

            if (oResult != null)
            {
                var oElement = oResult.iterateNext();
                while(oElement)
                {
                    aNodes.push(oElement);
                    oElement = oResult.iterateNext();
                }
            }

            return aNodes;
		}
		else
		{
            sXPath = sXPath.replace(/\/|@/g, "_");
            return this.querySelectorAll(sXPath);
        }

	}

	Element.prototype.selectSingleNode = function(sXPath) 
	{
		if (typeof XPathEvaluator != "undefined")
		{
            var oEvaluator = new XPathEvaluator();

            // FIRST_ORDERED_NODE_TYPE returns the first match to the xpath.

            var oResult = oEvaluator.evaluate(sXPath, this, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);

            if (oResult != null)
            {
                return oResult.singleNodeValue;
            }
            else
            {
                return null;
            }
		}
		else
		{
            sXPath = sXPath.replace(/\/|@/g, "");
			return this.querySelector(sXPath);
		}

	}
	
	Node.prototype.transformNode = function (oXslDom) 
	{
		if (typeof XSLTProcessor != "undefined")
		{
            var oProcessor = new XSLTProcessor();
            oProcessor.importStylesheet(oXslDom);
            var oResultDom = oProcessor.transformToDocument(this);
            var sResult = oResultDom.xml;
            if (sResult.indexOf("<transformiix:result") > -1)
            {
                sResult = sResult.substring(sResult.indexOf(">") + 1, sResult.lastIndexOf("<"));
            }
            return sResult;
		}
		else
		{
            alert('Your browser cannot handle this script');
			return null;
		}
	}


/*
* Date Format 1.2.3
* (c) 2007-2009 Steven Levithan <stevenlevithan.com>
* MIT license
*
* Includes enhancements by Scott Trenda <scott.trenda.net>
* and Kris Kowal <cixar.com/~kris.kowal/>
*
* Accepts a date, a mask, or a date and a mask.
* Returns a formatted version of the given date.
* The date defaults to the current date/time.
* The mask defaults to dateFormat.masks.default.
*/

var dateFormat = function() {
    var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function(val, len) {
		    val = String(val);
		    len = len || 2;
		    while (val.length < len) val = "0" + val;
		    return val;
		};

    // Regexes and supporting functions are cached through closure
    return function(date, mask, utc) {
        var dF = dateFormat;

        // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
        if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
            mask = date;
            date = undefined;
        }

        // Passing date through Date applies Date.parse, if necessary
        date = date ? new Date(date) : new Date;
        if (isNaN(date)) throw SyntaxError("invalid date");

        mask = String(dF.masks[mask] || mask || dF.masks["default"]);

        // Allow setting the utc argument via the mask
        if (mask.slice(0, 4) == "UTC:") {
            mask = mask.slice(4);
            utc = true;
        }

        var _ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
			    d: d,
			    dd: pad(d),
			    ddd: dF.i18n.dayNames[D],
			    dddd: dF.i18n.dayNames[D + 7],
			    m: m + 1,
			    mm: pad(m + 1),
			    mmm: dF.i18n.monthNames[m],
			    mmmm: dF.i18n.monthNames[m + 12],
			    yy: String(y).slice(2),
			    yyyy: y,
			    h: H % 12 || 12,
			    hh: pad(H % 12 || 12),
			    H: H,
			    HH: pad(H),
			    M: M,
			    MM: pad(M),
			    s: s,
			    ss: pad(s),
			    l: pad(L, 3),
			    L: pad(L > 99 ? Math.round(L / 10) : L),
			    t: H < 12 ? "a" : "p",
			    tt: H < 12 ? "am" : "pm",
			    T: H < 12 ? "A" : "P",
			    TT: H < 12 ? "AM" : "PM",
			    Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
			    o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
			    S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

        return mask.replace(token, function($0) {
            return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
        });
    };
} ();

// Some common format strings
dateFormat.masks = {
    "default": "ddd mmm dd yyyy HH:MM:ss",
    shortDate: "m/d/yy",
    mediumDate: "mmm d, yyyy",
    longDate: "mmmm d, yyyy",
    fullDate: "dddd, mmmm d, yyyy",
    shortTime: "h:MM TT",
    mediumTime: "h:MM:ss TT",
    longTime: "h:MM:ss TT Z",
    isoDate: "yyyy-mm-dd",
    isoTime: "HH:MM:ss",
    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
    dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
    monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};

// For convenience...
Date.prototype.format = function(mask, utc) {
    return dateFormat(this, mask, utc);
};
