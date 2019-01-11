// Settings
//

const intervalTime = 1000;   // Test interval time in miliseconds.

// HDA test
const url = "http://10.2.1.35/api/command/irpass/1/";    // Host address
const httpPost = true;
const postData = {"irdata":"00000073000000210060002000100010001000100010002000100020003000200010001000100010001000100010001000100010001000100010001000100010001000100010001000200010001000100010001000100020001000100010001000100010001000100020002000100010001000100010001000100010001000100020002000200010001009DD"}

// NEEO Test
//const url = "http://10.2.1.63:3000/v1/projects/home/rooms/6332151776837369856/devices/6482149828842225664/macros/6482149829458788353/trigger";    // Host address
//const httpPost = false;
//const postData = ""


//
// End of Settings.

const performance = require("perf_hooks").performance;
const keypress = require("keypress");
const http = require("http.min");
let t1 = 0;
let t2 = 0;
let tTotal = 0;
let count = 0;


// Functions //
function sendCommand(){
  p1();
  if (httpPost){
    http
    .post(url, postData)
    .then(r => { })
    .catch(e => { });
  } else {
    http(url)
    .then(r => { })
    .catch(e => { });
  }
}

keypress(process.stdin);
process.stdin.on("keypress", function(ch, key) {
  p2();
  if (key && key.ctrl && key.name == "c") {
    process.stdin.pause();
  }
  process.stdin.resume();
});
process.stdin.resume();


function p1() {
  t1 = performance.now();
}
  
function p2() {
  t2 = performance.now();
  let perf = calcTime(t2, t1);
  t1 = 0;
  t2 = 0;
  tTotal = tTotal + perf;
  count ++;
  console.log (`Test: ${count} \tPerformance: ${perf}ms \t Average: ${Math.round(tTotal/count)}ms.`)
}

function calcTime(ta, tb) {
  let tx = ta - tb;
  tx = Math.round(tx);
  return tx;
}

// Test Code //
console.log(``);
console.log(``);
console.log(` Performance testing.`);
console.log(``);
console.log(`Every ${intervalTime / 1000} second(s) a command will be sent to ${url}`);
console.log(` T1: Is the moment the request is sent.`);
console.log(` T2: Is the moment a key press is received.`);
console.log(``);
console.log(`-========================================================================================-`);
console.log(``);
setInterval(sendCommand, intervalTime);