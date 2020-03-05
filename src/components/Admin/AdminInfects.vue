<template>
  <div id="AdminInfects">
    <div class="text-h6 text-red-9 no-padding">
      <q-icon name="timeline" /> Gestione infetti
    </div>

    <div>
      <q-table
        title="Treats"
        :data="infectsNumbers"
        :columns="columns"
        row-key="id"
        binary-state-sort
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="region" :props="props">
              {{ props.row.region }}
              <q-popup-edit buttons @submit="saveInput(props.row)">
                <q-input
                  @input="saveInput(props.row)"
                  :value="props.row.region"
                  dense
                  autofocus
                />
              </q-popup-edit>
            </q-td>
            <q-td key="country" :props="props">
              {{ props.row.country }}
              <q-popup-edit :value="props.row.country">
                <q-input
                  maxlength="2"
                  :value="props.row.country"
                  dense
                  autofocus
                />
              </q-popup-edit>
            </q-td>
            <q-td key="infects" :props="props">
              <div class="text-pre-wrap">{{ props.row.infects }}</div>
              <q-popup-edit :value="props.row.infects">
                <q-input :value="props.row.infects" dense autofocus />
              </q-popup-edit>
            </q-td>
            <q-td key="healeds" :props="props">
              {{ props.row.healeds }}
              <q-popup-edit :value="props.row.healeds">
                <q-input :value="props.row.healeds" dense autofocus />
              </q-popup-edit>
            </q-td>
            <q-td key="deaths" :props="props">
              {{ props.row.deaths }}
              <q-popup-edit :value="props.row.deaths">
                <q-input :value="props.row.deaths" dense autofocus />
              </q-popup-edit>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script>
import axiosClient from "../../core/axiosClient";
export default {
  name: "AdminInfects",
  data() {
    return {
      columns: [
        {
          name: "region",
          required: true,
          label: "Regione",
          field: "region",
          align: "left",
          sortable: true
        },
        {
          name: "country",
          required: true,
          label: "Stato",
          field: "country",
          sortable: true
        },
        {
          name: "infects",
          align: "center",
          label: "Contagi",
          field: "infects",
          sortable: true
        },
        {
          name: "healeds",
          align: "center",
          label: "Guariti",
          field: "healeds",
          sortable: true
        },
        {
          name: "deaths",
          align: "center",
          label: "Morti",
          field: "deaths",
          sortable: true
        }
      ]
    };
  },
  methods: {
    saveInput(props) {
      console.log(props);
    }
  },
  mounted() {
    this.$store.dispatch("getInfectsNumbers");
  },
  computed: {
    infectsNumbers: {
      get() {
        // console.log(this.$store.state.infectsNumbers);
        return this.$store.state.infectsNumbers;
      },
      set(infectsNumbers) {
        this.$store.commit("setInfectsNumbers", infectsNumbers);
      }
    }
  }
};
</script>

<style></style>
