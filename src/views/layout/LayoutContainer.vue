<script setup>
import {
  Management,
  Promotion,
  UserFilled,
  User,
  Crop,
  EditPen,
  SwitchButton,
  CaretBottom
} from '@element-plus/icons-vue'
import router from '@/router';
import { userUserStore } from '@/stores';
const handleCommand = (adderss) => {
  router.push(adderss)
}
const userStore = userUserStore()
//获取用户数据进行页面渲染
const userData = userStore.getUserData()
</script>

<template>
  <el-container class="layout-container">
    <el-aside width="200px">
      <div class="el-aside__logo"></div>
      <el-menu active-text-color="#ffd04b" background-color="#232323" :default-active="$route.path" text-color="#fff"
        router>
        <el-menu-item index="/article/channel">
          <el-icon>
            <Management />
          </el-icon>
          <span>回忆录分类</span>
        </el-menu-item>
        <el-menu-item index="/article/manage">
          <el-icon>
            <Promotion />
          </el-icon>
          <span>回忆录管理</span>
        </el-menu-item>

        <el-sub-menu index="/user">
          <!-- 插槽 -->
          <template #title>
            <el-icon>
              <UserFilled />
            </el-icon>
            <span>个人中心</span>
          </template>

          <!-- 展开 -->
          <el-menu-item index="/user/profile">
            <el-icon>
              <User />
            </el-icon>
            <span>基本资料</span>
          </el-menu-item>
          <el-menu-item index="/user/avatar">
            <el-icon>
              <Crop />
            </el-icon>
            <span>更换头像</span>
          </el-menu-item>
          <el-menu-item index="/user/password">
            <el-icon>
              <EditPen />
            </el-icon>
            <span>重置密码</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div>
          你好！同学：<strong>{{ userData.userName }}</strong>
        </div>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown__box">
            <el-avatar :src="userStore.getImageUrl()" />
            {{ userData.userName }}
            <el-icon>
              <CaretBottom />
            </el-icon>
          </span>

          <!-- 下拉部分 -->
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="/user/profile" :icon="User">基本资料</el-dropdown-item>
              <el-dropdown-item command="/user/avatar" :icon="Crop">更换头像</el-dropdown-item>
              <el-dropdown-item command="/user/password" :icon="EditPen">重置密码</el-dropdown-item>
              <el-dropdown-item command="/login" :icon="SwitchButton">退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main>
        <!-- 显示子路由 -->
        <router-view></router-view>
      </el-main>
      <el-footer>xx中学校园回忆录</el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;

  .el-aside {
    background-color: #232323;

    &__logo {
      height: 120px;
      background: url('@/assets/login_back_.jpg') no-repeat center / 200px auto;
      opacity: 0.5;
    }

    .el-menu {
      border-right: none;
    }
  }

  .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .el-dropdown__box {
      display: flex;
      align-items: center;

      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }

  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
}
</style>