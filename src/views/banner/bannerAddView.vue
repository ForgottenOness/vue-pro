<template>
  <div class="banneradd-comtainer">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="alt" prop="alt">
        <el-input v-model="ruleForm.alt" placeholder="alt" />
      </el-form-item>
      <el-form-item label="link" prop="link">
        <el-input v-model="ruleForm.link" placeholder="link" />
      </el-form-item>
      <el-form-item>
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :http-request="httpRequest"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="base64" prop="img">
        <el-input
          v-model.number="ruleForm.img"
          placeholder="自动生成base64图片"
          disabled
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)"
          >添加</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { addBanner } from '@/api/banner.js'
export default defineComponent({
  data() {
    return {
      imageUrl: '',
      ruleFormRef: null,
      ruleForm: {
        alt: '',
        link: '',
        img: ''
      },
      rules: {
        alt: [{ required: true, message: '请填写alt', trigger: 'blur' }],
        link: [{ required: true, message: '请填写link', trigger: 'blur' }],
        img: [{ required: true, message: '请填写base64', trigger: 'blur' }]
      }
    }
  },
  components: {
    Plus
  },
  mounted() {
    this.ruleFormRef = this.$refs.ruleFormRef
  },
  methods: {
    submitForm(ruleFormRef) {
      if (!ruleFormRef) return
      ruleFormRef.validate((valid) => {
        if (valid) {
          console.log('submit!')
          addBanner(this.ruleForm).then(() => {
            this.$router.push({ name: 'bannerlist' })
          })
        } else {
          console.log('error submit!')
          return false
        }
      })
    },
    httpRequest(data) {
      // 限制上传的图片格式
      const typeRight = ['image/jpeg', 'image/jpg', 'image/png'].includes(
        data.file.type
      )
      // 限制上传图片大小
      const sizeRight = data.file.size / 1024 / 1024 < 2
      if (!typeRight) {
        ElMessage.error('文件类型不正确')
        return false
      } else if (!sizeRight) {
        ElMessage.error('图片大小高于2M')
        return false
      }
      // 根据上传的file生成一个可以看到的图片的imgUrl
      this.imageUrl = URL.createObjectURL(data.file)
      // 获取文件的base64位地址
      this.getBase64(data.file)
        .then((base64Res) => {
          this.ruleForm.img = base64Res
        })
        .catch((err) => console.log(err))
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader()
        let fileResult = ''
        reader.readAsDataURL(file)
        reader.onload = () => {
          fileResult = reader.result
        }
        reader.onerror = (err) => {
          reject(err)
        }
        reader.onloadend = () => {
          resolve(fileResult)
        }
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.banneradd-comtainer {
  height: 100%;
  padding: 24px;
}
.el-form {
  width: 400px;
  height: 100%;
}
.el-upload {
  .el-icon {
    width: 46px;
    height: 46px;
    background: #fff;
  }
  img {
    height: 200px;
  }
}
</style>
