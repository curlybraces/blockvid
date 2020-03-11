<template>
  <div class="q-pt-md" id="NewsCovid">
    <div class="text-center">
      <h1 class="text-h5 text-bold text-red-9 q-pb-none q-mb-sm">
        <q-icon name="library_books" /> ULTIME NOTIZIE
      </h1>
    </div>

    <q-list padding>
      <q-item
        class="full-width q-pa-md shadow-1"
        v-for="link in newsLinksInternational"
        :key="link.url"
      >
        <link-prevue cardWidth="100%" :url="link.url">
          <template slot-scope="props">
            <q-item-section top thumbnail class="q-pb-sm">
              <img :src="props.img" />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ props.title }}</q-item-label>
              <q-item-label caption>{{ props.description }}</q-item-label>
            </q-item-section>

            <q-item-section
              class="q-pt-sm q-pb-sm q-mr-sm absolute-bottom-right"
              side
              top
            >
              <q-item-label caption>
                <a class="text-red-9" :href="props.url" target="_blank"
                  >Leggi altro</a
                >
              </q-item-label>
            </q-item-section>
          </template>
        </link-prevue>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import LinkPrevue from "link-prevue";
import moment from "moment";
import axiosClient from "./../../core/axiosClient";
export default {
  name: "NewsCovid",
  data() {
    return {
      slide: "headerLink",
      timeout: 10000
    };
  },
  computed: {
    headerLink() {
      let headerNewsLink = this.$store.state.headerNewsLinkInternational;
      return headerNewsLink;
    },
    newsLinksInternational() {
      let newsLinksInternational = this.$store.state.newsLinksInternational;
      return newsLinksInternational;
    }
  },
  mounted() {
    axiosClient
      .get(
        this.$newsApiEndpoint +
          "q=coronavirus" +
          "&country=it" +
          "&sortBy=published" +
          "&from=" +
          moment().format("YYYY-DD-MM")
      )
      .then(response => {
        let responseNewsLinks = response.data.articles;
        let headerNewsLink = Object;
        let newsLinksInternational = [];

        responseNewsLinks.map((newsLink, index) => {
          if (index === 0) {
            headerNewsLink = newsLink;
          } else {
            newsLinksInternational.push(newsLink);
          }
        });

        this.$store.dispatch("setHeaderNewsLinkInternational", headerNewsLink);
        this.$store.dispatch(
          "setNewsLinksInternational",
          newsLinksInternational
        );
      });
  },
  components: {
    LinkPrevue
  }
};
</script>
<style lang="sass" scoped>
.news-slide
  border-radius: 33px

.custom-caption
  text-align: center
  padding: 12px
  color: white
  background-color: rgba(0, 0, 0, .6)
</style>
