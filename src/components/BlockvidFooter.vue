<template>
  <div id="BlockvidFooter">
    <q-footer>
      <q-toolbar class="bg-red-9">
        <q-toolbar-title></q-toolbar-title>
        <div>&copy; {{ year }} - By Community</div>
      </q-toolbar>
    </q-footer>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "BlockvidFooter",
  data() {
    return {
      year: moment().format("YYYY")
    };
  }
};
</script>

<style></style>
