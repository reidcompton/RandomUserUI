<template>
  <div>
    <a v-show="analytics.length > 0" href="javascript:void(0)" v-on:click="startOver">Start Over</a>
    <div class="container">
      <div v-if="error != ''">
        <div class="notification is-danger">
          <p>{{error}}</p>
        </div>
      </div>
      <div v-show="analytics.length == 0">
        <b-tabs v-model="activeTab">
            <b-tab-item label="JSON">
              <p class="has-text-left">Need JSON? Use <a href ="https://randomuser.me/api/?results=100" target="_blank">this</a>!</p>
              <textarea rows="7" placeholder="Paste some JSON from RandomUser, such as https://randomuser.me/api/?results=100" v-model="dataSend" />
              <a href="javascript:void(0)" v-on:click="postData()" class="button is-link">Go!</a>
            </b-tab-item>
            <b-tab-item label="File">
              <p class="has-text-left">Need a file? Use <a href ="/people.json" download>this one</a>!</p>
              <vue-dropzone v-model="fileSend" ref="dropzoneUploader" v-on:vdropzone-sending="parseFile" v-on:vdropzone-success="loadAnalyticsFromFile" id="dropzone" :options="fileSendOptions"></vue-dropzone>
            </b-tab-item>
        </b-tabs>
        <img v-show="isLoading" src="/loader.svg" class="loading-image" />
      </div>
      <div v-show="analytics.length > 0">
        <div  class="columns is-multiline">
          <div class="column is-half" v-for="(chart, index) in analytics" v-bind:key="'chart' + index">
            <h2>{{chart.title}}</h2>
            <div v-if="chart.chartType == 'Bar'">
              <BarChart v-bind:title="chart.title" v-bind:data="chart.data" />
            </div>
            <div v-if="chart.chartType == 'Pie'">
              <PieChart v-bind:title="chart.title" v-bind:data="chart.data" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import 'buefy/dist/buefy.css'
import Vue from 'vue'
import datalayer from '../datalayer'
import vue2Dropzone from 'vue2-dropzone'
import PieChart from './PieChart'
import BarChart from './BarChart'
import Buefy from 'buefy'

Vue.use(Buefy)

export default {
  name: 'People',
  components: {
    vueDropzone: vue2Dropzone,
    PieChart: PieChart,
    BarChart: BarChart
  },
  data () {
    var data = {
      isLoading: false,
      error: '',
      activeTab: 0,
      analytics: [],
      dataSend: '',
      fileSend: null,
      fileSendOptions: {
        url: datalayer.serviceUrl,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    }
    return data
  },
  methods: {
    parseFile (file) {
      var reader = new FileReader()
      reader.onload = function () {
        var dataText = reader.result
        this.dataSend = dataText
        this.postData()
      }.bind(this)
      reader.readAsText(file)
    },
    startOver () {
      this.error = ''
      this.analytics = []
      this.dataSend = ''
      this.filesend = null
      this.$refs.dropzoneUploader.removeAllFiles()
    },
    postData () {
      this.isLoading = true
      datalayer.post(null, this.dataSend, null)
        .then((responseJSON) => {
          this.parseResponse(responseJSON)
        })
    },
    loadAnalyticsFromFile (file, response) {
      this.parseResponse(response)
    },
    parseResponse (response) {
      this.error = ''
      if (response) {
        this.analytics = response
      } else {
        this.error = 'Something went wrong. Please try again.'
      }
      this.isLoading = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container {
  margin-top:50px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
h2 {
  margin-bottom:20px;
}
textarea {
  padding:10px;
  width: 100%;
  border: 2px solid #e5e5e5;
}
.loading-image {
  height: 50px;
}
</style>
