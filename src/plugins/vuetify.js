import Vue from 'vue';
import Vuetify, {
  VDataIterator,
  VDataTable,
  VNavigationDrawer,
  VToolbar,
  VLayout,
  VFlex,
  VSpacer,
  VList,
  VCard,
  VAlert,
  VCheckbox,
  VBtn,
  VIcon,
} from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';

Vue.use(Vuetify, {
  iconfont: 'md',
  components: {
    VDataIterator,
    VDataTable,
    VNavigationDrawer,
    VToolbar,
    VLayout,
    VFlex,
    VSpacer,
    VList,
    VCard,
    VAlert,
    VCheckbox,
    VBtn,
    VIcon,
  },
});
