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
            <b>{{ totalInfectedItaly }}</b> INFETTI IN ITALIA
          </div>
          <div class="text-caption text-grey">
            Il corona virus ha infettato circa
            <b>{{ totalInfected }}</b> persone nel mondo. <br />
          </div>
        </q-card-section>

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
      lastUpdate: moment(),
      questions: [
        {
          q: "Che cos'è un Coronavirus?",
          a:
            "I Coronavirus sono una vasta famiglia di virus noti per causare malattie che vanno dal comune raffreddore a malattie più gravi come la Sindrome respiratoria mediorientale (MERS) e la Sindrome respiratoria acuta grave (SARS) " +
            "Sono virus RNA a filamento positivo, con aspetto simile a una corona al microscopio elettronico. La sottofamiglia Orthocoronavirinae della famiglia Coronaviridae è classificata in quattro generi di coronavirus (CoV): Alpha-, Beta-, Delta-- e Gammacoronavirus. Il genere del betacoronavirus è ulteriormente separato in cinque sottogeneri (tra i quali il Sarbecovirus)." +
            "I Coronavirus sono stati identificati a metà degli anni '60 e sono noti per infettare l'uomo ed alcuni animali (inclusi uccelli e mammiferi). Le cellule bersaglio primarie sono quelle epiteliali del tratto respiratorio e gastrointestinale." +
            "Ad oggi, sette Coronavirus hanno dimostrato di essere in grado di infettare l'uomo:" +
            "Coronavirus umani comuni: HCoV-OC43 e HCoV-HKU1 (Betacoronavirus) e HCoV-229E e HCoV-NL63 (Alphacoronavirus); essi possono causare raffreddori comuni ma anche gravi infezioni del tratto respiratorio inferiore. " +
            "Altri Coronavirus umani (Betacoronavirus): SARS-CoV, MERS-CoV e 2019-nCoV (ora denominato SARS-CoV-2)"
        },
        {
          q: "Che cos'è un nuovo Coronavirus?",
          a:
            "Un nuovo Coronavirus (nCoV) è un nuovo ceppo di coronavirus che non è stato precedentemente mai identificato nell'uomo. In particolare quello denominato SARS-CoV-2 (precedentemente 2019-nCoV), non è mai stato identificato prima di essere segnalato a Wuhan, Cina, a dicembre 2019."
        },
        {
          q: "Cosa è il SARS-Cov-2?",
          a:
            "Il virus che causa l'attuale epidemia di coronavirus è stato chiamato \"Sindrome respiratoria acuta grave coronavirus 2\" (SARS-CoV-2). Lo ha comunicato l'International Committee on Taxonomy of Viruses (ICTV) che si occupa della designazione e della denominazione dei virus (ovvero specie, genere, famiglia, ecc.). A indicare il nome un gruppo di esperti appositamente incaricati di studiare il nuovo ceppo di coronavirus. Secondo questo pool di scienziati il nuovo coronavirus virus è fratello di quello che ha provocato la Sars (SARS-CoVs), da qui il nome scelto di SARS-CoV-2."
        },
        {
          q: "Cosa è la COVID-19?",
          a:
            'La malattia provocata dal nuovo Coronavirus ha un nome: \“COVID-19\” (dove "CO" sta per corona, "VI" per virus, "D" per disease e "19" indica l\'anno in cui si è manifestata). Lo ha annunciato, l’11 febbraio 2020, nel briefing con la stampa durante una pausa del Forum straordinario dedicato al virus, il Direttore generale dell’Oms Tedros Adhanom Ghebreyesus.'
        },
        {
          q: "Il nuovo Coronavirus è lo stesso della SARS?",
          a:
            "No. il nuovo Coronavirus (ora denominato SARS-CoV-2 e già denominato 2019-nCoV) appartiene alla stessa famiglia di virus della Sindrome Respiratoria Acuta Grave (SARS) ma non è lo stesso virus. " +
            "Il nuovo Coronavirus, responsabile della malattia respiratoria ora denominata COVID-19, è strettamente correlato al SARS-CoV e si classifica geneticamente all'interno del sottogenere Betacoronavirus Sarbecovirus."
        },
        {
          q: "Quali sono i sintomi di una persona infetta da un Coronavirus?",
          a:
            "Dipende dal virus, ma i sintomi più comuni includono febbre, tosse, difficoltà respiratorie. Nei casi più gravi, l'infezione può causare polmonite, sindrome respiratoria acuta grave, insufficienza renale e persino la morte. "
        },
        {
          q: "Quanto è pericoloso il nuovo virus?",
          a:
            "Come altre malattie respiratorie, l’infezione da nuovo coronavirus può causare sintomi lievi come raffreddore, mal di gola, tosse e febbre, oppure sintomi più severi quali polmonite e difficoltà respiratorie. Raramente può essere fatale." +
            "Le persone più suscettibili alle forme gravi sono gli anziani e quelle con malattie pre-esistenti, quali diabete e malattie cardiache."
        },
        {
          q:
            "Qual è la differenza tra i sintomi dell’influenza, di un raffreddore comune e del nuovo Coronavirus?",
          a:
            "I sintomi sono simili e consistono in tosse, febbre, raffreddore. Sono tuttavia causati da virus differenti, pertanto, in caso di sospetto di Coronavirus, è necessario effettuare esami di laboratorio per confermare la diagnosi."
        },
        {
          q:
            "I Coronavirus e il nuovo Coronavirus possono essere trasmessi da persona a persona?",
          a:
            "Sì, alcuni Coronavirus possono essere trasmessi da persona a persona, di solito dopo un contatto stretto con un paziente infetto, ad esempio tra familiari o in ambiente sanitario." +
            "Anche il nuovo Coronavirus responsabile della malattia respiratoria COVID-19 può essere trasmesso da persona a persona tramite un contatto stretto con un caso infetto."
        },
        {
          q: "Come si trasmette il nuovo Coronavirus da persona a persona?",
          a:
            "Il nuovo Coronavirus è un virus respiratorio che si diffonde principalmente attraverso il contatto stretto con una persona malata. La via primaria sono le  goccioline del respiro delle persone infette ad esempio tramite: " +
            "la saliva, tossendo e starnutendo " +
            "contatti diretti personali" +
            "le mani, ad esempio toccando con le mani contaminate (non ancora lavate) bocca, naso o occhi" +
            "In casi rari il contagio può avvenire attraverso contaminazione fecale." +
            "Normalmente le malattie respiratorie non si tramettono con gli alimenti, che comunque devono essere manipolati rispettando le buone pratiche igieniche ed evitando il contatto fra alimenti crudi e cotti." +
            "Studi sono in corso per comprendere meglio le modalità di trasmissione del virus."
        }
      ],
      rand: Math.floor(Math.random() * 10),
      columns: [
        {
          name: "country",
          label: "Paese/Stato",
          field: row => row[1],
          format: (val, row) => `${val}` + (row[0] ? ` [${row[0]}]` : ``),
          sortable: true,
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
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },
        {
          name: "deaths",
          label: "Morti",
          field: row => row[4],
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },
        {
          name: "recovered",
          label: "Ricoverati",
          field: row => row[5],
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },
        {
          name: "lastUpdate",
          label: "Ultimo aggiornamento",
          field: row => row[2],
          sortable: true
        }
      ],
      filter: ""
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
