<template>
  <q-page padding>
    <div class="q-gutter-md q-pt-md">
      <q-card>
        <q-img
          height="250px"
          src="https://upload.wikimedia.org/wikipedia/commons/7/72/2019-nCoV-CDC-23312_without_background.png"
        />

        <q-card-section>
          <!--  -->
          <div class="row items-center">
            <div class="col text-h6 ellipsis">
              COVID-19
            </div>
            <div
              class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
            ></div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="q-gutter-md q-pt-md">
      <q-card>
        <q-card-section class="q-pt-md">
          <div class="text-subtitle">
            <b>{{
              totalInfectedItalyExploded.reduce((a, b) => {
                return Number(a) + Number(b.total);
              }, 0)
            }}</b>
            INFETTI IN ITALIA
          </div>
          <div class="text-caption text-grey">
            Il corona virus ha infettato circa
            <b>{{ totalInfected }}</b> persone nel mondo. <br />
          </div>
        </q-card-section>

        <q-card-section>
          <q-btn
            v-if="!showSource"
            @click.stop="$router.push({ name: 'newsList' })"
            label="Visualizza notizie e aggiornamenti"
            flat
            color="red-9"
          />
        </q-card-section>
      </q-card>
    </div>

    <div class="q-gutter-md q-pt-md">
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
          </div>
        </template>
      </q-table>
    </div>

    <div class="q-pb-md">
      <iframe
        src="https://www.google.com/maps/d/embed?mid=17CmSRmkYLU2Zi0XQ0X1sO3ljqJTGEq0x"
        height="480"
        class="full-width"
      ></iframe>
    </div>

    <div class="q-gutter-md q-pt-md">
      <q-card>
        <div class="q-pb-md">
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
          </q-table>
        </div>

        <q-card-section class="q-pt-none">
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
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <div id="action1" @click="leftDrawerOpen = !leftDrawerOpen">
            <q-btn flat round icon="book" />
            <q-btn flat color="primary">Leggi altro</q-btn>
          </div>
        </q-card-actions>
      </q-card>
    </div>

    <div class="q-gutter-md q-pt-md">
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
import moment from "./../boot/moment";
import { questions } from "../misc/questions";

export default {
  name: "PageIndex",
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
          align: "left"
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
          total: 258
        },
        {
          region: "Veneto",
          total: 71
        },
        {
          region: "Emilia Romagna",
          total: 47
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
          region: "Sicilia",
          total: 3
        },
        {
          region: "Liguria",
          total: 11
        },
        {
          region: "Toscana",
          total: 2
        },
        {
          region: "Trentino Alto Adige",
          total: 1
        },
        {
          region: "Marche",
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
