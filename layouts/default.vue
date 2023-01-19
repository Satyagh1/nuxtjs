<template>
    <div>
        <div>
            <TopNav/>
        </div>
        <div class="container">
            <nuxt/>
        </div>
        <div>
            <Footer/>
        </div>
    </div>

</template>
<script>
import TopNav from "../components/layout/TopNav.vue"
import Footer from "../components/layout/Footer.vue"
export default {
  components: {
    TopNav,
    Footer
  },
}
</script>