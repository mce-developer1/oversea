
function APIAdapter() {
	this.initialize = fncInitialize;
	//if(this.State != "Initialized")          //for testing for android
	    this.initialize();
	
	// LMS supoort function - begin
	
	this.setError = fncSetError;
	this.syntaxCheck = fncSyntaxCheck;
	this.checkDataType = fncCheckDataType;
	this.contactServer = fncContactServer;
	this.checkComplexPath = fncCheckComplexPath;
	this.getComplexRule = fncGetComplexRule;
	this.setDebug = fncSetDebug;
	this.log = fncLog;
	this.checkID = fncCheckID;
	this.clearStatus = fncClearStatus;
	this.setLogoutCallBack = fncSetLogoutCallBack;
	
	// LMS supoort function - end
	
	// LMS API mandatory methods definition - begin
	
	this.LMSInitialize = fncLMSInitialize;
	this.LMSFinish = fncLMSFinish;
	this.LMSGetValue = fncLMSGetValue;
	this.LMSSetValue = fncLMSSetValue;
	this.LMSCommit = fncLMSCommit;
	this.LMSGetLastError = fncLMSGetLastError;
	this.LMSGetErrorString = fncLMSGetErrorString;
	this.LMSGetDiagnostic = fncLMSGetDiagnostic;
	this.setScoID = fncSetScoID;
	this.getScoID = fncGetScoID;
	this.setPackageID = fncSetPackageID;
	this.getPackageID = fncGetPackageID;
	this.leave = fncLeave;
	this.setServerName = fncSetServerName;
	this.createCWPScorm = fncCreateCWPScorm;		//to allow a SCORM to create a SCORM
	
	this.getCMIStatus = fncGetCMIStatus;
	this.callback = fncCallback;
	this.push2Arry = fncpush2Arry;
	this.chkArry = fncchkArry;
	
	// LMS API mandatory methods definition - end
	
	// testing method definition - begin
	
	this.getError = fncGetError;
	
	// testing method definition - end
}

function fncCreateCWPScorm(manifest, title, htmlData, xmlData){
	if (this.State != "Initialized") {
		this.setError("301", "", "", "");
		this.log("createCWPScorm", "", "");
		return "false";
	}
		
	if (!this.checkID("createCWPScorm")) {
		return "false";
	}
	
	manifest = manifest.replace(/'/g, "''"); // encode single quote for sql server
	manifest = manifest.replace(/&/g, "&amp;"); // to make && double encode
	manifest = manifest.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&apos;").replace(/"/g, "&quot;").replace(/&/g, "&amp;");	
	title = title.replace(/'/g, "''"); // encode single quote for sql server
	title = title.replace(/&/g, "&amp;"); // to make && double encode
	title = title.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&apos;").replace(/"/g, "&quot;").replace(/&/g, "&amp;");
	var result = this.contactServer("createCWPScorm", "<api action=\"createCWPScorm\"  manifest=\"" + manifest + "\" title=\"" + title + "\" htmlData=\"" + htmlData + "\" xmlData=\"" + xmlData + "\" scoid=\"" + this.ScoID + "\" packageid=\"" + this.PackageID + "\" />");
	if (this.errorCode == "0") {
		this.log("createCWPScorm", manifest+","+title, escape(result));
		return "true";
	} else {
		this.log("createCWPScorm", "", "");
	 	return "false";
	}
}
function fncLMSInitialize(param, myScoID) {
    //alert("inside  LMS Initialize.");
    if (param == undefined) {
        this.log("LMSInitialize10", "param is undefined", myScoID + "__" + this.State);
        param = "";
    }
    if (this.State == "Initialized" && this.InitializedID == myScoID) {
        //  alert("Initialized already. state: " + this.State);
        this.log("LMSInitialize11", param, this.ScoID + "__" + this.State + "+++" + thisScoID);
        return "true";
    }
    if (this.State != "NotInitialized") {
        this.setError("101", "", "", "");
        //this.setError("101", myScoID + "__" + this.State, "", "");
        this.log("LMSInitialize12_101 error ", param, this.ScoID + "__" + this.State + "+++" + myScoID);
        return "false";
    }
    if (param != "") {
        this.setError("201", "", "", "");
        this.log("LMSInitialize13", param, this.ScoID + "__" + this.State + "+++" + myScoID);
        return "false";
    }

    if (!this.checkID("LMSInitialize")) {
        return "false";
    }

    this.contactServer("initialize", "<api action=\"LMSInitialize\" scoid=\"" + myScoID + "\" packageid=\"" + this.PackageID + "\" />");
    if (this.errorCode == "0") {
        this.State = "Initialized";
        this.InitializedID = thisScoID;
        this.log("LMSInitialize14", param, "<api action=\"LMSInitialize\" scoid=\"" + myScoID + "\" packageid=\"" + this.PackageID + "\" />");
        return "true";
    } else {
        //this.log("LMSInitialize", param, "");
    this.log("LMSInitialize_error1", param + "__" + "<api action=\"LMSInitialize\" scoid=\"" + myScoID + "\" packageid=\"" + this.PackageID + "\" />", this.errorCode);
        return "false";
    }

}

function fncLMSInitialize(param) {
    //alert("inside  LMS Initialize.");

    if (!this.checkID("LMSInitialize")) {
        return "false";
    }

    var thisScoID = this.ScoID;
    if (param == undefined) {
        this.log("LMSInitialize0", "param is undefined", this.ScoID + "__" + this.State);
        param = "";
    }
    if (this.State == "Initialized" && this.InitializedID == thisScoID) {
      //  alert("Initialized already. state: " + this.State);
        this.log("LMSInitialize1", param, this.ScoID + "__" + this.State + "+++" + thisScoID);
        return "true";
    }
	if (this.State != "NotInitialized") {
	    this.setError("101", "", "", "");
	    //this.setError("101", this.ScoID + "__" + this.State, "", "");
	    this.log("LMSInitialize2_101 error ", param, this.ScoID + "__" + this.State + "+++" + thisScoID);
		return "false";
	}
	if (param != "") {
	    this.setError("201", "", "", "");
	    this.log("LMSInitialize3", param, this.ScoID + "__" + this.State + "+++" + thisScoID);
		return "false";
	}

	this.contactServer("initialize", "<api action=\"LMSInitialize\" scoid=\"" + thisScoID + "\" packageid=\"" + this.PackageID + "\" />");
	if (this.errorCode == "0") {
	    this.State = "Initialized";
	    this.InitializedID = thisScoID;
	    this.push2Arry(thisScoID);
	    this.log("LMSInitialize4", param, "<api action=\"LMSInitialize\" scoid=\"" + thisScoID + "\" packageid=\"" + this.PackageID + "\" />");
		return "true";
	} else {
	//this.log("LMSInitialize", param, "");
	this.log("LMSInitialize_error", param + "__" + "<api action=\"LMSInitialize\" scoid=\"" + thisScoID + "\" packageid=\"" + this.PackageID + "\" />", this.errorCode);
		return "false";
	}
	
}

