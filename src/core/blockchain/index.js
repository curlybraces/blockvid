import trampoline from "./../utils/trampoline";

const sha256 = require("sha256");

/**
 *
 * @param {Object} block
 * @returns {String}
 */
export function calculateHash({ previousHash, timestamp, data, nonce = 1 }) {
  return sha256(
    previousHash + timestamp + JSON.stringify(data) + nonce
  ).toString();
}

/**
 *
 * @returns {Object}
 */
export function createGenesisBlock() {
  const block = {
    timestamp: new Date(),
    data: "GENESIS_BLOCK",
    previousHash: 0
  };

  return {
    ...block,
    hash: this.calculateHash(block)
  };
}

/**
 *
 * @param {Object} block
 * @returns {Object}
 */
export function nextNonce(block) {
  return updateHash({
    ...block,
    nonce: block.nonce + 1
  });
}

/**
 *
 * @param {Object} block
 * @returns {Object}
 */
export function updateHash(block) {
  return {
    ...block,
    hash: calculateHash(block)
  };
}

/**
 * This function returns true if the passed hash respects the constraint.
 * Otherwise will return false
 *
 * @param {Number} difficulty
 * @param {String} hash
 * @returns {Boolean}
 */
export function checkDifficulty(difficulty, hash) {
  return hash.substr(0, difficulty) === "0".repeat(difficulty);
}

/**
 * Mining logic
 *
 * @param {Number} difficulty
 * @param {Object} block
 * @returns {Object}
 */
export function mineBlock(difficulty, block) {
  function mine(block) {
    const newBlock = nextNonce(block);

    return checkDifficulty(difficulty, newBlock.hash)
      ? newBlock
      : () => mine(nextNonce(block));
  }

  return trampoline(mine(nextNonce(block)));
}

/**
 * Add block to chain
 *
 * @param {Array<Object>} chain
 * @param {Object} data
 * @returns {Array<Object>}
 */
export async function addBlock(chain, data) {
  let promise = new Promise((resolve, reject) => {
    let blockchain = JSON.parse(chain);
    const { data: previousData } = blockchain[blockchain.length - 1];
    if (JSON.stringify(previousData) !== JSON.stringify(data)) {
      const { hash: previousHash } = blockchain[blockchain.length - 1];
      const block = {
        timestamp: +new Date(),
        data,
        previousHash,
        nonce: 0
      };
      const newBlock = mineBlock(3, block);
      resolve(blockchain.concat(newBlock));
    } else {
      resolve(blockchain);
    }
  });

  return promise;
}

/**
 * Validating blockchain
 *
 * @param {Array<Object>} chain
 * @returns {Boolean}
 */
export function validateChain(chain) {
  // tail call elimination
  function tce(chain, index) {
    if (index === 0) return true;

    const { hash, ...currentBlockWithoutHash } = chain[index];
    const currentBlock = chain[index];
    const previousBlock = chain[index - 1];

    const isValidHash = hash === calculateHash(currentBlockWithoutHash);
    const isPreviousHashValid =
      currentBlock.previousHash === previousBlock.hash;

    const isValidChain = isValidHash && isPreviousHashValid;

    if (!isValidChain) return false;
    else return tce(chain, index - 1);
  }

  return tce(chain, chain.length - 1);
}

export function initBlockchainLocalStorage() {
  let chain = [this.createGenesisBlock()];
  this.setBlockchainLocalStorage(chain);

  return this.getBlockchainLocalStorage();
}

/**
 * @return {Boolean}
 */
export function isBlockchainLocalStorage() {
  if (
    this.getBlockchainLocalStorage() === null ||
    this.getBlockchainLocalStorage() === undefined
  ) {
    return false;
  }
  return true;
}

/**
 * @return {Array<Object>|null}
 */
export function getBlockchainLocalStorage() {
  let blockchain = localStorage.getItem("blockchain");

  return blockchain;
}

/**
 * @param {Array<Object>}
 * @return {Boolean}
 */
export function setBlockchainLocalStorage(chain) {
  try {
    localStorage.setItem("blockchain", JSON.stringify(chain));
  } catch (error) {
    console.error(error);

    return false;
  }

  return true;
}

export default {
  calculateHash: calculateHash,
  nextNonce: nextNonce,
  updateHash: updateHash,
  checkDifficulty: checkDifficulty,
  createGenesisBlock: createGenesisBlock,
  mineBlock: mineBlock,
  addBlock: addBlock,
  validateChain: validateChain,
  initBlockchainLocalStorage: initBlockchainLocalStorage,
  isBlockchainLocalStorage: isBlockchainLocalStorage,
  getBlockchainLocalStorage: getBlockchainLocalStorage,
  setBlockchainLocalStorage: setBlockchainLocalStorage
};
