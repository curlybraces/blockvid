<template>
  <q-page class="row justify-center items-center">
    <div class="column">
      <div class="row">
        <div class="text-center q-pb-lg">
          <div class="text-h6 text-red-9"></div>
        </div>
      </div>
      <div class="row">
        <q-card square style="width: 360px; border: 0; box-shadow: 0 0 0 0">
          <div class="text-center">
            <div class="text-h2">block<span class="text-red-9">vid</span></div>
            <div class="text-overline">
              Partecipa nella nostra comunitá
            </div>
          </div>
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input
                square
                filled
                required
                clearable
                v-model="email"
                type="email"
                label="email"
              />
              <q-input
                square
                filled
                clearable
                v-model="password"
                type="password"
                label="password"
              />
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn
              v-if="!isExecutingLogin"
              unelevated
              color="red-9"
              size="lg"
              class="full-width"
              label="Login"
              @click.stop="submitLogin"
            />
            <q-spinner
              class="full-width"
              v-if="isExecutingLogin"
              color="red-9"
              size="3em"
            />
          </q-card-actions>
          <!-- <q-card-section class="text-center q-pa-none">
            <p class="text-grey-6">Not reigistered? Created an Account</p>
          </q-card-section> -->
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import axiosClient from "./../core/axiosClient";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      isExecutingLogin: false
    };
  },
  methods: {
    submitLogin() {
      this.isExecutingLogin = true;

      let payloadLogin = {
        email: this.email,
        password: this.password
      };

      axiosClient
        .post("https://matness.it/api/auth", payloadLogin)
        .then(response => {
          localStorage.setItem("token", response.data.data);

          this.$router.push({
            name: "index"
          });

          this.$store.dispatch("isLogged", true);
          this.isExecutingLogin = false;
        })
        .catch(error => {
          this.$q.notify({
            type: "negative",
            message: error.response.data.error
          });
          console.error(error.response.data.data);

          this.isExecutingLogin = false;
        });
    }
  }
};
</script>
