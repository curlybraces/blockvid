<template>
  <q-page class="row justify-center items-center" padding>
    <div class="q-pt-lg full-width" style="max-width: 1000px">
      <div class="text-center">
        <h2 class="text-h2 q-pt-none q-mt-none q-pb-none q-mb-none">
          block<span class="text-red-9">vid</span>
        </h2>
        <h2 class="text-overline q-pt-none q-mt-none">
          insieme per una corretta informazione
        </h2>
        <q-btn
          type="a"
          href="https://play.google.com/store/apps/details?id=org.matness.blockvid"
          target="_blank"
          dense
        >
          <q-img src="/statics/playstore.png" width="130px" />
        </q-btn>
      </div>
      <div class="text-center q-pt-lg">
        <div class="row text-red-3">
          <div class="col">
            <q-markup-table class="no-border no-box-shadow" v-model="separator">
              <thead>
                <tr>
                  <th class="text-bold text-right" colspan="2">ITALIA</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="text-bold text-left">CONTAGI</td>
                  <td class="text-right text-red-9">
                    <b>{{ infectsItaly.totale_casi }}</b>
                  </td>
                </tr>
                <tr>
                  <td class="text-bold text-left">GUARITI</td>
                  <td class="text-right text-red-9">
                    <b>{{ infectsItaly.dimessi_guariti }}</b>
                  </td>
                </tr>
                <tr>
                  <td class="text-bold text-left">DECEDUTI</td>
                  <td class="text-right text-red-9">
                    <b>{{ infectsItaly.deceduti }}</b>
                  </td>
                </tr>
              </tbody>
            </q-markup-table>
          </div>
          <div class="col">
            <q-markup-table class="no-border no-box-shadow" v-model="separator">
              <thead>
                <tr>
                  <th class="text-bold text-right" colspan="2">MONDO</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="text-left"></td>
                  <td class="text-right text-red-9">
                    <b>{{ totalInfected }}</b>
                  </td>
                </tr>
                <tr>
                  <td class="text-left"></td>
                  <td class="text-right text-red-9">
                    <b>{{ totalHealeds }}</b>
                  </td>
                </tr>
                <tr>
                  <td class="text-left"></td>
                  <td class="text-right text-red-9">
                    <b>{{ totalDeaths }}</b>
                  </td>
                </tr>
              </tbody>
            </q-markup-table>
          </div>
        </div>
      </div>
    </div>

    <News />

    <InfectsProvince country="IT" />

    <div class="q-pt-md full-width" style="max-width: 1000px">
      <div class="text-center">
        <h1 class="text-h5 text-bold text-red-9 q-pb-none q-mb-none">
          <q-icon name="map" /> MAPPE INTERATTIVE
        </h1>
      </div>
      <div class="q-pt-md window-height">
        <iframe
          src="https://public.flourish.studio/visualisation/1437744/embed"
          frameborder="0"
          scrolling="no"
          class="full-height full-width"
          title="Gedi Visual Map"
          style="margin; 0"
        ></iframe>
      </div>
      <div class="q-pt-md window-height">
        <iframe
          src="https://public.flourish.studio/visualisation/1462461/embed"
          frameborder="0"
          scrolling="no"
          height="800"
          class="full-width"
          title="Gedi Visual Map"
          style="margin; 0"
        ></iframe>
        <q-btn
          type="a"
          href="https://lab.gedidigital.it/gedi-visual/2020/coronavirus-i-contagi-in-italia/"
          target="_blank"
          label="Fonte: La Repubblica"
          flat
          color="red-9"
        />
      </div>
    </div>

    <div class="q-pt-md full-width" style="max-width: 1000px">
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
      <div class="text-caption">
        <q-btn
          type="a"
          href="https://github.com/CSSEGISandData/COVID-19"
          target="_blank"
          label="@CSSEGISandData"
          flat
          color="red-9"
        />
      </div>
    </div>

    <div class="q-pt-md full-width" style="max-width: 1000px">
      <div class="text-center">
        <h1 class="text-h5 text-bold text-red-9 q-pb-none q-mb-none">
          <q-icon name="healing" /> PROTEGGITI
        </h1>
      </div>
      <div class="row">
        <q-img
          src="https://www.who.int/images/default-source/health-topics/coronavirus/social-media-squares/blue-1.png"
          style="width: 50%"
        >
        </q-img>
        <q-img
          src="https://www.who.int/images/default-source/health-topics/coronavirus/social-media-squares/blue-2.png"
          style="width: 50%"
        >
        </q-img>
        <q-img
          src="https://www.who.int/images/default-source/health-topics/coronavirus/social-media-squares/blue-3.png"
          style="width: 50%"
        >
        </q-img>
        <q-img
          src="https://www.who.int/images/default-source/health-topics/coronavirus/social-media-squares/blue-4.png"
          style="width: 50%"
        >
        </q-img>
        <q-btn
          type="a"
          href="https://www.nbcnews.com/health/health-news/coronavirus-map-confirmed-cases-2020-n1120686"
          target="_blank"
          label="World Health Organization"
          flat
          color="red-9"
        />
      </div>
    </div>

    <div class="q-pt-md full-width" style="max-width: 1000px">
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
import News from "./../components/News";
import InfectsProvince from "./../components/InfectsProvince";

