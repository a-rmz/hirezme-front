<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show" style="text-align:left;">
      <b-form-group id="ig-company"
                    label="Company name"
                    label-for="company-name">
        <b-form-input id="company-name"
                      type="text"
                      v-model="form.name"
                      required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="ig-url"
                    label="Website of the company"
                    label-for="company-url">
        <b-form-input id="company-url"
                      type="url"
                      v-model="form.url"
                      required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="ig-address"
                    label="Address"
                    label-for="company-address">
        <b-form-input id="company-address"
                      type="text"
                      v-model="form.location.address">
        </b-form-input>
      </b-form-group>
      <b-form-group id="ig-city"
                    label="City"
                    label-for="company-city">
        <b-form-input id="company-city"
                      type="text"
                      v-model="form.location.city">
        </b-form-input>
      </b-form-group>
      <b-form-group id="ig-country"
                    label="Country"
                    label-for="company-country">
        <b-form-input id="company-country"
                      type="text"
                      v-model="form.location.country">
        </b-form-input>
      </b-form-group>
      <b-form-group id="ig-tags"
                    label="Add some tags to find it easily"
                    label-for="company-tags"
                    description="Separated by commas">
        <b-form-input id="company-tags"
                      type="text"
                      v-model="inputTags"
                      @input="checkTags">
        </b-form-input>
      </b-form-group>
       <b-form-row>
          <b-button size="sm" variant="info" @click="removeTag(index)"
            style="margin:0 3px 20px 3px;"
            v-for="(tag, index) in form.tags" :key="index">
            {{ tag }}
            <fa-icon icon="times-circle"/>
          </b-button>
        </b-form-row>
      <b-form-row>
        <b-button type="submit" variant="primary" block>Create</b-button>
        <b-button type="reset" variant="outline-danger" block @click="$emit('cancel')">Cancel</b-button>
      </b-form-row>
    </b-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        name: '',
        url: '',
        location: {
          address: '',
          city: '',
          country: ''
        },
        tags: []
      },
      inputTags: '',
      show: true
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      // In case the input tag was not added to the list,
      // Add it before submitting the form
      if (this.inputTags.length !== 0) {
        this.form.tags.push(this.inputTags)
      }
      this.$emit('created', this.form)
    },
    onReset (evt) {
      evt.preventDefault()
      /* Reset our form values */
      this.form.name = ''
      this.form.url = ''
      this.form.location = {
        address: '',
        city: '',
        country: ''
      }
      this.form.tags = []
      this.inputTag = ''
      /* Trick to reset/clear native browser form validation state */
      this.show = false
      this.$nextTick(() => { this.show = true })
    },
    checkTags (input) {
      if (input.slice(-1) === ',') {
        const tag = input.slice(0, -1)
        if (this.form.tags.indexOf(tag) === -1 && tag.length > 0) {
          this.form.tags.push(tag)
        }
        this.inputTags = ''
      }
    },
    removeTag (index) {
      this.form.tags.splice(index, 1)
    }
  }
}
</script>
