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
import { Blockvid } from "./../core/blockchain";
export default {
  data() {
    return {
      filter: "",
      blockchain: Blockvid.createBlockchain(10000),
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
          field: row => row.data
        },
        {
          name: "prevHash",
          label: "prevHash",
          field: row => row.prevHash
        },
        {
          name: "currentHash",
          label: "currentHash",
          field: row => row.currentHash
        }
      ]
    };
  },
  mounted() {
    console.log(this.blockchain);
  }
};
</script>

<style></style>
