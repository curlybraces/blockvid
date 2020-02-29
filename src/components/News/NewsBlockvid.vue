<template>
  <div class="q-pt-md" id="NewsBlockvid">
    <div class="text-h6 text-red-9">
      <q-icon name="library_books" /> Scelte da noi
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
      height="30vh"
      class="bg-transparent text-white shadow-1 rounded-borders"
    >
      <q-carousel-slide name="headerLink">
        <link-prevue cardWidth="100%" :url="headerLink.url">
          <template slot-scope="props">
            <q-parallax
              class="absolute-top"
              :src="props.img"
              :alt="props.title"
              :height="300"
            />
            <div class="absolute-bottom custom-caption">
              <q-btn type="a" :href="props.url" target="_blank">
                <div class="text-h6">
                  {{
                    props.title.length > 50
                      ? props.title.substr(0, 50) + "..."
                      : props.title
                  }}
                </div>
                <div class="text-body2">
                  {{
                    props.description.length > 100
                      ? props.description.substr(0, 100) + "..."
                      : props.description
                  }}
                </div>
              </q-btn>
            </div>
          </template>
        </link-prevue>
      </q-carousel-slide>

      <q-carousel-slide
        v-for="link in links"
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
              :height="300"
            />
            <div class="absolute-bottom custom-caption">
              <q-btn type="a" :href="props.url" target="_blank">
                <div class="text-h6">
                  {{
                    props.title.length > 50
                      ? props.title.substr(0, 50) + "..."
                      : props.title
                  }}
                </div>
                <div class="text-body2">
                  {{
                    props.description.length > 100
                      ? props.description.substr(0, 100) + "..."
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
  name: "NewsBlockvid",
  data() {
    return {
      slide: "headerLink",
      timeout: 15000
    };
  },
  computed: {
    headerLink() {
      let headerNewsLink = this.$store.state.headerNewsLink;
      return headerNewsLink;
    },
    links() {
      let newsLinks = this.$store.state.newsLinks;
      return newsLinks;
    }
  },
  mounted() {
    axiosClient
      .get(this.$matnessEndpoint + "/v1/blockvid/news-links")
      .then(response => {
        let responseNewsLinks = response.data.data;
        let headerNewsLink = Object;
        let newsLinks = [];

        responseNewsLinks.map((newsLink, index) => {
          if (index === 0) {
            headerNewsLink = newsLink;
          } else {
            newsLinks.push(newsLink);
          }
        });

        // console.log(headerNewsLink, newsLinks);

        this.$store.dispatch("setHeaderNewsLink", headerNewsLink);
        this.$store.dispatch("setNewsLinks", newsLinks);
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
