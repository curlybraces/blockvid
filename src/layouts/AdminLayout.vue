<template>
  <router-view />
</template>

<script>
import { userHasValidToken, getUserProfile } from "../core/user";

export default {
  name: "AdminLayout",
  mounted() {
    userHasValidToken().then(() => {
      getUserProfile();
    });
  }
};
</script>
