var cur_node=null;	//track on the tree, for pre/next play
var pre_node=null;
var nxt_node=null;
var cur_idn = null;	//for play list
var cur_idn_ref = null;	
var pre_show_idn = null;
var pre_show_idn_ref = null;
var scoreURL;
var top_parent_id; 
var SrcUrl = null
var getGuid = null;
var status_loaded = 0;
var getXML = null;

var pre_idn = null;
var pre_idn_ref=null;
var right_loaded = false;
/* right pannel
var cur_idn ;	//for play list
var cur_idn_ref ;	
var pre_idn ;
var pre_idn_ref ;
*/
function chkFileExist(path, fileName) {
    try {
        var objXMLHTTP = makeReq();
        objXMLHTTP.open("POST", "../oralbuddy/coursewareProc.aspx?task=chkExist&path=" + path + "&filename=" + fileName, true);
        objXMLHTTP.onreadystatechange = function () {
            if (objXMLHTTP.readyState == 4 && objXMLHTTP.status == 200) {
                var objXML = loadXMLStr(objXMLHTTP.responseText);
                var status = selectSingleNode("//root", objXML).getAttribute("status");
                return status;

                objXMLHTTP = null;
                objXML = null;
            } 
        }
        objXMLHTTP.send("test");
    } catch (e) {
        alert(e.message);
        return false;
    }
}
//fGetAudioPath: to be called after call playCourseware() to set the cur_idn
function fGetAudioPath() {
    var audiopath = top.audiopath + "/" + cur_idn + "/";
    return audiopath;
}
function fGetJarPath() {
    return jarPath;
}
function fGetSysCheckPath() {
    return sysCheckPath;
}

function playCourseware(idn, url, ref_idn, parent_id)
{
top.right_loaded = false;
if( idn != null && idn!="null")
{
		if(cur_idn!=null && cur_idn!="null")
		{
		    pre_idn = cur_idn;
		    pre_idn_ref = cur_idn_ref;
		}	
		cur_idn = idn;
		cur_idn_ref = ref_idn;
		var pre_idn_here="NA";
		var pre_url="NA";
		var pre_ref_idn="NA";
		var nxt_idn="NA";
		var nxt_url="NA";
		var nxt_ref_idn="NA";
		var currentTitle="";
        var topic_item = selectSingleNode("//item[@identifier='"+ parent_id + "']",top.manxml);
       // full manifest will be retrieved at beginning
		var items = selectNodes(".//item[@identifierref][@isvisible='true']",topic_item);
		if (items.length>0)
		for (var i=0; i<items.length; i++)
		{
			if(items[i].getAttribute("identifier") == cur_idn)
			{
				currentTitle = items[i].firstChild.firstChild.nodeValue;
				if(i>0)
				{
					pre_idn_here = items[i-1].getAttribute("identifier");
					pre_ref_idn = items[i-1].getAttribute("identifierref");
					if ((items[i - 1].getAttribute("parameters") != null) && (items[i - 1].getAttribute("parameters").indexOf("objtype=test") > -1))
					    pre_url = top.resovePath + selectSingleNode("//item[@identifierref = '" + pre_ref_idn + "']", top.manxml).getAttribute("href");
					else
						pre_url = top.urlpath + selectSingleNode("//item[@identifierref = '" + pre_ref_idn + "']", top.manxml).getAttribute("href");
				}	
				if(i<items.length-1)
				{
					nxt_idn = items[i +1].getAttribute("identifier");
					nxt_ref_idn = items[i + 1].getAttribute("identifierref");
					if ((items[i + 1].getAttribute("parameters") != null) && (items[i + 1].getAttribute("parameters").indexOf("objtype=test") > -1))
						nxt_url = top.resovePath + selectSingleNode("//item[@identifierref = '" + nxt_ref_idn + "']", top.manxml).getAttribute("href");
                    else
						nxt_url = top.urlpath + selectSingleNode("//item[@identifierref = '" + nxt_ref_idn + "']",top.manxml).getAttribute("href");
				}	
				break;
			}
		}
		var cur_access = selectSingleNode("//item[@identifier = '" + idn + "']",top.manxml).getAttribute("access");
        if(cur_access == "1") {
			if(url.substr(url.length-3,3)=="flv"){
				var flvpath="/lead/video/flvplayer.aspx?url=rtmp://vcexpress.lead.com.sg/videosource/datastream";
				url =url.replace(".sg/nres", ".sg"+flvpath+"/nres");
				//handle the status for flv resource 2014-09-23
				doSCOStart(cur_idn);
				doLMSInitialize();
				doSCOComplet();
				//end of handle
            }
			if(isFilePDFOrDocs(url.toLowerCase()))
				top.frames["topFrame"].document.getElementById("ifrm_doc").src = "tmpPage.aspx?location=" + url;
			else
				parent.frames['mainFrame'].document.location.href = "tmpPage.aspx?location=" + url;
		}	
		else
		{
			if (cur_access == "0") {
			    parent.frames['mainFrame'].document.location.href = top.teacherRes;     //top.document.getElementById("teacherRes").value;
			}
			else {
			    parent.frames['mainFrame'].document.location.href = top.lockpage;    //top.document.getElementById("teacherRes").value;
			}
        }
        top.topFrame.updateSCOInfo(parent_id, currentTitle, pre_idn_here, pre_url, pre_ref_idn, nxt_idn, nxt_url, nxt_ref_idn); //
    }
}

