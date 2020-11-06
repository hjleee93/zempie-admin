import Vue from "vue";

import "./styles/quasar.sass";
import lang from 'quasar/lang/ko-kr.js'
import "@quasar/extras/material-icons/material-icons.css";
import { Quasar, Notify, Dialog } from "quasar";

Vue.use(Quasar, {
    config: {
      Notify,
      Dialog
    },
    plugins: {
      Notify,
      Dialog
    },
    lang: lang
});