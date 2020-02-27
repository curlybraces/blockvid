<template>
  <q-page padding>
    <div class="q-gutter-md q-pt-md">
      <q-card v-for="link in links" v-bind:key="link.id" >

        <link-prevue :url="link.url">
          <template slot-scope="props">
            <q-card class="my-card">
              <q-parallax :src="props.img" :alt="props.title" :height="250" />

              <q-card-section>
                <div class="text-h6">{{ props.title }}</div>
                <div class="text-subtitle2">{{ props.description }}</div>
              </q-card-section>

              <q-card-section>
                <q-btn
                  type="a"
                  :href="props.url"
                  target="_blank"
                  label="Leggi altro"
                  flat
                  color="red-9"
                />
              </q-card-section>
            </q-card>
          </template>
        </link-prevue>

      </q-card>
    </div>
  </q-page>
</template>

<script>
import LinkPrevue from "link-prevue";
export default {
    computed: {
        links() {
            return this.$store.state.newsLinks
        }
    },
    mounted() {
        this.$store.dispatch('getNewsLinks')
    },
    components: {
        LinkPrevue
    }
}
</script>
