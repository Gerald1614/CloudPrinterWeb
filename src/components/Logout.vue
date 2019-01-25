<template>
  <v-layout></v-layout>
</template>

<script>
import {logOut} from '../utilities/fetchData.js'
export default {
  name: 'Logout',
  created () {
    logOut(this)
  }
}
</script>