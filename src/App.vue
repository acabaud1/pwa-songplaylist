<template>
  <v-app>
    <Top />
    <v-main>
      <Layout/>
    </v-main>
  </v-app>
</template>

<script>
import Top from './components/Top';
import Layout from './components/Layout';

export default {
  name: 'App',

  components: {
    Top,
    Layout
  },

  data: () => ({
    //
  }),
};
</script>
