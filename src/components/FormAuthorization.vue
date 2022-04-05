<template>
  <v-form class="form-auth" v-if="!userIsAuthorized" ref="form">
    <label for="login"> E-mail/Логин
    </label>
    <v-text-field
        class="input"
        name="login"
        v-model="user.login"
        :rules="rules.login"
        hide-details="auto"
        required
        dark
    ></v-text-field>
    <label for="password"> Пароль
    </label>
    <v-text-field
        class="input"
        name="password"
        :append-icon="showPass ? 'mdi-eye dark' : 'mdi-eye-off dark'"
        :type="showPass ? 'text' : 'password'"
        @click:append="showPass = !showPass"
        v-model="user.password"
        :rules="rules.password"
        hide-details="auto"
        required
        dark
    ></v-text-field>
    <div class="registration-link">
      Еще нет аккаунта?<router-link class="reg" to="/reg">Зарегистрироваться</router-link>
    </div>

    <restore-password></restore-password>

    <v-btn
        class="button"
        :loading="this.restoreProgress"
        @click="auth"
    >
      Войти
    </v-btn>
    <a href="/api/vk-auth">Войти через VK</a>
    {{ message }}
  </v-form>
  <error-405 v-else></error-405>
</template>

<script>
import RestorePassword from "./RestorePassword";
import {mapGetters, mapActions} from 'vuex';
import Error405 from "./Error405";

export default {
  name: "FormAuthorization",

  components: {
    'restore-password': RestorePassword,
    "error-405": Error405
  },

  data: () => ({
    user: {
      login: "",
      password: ""
    },

    rules: {
      login: [
        v => !!v || "Введите логин",
        v => /^[_.\-@\w]+$/.test(v) || 'Некорректный логин',
      ],

      password: [
        v => !!v || "Введите пароль"
      ]
    },

    showPass: false,
  }),

  computed: {
    ...mapGetters(['authStatus', 'message', 'restoreProgress', "time", "nonActiveButton", 'userIsAuthorized']),
  },

  methods: {
    ...mapActions(['authRequest', 'checkAuth']),
    auth() {
      if (this.$refs.form.validate()) {
        this.authRequest(this.user).then(() => {
          if (this.authStatus === "Success") {
            this.$router.push("/").then(() => {
              this.checkAuth()
            });
          }
        });
      }
    }
  }
}
</script>

<style lang="scss">
@import "../assets/main.css";

#app {
  .form-auth {
    label {
      font-family: 'Inter-Regular', sans-serif;
      font-size: 14px;
      line-height: 123%;
      color: #B5B5B8;
    }

    .v-text-field__slot {
      border: none;
    }

    .input {
      border: 2px solid #B5B5B8;
      border-radius: 4px;
      width: 50%;
      height: 55px;
    }

    .button {
      height: 50px;
      width: 173px;
      font-family: "Inter-Regular", sans-serif;
      font-size: 18px;
      line-height: 180%;
      text-transform: none;
      letter-spacing: 0px;
    }
    .registration-link{
      font-family: 'Inter-Regular',sans-serif;
      font-size: 16px;
      line-height: 180%;
    .reg{
      font-family: 'Inter-Regular',sans-serif!important;
      margin: 0 0 0 20px;
      text-decoration-line: underline!important;
    }
    }
  }
}

#app.dark {
  .form-auth {
    .button {
      background: #004BD7;
      color: #ffff;
    }
  }
}

</style>