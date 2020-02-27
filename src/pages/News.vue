<template>
  <q-page padding>
    <div class="q-gutter-md q-pt-md" id="newsLiks">
      <h5 class="text-h5 text-red-9">Notizie locali per te</h5>
      <template>
        <q-card v-for="link in links" v-bind:key="link.url">
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
      </template>
    </div>
  </q-page>
</template>

<script>
import LinkPrevue from "link-prevue";
import moment from "./../boot/moment";
export default {
  computed: {
    links() {
      return this.$store.state.newsLinks.concat(
        this.$store.state.newsLinksInternational
      );
    }
  },
  mounted() {
    this.$axios
      .get(
        "https://newsapi.org/v2/top-headlines?q=coronavirus&from=" +
          moment().format("YYYY-D-MM") +
          "&country=it&sortBy=published&apiKey=9c95cd826b654b059f388b2ad899e69d"
      )
      .then(response => {
        let newsLinksInternational = [];
        response.data.articles.map(article => {
          newsLinksInternational.push(article);
        });
        this.$store.dispatch(
          "setNewsLinksInternational",
          newsLinksInternational
        );
      });

    this.$store.dispatch("getNewsLinks");
  },
  components: {
    LinkPrevue
  }
};
</script>
