
export default {
  data() {
    return {
      dialogIconVisible: false, //弹窗visible状态
      iconObj: {}
    }
  },
  methods: {
    iconHandle(info) {
      this.dialogIconVisible = true
      this.iconObj = info
    },
    chooseCallback(res) {
      this.linkform.icon = res
      this.iconObj.icon = res
      this.dialogIconVisible = false
    }
  }
}