function fncpush2Arry(param) {
    if (this.myArray.length > 4) {
        this.myArray.splice(0, 1);   //to keep only 4 in the arry
    }
    this.myArray.push(param);
}

function fncchkArry(param) {
    var toRtn = false;
    for (var i = 0; i < this.myArray.length; i++) {
        if (this.myArray[i] == param)
            toRtn = true;
    }
    return toRtn;
}

function fncLMSFinish(param) {
    var thisScoID = this.ScoID;
	if (this.State == "NotInitialized") {
	    return "true";
		/*this.setError("301", this.ScoID, "", "");
		this.log("LMSFinish_Error", param, this.ScoID);
		return "false";*/
	}

	if (this.State == "FinishedTrue" || this.State == "FinishedFalse") {
	    this.setError("101", "", "", "");
		this.log("LMSFinish1", param, "");
		return "false";
	}
	
	if (param != "") {
	    this.setError("201", "", "", "");
		this.log("LMSFinish2", param, "");
		return "false";
	}
	
	if (!this.checkID("LMSFinish")) {
		return "false";
	}

	this.log("LMSFinish_debug", param, " scoid=\"" + this.State + "+++" + thisScoID + "\" packageid=\"" + this.PackageID);
	var result = this.contactServer("finish", "<api action=\"LMSFinish\" scoid=\"" + thisScoID + "\" packageid=\"" + this.PackageID + "\" />");
	if (this.errorCode == 0) {
		this.State = "FinishedTrue";
		this.log("LMSFinish3", param, this.ScoID + "__" + this.State + "+++" + thisScoID);
		if (result == "logout") {
			try {
				eval(this.LogoutCallBack + "()");
			} catch (e) {
			}
		}
		return "true";
	} else {
		this.State = "FinishedFalse";
		this.log("LMSFinish4", param, this.ScoID + "__" + this.State + "+++" + thisScoID);
		return "false";
	}
}

function fncLMSGetValue(path) {
    var thisScoID = this.ScoID;
    if (this.State != "Initialized" ||(this.State == "Initialized" && !this.chkArry(thisScoID))) {  //myArry will hold the last 4 initialized SCO
	   /* 
	    this.setError("301", this.ScoID + "__" + this.State, "", "");
	    this.log("LMSGetValue1", path, this.ScoID + "__" + this.State);
		return "";
		*/
        this.LMSInitialize("", thisScoID);
        this.log("LMSGetValue1 _ force to initialize", path, this.ScoID + "__" + this.State + "+++" + thisScoID);
		
	}
	
	if (!this.syntaxCheck("r", path, "")) {
		this.log("LMSGetValue2", path, "");
		return "";
	}
	
	if (!this.checkID("LMSGetValue")) {
		return "";
	}
	
	var result;
	var re = /.*\._children$/g;
	//if (re.test(path)) {
	  if (path.match(re)) {
		if (path.indexOf("cmi.core.") != -1) {
			//result = this.cmiModelMandatory.Item(path).split("|")[4];
			  result = get_obj_propert(this.cmiModelMandatory,path).split("|")[4];
		} else {
			result = this.getComplexRule(this.cmiModelOptional, path).split("|")[5];
		}
		this.setError("0", "", "", "");
		this.log("LMSGetValue3", path, result);
	} else {
	var result_beforeEncode = this.contactServer("get", "<api action=\"LMSGetValue\" path=\"" + path + "\" scoid=\"" + thisScoID + "\" packageid=\"" + this.PackageID + "\" />");
		result = result_beforeEncode.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&apos;/g, "'").replace(/&quot;/g, "\"");
		this.log("LMSGetValue4", path, result_beforeEncode.replace(/&apos;/g, "'")); // &apos; won't display correctly in html
		this.log("LMSGetValue5", "XML: ", "<api action=\"LMSGetValue\" path=\"" + path + "\" scoid=\"" + thisScoID + "\" packageid=\"" + this.PackageID + "\" />"); // &apos; won't display correctly in html
	}
	return result;
}

function fncLMSSetValue(path, value) {
    // alert("LMSSetValue: " + value);
    var thisScoID = this.ScoID;
    //convert all non string to string.
    if (typeof value != "string")
        value = '' + value;
    //if (this.State != "Initialized" || (this.State == "Initialized" && this.InitializedID != thisScoID)) {
    if (this.State != "Initialized" || (this.State == "Initialized" && !this.chkArry(thisScoID))) {  //myArry will hold the last 4 initialized SCO
        /*
	    this.setError("301", this.ScoID + "__" + this.State, "", "");
	    this.log("LMSSetValue1", path + ", " + value, this.ScoID + "__" + this.State);
	    return "false";
	    */
        this.LMSInitialize("", thisScoID);
        this.log("LMSSetValue1 _ force to initialize", path, this.ScoID + "__" + this.State + "+++" + thisScoID);
	}
	
	if (!this.syntaxCheck("w", path, value)) {
	    this.log("LMSSetValue2", path + ", " + value, this.ScoID + "__" + this.State + "+++" + thisScoID);
		return "false";
	}
	
	if (!this.checkID("LMSSetValue")) {
		return "false";
	}
	
	value = value.replace(/'/g, "''"); // encode single quote for sql server
	value = value.replace(/&/g, "&amp;"); // to make && double encode
	value = value.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&apos;").replace(/"/g, "&quot;").replace(/&/g, "&amp;");	
	this.contactServer("set", "<api action=\"LMSSetValue\" path=\"" + path + "\" value=\"" + value + "\" scoid=\"" + this.ScoID + "\" packageid=\"" + this.PackageID + "\" />");
	if (this.errorCode == "0") {
	    this.log("LMSSetValue3", path + ", " + value, this.ScoID + "__" + this.State + "+++" + thisScoID);
		if (path == "cmi.core.exit" && value == "time-out")
			doSCOTimeout();
		return "true";
	} else {
	this.log("LMSSetValue4", path + ", " + value, this.ScoID + "__" + this.State + "+++" + thisScoID);
	 	return "false";
	}
}

