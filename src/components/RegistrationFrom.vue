<template>
  <div class="q-pa-md">

    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md">
      <q-input
        filled
        v-model="naam"
        label="Uw naam *"
        hint="Voornaam en achternaam"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Verplicht in te vullen']"
      />

      <q-input
        filled
        v-model="email"
        label="Uw E-mail *"
        hint="E-mail adres"
        lazy-rules
        :rules="[val => !!val || 'Email is missing', isValidEmail]"
      />

      <q-input
        filled
        v-model="adres"
        label="Uw adres waar uw cadeau zal toekomen *"
        hint="Volledig adres met postcode aub"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Verplicht in te vullen']"
      />

      <q-input
        filled
        v-model="tip"
        label="Een boodschap aan uw kerstman"
        lazy-rules
      />

      <q-toggle v-model="accept" label="Ik beloof op mijn communiezieltje om een cadeautje te sturen!" />

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>

  </div>
</template>

<script>
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'
import { ref } from 'vue'

export default {
  emits: ['savedKerstman'],
  setup () {
    const $q = useQuasar()
    const naam = ref(null)
    const adres = ref(null)
    const email = ref(null)
    const tip = ref(null)
    const accept = ref(false)
    return {
      naam,
      adres,
      email,
      tip,
      accept,
      onSubmit () {
        if (accept.value === true) {
          api.post('/saveKerstman', { naam: naam.value, adres: adres.value, email: email.value, tip: tip.value })
          .then(response => {
            if (response.status === 200) {
              $q.notify({
                color: 'green-4',
                textColor: 'white',
                icon: 'cloud_done',
                message: 'Verzonden. Veel plezier!'
              })
              naam.value = null
              adres.value = null
              email.value = null
              tip.value = null
              accept.value = false
              this.$emit('savedKerstman')
            } else {
              $q.notify({
                color: 'red-5',
                textColor: 'white',
                icon: 'warning',
                message: 'Fout met het bewaren!'
              })
            }
          });
        }
        else {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Beloof eerst dat je ook een cadeautje stuurt!'
          })
        }
      },
      onReset () {
        naam.value = null
        adres.value = null
        email.value = null
        tip.value = null
        accept.value = false
      },
      isValidEmail (val) {
        const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
        return emailPattern.test(val) || 'Invalid e-mail';
      }
    }
  }
}
</script>
