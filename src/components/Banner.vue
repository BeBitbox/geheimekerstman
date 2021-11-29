<template>
  <q-banner rounded class="bg-grey-3">
    <template v-slot:avatar>
      <img
        src="https://c.tenor.com/f_crPxud2qkAAAAM/santa-dance-dancing-santa.gif"
        style="width: 220px; height: 220px">
    </template>
    Geheime kerstman: Koop een cadeau'tje voor een teamlid van ongeveer 20€ en ontvang zelf een cadeau terug. Dit zijn de deelnemers:

    <q-list bordered separator>
      <q-item v-for="kerstman in kerstmannen" :key="kerstman" clickable v-ripple>
        <q-item-section>{{ kerstman }}</q-item-section>
      </q-item>
    </q-list>
    <template v-slot:action>
      <q-btn flat @click="getKerstmannen" label="Vernieuw"></q-btn>
    </template>
  </q-banner>
</template>

<script>
import { api } from 'boot/axios'

export default {
  data() {
    return {
      kerstmannen: []
    }
  },

  methods: {
    getKerstmannen() {
      api.get('/getKerstmannen').then(response => this.kerstmannen = response.data);
    }
  },
  mounted() {
    this.getKerstmannen();
  }
}
</script>
