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
        <div>
          <div class="text-red-9">
            <q-btn
              type="a"
              to="/cookies"
              class="q-pl-none q-pr-none"
              target="_blank"
              label="Cookies"
              flat
              dense
              color="red-9"
            /> 
            -
            <q-btn
              type="a"
              to="/policy"
              class="q-pl-none q-pr-none"
              target="_blank"
              label="Policy"
              flat
              dense
              color="red-9"
            />
          </div>
          <div class="text-black">&copy; {{ year }} - By Community</div>
        </div>
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
