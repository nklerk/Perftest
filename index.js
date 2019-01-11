// Settings
//

const intervalTime = 1000;   // Test interval time in miliseconds.
const host = "10.2.1.35";    // Host address
const io = "1";              // IO Port
const prontoHex = "00000073000000210060002000100010001000100010002000100020003000200010001000100010001000100010001000100010001000100010001000100010001000100010001000200010001000100010001000100020001000100010001000100010001000100020002000100010001000100010001000100010001000100020002000200010001009DD";

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
  apiPost(host, `command/irpass/${io}/`, `{"irdata":"${prontoHex}"}`);
}

function apiPost(mHubHost, api, data) {
  return http
    .post(`http://${mHubHost}/api/${api}`, data)
    .then(r => {
      try {
        return JSON.parse(r.data).data;
      } catch (e) {}
    })
    .catch(e => {
      console.log(e);
    });
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

console.log(` Performance testing.`);
console.log(``);
console.log(`Every ${intervalTime / 1000} second(s) a command will be sent to ${host}`);
console.log(` T1: Is the moment the request is sent.`);
console.log(` T2: Is the moment a key press is received.`);
console.log(``);
console.log(`-========================================================================================-`);
console.log(``);
setInterval(sendCommand, intervalTime);