changeGuideContent(dp_guide_content);

if(String(window.location.href).includes('simulation'))
	changeInstructionsContent(dp_simulation_instructions_content);
else
	changeInstructionsContent(dp_interaction_instructions_content);

var arr=[[0,1],[1,0]]
arr=[]
for (var i = 0; i < values.length+1; i++) {
    arr.push([]);
    for (var j = 0; j < capacity+1; j++) {
        arr[i].push(0);
    }
}
function refresh_arr(){
    arr=[]
	console.log(values)
	console.log(weights)
    for (var i = 0; i < values.length+1; i++) {
        arr.push([]);
        for (var j = 0; j < capacity+1; j++) {
            arr[i].push(0);
        }
    }
	qss=[arr]
}
function openPopup_s() {
	var popup = document.getElementById("popup_s");
	changeError("SUCCESS DONE!!", "Success")
	popup.style.display = "block";
}
function closePopup_s() {
	console.log("gfyftgft")
	var popup = document.getElementById("popup_s");
	bfs_i=0;
	dfs_i=0;
	popup.style.display = "none";
}
function openInstr() {
	var popup = document.getElementById("popup_instr");
	popup.style.display = "block";
}
function closeInstr() {
	var popup = document.getElementById("popup_instr");
	popup.style.display = "none";
}
function createInputTable() {
    const inputTable = document.createElement("div");
    inputTable.id = "inputTable";

    const h2 = document.createElement("h2");
    h2.textContent = "Enter Numbers";
    inputTable.appendChild(h2);

    const table = document.createElement("table");
    for (let i = 0; i < values.length+1; i++) {
        const tr = document.createElement("tr");
        for (let j = 0; j < capacity+1; j++) {
            const td = document.createElement("td");
            const input = document.createElement("input");
            input.type = "number";
            input.name = "number";
            input.id = `${i}-${j}`;
			input.style.width = "30px";
            td.appendChild(input);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    inputTable.appendChild(table);

    const p = document.createElement("p");
    p.id = "submit";
    p.className = "execAction";
    p.textContent = "Submit";
    p.onclick = submitNumbers;
    inputTable.appendChild(p);

    return inputTable;
}

function submitNumbers() {
    // retrieve values from inputs
    let numbers = [];
    for(let i=0; i<values.length+1; i++) {
        let row = [];
        for(let j=0; j<capacity+1; j++) {
            let input = document.getElementById(`${i}-${j}`);
            row.push(Number(input.value));
        }
        numbers.push(row);
    }
	arr=numbers;

    // do something with numbers array
    console.log(arr);
	console.log(JSON.stringify(arr))
	var popup = document.getElementById("dp_i");
	popup.style.display = "none";
	console.log(qss[(capacity+1)*values.length-1]);
	if(JSON.stringify(arr)==JSON.stringify(qss[(capacity+1)*values.length-1])){
		changeError("" + "DP matrix filled correctly    <br> <br>")
	}
	else{
		changeError("DP matrix filled incorrectly    <br> <br>")
	}
	openPopup_e();
	d3.select("svg").remove();
	run_graph();
}

// attach the input table to the DOM
const container = document.getElementById("dp_i");

	container.appendChild(createInputTable());


function openPopup_e() {
	var popup = document.getElementById("popup_e");
	popup.style.display = "block";
}
function closePopup_e() {
	var popup = document.getElementById("popup_e");
	popup.style.display = "none";
}
function openPopup() {
	var popup = document.getElementById("popup");
	popup.style.display = "block";
}
function closePopup() {
	var popup = document.getElementById("popup");
	popup.style.display = "none";
}

function openPopupi() {
	var popup = document.getElementById("popup_i");
	popup.style.display = "block";
}
function closePopupi() {
	var popup = document.getElementById("popup_i");
	popup.style.display = "none";
}
function openPopupc() {
	var popup = document.getElementById("popup_cap");
	popup.style.display = "block";
}
function closePopupc() {
	var popup = document.getElementById("popup_cap");
	popup.style.display = "none";
    refresh_arr();

}
var add_item = function add_item(){
values.push(Number(document.getElementById("value").value));
weights.push(Number(document.getElementById("weight").value));
	closePopup();
    refresh_arr();
	d3.select("svg").remove();
	run_graph();
}

var del_item = function del_item(){
	console.log("DELSH")
	var i = Number(document.getElementById("indexi").value)-1
	console.log(document.getElementById("indexi").value)
	if(i>-1){
		values.splice(i,1);
		weights.splice(i,1);
	}
    refresh_arr();
	closePopupi();
	d3.select("svg").remove();
	run_graph();
}

var edit_cap = function edit_cap(){
	console.log("cPPPP")
	console.log(document.getElementById("cap").value)
	var c = Number(document.getElementById("cap").value)
	capacity=c;
	refresh_arr();
	closePopupc();
	d3.select("svg").remove();
	run_graph();
}

var clear_items = function clear_items(){
	values=[]
	weights=[]
	capacity=0
	refresh_arr();
	d3.select("svg").remove();
	run_graph();
}

var edge_click = false;
var edge_del = false;
var node_del = false;
var bfs_en = false;
var selected_nodes = [];
var bfs_indices = [];
var qss =[arr];
var highlight=[];
var bfs_i = 0;

var bfs = function bfs() {
	changeText("<b>knapsack(weights, values, capacity)</b><br>&emsp;n = length(weights)<br>&emsp;dp = new 2D array[n+1][capacity+1]<br>&emsp;for i from 0 to n:<br>&emsp;&emsp;for w from 0 to capacity:<br>&emsp;&emsp;&emsp;if i == 0 or w == 0:<br>&emsp;&emsp;&emsp;&emsp;dp[i][w] = 0<br>&emsp;&emsp;&emsp;else if weights[i-1] <= w:<br>&emsp;&emsp;&emsp;&emsp;dp[i][w] = max(values[i-1] + dp[i-1][w-weights[i-1]], dp[i-1][w])<br>&emsp;&emsp;&emsp;else:<br>&emsp;&emsp;&emsp;&emsp;dp[i][w] = dp[i-1][w]<br>&emsp;dp[n][capacity]");
	showCodetracePanel();
	hideActionsPanel();
	hideGuidePanel();
	hideInstructionPanel();
	bfs_en = true;
	sim_bfs();

	var popup = document.getElementById("dp_i");
	popup.style.display = "block";

};


var sim_bfs = function sim_bfs() {
	changeText("<b>knapsack(weights, values, capacity)</b><br>&emsp;n = length(weights)<br>&emsp;dp = new 2D array[n+1][capacity+1]<br>&emsp;for i from 0 to n:<br>&emsp;&emsp;for w from 0 to capacity:<br>&emsp;&emsp;&emsp;if i == 0 or w == 0:<br>&emsp;&emsp;&emsp;&emsp;dp[i][w] = 0<br>&emsp;&emsp;&emsp;else if weights[i-1] <= w:<br>&emsp;&emsp;&emsp;&emsp;dp[i][w] = max(values[i-1] + dp[i-1][w-weights[i-1]], dp[i-1][w])<br>&emsp;&emsp;&emsp;else:<br>&emsp;&emsp;&emsp;&emsp;dp[i][w] = dp[i-1][w]<br>&emsp;dp[n][capacity]");
	showCodetracePanel();
	hideActionsPanel();
	hideGuidePanel();
	hideInstructionPanel();


	if(!bfs_en){
		document.getElementById('media-controls').style.visibility = 'visible';
	}
	qss=[]
	arr=[]
	for (var i = 0; i < values.length+1; i++) {
		arr.push([]);
		for (var j = 0; j < capacity+1; j++) {
			arr[i].push(0);
		}
	}

	for (let i = 1; i <= values.length; i++) {
		// choose all weights from 0 to maximum capacity

		for (let j = 0; j <= capacity; j++) {
			// Don't pick ith element if j-weights[i-1] is negative
			if (weights[i - 1] > j) {
				console.log(arr[i - 1][j])
				arr[i][j] = arr[i - 1][j];
			} else {
				// Store the max value that we get by picking or leaving the i-th item
				arr[i][j] = Math.max(arr[i - 1][j], arr[i - 1][j - weights[i - 1]] + values[i - 1]);
			}
			arr2=[]
			for (let i2=0; i2<arr.length;i2++){
				arr3=[]
				for (let y2=0; y2<arr[0].length;y2++){
					arr3.push(arr[i2][y2])
				}
				arr2.push(arr3);
			}
			highlight.push([i,j])
			qss.push(arr2);
		}
	}
	//console.log(qss);
};
var prev_bfs = function prev_bfs() {
	if (bfs_i > 0) {
		bfs_i = bfs_i - 1;
		d3.select("svg").remove();
		run_graph();
	}
}
var next_bfs1 = function next_bfs1() {
	//if (bfs_i < (capacity+1)*values.length) {
	if (bfs_i < qss.length-1) {
		console.log("nexttt222333")
		bfs_i = bfs_i + 1;
		if(bfs_i == qss.length-1){
			console.log("nexttt")
			openPopup_s()
		}
		d3.select("svg").remove();
		run_graph();

	}
}
