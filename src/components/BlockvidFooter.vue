<template>
  <div id="BlockvidFooter">
    <q-footer>
      <q-toolbar class="bg-white">
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
        <div class="text-black">&copy; {{ year }} - By Community</div>
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
