<template>
  <el-upload class="avatar-uploader" action="http://localhost:8080/layout/avatar" :show-file-list="false"
    :headers="uploadHeaders" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon">
      <Plus />
    </el-icon>
  </el-upload>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { userUserStore } from '@/stores';
import { uploadUserAvatar } from '@/api/user';

import type { UploadProps } from 'element-plus'

const imageUrl = ref('')
const userData = userUserStore()

const token = userData.token
const uploadHeaders = {
  // 从本地存储（如 localStorage/sessionStorage）获取 Token
  'taken': token,
}
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  // const blob = URL.createObjectURL(uploadFile.raw!)
  //暂时对头像的渲染
  // const reader = new FileReader();
  // reader.readAsDataURL(uploadFile.raw!)
  // reader.onload = () => {
  //   const base64String = reader.result as string;
  //   imageUrl.value = base64String

  //   // userData.setImageUrl(base64String)
  // }

  console.log(response);
  console.log(response.data);

  if (response.code != 1) {
    ElMessage.error(response.message)
  } else {
    //将store中的imageUrl变成后端返回的地址存储，并发送请求存储到数据库中
    imageUrl.value = response.data
    userData.setImageUrl(response.data)
    ElMessage.success(response.message)
  }
  // imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  // userData.setImageUrl(imageUrl.value)
}

//监测文件类型
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  /* 定义一个变量来规定颜色,便于修改 */
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>