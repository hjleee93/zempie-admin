import Vue from "vue";

import "./styles/quasar.sass";
import lang from 'quasar/lang/ko-kr.js'
import "@quasar/extras/material-icons/material-icons.css";
import { Quasar, Notify, Dialog, date } from "quasar";

Vue.use(Quasar, {
    config: {
      Notify,
      Dialog,
      date
    },
    plugins: {
      Notify,
      Dialog,
      date
    },
    lang: lang
});