function thisMovie(movieName) 
{
    if(navigator.appName.indexOf("Microsoft") != -1) 
    {
      return window[movieName];
    }
    else 
    { 
    return document[movieName];
    }
}

function reTrvbyChild(child_id)
{
	var parent_id="";
	try {
		var objXMLHTTP = makeReq();
		objXMLHTTP.open("POST", "rightpanel.aspx?task=retrvbyChild&node_id=" + child_id, true);
		objXMLHTTP.onreadystatechange = function () {
		    if (objXMLHTTP.readyState == 4 && objXMLHTTP.status == 200) {
		        var objXML = loadXMLStr(objXMLHTTP.responseText);
		        if (selectSingleNode("//root", objXML).getAttribute("status") == "succeed") {
		            parent_id = selectSingleNode("//root", objXML).getAttribute("parent_id");
		            top.mainFrame.document.getElementById("hidCnt").value = XMLtoString(selectSingleNode("//root", objXML));
		            updateXml(parent_id);
		        }
		        if (XMLtoString(objXML).indexOf("Retrieve failed") != -1) {
		            objXMLHTTP = null;
		            objXML = null;
		            return false;
		        }
		        objXMLHTTP = null;
		        objXML = null;
		        return true;
		    } 
		}
		objXMLHTTP.send("test");
	} catch (e) {
		alert(e.message);
		return false;
	}
}

function reTrvbyParent(parent_id)
{
    try {
            top.mainFrame.document.getElementById("hidCnt").value = XMLtoString(selectSingleNode("//item[@identifier='" + parent_id + "']", top.manxml));
		return true;
	} catch (e) {
		alert(e.message);
		return false;
	}
}

function updateXml(top_id)
{
	var item = selectSingleNode("//item[@identifier ='" + top_id + "'][@isvisible='true']",top.manxml);
	if( item != null && selectNodes("item",item).length == 0 && top.mainFrame.document.getElementById("hidCnt").value != "")
	{
		var tmpXml;
		var strTmp = top.mainFrame.document.getElementById("hidCnt").value;
		if(strTmp.indexOf("<root") != -1)
			{tmpXml = loadXMLStr( strTmp);
			}
		else	
			{tmpXml = loadXMLStr("<root>" + strTmp + "</root>");
			}
		var sub_items = selectNodes("//root/item",tmpXml);
		for (var i=0; i<sub_items.length; i++)
		{
			var tmpNd = sub_items[i];
			if(window.openDatabase)//only for safari
			{
			  var newNode = top.manxml.importNode(tmpNd,true);
			  item.appendChild(newNode);
			}
			else
			{
			  item.appendChild(tmpNd);
			}
		}	
		item.setAttribute("appdChd","1");
	}
}

function hideMenu() {
    $(".cpv-left-container").animate({
        left: '-260px'
    });
    $(".cpv-right-container").animate({
        left: '0px'
    });
    $("#mainFrame").animate({
        width: ($(window).width() + "px")
    }); 
}

