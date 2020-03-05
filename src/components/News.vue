<template>
  <div class="full-width" style="max-width: 1000px">
    <NewsBlockvid />
    <NewsCovid />
  </div>
</template>

<script>
import NewsBlockvid from "./News/NewsBlockvid";
import NewsCovid from "./News/NewsCovid";

export default {
  components: {
    NewsBlockvid,
    NewsCovid
  }
};
</script>
