<template>
  <div>
    <el-form ref="loginFormRef" :model="loginFormData" :rules="loginFormRules" @keyup.enter="handleLogin">
      <el-form-item prop="username">
        <el-input v-model.trim="loginFormData.username" placeholder="用户名" type="text" tabindex="1" :prefix-icon="User"
          size="large" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model.trim="loginFormData.password" placeholder="密码" type="password" tabindex="2" :prefix-icon="Lock"
          size="large" show-password />
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model.trim="loginFormData.code" placeholder="验证码" type="text" tabindex="3" :prefix-icon="Key"
          maxlength="7" size="large">
          <template #append>
            <!-- <el-image :src="codeUrl" @click="createCode" draggable="false">
              <template #placeholder>
                <el-icon>
                  <Picture />
                </el-icon>
              </template>
              <template #error>
                <el-icon>
                  <Loading />
                </el-icon>
              </template>
            </el-image> -->
          </template>
        </el-input>
      </el-form-item>
      <el-button :loading="loading" type="primary" size="large" @click.prevent="handleLogin">登 录</el-button>
    </el-form>
    <!-- <div @click="createCode">获取验证码</div> -->

  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from "vue-router"
import { User, Lock, Key, Picture, Loading } from "@element-plus/icons-vue"
import { useUserStore } from '@/store/module/user'
import { getLoginCodeApi } from "@/api/login"

const router = useRouter()
const loginFormData = reactive({
  username: 'admin',
  password: '12345678',
  code: 'V3Admin'
})
const loading = ref(false)
// 引用到form的实例，命名需要和ref="XX"保持一致。相当于vue2的this.$refs.XX
const loginFormRef = ref(null)
const codeUrl = ref('')
const loginFormRules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 8, max: 16, message: "长度在 8 到 16 个字符", trigger: "blur" }
  ],
  code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
}

const handleLogin = () => {
  loginFormRef.value.validate((valid, filed) => {
    if (valid) {
      loading.value = true
      useUserStore()
        .login(loginFormData)
        .then(() => {
          console.log("登录成功")
          router.push({ path: "/" })
        })
        .catch(() => {
          createCode()
          loginFormData.password = ""
        })
        .finally(() => {
          loading.value = false
        })
    } else {
      console.error("表单校验不通过", fields)
    }
  })
}
// 获取生成二维码
const createCode = () => {
  loginFormData.code = '';
  codeUrl.value = ''
  getLoginCodeApi().then((res) => {
    console.log('res---', res.data)
    codeUrl.value = res.data
  })
}
</script>

<style lang="scss" scoped></style>