<template>
  <q-page class="flex flex-center">
    <banner></banner>

    <q-list bordered class="rounded-borders" style="margin-top: 15px">
      <q-expansion-item
        expand-separator
        icon="manage_accounts"
        :model-value="firstItem"
        label="Kerstman registratie"
        header-class="text-red"
        caption="Registreer u hier als je mee wil doen met de geheime kerstman van 2021. Deadline: 03/12/2021">
        <registration-from v-on:saved-kerstman="savedKerstman"></registration-from>
      </q-expansion-item>

      <q-expansion-item icon="shopping_cart" label="Kerstman toekenning" caption="Op 03/12/2021 om 12h krijgt u een mail om te zien voor wie u moet kopen!">
      </q-expansion-item>

      <q-expansion-item icon="reduce_capacity" label="Kerstman bekendmaking" caption="Op 24/12/2021 om 8h wordt hier het kerstmannen-overzicht getoond ">
      </q-expansion-item>

      <q-expansion-item icon="delete_forever" label="Opkuis van de kerstman" caption="Op 15/01/2022 om 12h wordt alle data vernietigd">
      </q-expansion-item>
    </q-list>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import RegistrationFrom from "components/RegistrationFrom";
import Banner from "components/Banner";

export default defineComponent({
  name: 'PageIndex',
  components: {Banner, RegistrationFrom},
  data() {
    return {
      firstItem: true
    }
  },
  methods: {
    savedKerstman() {
      console.log('inins')
      this.firstItem = false
    }
  }
})
</script>