import moment from "./../boot/moment";
import { questions } from "../misc/questions";

export default {
  name: "PageIndex",
  components: {
    News,
    InfectsProvince
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
      separator: "none",
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
        rowsPerPage: 10,
        sortBy: "total",
        descending: true
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
      showSource: false
    };
  },
  mounted() {
    this.$store.dispatch("getInfectsItaly");

    this.prepareData(this.endpoint, this.today)
      .then(response => {
        this.covidData = response;
        this.formalize(response);
        this.lastUpdate = data;
      })
      .catch(error => {
        let endpoint = this.endpoint;
        let data = this.today.subtract(1, "days");

        this.prepareData(endpoint, data)
          .then(response => {
            this.covidData = response;

            this.formalize(response);
            this.lastUpdate = data;
          })
          .catch(error => {
            let endpoint = this.endpoint;
            let data = this.today.subtract(2, "days");

            this.prepareData(endpoint, data).then(response => {
              this.covidData = response;

              this.formalize(response);
              this.lastUpdate = data;
            });
          });
      });

    console.log(this.infectsItaly);
  },
  methods: {
    prepareData(endpoint, date) {
      let finalEndpoint = endpoint + date.format("MM-DD-YYYY") + ".csv";
      return new Promise((resolve, reject) => {
        this.$axios
          .get(finalEndpoint)
          .then(response => {
            this.endpoint = finalEndpoint;
            let covidData = response.data.split("\n").map(row => {
              return row.split(",").length > 8
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
      let totalHealeds = 0;
      let totalDeaths = 0;

      data.forEach(row => {
        if (row.length == 9) {
          totalInfected += Number(row[4]);
          totalDeaths += Number(row[5]);
          totalHealeds += Number(row[6]);
        }
        if (row.length == 8) {
          totalInfected += Number(row[3]);
          totalDeaths += Number(row[4]);
          totalHealeds += Number(row[5]);
        }
      });

      this.$store.dispatch("setTotalInfected", totalInfected);
      this.$store.dispatch("setTotalHealeds", totalHealeds);
      this.$store.dispatch("setTotalDeaths", totalDeaths);
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
    infectsItaly: {
      get() {
        let infects = this.$store.state.infectsItaly;

        if (infects.length > 0) {
          return infects[infects.length - 1];
        }

        return {};
      }
    },
    totalInfected() {
      return this.$store.state.totalInfected;
    },
    totalHealeds() {
      return this.$store.state.totalHealeds;
    },
    totalDeaths() {
      return this.$store.state.totalDeaths;
    }
  }
};
</script>
