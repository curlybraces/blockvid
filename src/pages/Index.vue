<template>
  <q-page padding>
    <div class="q-gutter-md q-pt-md" style="max-width: 600px">
      <div class="text-center">
        <div class="text-h2">block<span class="text-red-9">vid</span></div>
        <div class="text-overline">insieme per una corretta informazione</div>
      </div>
      <div class="text-center">
        <div class="row text-red-3">
          <div class="col">
            <span class="text-h6"
              ><b>{{
                totalInfectedItalyExploded.reduce((a, b) => {
                  return Number(a) + Number(b.total);
                }, 0)
              }}</b></span
            >
            ITALIA
          </div>
          <div class="col">
            <span class="text-h6">
              <b>{{ totalInfected }}</b></span
            >
            MONDO
          </div>
        </div>
      </div>
    </div>

    <News />

    <div class="q-gutter-md q-pt-md" style="max-width: 600px">
      <q-table
        title="In italia"
        :data="totalInfectedItalyExploded"
        :columns="columnsItalyExploded"
        :filter="filterItalyExploded"
        :pagination.sync="paginationItalyExploded"
        row-key="name"
      >
        <template v-slot:top-right>
          <q-input
            dense
            borderless
            debounce="300"
            v-model="filterItalyExploded"
            placeholder="Ricerca..."
          />
        </template>
        <template v-slot:bottom>
          Totale
          <div class="text-body1 q-ml-lg">
            <b>
              {{
                totalInfectedItalyExploded.reduce((a, b) => {
                  return Number(a) + Number(b.total);
                }, 0)
              }}
            </b>
            <q-btn
              type="a"
              href="http://www.salute.gov.it/portale/nuovocoronavirus/dettaglioContenutiNuovoCoronavirus.jsp?lingua=italiano&id=5351&area=nuovoCoronavirus&menu=vuoto"
              target="_blank"
              label="Visualizza fonte"
              flat
              color="red-9"
            />
          </div>
        </template>
      </q-table>
    </div>

    <div class="q-gutter-md q-pt-md" style="max-width: 600px">
      <iframe
        src="https://www.google.com/maps/d/embed?mid=17CmSRmkYLU2Zi0XQ0X1sO3ljqJTGEq0x"
        height="480"
        class="full-width"
      ></iframe>
    </div>

    <div class="q-gutter-md q-pt-md" style="max-width: 600px">
      <q-table
        title="Nel mondo"
        :data="covidData"
        :columns="columns"
        :filter="filter"
        row-key="name"
      >
        <template v-slot:top-right>
          <q-input
            dense
            borderless
            debounce="300"
            v-model="filter"
            placeholder="Ricerca..."
          >
          </q-input>
        </template>

        <template v-slot:bottom>
          <div class="text-caption">
            I dati sono aggiornati al {{ lastUpdate.format("DD-MM-YYYY") }}
            <q-btn
              type="a"
              :href="endpoint"
              target="_blank"
              label="Visualizza report"
              flat
              color="red-9"
            />
          </div>
        </template>
      </q-table>
    </div>

    <div class="q-gutter-md q-pt-md" style="max-width: 600px">
      <q-card>
        <h4
          class="text-weight-bold text-center q-pt-sm"
          style="margin-top: 5px; margin-bottom: 15px"
        >
          Consigliato per te
        </h4>
        <div class="text-h5 q-pa-md">{{ questions[rand].q }}</div>
        <div class="text-body1 q-pa-md">
          {{ questions[rand].a }}
        </div>
        <div class="q-pt-md">
          <q-item class="right-align">
            <div>
              <q-btn
                type="a"
                href="http://www.salute.gov.it/nuovocoronavirus"
                target="_blank"
                label="Ministero della salute"
                flat
                color="red-9"
              />
            </div>
          </q-item>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import News from "./News";

import moment from "./../boot/moment";
import { questions } from "../misc/questions";

