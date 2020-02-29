<template>
  <div class="q-pt-md" id="NewsCovid">
    <div class="text-h6 text-red-9">
      <q-icon name="library_books" /> Notizie per te
    </div>
    <q-carousel
      v-model="slide"
      transition-prev="scale"
      transition-next="scale"
      swipeable
      animated
      infinite
      arrows
      :autoplay="timeout"
      padding
      height="60vh"
      class="bg-transparent text-white shadow-1 rounded-borders"
    >
      <q-carousel-slide name="headerLink">
        <link-prevue cardWidth="100%" :url="headerLink.url">
          <template slot-scope="props">
            <q-parallax
              class="absolute-top"
              :src="props.img"
              :alt="props.title"
              :height="600"
            />
            <div class="absolute-bottom custom-caption">
              <q-btn type="a" :href="props.url" target="_blank">
                <div class="text-h6">
                  {{
                    props.title.length > 80
                      ? props.title.substr(0, 80) + "..."
                      : props.title
                  }}
                </div>
                <div class="text-body2">
                  {{
                    props.description.length > 200
                      ? props.description.substr(0, 200) + "..."
                      : props.description
                  }}
                </div>
              </q-btn>
            </div>
          </template>
        </link-prevue>
      </q-carousel-slide>

      <q-carousel-slide
        v-for="link in newsLinksInternational"
        v-bind:key="link.url"
        :name="link.url"
        class="column no-wrap flex-center"
      >
        <link-prevue cardWidth="100%" :url="link.url">
          <template slot-scope="props">
            <q-parallax
              class="absolute-top"
              :src="props.img"
              :alt="props.title"
              :height="600"
            />
            <div class="absolute-bottom custom-caption">
              <q-btn type="a" :href="props.url" target="_blank">
                <div class="text-h6">
                  {{
                    props.title.length > 80
                      ? props.title.substr(0, 80) + "..."
                      : props.title
                  }}
                </div>
                <div class="text-body2">
                  {{
                    props.description.length > 200
                      ? props.description.substr(0, 200) + "..."
                      : props.description
                  }}
                </div>
              </q-btn>
            </div>
          </template>
        </link-prevue>
      </q-carousel-slide>
    </q-carousel>
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
          moment().format("YYYY-D-MM")
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
.custom-caption
  text-align: center
  padding: 12px
  color: white
  background-color: rgba(0, 0, 0, .6)
</style>
