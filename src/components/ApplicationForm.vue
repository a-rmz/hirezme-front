<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show" style="text-align:left;">
      <b-form-group id="ig-opening"
                    label="Opening name:"
                    label-for="opening-name"
                    description="What are you applying to?">
        <b-form-input id="opening-name"
                      type="text"
                      v-model="form.name"
                      required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="ig-url"
                    label="URL to the opening"
                    label-for="opening-url">
        <b-form-input id="opening-url"
                      type="url"
                      v-model="form.url"
                      required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="ig-tags"
                    label="Add some tags to find it easily"
                    label-for="opening-tags"
                    description="Separated by commas">
        <b-form-input id="opening-tags"
                      type="text"
                      v-model="inputTags"
                      @input="checkTags">
        </b-form-input>
      </b-form-group>
       <b-form-row>
          <b-button size="sm" variant="info" @click="removeTag(index)"
            style="margin:0 3px 10px 3px;"
            v-for="(tag, index) in form.tags" :key="index">
            {{ tag }}
            <fa-icon icon="times-circle"/>
          </b-button>
        </b-form-row>
      <b-form-group id="ig-company"
                    label="Company:"
                    label-for="opening-company">
        <b-form-select id="opening company"
                      :options="companyList"
                      required
                      v-model="form.company">
        </b-form-select>
      </b-form-group>
      <b-form-row>
        <b-button type="submit" variant="primary" block>Create</b-button>
        <b-button type="reset" variant="outline-danger" block @click="$emit('cancel')">Cancel</b-button>
      </b-form-row>
    </b-form>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState([
      'companies',
    ]),
    companyList () {
      return  [
        { text: 'Select One', value: null },
        ...this.companies.map(c => ({ value: c.id, text: c.name}))
      ]
    }
  },
  data () {
    return {
      form: {
        name: '',
        url: '',
        company: null,
        tags: []
      },
      inputTags: '',
      show: true
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault();
      // In case the input tag was not added to the list,
      // Add it before submitting the form
      if (this.inputTags.length !== 0) {
        this.form.tags.push(this.inputTags)
      }
      this.$emit('created', this.form);
      this.onReset();
    },
    onReset (evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.name = '';
      this.form.url = '';
      this.form.company= null;
      this.form.tags = [];
      this.inputTag = '';
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => { this.show = true });
    },
    checkTags (input) {
      if (input.slice(-1) === ',') {
        const tag = input.slice(0, -1);
        if (this.form.tags.indexOf(tag) === -1 && tag.length > 0) {
          this.form.tags.push(tag);
        }
        this.inputTags = ''
      }
    },
    removeTag (index) {
      this.form.tags.splice(index, 1);
    }
  }
}
</script>
