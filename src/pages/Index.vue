<template>
  <q-page class="flex">
    <div class="row q-gutter-md">
      <q-card>
        <q-img
          height="250px"
          src="https://upload.wikimedia.org/wikipedia/commons/7/72/2019-nCoV-CDC-23312_without_background.png"
        />

        <q-card-section>
          <!--  -->

          <div class="row no-wrap items-center">
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
            <b>{{ totalInfectedItaly }}</b> INFETTI IN ITALIA
          </div>
          <div class="text-caption text-grey">
            Il corona virus ormai ha affettato circa
            <b>{{ totalInfected }}</b> persone nel mondo. <br />
            <ul>
              <li>Come prevenirlo?</li>
              <li>Cosa devo fare?</li>
            </ul>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-caption">
            I dati sono aggiornati al {{ lastUpdate.format("DD-MM-YYYY") }} 
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
  </q-page>
</template>

<script>
import moment from "./../boot/moment";

export default {
  name: "PageIndex",
  data() {
    return {
      endpoint:
        "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/",
      today: moment(),
      covidData: [],
      lastUpdate: null
    };
  },
  async mounted() {
    let endpoint = this.endpoint;
    let data = this.today;

    await this.prepareData(endpoint, data)
      .then(response => {
        this.formalize(response);
        this.lastUpdate = data;
      })
      .catch(error => {
        let endpoint = this.endpoint;
        let data = this.today.subtract(1, "days");
        this.prepareData(endpoint, data).then(response => {
          this.formalize(response);
          this.lastUpdate = data;
        });
      });
  },
  methods: {
    async prepareData(endpoint, data) {
      let finalEndpoint = endpoint + data.format("MM-D-YYYY") + ".csv";
      return new Promise((resolve, reject) => {
        this.$axios
          .get(finalEndpoint)
          .then(response => {
            let covidData = response.data.split("\n").map(row => {
              return row.split(",");
            });
            covidData.shift();
            resolve(covidData);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    async formalize(data) {
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