function fncLMSCommit(param) {
	if (this.State != "Initialized") {
	    this.setError("301", "", "", "");
	    this.log("LMSCommit1", param, this.ScoID + "__" + this.State);
		return "false";
	}
	
	if (param != "") {
	    this.setError("201", "", "", "");
	    this.log("LMSCommit2", param, this.ScoID + "__" + this.State);
		return "false";
	}
	
	if (!this.checkID("LMSSetValue")) {
		return "false";
	}
	
	this.contactServer("commit", "<api action=\"LMSCommit\" scoid=\"" + this.ScoID + "\" packageid=\"" + this.PackageID + "\" />");
	if (this.errorCode == "0") {
	    this.log("LMSCommit3", param, this.ScoID + "__" + this.State);
		return "true";
	} else {
	this.log("LMSCommit4", param, this.ScoID + "__" + this.State);
		return "false";
	}
}

function fncLMSGetLastError() 
{  
	if (this.State != "FinishedTrue") {
		this.log("LMSGetLastError", "", this.errorCode);
		return this.errorCode;
	} else {
	this.log("LMSGetLastError1", this.ScoID + "__" + this.State, "");
		return "";
	}
}

function fncLMSGetErrorString(errNumber) {
	if (this.State != "FinishedTrue") 
	  {
		var errString = "";
		//if (this.errorDic.Exists(errNumber)) {
		if(is_exist_propert(this.errorDic,errNumber) == true)
		{
	        errString = get_obj_propert(this.errorDic,errNumber).split("|")[0] + "___" +  this.ScoID + "__" + this.State;
			//errString = this.errorDic.Item(errNumber).split("|")[0];
		}
		this.log("LMSGetErrorString1", errNumber, errString);
		return errString;
	} else {
	this.log("LMSGetErrorString2", errNumber, this.ScoID + "__" + this.State);
		return "";
	}
}

function fncLMSGetDiagnostic(errNumber) {
	if (this.State != "FinishedTrue") {
		var errString = "";
		//if (errNumber != "" && this.errorDic.Exists(errNumber)) {
		  if (errNumber != "" && is_exist_propert(this.errorDic,errNumber) == true ) {
			errString = get_obj_propert(this.errorDic,errNumber).split("|")[1];
			//errString = this.errorDic.Item(errNumber).split("|")[1];
		} else {
			errString = this.errorDiagnostic;
		}
		this.log("LMSGetDiagnostic", errNumber, errString);
		return errString;
	} else {
		this.log("LMSGetDiagnostic", errNumber, "");
		return "";
	}
}

