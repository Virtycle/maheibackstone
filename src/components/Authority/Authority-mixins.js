export default {
    data() {
        return {
          authForm:[],
          loading: true
        }
    },
    methods: {
      async getAuthData () {
        const res = await this.$http.get('rights/list')
        this.authForm = res.data.data
        this.loading = false
      }
    },
    created() {
        this.getAuthData();
    },
}