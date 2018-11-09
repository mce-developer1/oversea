function home_DoFSCommanded(command, str) {
	if (command == "call_alert") {
		//** set status == completed ** //
		var args = "CMISetStatus,completed"
		DoFSCommand(args);
	}
	var percent=command.split("|");
	if (percent.length>1 && percent[0]=="call_alert") {
		// *** sent score *** //
		var strScore = percent[1];
		var argsScore = "CMISetScore,"+strScore;
		DoFSCommand(argsScore);
    }
}

function home_DoFSCommand(command, str) {
	if (command == "call_alert") {
		//** set status == completed ** //
		var args = "CMISetStatus,completed"
		DoFSCommand(args);
	}
	var percent=command.split("|");
	if (percent.length>1 && percent[0]=="call_alert") {
		// *** sent score *** //
		var strScore = percent[1];
		var argsScore = "CMISetScore,"+strScore;
		DoFSCommand(argsScore);
    }
}