function fncInitialize() {
	this.errorCode = "0";
	this.errorString = ""; // errorString is not an internal presentation of LMSGetErrorString
	this.errorDiagnostic = "";
	this.errorDetail = ""; // errorDetail is added for detailed server side error
	
	if("ActiveXObject" in window)
	{
	this.errorDic = new ActiveXObject("Scripting.Dictionary");
	this.errorDic.Add("0", "No error|");
	this.errorDic.Add("101", "General exception|");
	this.errorDic.Add("201", "Invalid argument error|");
	this.errorDic.Add("202", "Element cannot have children|");
	this.errorDic.Add("203", "Element not an array - cannot have count|");
	this.errorDic.Add("301", "Not initialized|");
	this.errorDic.Add("401", "Not implemented error|");
	this.errorDic.Add("402", "Invalid set value, element is a keyword|");
	this.errorDic.Add("403", "Element is read only|");
	this.errorDic.Add("404", "Element is write only|");
	this.errorDic.Add("405", "Incorrect Data Type|");
	}
	else
	{
	  this.errorDic = new Object();
	  this.errorDic["0"] = "No error|";
	  this.errorDic["101"] = "General exception|";
	  this.errorDic["201"] = "Invalid argument error|";
	  this.errorDic["202"] = "Element cannot have children|";
	  this.errorDic["203"] = "Element not an array - cannot have count|";
	  this.errorDic["301"] = "Not initialized|";
	  this.errorDic["401"] = "Not implemented error|";
	  this.errorDic["402"] = "Invalid set value, element is a keyword|";
	  this.errorDic["403"] = "Element is read only|";
	  this.errorDic["404"] = "Element is write only|";
	  this.errorDic["405"] = "Incorrect Data Type|";
	}
	
	if("ActiveXObject" in window)
	{
	this.cmiModelMandatory = new ActiveXObject("Scripting.Dictionary");
	// rule format
	// r,w,rw|DataType|Optional Data Limits|Is keyword|Optional Param
	
	this.cmiModelMandatory.Add("cmi.core._children", "r|CMIString|255|yes|student_id,student_name,lesson_location,credit,lesson_status,entry,score,total_time,lesson_mode,exit,session_time");
	this.cmiModelMandatory.Add("cmi.core.student_id", "r|CMIIdentifier||no");
	this.cmiModelMandatory.Add("cmi.core.student_name", "r|CMIString|255|no");
	this.cmiModelMandatory.Add("cmi.core.lesson_location", "rw|CMIString|255|no");
	this.cmiModelMandatory.Add("cmi.core.credit", "r|CMIVocabulary|Credit|no");
	this.cmiModelMandatory.Add("cmi.core.lesson_status", "rw|CMIVocabulary|Status|no"); //? failed in FF
	this.cmiModelMandatory.Add("cmi.core.entry", "r|CMIVocabulary|Entry|no");
	this.cmiModelMandatory.Add("cmi.core.score._children", "r|CMIString|255|yes|raw,min,max");
	this.cmiModelMandatory.Add("cmi.core.score.raw", "rw|CMIDecimal,CMIBlank|0,100|no");
	this.cmiModelMandatory.Add("cmi.core.score.max", "rw|CMIDecimal,CMIBlank|0,100|no");
	this.cmiModelMandatory.Add("cmi.core.score.min", "rw|CMIDecimal,CMIBlank|0,100|no");
	this.cmiModelMandatory.Add("cmi.core.lesson_mode", "r|CMIVocabulary|Mode|no");
	this.cmiModelMandatory.Add("cmi.core.total_time", "r|CMITimespan||no");
	this.cmiModelMandatory.Add("cmi.core.exit", "w|CMIVocabulary|Exit|no");
	this.cmiModelMandatory.Add("cmi.core.session_time", "w|CMITimespan||no");
	this.cmiModelMandatory.Add("cmi.suspend_data", "rw|CMIString|409600|no");
	this.cmiModelMandatory.Add("cmi.launch_data", "r|CMIString|4096|no");
	}
	else
	{
	  this.cmiModelMandatory = new Object();
	  this.cmiModelMandatory["cmi.core._children"] ="r|CMIString|255|yes|student_id,student_name,lesson_location,credit,lesson_status,entry,score,total_time,lesson_mode,exit,session_time";
	  this.cmiModelMandatory["cmi.core.student_id"] ="r|CMIIdentifier||no";
	  this.cmiModelMandatory["cmi.core.student_name"] ="r|CMIString|255|no";
	  this.cmiModelMandatory["cmi.core.lesson_location"] ="rw|CMIString|255|no";
	  this.cmiModelMandatory["cmi.core.credit"] ="r|CMIVocabulary|Credit|no";
	  this.cmiModelMandatory["cmi.core.lesson_status"]= "rw|CMIVocabulary|Status|no";
	  this.cmiModelMandatory["cmi.core.entry"]= "r|CMIVocabulary|Entry|no";
	  this.cmiModelMandatory["cmi.core.score._children"] ="r|CMIString|255|yes|raw,min,max";
	  this.cmiModelMandatory["cmi.core.score.raw"] ="rw|CMIDecimal,CMIBlank|0,100|no";
	  this.cmiModelMandatory["cmi.core.score.max"] ="rw|CMIDecimal,CMIBlank|0,100|no";
	  this.cmiModelMandatory["cmi.core.score.min"]= "rw|CMIDecimal,CMIBlank|0,100|no";
	  this.cmiModelMandatory["cmi.core.lesson_mode"] ="r|CMIVocabulary|Mode|no";
	  this.cmiModelMandatory["cmi.core.total_time"]= "r|CMITimespan||no";
	  this.cmiModelMandatory["cmi.core.exit"] ="w|CMIVocabulary|Exit|no";
	  this.cmiModelMandatory["cmi.core.session_time"]= "w|CMITimespan||no";
	  this.cmiModelMandatory["cmi.suspend_data"]= "rw|CMIString|409600|no";
	  this.cmiModelMandatory["cmi.launch_data"]= "r|CMIString|4096|no";
	}
	
	if("ActiveXObject" in window)
	{
	this.cmiModelOptional = new ActiveXObject("Scripting.Dictionary");
	// rule format
	// r,w,rw|DataType|Optional Data Limits|Is keyword|Is implemented|Optional Param
	
	this.cmiModelOptional.Add("cmi.comments", "rw|CMIString|4096|no|no");
	this.cmiModelOptional.Add("cmi.comments_from_lms", "r|CMIString|4096|no|no");
	this.cmiModelOptional.Add("cmi.objectives._children", "r|CMIString|255|yes|no|id,score,status");
	this.cmiModelOptional.Add("cmi.objectives._count", "r|CMIInteger|0,65536|yes|no");
	this.cmiModelOptional.Add("cmi.objectives.\\d.id", "rw|CMIIdentifier||no|no");
	this.cmiModelOptional.Add("cmi.objectives.\\d.score._children", "r|CMIString|255|yes|no|raw,min,max");
	this.cmiModelOptional.Add("cmi.objectives.\\d.score.raw", "rw|CMIDecimal,CMIBlank||no|no");
	this.cmiModelOptional.Add("cmi.objectives.\\d.score.min", "rw|CMIDecimal,CMIBlank||no|no");
	this.cmiModelOptional.Add("cmi.objectives.\\d.score.max", "rw|CMIDecimal,CMIBlank||no|no");
	this.cmiModelOptional.Add("cmi.objectives.\\d.status", "rw|CMIVocabulary|Status|no|no");
	this.cmiModelOptional.Add("cmi.student_data._children", "r|CMIString|255|yes|no|mastery_score,max_time_allowed,time_limit_action");
	this.cmiModelOptional.Add("cmi.student_data.mastery_score", "r|CMIDecimal||no|yes");
	this.cmiModelOptional.Add("cmi.student_data.max_time_allowed", "r|CMITimespan||no|yes");// failed in FF ?
	this.cmiModelOptional.Add("cmi.student_data.time_limit_action", "r|CMIVocabulary|Time Limit Action|no|yes");
	this.cmiModelOptional.Add("cmi.student_preference._children", "r|CMIString|255|yes|no|audio,language,speed,text");
	this.cmiModelOptional.Add("cmi.student_preference.audio", "rw|CMIInteger|-32768,32768|no|no");
	this.cmiModelOptional.Add("cmi.student_preference.language", "rw|CMIString|255|no|no");
	this.cmiModelOptional.Add("cmi.student_preference.speed", "rw|CMIInteger|-32768,32768|no|no");
	this.cmiModelOptional.Add("cmi.student_prefernce.text", "rw|CMIInteger|-32768,32768|no|no");
	this.cmiModelOptional.Add("cmi.interactions._children", "r|CMIString|255|yes|no|id,objectives,time,type,correct_responses,wighting,student_response,result,latency");
	this.cmiModelOptional.Add("cmi.interactions._count", "r|CMIInteger|0,65536|yes|no");
	this.cmiModelOptional.Add("cmi.interactions.\\d.id", "w|CMIIdentifier||no|no");
	this.cmiModelOptional.Add("cmi.interactions.\\d.objectives._count", "r|CMIInteger|0,65536|no|no");
	this.cmiModelOptional.Add("cmi.interactions.\\d.objectives.id", "w|CMIIdentifier||no|no");
	this.cmiModelOptional.Add("cmi.interactions.\\d.time", "w|CMITime||no|no");
	this.cmiModelOptional.Add("cmi.interactions.\\d.type", "w|CMIVocabulary|Interaction|no|no");
	this.cmiModelOptional.Add("cmi.interactions.\\d.correct_responses._count", "r|CMIInteger|0,65536|yes|no");
	this.cmiModelOptional.Add("cmi.interactions.\\d.correct_responses.\d.pattern", "w|CMIFeedback||no|no");
	this.cmiModelOptional.Add("cmi.interactions.\\d.weighting", "w|CMIDecimal||no|no");
	this.cmiModelOptional.Add("cmi.interactions.\\d.student_response", "w|CMIFeedback||no|no");
	this.cmiModelOptional.Add("cmi.interactions.\\d.result", "w|CMIVocabulary|Result|no|no");
	this.cmiModelOptional.Add("cmi.interactions.\\d.latency", "w|CMITimespan||no|no");
	}
	else
	{
	 this.cmiModelOptional = new Object();
	// rule format
	// r,w,rw|DataType|Optional Data Limits|Is keyword|Is implemented|Optional Param
	
	this.cmiModelOptional["cmi.comments"]= "rw|CMIString|4096|no|no";
	this.cmiModelOptional["cmi.comments_from_lms"]=  "r|CMIString|4096|no|no";
	this.cmiModelOptional["cmi.objectives._children"]=  "r|CMIString|255|yes|no|id,score,status";
	this.cmiModelOptional["cmi.objectives._count"]=  "r|CMIInteger|0,65536|yes|no";
	this.cmiModelOptional["cmi.objectives.\\d.id"]=  "rw|CMIIdentifier||no|no";
	this.cmiModelOptional["cmi.objectives.\\d.score._children"]=  "r|CMIString|255|yes|no|raw,min,max";
	this.cmiModelOptional["cmi.objectives.\\d.score.raw"]= "rw|CMIDecimal,CMIBlank||no|no";
	this.cmiModelOptional["cmi.objectives.\\d.score.min"]=  "rw|CMIDecimal,CMIBlank||no|no";
	this.cmiModelOptional["cmi.objectives.\\d.score.max"]=  "rw|CMIDecimal,CMIBlank||no|no";
	this.cmiModelOptional["cmi.objectives.\\d.status"]=  "rw|CMIVocabulary|Status|no|no";
	this.cmiModelOptional["cmi.student_data._children"]=  "r|CMIString|255|yes|no|mastery_score,max_time_allowed,time_limit_action";
	this.cmiModelOptional["cmi.student_data.mastery_score"]=  "r|CMIDecimal||no|yes";
	this.cmiModelOptional["cmi.student_data.max_time_allowed"]= "r|CMITimespan||no|yes";
	this.cmiModelOptional["cmi.student_data.time_limit_action"]= "r|CMIVocabulary|Time Limit Action|no|yes";
	this.cmiModelOptional["cmi.student_preference._children"]=  "r|CMIString|255|yes|no|audio,language,speed,text";
	this.cmiModelOptional["cmi.student_preference.audio"]=  "rw|CMIInteger|-32768,32768|no|no";
	this.cmiModelOptional["cmi.student_preference.language"]=  "rw|CMIString|255|no|no";
	this.cmiModelOptional["cmi.student_preference.speed"]=  "rw|CMIInteger|-32768,32768|no|no";
	this.cmiModelOptional["cmi.student_prefernce.text"]=  "rw|CMIInteger|-32768,32768|no|no";
	this.cmiModelOptional["cmi.interactions._children"]= "r|CMIString|255|yes|no|id,objectives,time,type,correct_responses,wighting,student_response,result,latency";
	this.cmiModelOptional["cmi.interactions._count"]=  "r|CMIInteger|0,65536|yes|no";
	this.cmiModelOptional["cmi.interactions.\\d.id"]=  "w|CMIIdentifier||no|no";
	this.cmiModelOptional["cmi.interactions.\\d.objectives._count"]=  "r|CMIInteger|0,65536|no|no";
	this.cmiModelOptional["cmi.interactions.\\d.objectives.id"]=  "w|CMIIdentifier||no|no";
	this.cmiModelOptional["cmi.interactions.\\d.time"]=  "w|CMITime||no|no";
	this.cmiModelOptional["cmi.interactions.\\d.type"]= "w|CMIVocabulary|Interaction|no|no";
	this.cmiModelOptional["cmi.interactions.\\d.correct_responses._count"]=  "r|CMIInteger|0,65536|yes|no";
	this.cmiModelOptional["cmi.interactions.\\d.correct_responses.\d.pattern"]=  "w|CMIFeedback||no|no";
	this.cmiModelOptional["cmi.interactions.\\d.weighting"]=  "w|CMIDecimal||no|no";
	this.cmiModelOptional["cmi.interactions.\\d.student_response"]=  "w|CMIFeedback||no|no";
	this.cmiModelOptional["cmi.interactions.\\d.result"]= "w|CMIVocabulary|Result|no|no";
	this.cmiModelOptional["cmi.interactions.\\d.latency"]= "w|CMITimespan||no|no";
	}
	
	if("ActiveXObject" in window)
	{
	this.cmiVocabulary = new ActiveXObject("Scripting.Dictionary");
	this.cmiVocabulary.Add("Mode", "normal|review|browse");
	//this.cmiVocabulary.Add("Status", "passed|completed|failed|incomplete|browsed|not attempted");
	//this.cmiVocabulary.Add("Status", "passed|completed|failed|incomplete|browsed");
	this.cmiVocabulary.Add("Status", "passed|completed|failed|incomplete|browsed|attempted");   //for IE11
	this.cmiVocabulary.Add("Exit", "time-out|suspend|logout|");
	this.cmiVocabulary.Add("Credit", "credit|non-credit");
	this.cmiVocabulary.Add("Entry", "ab-initio|resume|");
	this.cmiVocabulary.Add("Interaction", "ture-false|choice|fill-in|matching|performance|likert|sequencing|numeric");
	this.cmiVocabulary.Add("Result", "correct|wrong|unanticipated|neutral|CMIDecimal");
	this.cmiVocabulary.Add("Time Limit Action", "exit,message|exit,no message|continue,message|continue,no message");
    }
    else
    {
    this.cmiVocabulary = new Object();
	this.cmiVocabulary["Mode"]= "normal|review|browse";
	//this.cmiVocabulary["Status"]= "passed|completed|failed|incomplete|browsed|not attempted";
	//this.cmiVocabulary["Status"]= "passed|completed|failed|incomplete|browsed";
	this.cmiVocabulary["Status"] = "passed|completed|failed|incomplete|browsed|attempted";  //for IE11
	this.cmiVocabulary["Exit"]= "time-out|suspend|logout|";
	this.cmiVocabulary["Credit"]= "credit|non-credit";
	this.cmiVocabulary["Entry"]= "ab-initio|resume|";
	this.cmiVocabulary["Interaction"]= "ture-false|choice|fill-in|matching|performance|likert|sequencing|numeric";
	this.cmiVocabulary["Result"]= "correct|wrong|unanticipated|neutral|CMIDecimal";
	this.cmiVocabulary["Time Limit Action"]= "exit,message|exit,no message|continue,message|continue,no message";
    /*for(var i in  this.cmiVocabulary)
     {
     //var name = i
     alert(i)
     }*/
    }
    
	this.ScoID = "";
	this.PackageID = "";
	this.State = "NotInitialized";
	this.Debug = false;
	this.DebugActionWindow = null;
	this.asyncXMLHttp = null;
	this.ServerName = "";
	this.LogoutCallBack = "";
	this.InitializedID = "";
	this.myArray = [];

}

