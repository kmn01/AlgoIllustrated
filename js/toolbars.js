function openNav() {
	document.getElementById("myNav").style.width = "25%";
}
  
function closeNav() {
	document.getElementById("myNav").style.width = "0%";
}

var codetraceColor = 'white';

var actionsWidth = 150;
var statusInstructionWidth = 300;
var statusCodetraceWidth = 420;

// opening and closing panels
var isActionsOpen = false;
var isGuideOpen = false;
var isInstructionOpen = false;
var isStatusOpen = false;
var isCodetraceOpen = false;

function showActionsPanel() {
	if(!isActionsOpen) {
		$('#actions').animate({
			width: "+="+actionsWidth,
		});
		isActionsOpen = true;
	}
}
function hideActionsPanel() {
	if(isActionsOpen) {
		$('#actions').animate({
			width: "-="+actionsWidth,
		});
		isActionsOpen = false;
	}
}
function showStatusPanel() {
	if(!isStatusOpen) {
		$('#current-action').show();
		$('#status').animate({
			width: "+="+statusCodetraceWidth,
		});
		isStatusOpen = true;
	}
}
function hideStatusPanel() {
	if(isStatusOpen) {
		$('#current-action').hide();
		$('#status').animate({
			width: "-="+statusCodetraceWidth,
		});
		isStatusOpen = false;
	}
}
function showCodetracePanel() {
	if(!isCodetraceOpen) {
		$('#codetrace').animate({
			width: "+="+statusCodetraceWidth,
		});
		isCodetraceOpen = true;
	}
}
function hideCodetracePanel() {
	if(isCodetraceOpen) {
		$('#codetrace').animate({
			width: "-="+statusCodetraceWidth,
		});
		isCodetraceOpen = false;
	}
}
function showGuidePanel() {
	if(!isGuideOpen) {
		$('#guide').animate({
			width: "+="+statusCodetraceWidth,
		});
		isGuideOpen = true;
	}
}
function hideGuidePanel() {
	if(isGuideOpen) {
		$('#guide').animate({
			width: "-="+statusCodetraceWidth,
		});
		isGuideOpen = false;
	}
}
function showInstructionPanel() {
	if(!isInstructionOpen) {
		$('#instruction').animate({
			width: "+="+statusInstructionWidth,
		});
		isInstructionOpen = true;
	}
}
function hideInstructionPanel() {
	if(isInstructionOpen) {
		$('#instruction').animate({
			width: "-="+statusInstructionWidth,
		});
		isInstructionOpen = false;
	}
}

$( document ).ready(function() {	
	$('#current-action').hide();	
	showActionsPanel();
	
	$('#status-hide').unbind().click(function() {
		if(isStatusOpen) {
			hideStatusPanel();
		} else {
			showStatusPanel();
			hideActionsPanel();
			hideGuidePanel();
			hideInstructionPanel();
		}
	});
	$('#actions-hide').unbind().click(function() {
		console.log("click")
		if(isActionsOpen) {
			hideActionsPanel();

		} else {
			showActionsPanel();
			hideGuidePanel();
			hideInstructionPanel();
			hideCodetracePanel();
		}
	});
	$('#guide-hide').unbind().click(function() {
		if(isGuideOpen) {
			hideGuidePanel();
		} else {
			showGuidePanel();
			hideActionsPanel();
			hideInstructionPanel();
			hideCodetracePanel();
		}
	});
	$('#instruction-hide').unbind().click(function() {
		if(isInstructionOpen) {
			hideInstructionPanel(); 
		} else {
			showInstructionPanel();
			hideActionsPanel();
			hideGuidePanel();
			hideCodetracePanel();
		}
	});
	$('#codetrace-hide').unbind().click(function() {
		if(isCodetraceOpen) {
			hideCodetracePanel();
		} else {
			showCodetracePanel();
			hideActionsPanel();
			hideGuidePanel();
			hideInstructionPanel();
		}
	});
	
});

// Codetrace highlight
function highlightLine(lineNumbers) {  // lineNumbers can be an array or a single number.
	$('#codetrace p').css('background-color', colourTheThird).css('color',codetraceColor);
	if (lineNumbers instanceof Array) {
		for(var i=0; i<lineNumbers.length; i++) {
			if(lineNumbers[i] != 0) {
				$('#code'+lineNumbers[i]).css('background-color', 'black').css('color','white');
			}
		}
	} else {
		$('#code'+lineNumbers).css('background-color', 'black').css('color','white');
	}
}