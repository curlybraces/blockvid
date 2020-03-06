<template>
  <div>
    <BlockchainMap :blockchain="blockchain" class="blockchain-map" />
  </div>
</template>

<script>
import Blockvid, { addBlock } from "./../core/blockchain";
import BlockchainMap from "./../components/Maps/BlockchainMap";
export default {
  components: {
    BlockchainMap
  },
  data() {
    return {
      filter: "",
      pagination: {
        rowsPerPage: 0
      },
      columns: [
        {
          name: "index",
          label: "index",
          field: row => row.index
        },
        {
          name: "timestamp",
          label: "timestamp",
          field: row => row.timestamp
        },
        {
          name: "data",
          label: "data",
          field: row => `lat: ${row.data.lat} - lng: ${row.data.lng}`
        },
        {
          name: "prevHash",
          label: "prevHash",
          field: row => row.previousHash
        },
        {
          name: "currentHash",
          label: "currentHash",
          field: row => row.hash
        }
      ]
    };
  },
  mounted() {
    let chain = Blockvid.isBlockchainLocalStorage()
      ? Blockvid.getBlockchainLocalStorage()
      : Blockvid.initBlockchainLocalStorage();

    if (this.$q.platform.is.cordova) {
      console.log("deviceisready bla bla");
    }

    navigator.geolocation.getCurrentPosition(position => {
      const newBlockData = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      Blockvid.addBlock(chain, newBlockData).then(chain => {
        if (Blockvid.validateChain(chain)) {
          Blockvid.setBlockchainLocalStorage(chain);
          this.$store.dispatch("setBlockchain", chain);
        } else {
          console.error("Your chain is not valid!");
        }
      });
    });
  },
  computed: {
    blockchain() {
      return this.$store.state.blockchain;
    }
  }
};
</script>
<style>
.blockchain-map {
  height: 70vh;
}
</style>
