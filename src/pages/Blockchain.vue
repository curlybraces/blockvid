<template>
  <div>
    <q-table
      title="Blockchain"
      :data="blockchain"
      :columns="columns"
      row-key="index"
      :filter="filter"
      wrap-cells
      :pagination.sync="pagination"
      :rows-per-page-options="[0]"
    >
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
  </div>
</template>

<script>
import Blockvid, { addBlock } from "./../core/blockchain";
export default {
  data() {
    return {
      blockchain: [],
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
    let chain = [Blockvid.createGenesisBlock()];
    // let newChain = [];
    for (let i = 0; i < 4; i++) {
      let newBlockData = {
        lat: "45.586845" + i,
        lng: "8.9162949" + i
      };
      chain = Blockvid.addBlock(chain, newBlockData);
    }

    if (Blockvid.validateChain(chain)) {
      this.blockchain = chain;
    }
  }
};
</script>

<style></style>
