var data = "+200.00";
if (data.charAt(0) === "-") {
    data = data.substring(1)
    console.log("- $" + data);
} else if (data.charAt(0) === "+" || !isNaN(data)) {
    if (data.charAt(0) === "+") {
        data = data.substring(1)
        console.log("+ $" + data);
    }
    else{
    console.log("+ $"+data);
    }
}
const connection = new WebSocket('wss://api.coinranking.com/v2/real-time/rates?x-access-token=coinranking999458419ab25a0ec7924033e2a492da72460378e3eef0af');

connection.onmessage = (event) => {
  const rate = JSON.parse(event.data);
  console.log(rate);
};