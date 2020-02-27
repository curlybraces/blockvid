<template>
  <div class="q-pt-md" style="max-width: 600px">
    <div class="text-h6 text-red-9 no-padding">
      Notizie per te
    </div>
    <q-carousel
      v-model="slide"
      transition-prev="scale"
      transition-next="scale"
      swipeable
      animated
      infinite
      arrows
      autoplay
      padding
      height="60vh"
      class="bg-negative text-white shadow-1 rounded-borders"
    >
      <q-carousel-slide name="style">
        <link-prevue :url="headerLink.url">
          <template slot-scope="props">
            <q-parallax
              class="absolute-top"
              :src="props.img"
              :alt="props.title"
              :height="600"
            />
            <div class="absolute-bottom custom-caption">
              <q-btn type="a" :href="props.url" target="_blank">
                <div class="text-h6">{{ props.title.substr(0, 80) }}</div>
                <div class="text-body2">
                  {{ props.description.substr(0, 200) }}
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
        <link-prevue :url="link.url">
          <template slot-scope="props">
            <q-parallax
              class="absolute-top"
              :src="props.img"
              :alt="props.title"
              :height="600"
            />
            <div class="absolute-bottom custom-caption">
              <q-btn type="a" :href="props.url" target="_blank">
                <div class="text-h6">{{ props.title.substr(0, 80) }}</div>
                <div class="text-body2">
                  {{ props.description.substr(0, 200) }}
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
import moment from "./../boot/moment";
export default {
  data() {
    return {
      slide: "style",
      lorem:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo."
    };
  },
  computed: {
    headerLink() {
      return this.$store.state.newsLinks[0];
    },
    links() {
      let newsLinks = this.$store.state.newsLinks;
      let newsLinksInternational = this.$store.state.newsLinksInternational;

      let links = [
        ...newsLinks.map(el => {
          return el.url;
        }),
        ...newsLinksInternational.map(el => {
          return el.url;
        })
      ];

      return [...newsLinksInternational];
    }
  },
  mounted() {
    this.$axios
      .get(
        this.$newsApiEndpoint +
          "q=coronavirus" +
          "&country=it" +
          "&sortBy=published" +
          "&from=" +
          moment().format("YYYY-D-MM")
      )
      .then(response => {
        console.log(response);

        let newsLinksInternational = [];

        response.data.articles.map(article => {
          newsLinksInternational.push(article);
        });
        this.$store.dispatch(
          "setNewsLinksInternational",
          newsLinksInternational
        );
      });

    this.$axios.get(this.$matnessEndpoint + "/news-links").then(response => {
      let newsLinks = [];
      response.data.data.map(article => {
        newsLinks.push(article);
      });

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
