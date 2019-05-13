const {Packet, Decoder} = require("./index");

const packet = new Packet("spawn", {entity : "cow", position: "400,200"}, false, false, true, "salt");

console.log("encoded output: " + JSON.stringify(packet.data));

console.log("decoded output: " + JSON.stringify(new Decoder(packet, "salt").decode()));