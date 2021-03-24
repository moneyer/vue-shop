import Vue from 'vue'
import {
  Message,
  Button,
  Input,
  Form,
  FormItem
} from 'element-ui'

Vue.prototype.$message = Message
Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