export default {
  name: "PageIndex",
  components: {
    News
  },
  data() {
    return {
      endpoint:
        "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/",
      today: moment(),
      covidData: [],
      lastUpdate: moment(),
      questions: questions,
      rand: Math.floor(Math.random() * 10),
      columns: [
        {
          name: "country",
          label: "Paese/Stato",
          field: row => row[1],
          format: (val, row) => `${val}` + (row[0] ? ` [${row[0]}]` : ``),
          // sortable: true,
          align: "left",
          sort: 1
        },
        // {
        //   name: "province",
        //   required: true,
        //   label: "Provincia/Regione",
        //   align: "left",
        //   field: row => row[0],
        //   sortable: true
        // },
        {
          name: "confirmed",
          label: "Confermati",
          field: row => row[3],
          // sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },
        {
          name: "deaths",
          label: "Morti",
          field: row => row[4],
          // sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },
        {
          name: "recovered",
          label: "Guariti",
          field: row => row[5],
          // sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },
        {
          name: "lastUpdate",
          label: "Ultimo aggiornamento",
          field: row => row[2]
          // sortable: true
        }
      ],
      filter: "",
      paginationItalyExploded: {
        rowsPerPage: 0
      },
      filterItalyExploded: "",
      columnsItalyExploded: [
        {
          name: "region",
          label: "Regione",
          field: row => row.region,
          align: "left",
          sortable: true
        },
        {
          name: "total",
          label: "Totale",
          field: row => row.total,
          align: "left",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        }
      ],
      showSource: false,
      totalInfectedItalyExploded: [
        {
          region: "Lombardia",
          total: 403
        },
        {
          region: "Veneto",
          total: 111
        },
        {
          region: "Emilia Romagna",
          total: 97
        },
        {
          region: "Liguria",
          total: 19
        },
        {
          region: "Sicilia",
          total: 4
        },
        {
          region: "Piemonte",
          total: 3
        },
        {
          region: "Lazio",
          total: 3
        },
        {
          region: "Marche",
          total: 3
        },
        {
          region: "Toscana",
          total: 2
        },
        {
          region: "Campania",
          total: 2
        },
        {
          region: "Trentino Alto Adige",
          total: 1
        },
        {
          region: "Abruzzo",
          total: 1
        },
        {
          region: "Puglia",
          total: 1
        }
      ]
    };
  },
  mounted() {
    this.prepareData(this.endpoint, this.today)
      .then(response => {
        this.covidData = response;
        this.formalize(response);
        this.lastUpdate = data;
      })
      .catch(error => {
        let endpoint = this.endpoint;
        let data = this.today.subtract(1, "days");

        this.prepareData(endpoint, data).then(response => {
          this.covidData = response;

          this.formalize(response);
          this.lastUpdate = data;
        });
      });
  },
  methods: {
    prepareData(endpoint, date) {
      let finalEndpoint = endpoint + date.format("MM-D-YYYY") + ".csv";
      return new Promise((resolve, reject) => {
        this.$axios
          .get(finalEndpoint)
          .then(response => {
            this.endpoint = finalEndpoint;
            let covidData = response.data.split("\n").map(row => {
              return row.split(",").length > 6
                ? row.split(",").unshift()
                : row.split(",");
            });
            covidData.shift();

            resolve(covidData);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    formalize(data) {
      let totalInfected = 0;
      let totalInfectedItaly = 0;

      data.forEach(row => {
        if (row.length == 7) {
          totalInfected += Number(row[4]);
        }
        if (row.length == 6) {
          totalInfected += Number(row[3]);
        }
        if (row[1] == "Italy") {
          if (row.length == 7) {
            totalInfectedItaly += Number(row[4]);
          }
          if (row.length == 6) {
            totalInfectedItaly += Number(row[3]);
          }
        }
      });

      this.$store.dispatch("setTotalInfected", totalInfected);
      this.$store.dispatch("setTotalInfectedItaly", totalInfectedItaly);
    }
  },
  computed: {
    leftDrawerOpen: {
      get() {
        return this.$store.state.leftDrawerOpen;
      },
      set() {
        this.$store.dispatch(
          "leftDrawerOpen",
          !this.$store.state.leftDrawerOpen
        );
      }
    },
    totalInfected() {
      return this.$store.state.totalInfected;
    },
    totalInfectedItaly() {
      return this.$store.state.totalInfectedItaly;
    }
  }
};
</script>