function fncClearStatus() {
	this.errorCode = "0";
	this.errorString = "";
	this.errorDiagnostic = "";
	this.errorDetail = ""; // errorDetail is added for detailed server side error
	
	this.State = "NotInitialized";
}


function fncSetError(errerCode, errorString, errorDiagnostic, errorDetail) {
	this.errorCode = errerCode;
	
	//if (this.errorDic.Exists(errerCode)) 
	if(is_exist_propert(this.errorDic,errerCode) == true)
	{
		
		this.errorString = get_obj_propert(this.errorDic,errerCode).split("|")[0];
		this.errorDiagnostic = get_obj_propert(this.errorDic,errerCode).split("|")[1];
		this.errorDetail = errorDetail;
	} 
	else 
	{
		this.errorString = errorString;
		this.errorDiagnostic = errorDiagnostic;
		this.errorDetail = errorDetail;
	}
	
}

function fncSyntaxCheck(type, path, value) {
	// check path existence
	var modelName;
	var re = /^cmi\..*/g;
	//if (!re.test(path)) {
	  if(!path.match(re)) {
	  // not in cmi namespace
		this.setError("401", "", "", ""); // not implemented
		return false;
	} else if (this.checkComplexPath(this.cmiModelOptional, path)) { // cmi optional item
		if (this.getComplexRule(this.cmiModelOptional, path).split("|")[4] == "no") { // if not implemented
			this.setError("401", "", "", ""); 
			return false;
		} else {
			modelName = this.cmiModelOptional; // in the cmiModelOptional
		}
	} 
	else if (is_exist_propert(this.cmiModelMandatory,path) == false)
	  { // an error cmi item
		var pos = path.lastIndexOf(".");
		var part1 = path.substr(0, pos);
		var part2 = path.substr(pos+1);     
		if((this.checkComplexPath(this.cmiModelOptional, part1) || is_exist_propert(this.cmiModelMandatory,part1) == true )&&
			(part2 == "_children" || part2 == "_count") ) 
	      {
			if(part2 == "_children") 
			{
				this.setError("202", "", "", "");
				return false;
			} else 
			{
				this.setError("203", "", "", "");
				return false;
			}
		} 
		else 
		{
			this.setError("201", "", "", "");
			return false;
		 }
	} 
	else 
	{
		modelName = this.cmiModelMandatory; // in the cmiModelMandatory
	}

	var rule = this.getComplexRule(modelName, path);
	// check read/write
	if (type == "r" && rule.split("|")[0].indexOf("r") == -1) {
		this.setError("404", "", "", ""); // Element is read only
		return false;
	}
	
	if (type == "w" && rule.split("|")[3] == "yes") {
			this.setError("402", "", "", ""); // Element is a keyword
			return false;
	}
	
	if (type == "w" && rule.split("|")[0].indexOf("w") == -1) {
		this.setError("403", "", "", ""); // Element is write only
		return false;
	}
	
	if (type == "w") {
		// check data type
		var dataTypeString = rule.split("|")[1];
		if (dataTypeString.indexOf(",") == -1) {
			var dataTypeArray = new Array(1);
			dataTypeArray[0] = dataTypeString;
		} else {
			var dataTypeArray = dataTypeString.split(",");
		}

		var dataTypeError = true;

		for (var i=0; i < dataTypeArray.length; ++i) {
			if (this.checkDataType(dataTypeArray[i], rule, value)) {
				dataTypeError = false;
				break;
			}
		}

		if (dataTypeError) {
			this.setError("405", "", "", "");
			return false;
		}
	}
	
	return true;
}

