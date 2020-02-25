const sha256 = require("sha256");

class Block {
  constructor(index, timestamp, data, prevHash) {
    (this.index = index),
      (this.timestamp = timestamp),
      (this.data = data),
      (this.prevHash = prevHash),
      (this.currentHash = sha256(
        this.index + this.timestamp + this.data + this.prevHash
      ));
  }
}

const createGenesisBlock = () => {
  return new Block(0, Date.now(), "Genesis Block", "0");
};

const createNextBlock = (lastBlock, data) => {
  return new Block(
    lastBlock.index + 1,
    Date.now(),
    data,
    lastBlock.currentHash
  );
};

const createBlockchain = size => {
  const blockchain = [createGenesisBlock()];

  let prevBlock = blockchain[0];

  for (let i = 1; i < size; i++) {
    const nextBlock = createNextBlock(prevBlock, `This is block #${i}`);
    blockchain.push(nextBlock);
    prevBlock = nextBlock;
  }

  return blockchain;
};

const Blockvid = {
  block: Block,
  createGenesisBlock: createGenesisBlock,
  createNextBlock: createNextBlock,
  createBlockchain: createBlockchain
};

export { Blockvid };