function showMenu() {
    $(".cpv-left-container").animate({
        left: '0px'
    });
    $(".cpv-right-container").animate({
        left: '260px'
    });
    $("#mainFrame").animate({
        width: ($(window).width() - 260 + "px")
    }); 
}

function getScoreURL()
{
	scoreURL = SrcUrl;
	return scoreURL;
}

function setScoreURL(scr_url)
{	scoreURL = scr_url;}

function debugMSG(str)
{	//alert("DEBUG:\r"+ str + "\r");
}

function exitCourseware()
{	top.window.close();	}

function clearTopicInfo()
{	//top.topFrame.topNav.updateSCOInfo("NA", "NA", "NA","NA","NA", "NA", "NA","NA");	
    top.topFrame.updateSCOInfo("NA", "NA", "NA","NA","NA", "NA", "NA","NA");
}

function isFilePDFOrDocs(fileName) {
	var extArray = [".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".rtf"];
	fileName = fileName.toLowerCase();
	for (var i = 0; i < extArray.length; i++) {
		if (fileName.lastIndexOf(extArray[i]) != -1) {
			return true;
		}
	}
	return false;
}

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

/*******************************************************************************************************/
var API;

function doSCOPackage() {
API=new APIAdapter();
API.setLogoutCallBack("doSCOLogoutLMS");
API.setDebug(false);
//API.setServerName("http://web.leadlms.com.sg/SchoolDNA/scormruntime/LMSServer.asp");
API.setServerName("scormruntime.aspx");
API.setPackageID(getGuid);
}

function doSCOStart(param) { API.setScoID(param); return; }



function doSCOLeave(param) {
    doSCOStatus();
    API.LMSFinish("");
}
/* begin add for type asset 2014-09-11 */
function doLMSInitialize() {
    doSCOStatus();
    API.LMSInitialize("");
}

function doSCOIncomplet() {
    doSCOStatus();
    API.LMSSetValue("cmi.core.lesson_status", "incomplete");
}

function doSCOComplet() {
    doSCOStatus();
    API.LMSSetValue("cmi.core.lesson_status", "completed");
}

function doLMSGetValue(name) {
    doSCOStatus();
    return API.LMSGetValue(name);
}
/* end add for type asset*/

function doSCOStatus() {API.getCMIStatus(API.PackageID);}
function doSCOTimeout() {
var param = top.fraToolbar.timeoutaction;
if (typeof(param)!='undefined') {
var ary1=param.split(",");
if (ary1[0]=='exit') {	fraLeftFrame.fraTree.donext();}
}}

function doSCONext() {fraLeftFrame.fraTree.donext();}

function doSCOExit() {
    API.LMSSetValue("cmi.core.exit", "logout");
    try {
        var content=top.bottomFrame.fraRightFrame;
        content.document.write("");
        content.document.close();
        top.bottomFrame.showMessageBox('Exit...');
    } catch(e) {};
}

function doSCOLogoutLMS() {top.window.close();}

function createScorm(manifest, metadata) {return API.createScorm(manifest, metadata);}

function LMSInitialize(param) {return API.LMSInitialize();}

function LMSFinish(param) {return API.LMSFinish(param);}

function LMSGetValue(path) {return API.LMSGetValue(path);}

function LMSSetValue(path, value) {return API.LMSSetValue(path, value);}

function LMSCommit(param) {return API.LMSCommit(param);}

function LMSGetLastError() {return API.LMSGetLastError();}

function LMSGetErrorString() {return API.LMSGetErrorString();}

function LMSGetDiagnostic() {return API.LMSGetDiagnostic();}

function CMIStateCallback(ret) {
if (ret != null) {
	for (var i=0; i<ret.length; ++i) {
		var ary1=ret[i].split(",");
		var id=ary1[0];
		var status=ary1[1];
		if(document.getElementById("fraLeftFrame")!=null)
			fraLeftFrame.fraTree.setscostatus(id,status);
		}
	}
}

function thisMovie(movieName) {
    if (navigator.appName.indexOf("Microsoft") != -1) {        return window[movieName];    }
    else {        return document[movieName];    }
}