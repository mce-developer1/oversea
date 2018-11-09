function SetSuspendData(){
	trace("suspend data");
	import flash.external.*;
	// The name of a JavaScript function to call
	var callJasFunction:String = "DoFSCommand";
	//parameter
	var args:String = "CMISetData,"+escape(SuspendData());
	//var args:String = "CMISetData,"+SuspendData();

	// The return value after calling JavaScript
	var returnValue:String = ExternalInterface.call(callJasFunction, args).toString();
	eval("msgBox").text = "returnValue="+returnValue+"\rCMISetData: <root><n1>nnn111</n1><n2>nnn111</n2></root>";
}

function SuspendData():String{
	var suspendString:String="<suspendInfo><q1>"+qn1+"</q1><q2>"+qn2+"</q2></suspendInfo>";
	return suspendString;
}



function SetStatus(str:String){
	import flash.external.*;
	var callJasFunction:String = "DoFSCommand";
	var args:String = "CMISetStatus," + str;
	var returnValue:String = ExternalInterface.call(callJasFunction, args).toString();
}

function GetSuspendData(){
	import flash.external.*;
	// The name of a JavaScript function to call
	var callJasFunction:String = "DoFSCommand";
	//parameter
	var args:String = "LMSGetValue,cmi.suspend_data";
	// The return value after calling JavaScript
	var returnValue:String = unescape(ExternalInterface.call(callJasFunction, args).toString());
	eval("msgBox").text = "returnValue="+returnValue+"\rcmi.suspend_data="+returnValue;
}
function SetLocation(strLocation:String) {
	import flash.external.*;
	// The name of a JavaScript function to call
	var callJasFunction:String = "DoFSCommand";
	//parameter
	var args:String = "CMISetLocation,"+strLocation;
	// The return value after calling JavaScript
	var returnValue:String = ExternalInterface.call(callJasFunction, args).toString();
	//eval("msgBox").text = "returnValue="+returnValue+"\rCMISetLocation: 5";
}

function SetScore(strScore:Number) {
	import flash.external.*;
	// The name of a JavaScript function to call
	var callJasFunction:String = "DoFSCommand";
	//parameter
	var args:String = "CMISetScore,"+strScore;
	// The return value after calling JavaScript
	var returnValue:String = ExternalInterface.call(callJasFunction, args).toString();
//	eval("msgBox").text = "returnValue="+returnValue+"\rCMISetScore: 60";
}
