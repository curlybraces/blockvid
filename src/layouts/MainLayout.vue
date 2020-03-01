<template>
  <q-layout view="hHh Lpr lff">
    <BlockvidHeader />

    <q-page-container>
      <router-view />

      <q-page-scroller expand position="bottom-right" :scroll-offset="150">
        <q-btn round color="red-9" class="animate-pop">
          <q-icon name="keyboard_arrow_up" />
        </q-btn>
      </q-page-scroller>
    </q-page-container>

    <BlockvidFooter />
  </q-layout>
</template>

<script>
import BlockvidHeader from "components/BlockvidHeader";
import BlockvidFooter from "components/BlockvidFooter";
import { userHasValidToken, getUserProfile } from "../core/user";

export default {
  name: "MainLayout",
  components: {
    BlockvidHeader,
    BlockvidFooter
  },
  mounted() {
    userHasValidToken().then(() => {
      getUserProfile();
    });
  }
};
</script>
