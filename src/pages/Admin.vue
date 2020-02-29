<template>
  <q-page padding>
    <div id="dialogs">
      <q-dialog v-model="confirmDeleting" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <span class="q-ml-sm">Sei sicuro di voler cancellare il link?</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Annulla" color="red-9" v-close-popup />
            <q-btn
              @click.stop="deleteLink"
              flat
              label="OK"
              color="red-9"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>

    <div class="q-pt-lg full-width" style="max-width: 800px">
      <div class="text-center">
        <div class="text-h2">block<span class="text-red-9">vid</span></div>
        <div class="text-overline">Pannello di gestione</div>
      </div>
    </div>

    <div class="q-pt-lg full-width" style="max-width: 800px">
      <div class="text-h6 text-red-9 no-padding">
        <q-icon name="library_books" /> Gestine notizie
      </div>

      <q-btn
        target="_blank"
        :label="!inputNewLink ? `Nuovo` : `Nascondi`"
        flat
        color="blue-9"
        @click.stop="inputNewLink = !inputNewLink"
      />

      <div class="q-pb-md" v-if="inputNewLink">
        <q-input
          square
          filled
          required
          clearable
          v-model="newLink"
          type="newLink"
          label="Inserisci il link"
        />
        <q-btn
          target="_blank"
          label="Salva"
          flat
          color="blue-9"
          @click.stop="submitNewLink"
        />
      </div>

      <q-list v-if="links.length > 0" bordered>
        <q-card
          v-for="link in links"
          :key="link.id"
          class="my-card"
          flat
          bordered
        >
          <q-card-section>
            {{ link.url }}
          </q-card-section>
          <q-card-section>
            <q-card-actions class="absolute-bottom">
              <q-btn
                @click.stop="openDeleteDialog(link.id)"
                flat
                round
                color="red"
                icon="delete"
              />
            </q-card-actions>
          </q-card-section>
        </q-card>
      </q-list>

      <div v-if="links.length == 0">
        <div class="text-body1 no-padding">
          Attualmente non ci sono fonti di notize
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import LinkPrevue from "link-prevue";
import axiosClient from "./../core/axiosClient";

export default {
  components: {
    LinkPrevue
  },
  data() {
    return {
      inputNewLink: false,
      newLink: null,
      toBeDelete: null
    };
  },
  methods: {
    submitNewLink() {
      let payloadNewLink = {
        url: this.newLink
      };

      axiosClient
        .post(this.$matnessEndpoint + "/v1/blockvid/news-links", payloadNewLink)
        .then(response => {
          this.inputNewLink = false;
          this.newLink = null;

          this.getNewsLinks();
        })
        .catch(error => {
          this.$q.notify({
            type: "negative",
            message: error.response.data.error
          });
          console.error(error.response.data.data);
        });
    },
    updateLink() {},
    getNewsLinks() {
      axiosClient
        .get(this.$matnessEndpoint + "/v1/blockvid/news-links")
        .then(response => {
          this.links = response.data.data;
        });
    },
    deleteLink() {
      axiosClient
        .delete(
          this.$matnessEndpoint + "/v1/blockvid/news-links/" + this.toBeDelete
        )
        .then(response => {
          this.getNewsLinks();
        })
        .catch(error => {
          this.$q.notify({
            type: "negative",
            message: error.response.data.error
          });
          console.error(error.response.data.data);
        });
    },
    openDeleteDialog(linkId) {
      this.confirmDeleting = !this.confirmDeleting;
      this.toBeDelete = linkId;
    }
  },
  computed: {
    links: {
      get() {
        let newsLinks = this.$store.state.newsLinks;

        return newsLinks;
      },
      set(value) {
        this.$store.dispatch("setNewsLinks", value);
      }
    },
    confirmDeleting: {
      get() {
        return this.$store.state.confirmDeletingDialogOpen;
      },
      set(value) {
        this.$store.dispatch("setConfirmDeletingDialogOpen", value);
      }
    }
  },
  mounted() {
    this.getNewsLinks();
  }
};
</script>

<style></style>
