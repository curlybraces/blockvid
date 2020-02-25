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

        <q-card-section class="q-pt-none">
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

        <div class="q-pb-md">
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
              <q-btn
                v-if="!showSource"
                @click.stop="showSource = !showSource"
                label="Visualizza fonte"
                flat
                color="red-9"
              />
              <q-btn
                v-if="showSource"
                @click.stop="showSource = !showSource"
                label="Nascondi fonte"
                flat
                color="red-9"
              />
            </template>
          </q-table>
        </div>

        <div class="q-pb-md" v-if="showSource">
          <link-prevue :url="sourceTotalInfectedItalyExploded">
            <template slot-scope="props">
              <q-card class="my-card">
                <q-parallax :src="props.img" :alt="props.title" :height="250" />

                <q-card-section>
                  <div class="text-h6">{{ props.title }}</div>
                  <div class="text-subtitle2">{{ props.description }}</div>
                </q-card-section>

                <q-card-section>
                  <q-btn
                    type="a"
                    :href="props.url"
                    target="_blank"
                    label="Leggi altro"
                    flat
                    color="red-9"
                  />
                </q-card-section>
              </q-card>
            </template>
          </link-prevue>
        </div>

        <div class="q-pb-md">
          <iframe
            src="https://www.google.com/maps/d/embed?mid=17CmSRmkYLU2Zi0XQ0X1sO3ljqJTGEq0x"
            height="480"
            class="full-width"
          ></iframe>
        </div>

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
    <div class="q-pt-md q-pb-md">
      <h4
        class="text-weight-bold text-center"
        style="margin-top: 5px; margin-bottom: 15px"
      >
        Consigliato per te
      </h4>
      <div class="text-h5">{{ questions[rand].q }}</div>
      <div class="text-body1">
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
    </div>
  </q-page>
</template>

<script>
import moment from "./../boot/moment";
import LinkPrevue from "link-prevue";
import { questions } from "../misc/questions";

export default {
  name: "PageIndex",
  components: {
    LinkPrevue
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
          label: "Ricoverati",
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
      sourceTotalInfectedItalyExploded:
        "https://www.ilfattoquotidiano.it/2020/02/25/coronavirus-diretta-oltre-280-contagi-ce-il-primo-al-sud-e-donna-bergamasca-in-vacanza-a-palermo-borrelli-conferma-due-casi-in-toscana-positivi-due-studenti-del-medico-contagiato-a-milano/5716419/",
      totalInfectedItalyExploded: [
        {
          region: "Lombardia",
          total: 212
        },
        {
          region: "Veneto",
          total: 38
        },
        {
          region: "Emilia Romagna",
          total: 23
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
          region: "Toscana",
          total: 2
        },
        {
          region: "Alto Adige",
          total: 1
        },
        {
          region: "Sicilia",
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
