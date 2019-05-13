
const Packet = require("./Packet");

var decoder = {
	decode: function (s, k) {
		var enc = "";
		str = s.toString() | "";
		for (var i = 0; i < s.length; i++) {
			var a = s.charCodeAt(i);
			var b = a ^ k.length;
			enc = enc + String.fromCharCode(b);
		}
		return enc;
	}
};

class PacketDecoder {

    /**
     * A Packet Decoder to decode encoded packets.
     * @param {Packet} packet the packet to decode.
     */
    constructor(packet, salt = "packet") {
        this.packet = packet;
        this.salt = salt;
    }

    /**
     * Decode the specified packet or any other packet.
     * @param {Packet} packet the packet to decode.
     * @param {String} salt the salt to decode the packet with.
     * @example
     * const decoder = new PacketDecoder(packet, "salt").decode();
     * @returns {Object}
     */
    decode(packet = this.packet, salt = this.salt) {

        if (!packet.encoded) return packet.data;

        let result = {};

        for (let key of Object.keys(packet.data)) {

            let value = packet.data[key];

            result[key] = decoder.decode(value, salt);

        }

        return result;
        
    }

}

module.exports = PacketDecoder;