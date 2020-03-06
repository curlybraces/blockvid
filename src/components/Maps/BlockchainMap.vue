<template>
  <div class="google-map" ref="googleMap"></div>
</template>

<script>
import GoogleMapsApiLoader from "google-maps-api-loader";

export default {
  name: "BlockchainMap",
  props: {
    blockchain: Array
  },

  data() {
    return {
      map: Object
    };
  },

  async mounted() {
    const googleMapApi = await GoogleMapsApiLoader({
      apiKey: "AIzaSyBehl-csR3PzRtPyv4q7SE4L588qBsQR-s"
    });
    this.google = googleMapApi;
    await this.initializeMap();
  },

  methods: {
    async initializeMap() {
      const mapContainer = this.$refs.googleMap;
      this.map = new this.google.maps.Map(mapContainer, {
        zoom: 10,
        center: this.mapCenter
      });

      let blockPath = new this.google.maps.Polyline({
        path: this.lines,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2
      });

      console.log(this.lines);

      blockPath.setMap(this.map);
    }
  },

  computed: {
    blockPath() {},
    lines() {
      let blockchain = this.blockchain.filter((block, index) => {
        return (
          block !== undefined &&
          block["data"]["lat"] !== undefined &&
          block["data"]["lng"] !== undefined
        );
      });

      blockchain = blockchain.filter((block, index) => {
        return blockchain[index - 1] !== undefined;
      });

      let lines = blockchain.map((block, index) => {
        return {
          lat: Number(block["data"]["lat"]),
          lng: Number(block["data"]["lng"])
        };
      });

      return lines;
    },
    mapCenter() {
      return {
        lat:
          this.blockchain.length == 0
            ? 0
            : this.blockchain[this.blockchain.length - 1].data.lat,
        lng:
          this.blockchain.length == 0
            ? 0
            : this.blockchain[this.blockchain.length - 1].data.lng
      };
    }
  }
};
</script>
