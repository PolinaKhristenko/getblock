<template>
  <main>
    <section>
      <div class="max-w-[1000px] mx-auto ">
        <h1 class="text-h1 text-black font-light">Crypto Exchange</h1>
        <h6 class="text-xl text-black">Exchange fast and easy</h6>

        <div class="flex">
          <div id="left-crypto">
            <div>
              <span>Search</span>
            </div>
            <div>
              <input type="text" :placeholder="`${minimalVal}`"/>
              <div class="options">
                <ul v-for="crypto in cryptos" v-bind:key="crypto">
                  <li @click="getMinimal(crypto.ticker)"><a class="flex"><img :src="`${crypto.image}`" alt='Crypto image'/><p>{{crypto.ticker}}</p><p>{{crypto.name}}</p></a></li>
                </ul>
              </div>
            </div>
           
          </div>
          
          <div id="right-crypto"></div>
        </div>

        <p class="text-base text-black">Your Ethereum address</p>

        <div class="flex"><select></select></div>
      </div>
    </section>
    <section></section>
  </main>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return {
      apiKey: 'c9155859d90d239f909d2906233816b26cd8cf5ede44702d422667672b58b0cd',
      cryptos: [],
      minimalVal: null,
      minimalCrypto: null,
      maximumVal: null,
      maximumCrypto: null
    }
  },
  name: 'MainPage',
  props: {
  },
  methods: {
    async getMinimal(cryptoVal) {
      this.minimalCrypto = cryptoVal;
      console.log(cryptoVal)
      if (this.minimalCrypto) {
          const from = this.minimalCrypto
        try {
          const url = `https://api.changenow.io/v1/min-amount/${from}_eth?api_key=${this.apiKey}`;
          const response = await axios.get(url);
          const result = response.data.minAmount;
          this.minimalVal = result
          console.log(this.minimalVal)
        } catch (err) {
          console.log(err);
        }
      } 
    }
  },
    mounted() {
      axios.get('https://api.changenow.io/v1/currencies?active=true&fixedRate=true')
      .then(response => (this.cryptos = response.data));
  }
}
</script>

<style scoped>

</style>