function fncCheckDataType(dataType, rule, value) {
	try {
	    value.indexOf(".");  // enforce the value must be type string
	} catch (e) {
		this.setError("405", "", "", "");
		return false;
	}

	if (dataType == "CMIBlank") { // check CMIBlank
		if (value != "") {
			return false;
		}
	} else if (dataType == "CMIDecimal") { // check CMIDecimal
		if (isNaN(value * 1)) {
			return false;
		}
		/*
		if (value.indexOf(".") != -1 && (value.length - value.indexOf(".") > 2)) {
			return false;
		}
		*/
		var minValue = rule.split("|")[2].split(",")[0];
		var maxValue = rule.split("|")[2].split(",")[1];
		var numValue = value * 1;
		if (numValue < minValue || numValue > maxValue) {
			return false;
		}
	} else if (dataType == "CMIBoolean" ) { // check CMIBoolean
		if (value != "true" || value != "false") {
			return false;
		}
	} else if (dataType == "CMIInteger") { // ckeck CMIInteger, CMISInteger
		if (isNaN(value * 1) || value.indexOf(".") != -1) {
			return false;
		}

		var minValue = rule.split("|")[2].split(",")[0];
		var maxValue = rule.split("|")[2].split(",")[1];
		var numValue = value * 1;
		if (numValue < minValue || numValue > maxValue) {
			return false;
		}
	} else if (dataType == "CMIIdentifier") { // check CMIIdentifier
		var re = /[^0-9a-zA-Z]/g;
		//if (re.test(value)) {
		  if (value.match(re)) {
			return false;
		}

		if (value.length > 255) {
			return false;
		}
	} else if (dataType == "CMITime") { // check CMITime
		var re = /^\d{2}:\d{2}:\d{2}(|\.\d{1,2})$/g;
		//if (!re.test(value)) {
		  if (!value.match(re)){
			return false;
		}

		var hh = value.split(":")[0] * 1;
		var mm = value.split(":")[1] * 1;
		var ss = value.split(":")[2];
		if (ss.indexOf(".") != -1) {
			ss1 = ss.split(".")[0] * 1;
			ss2 = ss.split(".")[1] * 1;
		} else {
			ss1 = ss * 1;
			ss2 = 0 * 1;
		}
		if (hh > 23 || mm > 59 || ss1 > 59 || ss2 > 99) {
			return false;
		}
	} else if (dataType == "CMITimespan") { // check CMITimeSpan
		var re = /^\d{2,4}:\d{2}:\d{2}(|\.\d{1,2})$/g;
		//if (!re.test(value)) {
		  if (!value.match(re)) {
			return false;
		}
		/*
		var mm = value.split(":")[1] * 1;
		var ss = value.split(":")[2];
		if (ss.indexOf(".") != -1) {
			ss1 = ss.split(".")[0] * 1;
			ss2 = ss.split(".")[1] * 1;
		} else {
			ss1 = ss * 1;
			ss2 = 0 * 1;
		}
		if (mm > 59 || ss1 > 59 || ss2 > 99) {
			return false;
		}*/
	} else if (dataType == "CMIVocabulary") { // check CMIVocabulary
		var vtype = rule.split("|")[2];
		//var vocabulary = this.cmiVocabulary.Item(vtype).split("|");
		var vocabulary = get_obj_propert(this.cmiVocabulary,vtype).split("|");
		var found = false;
		for (var i=0; i<vocabulary.length; ++i) {
			if (value == vocabulary[i]) {
				found = true;
				break;
			}

			if (vocabulary[i] == "CMIDecimal") { // special arrangement for type Result
				if (!isNaN(parseFloat(value)) && (value.indexOf(".") != -1 && (value.length - value.indexOf(".") == 2))) {
					found = true;
					break;
				}
			}
		}

		if (!found) {
			return false;
		}
	} else if (dataType == "CMIString") { // check CMIString255, CMIString4096
		if (value.length > rule.split("|")[2]) {
			return false;
		}
	} else if (dataType == "CMIFeedback") { // check CMIFeedback
		// not implemented currently
	}
	
	return true;
}

