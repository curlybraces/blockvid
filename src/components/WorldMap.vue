<template>
  <div class="full-width" style="max-width: 1000px">
    <div class="text-center">
      <h1 class="text-h5 text-bold text-red-9 q-pb-none q-mb-sm">
        <q-icon name="maps" /> NEL MONDO
      </h1>
    </div>
    <div class="world-chart" ref="chartdiv"></div>
  </div>
</template>

<script>
import {
  am4core,
  am4maps,
  am4geodata_worldLow,
  am4themes_animated
} from "./../boot/charts";

export default {
  name: "WorldMap",
  props: {
    covidData: Array
  },
  mounted() {
    let that = this;
    am4core.useTheme(am4themes_animated);

    let chart = am4core.create(this.$refs.chartdiv, am4maps.MapChart);

    chart.geodata = am4geodata_worldLow;
    chart.projection = new am4maps.projections.Orthographic();
    chart.panBehavior = "rotateLongLat";
    let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

    // Exclude Antartica
    polygonSeries.exclude = ["AQ"];

    // Make map load polygon (like country names) data from GeoJSON
    polygonSeries.useGeodata = true;

    // Configure series
    var polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.polygon.fillOpacity = 0.6;

    // Create hover state and set alternative fill color
    var hs = polygonTemplate.states.create("hover");
    hs.properties.fill = chart.colors.getIndex(0);

    // Add image series
    var imageSeries = chart.series.push(new am4maps.MapImageSeries());
    imageSeries.mapImages.template.propertyFields.longitude = "longitude";
    imageSeries.mapImages.template.propertyFields.latitude = "latitude";
    imageSeries.mapImages.template.tooltipText = "{title}";
    imageSeries.mapImages.template.propertyFields.url = "url";

    var circle = imageSeries.mapImages.template.createChild(am4core.Circle);
    circle.radius = 0.333;
    circle.propertyFields.fill = "color";

    var circle2 = imageSeries.mapImages.template.createChild(am4core.Circle);
    circle2.radius = 1;
    circle2.propertyFields.fill = "color";

    circle2.events.on("inited", function(event) {
      that.animateBullet(event.target);
    });

    var colorSet = new am4core.ColorSet();

    let data = [];

    this.covidData.map(row => {
      if (row[0] !== undefined) {
        imageSeries.data.push({
          title: `${row[1]} (${row[3]})`,
          latitude: Number(row[6]),
          longitude: Number(row[7]),
          color: "#FF0033"
        });
      }
    });

    this.chart = chart;
  },

  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  },
  // computed: {
  //   covidData() {
  //     let covidData = this.$store.state.covidData;
  //     return covidData;
  //   }
  // },
  methods: {
    animateBullet(circle) {
      let that = this;
      var animation = circle.animate(
        [
          { property: "scale", from: 1, to: 3 },
          { property: "opacity", from: 1, to: 0 }
        ],
        1000,
        am4core.ease.circleOut
      );
      animation.events.on("animationended", function(event) {
        that.animateBullet(event.target.object);
      });
    }
  }
};
</script>

<style scoped>
.world-chart {
  width: 100%;
  height: 500px;
}
</style>
