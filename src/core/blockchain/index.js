const sha256 = require("sha256");

class Block {
  constructor(index, timestamp, data, prevHash) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.prevHash = prevHash;
    this.currentHash = sha256(
      this.index + this.timestamp + this.data + this.prevHash
    );
  }
}

const createGenesisBlock = data => {
  return new Block(
    0,
    Date.now(),
    {
      lat: 0,
      lng: 0
    },
    "0"
  );
};

const createNextBlock = (lastBlock, data) => {
  return new Block(
    lastBlock.index + 1,
    Date.now(),
    data,
    lastBlock.currentHash
  );
};

const createBlockchain = async size => {
  const blockchain = [createGenesisBlock()];

  setTimeout(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        let prevBlock = blockchain[0];
        for (let i = 1; i < size; i++) {
          const nextBlock = createNextBlock(prevBlock, {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          blockchain.push(nextBlock);
          prevBlock = nextBlock;
        }
      });
    } else {
      console.warn("Geolocation is not supported by this browser.");
    }
  }, 3000);

  return blockchain;
};

const Blockvid = {
  block: Block,
  createGenesisBlock: createGenesisBlock,
  createNextBlock: createNextBlock,
  createBlockchain: createBlockchain
};

export { Blockvid };