function fncContactServer(action, strXml) {
    try {
        lastActiveTime = new Date();
		//var objXMLHTTP = new ActiveXObject ("Microsoft.XMLHTTP");
		var result = "";
		var objXMLHTTP = makeReq();
		objXMLHTTP.open("POST", this.ServerName, false);
		objXMLHTTP.send(strXml);
		//var objXML = new ActiveXObject ("MSXML.DOMDocument");
		//objXML.async = false;
		//objXML.load(objXMLHTTP.responseXML);
        var objXML = loadXMLStr(objXMLHTTP.responseText);
		this.setError(objXML.documentElement.getAttribute("errorCode"), objXML.documentElement.getAttribute("errorString"), objXML.documentElement.getAttribute("errorDiagnostic"), objXML.documentElement.getAttribute("errorDetail"));
		//var result = objXML.documentElement.getElementsByTagName("value").item(0).text;
		if(objXML.documentElement.selectNodes("//value")[0].firstChild != null)
		{
			result = objXML.documentElement.selectNodes("//value")[0].firstChild.nodeValue;
			if(result == " ")
				result = "";
		}		
			
        //var result = objXML.documentElement.getElementsByTagName("value")[0].text;
		//alert(objXML.documentElement.xml);
		objXMLHTTP = null;
		objXML = null;

		return result;
	} catch (e) {
		this.setError("101", "", "", "Network error when connecting to server");
		return "";
	}
}

function fncGetCMIStatus(packageid) {	
	//asyncXMLHttp = new ActiveXObject ("Microsoft.XMLHTTP");
	asyncXMLHttp = makeReq();
	asyncXMLHttp.open("POST", this.ServerName, true);
	asyncXMLHttp.onreadystatechange = this.callback;
	asyncXMLHttp.send("<api action=\"GetCMIStatus\" localid=\"\" packageid=\"" + packageid + "\" />");	
}

function fncCallback() {
	if (asyncXMLHttp.readyState == 4) {
	    //alert("Result = " + asyncXMLHttp.responseXML.xml);
	    // user must provide CMIStateCallback(string) in api container
	    //var objXML = new ActiveXObject ("MSXML.DOMDocument");
		//objXML.async = false;
		//objXML.load(asyncXMLHttp.responseXML);
		var objXML = loadXMLStr(asyncXMLHttp.responseText);
		if (objXML.documentElement.getAttribute("errorCode") != 0) {
			CMIStateCallback(null);
			return;
		}
		var objNodeList = objXML.getElementsByTagName("row");
		var count = objNodeList.length;
		if (count > 0) {
			var result = new Array(count);
		} else {
			var result = new Array();
		}
		for (var i=0; i<count; i++) {
			//result[i] = objNodeList.item(i).getAttribute("localid") + "," + objNodeList.item(i).getAttribute("lessonstatus");
		      result[i] = objNodeList[i].getAttribute("localid") + "," + objNodeList.item[i].getAttribute("lessonstatus");
		}
	    CMIStateCallback(result);
	}	
}

function fncCheckComplexPath(dicName, path) 
{
    if("ActiveXObject" in window)
    {
      var  keys ;
	 // keys = eval("(new VBArray("+ dicName + ".Keys())).toArray()");
	  keys = new VBArray(dicName.Keys()).toArray();
	  for (var i=0; i<keys.length;i++)
	  {
		
		eval("var re = /^" + keys[i].replace(/\./g, "\\.") + "$/g");
		if (re.test(path)) 
		{
			return true;
		}
	  }
	  return false;
	}
	else
	{
	  for(var j in dicName)
	  {
	    var re = "^" + j.replace(/\./g, "\\.") + "$";
	   // if(new RegExp(re,"g").test(path))
	      if(path.match(new RegExp(re,"g")))
	    {
	      return true;
	    }
	  }
	  return false;
	}
}

