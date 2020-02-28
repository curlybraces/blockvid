<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-red-9">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-avatar color="white">
          <img src="/statics/app.png" />
        </q-avatar>

        <q-toolbar-title>
          blockvid
        </q-toolbar-title>

        <div>v-{{ version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item to="/index">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>

          <q-item-section>
            Home
          </q-item-section>
        </q-item>

        <q-item to="/news">
          <q-item-section avatar>
            <q-icon name="library_books" />
          </q-item-section>

          <q-item-section>
            News
          </q-item-section>
        </q-item>

        <q-item to="/auth" v-if="!isLogged">
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>

          <q-item-section>
            Accedi
          </q-item-section>
        </q-item>

        <q-item-label header class="text-grey-8">
          Link utili
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
      <q-separator />
      <q-item class="absolute-bottom-right">
        <div>
          <q-btn
            type="a"
            href="https://github.com/mateonunez/blockvid"
            target="_blank"
            label="@blockvid"
            flat
            color="red-9"
          />
        </div>
      </q-item>
    </q-drawer>

    <q-page-container>
      <router-view />

      <q-page-scroller expand position="bottom-right" :scroll-offset="150">
        <q-btn round color="negative" class="animate-pop">
          <q-icon name="keyboard_arrow_up" />
        </q-btn>
      </q-page-scroller>
    </q-page-container>

    <q-footer>
      <q-toolbar class="bg-red-9">
        <q-toolbar-title></q-toolbar-title>
        <div>&copy; {{ year }} - By Community</div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink";
import { version } from "../../package.json";
import moment from "moment";

export default {
  name: "MainLayout",

  components: {
    EssentialLink
  },
  data() {
    return {
      year: moment().format("YYYY"),
      version: version,
      essentialLinks: [
        {
          title: "Ministero della salute",
          caption: "Nuovo corona virus - Domande e risposte",
          icon: "school",
          link: "http://www.salute.gov.it/nuovocoronavirus"
        },
        {
          title: "OMS",
          caption: "Organizzazione Mondiale della Sanità",
          icon: "code",
          link:
            "https://www.who.int/emergencies/diseases/novel-coronavirus-2019"
        },
        {
          title: "ECDC",
          caption: "European Centre for Disease Prevention and Control",
          icon: "chat",
          link: "https://www.ecdc.europa.eu/en/novel-coronavirus-china"
        },
        {
          title: "EPICNETRO",
          caption: "Istituto superiore di sanità",
          icon: "record_voice_over",
          link: "https://www.epicentro.iss.it/coronavirus/"
        },
        {
          title: "COVID-19 [REAL-TIME]",
          caption: "Visual Dashboard",
          icon: "public",
          link: "https://arcg.is/0fHmTX"
        },
        {
          title: "COVID-19 [REPOSITORY]",
          caption: "Data source Github",
          icon: "device_hub",
          link: "https://github.com/CSSEGISandData/COVID-19"
        },
        {
          title: "Coronavirus advisory information",
          caption: "World Health Organization",
          icon: "error_outline",
          link:
            "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public"
        },
        {
          title: "Q&A on coronaviruses",
          caption: "World Health Organization",
          icon: "format_quote",
          link: "https://www.who.int/news-room/q-a-detail/q-a-coronaviruses"
        }
      ]
    };
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
    isLogged() {
      return this.$store.state.isLogged;
    }
  }
};
</script>
