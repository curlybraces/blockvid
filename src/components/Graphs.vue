<template>
  <div id="Graphs">
    <q-page class="row justify-center items-center" padding>
      <div class="q-pt-lg full-width" style="max-width: 800px">
        <div class="text-h6 text-red-9 no-padding">
          <q-icon name="timeline" /> Grafici sul contagio
        </div>
        <iframe
          src="https://dataviz.nbcnews.com/projects/20200122-coronavirus-history-count/index.html?initialWidth=760&amp;childId=embed-20200122-coronavirus-history-count&amp;parentTitle=Coronavirus%20map%3A%20The%20COVID-19%20virus%20is%20spreading%20across%20the%20world.%20Here%27s%20where%20cases%20have%20been%20confirmed.&amp;parentUrl=https%3A%2F%2Fwww.nbcnews.com%2Fhealth%2Fhealth-news%2Fcoronavirus-map-confirmed-cases-2020-n1120686"
          scrolling="no"
          marginheight="0"
          frameborder="0"
          height="3600px"
          class="full-width auto-height"
          title="Chart: Confirmed coronavirus cases, per country"
          style="margin: 0;"
        ></iframe>
        <q-btn
          type="a"
          href="https://www.nbcnews.com/health/health-news/coronavirus-map-confirmed-cases-2020-n1120686"
          target="_blank"
          label="Leggi altro"
          flat
          color="red-9"
        />
      </div>
    </q-page>
  </div>
</template>
<script>
export default {
  name: "Graphs",
  methods: {
    resizeIframe(obj) {
      obj.style.height =
        obj.contentWindow.document.documentElement.scrollHeight + "px";
    }
  }
};
</script>