function fncGetComplexRule(dicName, path) {
   if("ActiveXObject" in window)
   {
	 var keys;
	 //keys = eval("(new VBArray(" + dicName + ".Keys())).toArray()");
	 keys = new VBArray(dicName.Keys()).toArray();
	for (var i=0; i<keys.length; i++) 
	  {
		eval("var re = /^" + keys[i].replace(/\./g, "\\.") + "$/g");
		if (re.test(path))
		{
			//return eval(dicName + ".Item(keys[i])");
			return dicName.Item(keys[i]);
		}
	  }
	}
	else
	{
	  for(var j in dicName)
	  {
	   var re = "^" + j.replace(/\./g, "\\.") + "$";
	   if(path.match(new RegExp(re,"g")))
	   //if(new RegExp(re,"g").test(path))
	    {
	       return dicName[j];
	    }
	  }
	} 
}

function fncSetScoID(id) {
	this.clearStatus();
	this.ScoID = id;
	this.log("SetScoID", id, "");
}

function fncGetScoID() {
	return this.ScoID;
}

function fncSetPackageID(id) {
	this.clearStatus();
	this.PackageID = id;
	this.log("SetPackageID", id, "");
}

function fncGetPackageID() {
	return this.PackageID;
}

function fncSetDebug(flag) {
	this.Debug = flag;
	// in production change to this
	// this.Debug = false;
}

function fncLeave() {
	this.LMSFinish("");
}

function fncCheckID(action) {
	// check scoid and packageid

    // Kyaw Kyaw 29 Nov 16 to seperate score/status from lesson and channel
	var localID = getParameterByName("local", window.location.url);
	var lsnID = getParameterByName("lsn", window.location.url);
	localID = (localID == null ? "": localID);
	lsnID = (lsnID == null ? "": lsnID);
	if ( localID != ""  && lsnID != "" )
	{
		this.ScoID = localID;
		this.PackageID = lsnID;
        if (this.ScoID == "" || this.PackageID == "") {
            this.setError("101", "", "", "ScoID or PackageID is null");
            this.log(action, "", "");
            return false;
        }
	}
	else {
        if (this.ScoID == "" || this.PackageID == "") {
            this.setError("101", "", "", "ScoID or PackageID is null");
            this.log(action, "", "");
            return false;
        }
	}
	return true;
}

var global = "";

function fncLog(action, param, retvalue) {
if (this.Debug) {
	  //if (true) {
		if (this.DebugActionWindow == null) {
			this.DebugActionWindow = window.open("", "DebugActionWindow", "menubar=no,scrollbars=yes,toolbar=no,resizable=yes,width=800,height=600");
			var tmp = "<html><head><title>Debug Action</title></head><body><table style='padding-top: 3px; padding-right: 3px; padding-bottom: 3px; padding-left: 3px; border: thin #93B6FF none; clip:  rect(   ); background-color: #93B6FF; vertical-align: middle;' id='resultT'><tr bgcolor='#93B6FF'>" +
				"<td>Action</td><td>Parameter</td><td>Return Value</td><td>State</td><td>Error Code</td>" +
				"<td>Error String</td><td>Error Diagnostic</td><td>Error Detail</td>" +
				"</tr></table></body></html>";
			this.DebugActionWindow.document.open();
			this.DebugActionWindow.document.write(tmp);
			this.DebugActionWindow.document.close();
		}
		  
		// add element
		var color = "";
		try {
			if (this.DebugActionWindow.document.all("resultT").rows.length % 2 == 0) {
				color = "#EAF4FF";
			} else {
				color = "#FFFFFF";
			}
		} catch (e) {
			this.DebugActionWindow = null;
			this.log(action, param, retvalue);
			return;
		}
		
		/*var tmp = "<tr bgcolor='" + color + "'><td>" + action + "&nbsp,</td><td>" + param + "&nbsp,</td><td>" + retvalue + "&nbsp,</td><td>" +
			this.State + "</td><td>" + this.errorCode + "&nbsp,</td><td>" + this.errorString + "&nbsp,</td><td>&nbsp" +
			this.errorDiagnostic + "</td><td>" + this.errorDetail + "</td><td>" +this.ScoID + "&nbsp,</td></tr>";*/
			
		var tmp = "<tr bgcolor='" + color + "'><td>" + action + "&nbsp,</td><td>" + param + "&nbsp,</td><td>" + retvalue + "&nbsp,</td><td>&nbspstate: " +
			this.State + "</td><td>&nbsperrorCode: " + this.errorCode + "&nbsp,</td><td>&nbspErrorStr: " + this.errorString + "&nbsp,</td>" +
			"<td>&nbsp,ErrorDetai: " + this.errorDetail + "</td><td>&nbsp,ScodID: " +this.ScoID + "&nbsp,</td></tr>";	
		//var ori = this.DebugActionWindow.document.documentElement.outerHTML;
		var ori = global;
		var pos = ori.lastIndexOf("</TABLE>");
		var upd = ori.substr(0, pos) + tmp + ori.substr(pos);
		global = global + upd + "<br/>";
		this.DebugActionWindow.document.open();
		this.DebugActionWindow.document.write(global);
		this.DebugActionWindow.document.close();
	}
}

function fncSetServerName(serverName) {
	this.ServerName = serverName;
}

function fncSetLogoutCallBack(callbackfnc) {
	this.LogoutCallBack = callbackfnc;
}

function fncGetError() {
	this.errorCode + ", " + this.errorString + ", " + this.errorDiagnostic + ", " + this.errorDetail;
}

function is_exist_propert(obj,propert)
{
	if("ActiveXObject" in window)
	{
	  if(obj.Exists(propert))
	  {
	    return true;
	  }
	  else
	  {
	    return false;
	  }
	}
	else
	{
	  for (var i in obj)
	    {
	      if(i==propert)
	      {
	        return true;
	      }
	    }
	    return false;
	}
}

function get_obj_propert(obj,propert)
{
  if("ActiveXObject" in window)
	{
	  return obj.Item(propert);
	}
	else
	{
	  return obj[propert];
	}
}

function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}



