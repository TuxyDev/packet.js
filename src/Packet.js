
const {PacketEncoder, Encoder} = require("./PacketEncoder");

const encryptor = new PacketEncoder();

class Packet {

    /**
     * A packet for a raw event.
     * @param {String} name the name of the packet.
     * @param {Object} data the data for the packet to handle.
     * @param {Boolean} writable if the packet is writable.
     * @param {Boolean} renamable if the packet is renamable.
     * @param {Boolean} encrypted if the packet should be encrypted.
     * @param {String} salt the salt of the packet, if it is to bee encoded.
     * Example Usage:
     * @example
     * const packet = new Packet("kill", {entity: "dave"}, false, false, true);
     */
    constructor(name, data = {}, writable = true, renamable = false, encoded = false, salt = "packet") {
        this.data = data;
        this.name = name;
        this.encoded = encoded;
        if (encoded) this.data = encryptor.encode(this, salt);
        if (!renamable) Object.freeze(this.name);
        if (!writable && !encoded) Object.freeze(this.data);
    }

    /**
     * Write data to the packet.
     * @param {String} field the field the data should be written in.
     * @param {Object} data the data that should be written to that field.
     * @example
     * Packet.write("name", "dave");
     */
    async write(field, data = null) {
        return new Promise(async (resolve, reject) => {
            if (Object.isFrozen(this.data)) await reject(false);
            this.data[field] = Encoder.encode(data);
            await resolve(true);
        });
    }

    /**
     * Read the packet's data or a specific field.
     * @param {String} field optional field to be read.
     * @example
     * Packet.read("name").then(name => console.log("the player's name is " + name));
     */
    async read(field) {
        return new Promise(async (resolve, reject) => {
            if (Object.isFrozen(this.data)) await reject(false);
            await resolve(this.data[field]);
        });
    }
    
}

module.exports = Packet;