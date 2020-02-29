<template>
  <q-layout view="lHh Lpr lFf">
    <BlockvidHeader />

    <q-page-container>
      <router-view />
    </q-page-container>

    <BlockvidFooter />
  </q-layout>
</template>

<script>
import BlockvidHeader from "components/BlockvidHeader";
import BlockvidFooter from "components/BlockvidFooter";
import { userHasValidToken, getUserProfile } from "../core/user";

export default {
  name: "AdminLayout",
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
