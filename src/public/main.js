const app = new Vue({
  el: '#app',
  data: {
    url: '',
    slug: '',
  },
  methods: {
    async createURL() {
      console.log(this.url, this.slug)
      const response = await fetch('/url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url: this.url,
          slug: this.slug
        })
      })
      const json = await response.json()
      console.log(json)
    }
  }
});