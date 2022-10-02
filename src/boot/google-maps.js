import { boot } from 'quasar/wrappers';
import VueGoogleMaps from '@fawmi/vue-google-maps';

export default boot(({ app }) => {
  app.use(VueGoogleMaps, { // 🤿 Vue App. Please install Vue Google Maps
    load: {
      key: 'AIzaSyD0GrH-CCe-EZmTjpH9u08eKn-kq3RkGFY', // 🤿 I don't have a google key, so leave it blank for now
    },
  });
});
