<template>
    <div class="q-pt-md full-width" style="max-width: 1000px">
      <div class="text-center">
        <h1 class="text-h5 text-bold text-red-9 q-pb-none q-mb-none">
          <q-icon name="done_all" /> DATI PER PROVINCIA
        </h1>
      </div>

      <q-table
        title="In italia"
        :data="infectsProvince"
        :columns="columns"
        :filter="filter"
        :pagination.sync="pagination"
        row-key="name"
      >
        <template v-slot:top-right>
          <q-input
            dense
            borderless
            debounce="300"
            v-model="filter"
            placeholder="Ricerca..."
          />
        </template>
      </q-table>
      <div class="text-body1 q-ml-none">
        <q-btn
          type="a"
          href="http://www.protezionecivile.gov.it/attivita-rischi/rischio-sanitario/emergenze/coronavirus"
          target="_blank"
          label="Fonte: Protezione Civile"
          flat
          color="red-9"
        />
      </div>
    </div>
  <!-- https://github.com/pcm-dpc/COVID-19/blob/master/dati-json/dpc-covid19-ita-province.json -->
</template>

<script>
import moment from "moment";
export default {
  name: "InfectsProvince",
  props: {
    country: String
  },
  mounted() {
    this.$store.dispatch("getInfectsProvince");
  },
  data() {
    return {
      filter: "",
      columns: [
        {
          name: "denominazione_provincia",
          label: "Provincia",
          field: row => row.denominazione_provincia,
          format: (val, row) =>
            val.length > 15 ? val.substr(0, 15) + `...` : val,
          align: "left",
          sortable: true
        },
        {
          name: "denominazione_regione",
          label: "Regione",
          field: row => row.denominazione_regione,
          sortable: true
        },
        {
          name: "totale_casi",
          label: "Totale casi",
          field: row => row.totale_casi,
          format: (val, row) => Number(val),
          sortable: true,
          sort: (a, b, rowA, rowB) => parseInt(a, 10) - parseInt(b, 10)
        }
      ],
      pagination: {
        rowsPerPage: 10,
        sortBy: "totale_casi",
        descending: true
      }
    };
  },
  methods: {},
  computed: {
    infectsProvince() {
      return this.$store.state.infectsProvince;
    }
  }
};
</script>

<style></style>
