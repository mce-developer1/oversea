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

function playCourseware(idn, url, ref_idn, parent_id)
{
top.right_loaded = false;
if( idn != null && idn!="null")
{
		if(cur_idn!=null && cur_idn!="null")
		{
  			/*top.mainFrame.pre_idn = cur_idn;
  			top.mainFrame.pre_idn_ref = cur_idn_ref;*/
		    pre_idn = cur_idn;
		    pre_idn_ref = cur_idn_ref;
		}	
		/*top.mainFrame.cur_idn = idn;
		top.mainFrame.cur_idn_ref =ref_idn;*/

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
  /*      //if the structure has more than 2 layers, use child to retrive whole parent structure
        if (topic_item == null)
        if(!reTrvbyChild( idn ))
        {
        alert("Currently we just support 5 levels.");
        return false;
        }	
		  
		//check whether the children under the parent have been retrieved
        //if( topic_item != null && topic_item.selectNodes(".//item").length == 0)
        if( topic_item != null && selectNodes(".//item",topic_item).length == 0)
        if( !reTrvbyParent(parent_id))
        {
        alert( "Error in retriving child node.");
        return false;
        }
    */    
		//var items = topic_item.selectNodes(".//item[@identifierref][@isvisible='true']");
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
						pre_url = top.urlpath + selectSingleNode("//item[@identifierref = '" + pre_ref_idn + "']",top.manxml).getAttribute("href");
						
					}	
					if(i<items.length-1)
					{
						nxt_idn = items[i +1].getAttribute("identifier");
						nxt_ref_idn = items[i +1].getAttribute("identifierref");
						nxt_url = top.urlpath + selectSingleNode("//item[@identifierref = '" + nxt_ref_idn + "']",top.manxml).getAttribute("href");
					}	
					break;
				}
		    }
		    var cur_access = selectSingleNode("//item[@identifier = '" + idn + "']",top.manxml).getAttribute("access");
		    
		
            if(cur_access == "1") {

            
			if(url.substr(url.length-3,3)=="flv"){
				var flvpath="/lead/video/flvplayer.aspx?url=rtmp://vcexpress.lead.com.sg/videosource/datastream";
				url =url.replace(".com.sg/nres", ".com.sg"+flvpath+"/nres");
            }

            url = "tmpPage.aspx?location=" + url;
            parent.frames['mainFrame'].document.location.href = url;
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
		//var sub_items = tmpXml.documentElement.selectNodes("//root/item");
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
    if (agt.indexOf("safari") != -1)	//Safari
    {
        top.leftFrame.document.getElementById("divLeft").style.position = "absolute";
        top.leftFrame.document.getElementById("divLeft").style.left = "-5000px";
        document.getElementById("cont").cols = "0,*";
    } else {
        parent.document.getElementById("cont").cols = "0,*";
    }
}

function showMenu() {
    if (agt.indexOf("safari") != -1)	//Safari
    {
        top.leftFrame.document.getElementById("divLeft").style.position = "absolute";
        top.leftFrame.document.getElementById("divLeft").style.left = "0";
        document.getElementById("cont").cols = "20%,*";
    } else
        parent.document.getElementById("cont").cols = "20%,*";
}

function getScoreURL()
{
	//scoreURL = top.document.getElementById("scr_url").value;
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

function doSCOStart(param) {API.setScoID(param);return;}

function doSCOLeave(param) {
doSCOStatus();
API.LMSFinish("");
}

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