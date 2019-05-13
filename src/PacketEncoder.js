
const Packet = require("./Packet");

const Encoder = {
	encode: function (s, k) {
		var enc = "";
		str = s.toString();
		for (var i = 0; i < s.length; i++) {
			var a = s.charCodeAt(i);
			var b = a ^ k.length;
			enc = enc + String.fromCharCode(b);
		}
		return enc;
	}
};

class PacketEncoder {

    /**
     * A Packet Encoder.
     * @param {Packet} packet the packet to encode.
     * @param {String} salt the salt to encode the packet with.
     */
    constructor(packet, salt = "packet") {
        this.packet = packet;
        this.salt = salt;
    }

    /**
     * Encode the specified packet or another packet.
     * @param {Packet} packet the packet to encode.
     * @param {String} salt the salt to encode the packet with.
     * @example
     * const encoder = new PacketEncoder(packet, "salt").encode();
     * @returns {Object}
     */
    encode(packet = this.packet, salt = this.salt) {

        let result = {};

        for (let key of Object.keys(packet.data)) {

            let value = packet.data[key];

            result[key] = Encoder.encode(value, salt);

        }

        return result;

    }

}

module.exports = {PacketEncoder, Encoder};