<template>
  <div id="BlockvidHeader">
    <q-header elevated class="bg-white">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          color="black"
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-item dense to="/index" class="no-padding no-margin">
          <q-avatar size="55px" color="white">
            <q-img class="q-ma-sm" src="/statics/app.png" />
          </q-avatar>
        </q-item>

        <q-item dense to="/index" class="no-padding no-margin">
          <q-toolbar-title>
            <span class="text-black">block</span
            ><span class="text-red-9">vid</span>
          </q-toolbar-title>
        </q-item>
        <q-toolbar-title></q-toolbar-title>

        <div class="absolute-top-right">
          <q-btn
            type="a"
            href="https://github.com/mateonunez/blockvid"
            target="_blank"
            label="@github"
            dense
            flat
            color="red-9"
          />
        </div>

        <div class="text-black absolute-bottom-right">beta~v{{ version }}</div>
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

        <q-item to="/graphs">
          <q-item-section avatar>
            <q-icon name="timeline" />
          </q-item-section>

          <q-item-section>
            Grafici
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

        <q-item v-if="isLogged">
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>

          <q-item-section>{{ userProfile.name }}</q-item-section>
        </q-item>

        <q-item to="/admin" v-if="userProfile.role_id == 1">
          <q-item-section avatar>
            <q-icon name="fingerprint" />
          </q-item-section>

          <q-item-section>Admin</q-item-section>
        </q-item>

        <q-item to="/blockchain" v-if="userProfile.role_id == 1">
          <q-item-section avatar>
            <q-icon name="blur_circular" />
          </q-item-section>

          <q-item-section>Blockchain</q-item-section>
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
    </q-drawer>
  </div>
</template>

<script>
import EssentialLink from "./EssentialLink";
import { version } from "../../package.json";

export default {
  name: "BlockvidHeader",
  components: {
    EssentialLink
  },
  data() {
    return {
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
    },
    userProfile() {
      return this.$store.state.userProfile;
    }
  }
};
</script>

<style></style>
