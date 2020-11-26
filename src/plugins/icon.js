
export default {
  data () {
    return {
      dialogIconVisible: false, //弹窗visible状态
    }
  },
  methods: {
    iconHandle () {
      this.dialogIconVisible = true
    },
    chooseCallback (res) {
      this.linkform.icon = res
      this.dialogIconVisible = false
    }
  }
}