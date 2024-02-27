<template>
    <div class="body">
        <el-form :rules="form" ref="loginForm" :model="loginForm" class="loginContainer">
            <h3 class="loginTitle">
            欢迎登录
            </h3>
            <el-form-item prop="username">
                <el-input type="text" v-model="loginForm.username" placeholder="亲，请输入用户名" >
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="loginForm.password" placeholder="亲，请输入密码" >
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width:100%" @click="submitLogin()">登录</el-button>
            </el-form-item>

            <el-row style="text-align: center;margin-top:-10px">
				<!-- <el-link type="primary">忘记密码</el-link> -->
				<el-link type="primary" @click="drawer=true">新教练请点击注册</el-link>
			</el-row>
        </el-form>


        <el-drawer title="新增教练" :visible.sync="drawer" :with-header="false">
            <el-form :model="trainerForm" :rules="rules" ref="trainerForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="trainerForm.userName"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="trainerForm.password"></el-input>
                </el-form-item>
                <el-form-item label="二次输入密码" prop="rePassword">
                    <el-input type="password" v-model="trainerForm.rePassword"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="trainerNickname">
                    <el-input v-model="trainerForm.trainerNickname"></el-input>
                </el-form-item>
                <el-form-item label="简介" prop="trainerIntroduction">
                    <el-input v-model="trainerForm.trainerIntroduction"></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="role">
                    <el-radio-group v-model="trainerForm.role">
                        <el-radio label="0">管理员</el-radio>
                        <el-radio label="1">教练</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button @click="submitForm('trainerForm')" type="primary" >立即注册</el-button>
                    <el-button @click="resetForm('trainerForm')">重置</el-button>
                </el-form-item>
            </el-form>
      </el-drawer>


    </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
    data(){
      return{
        loginForm: {
            username: '',
            password: '',
        },
        drawer: false,

        trainerForm: {
            userName: '',
            password: '',
            rePassword: '',
            trainerNickname: '',
            trainerIntroduction: '',
            role: ''
          },
      }
  },
    methods:{

        submitLogin() {
            let param = {
                username: this.loginForm.username,
                password: this.loginForm.password
            }

            axios.post('http://127.0.0.1:8051/gym/login', param)
                .then(response => {
                    let code = response.data.code;
                    let msg = response.data.msg;
                    if(code === 301) {
                        this.loginForm.username = '',
                        this.loginForm.password = '',
                        alert(msg)
                    }

                    if(code === 0) {
                        // this.$router.push('/trainer')
                        this.$router.push({
                            path: '/trainer',
                            query: {
                                trainerData: response.data.data
                            }
                        })
                    }
                })
        },

        submitForm(trainerForm) {
            let param = {
                userName: this.trainerForm.userName,
                password: this.trainerForm.password,
                rePassword: this.trainerForm.rePassword,
                trainerNickname: this.trainerForm.trainerNickname,
                trainerIntroduction: this.trainerForm.trainerIntroduction,
                role: this.trainerForm.role,
            }

            axios.post('http://127.0.0.1:8051/gym/register', param)
            .then(response => {
                let code = response.data.code;
                let msg = response.data.msg;
                if (code != 0) {
                    alert(msg);                   
                }else{
                    alert('注册成功,请登录!!!');
                }
                this.$refs[trainerForm].resetFields();
                this.drawer = false;
            })
        },

        resetForm(trainerForm) {
          this.$refs[trainerForm].resetFields();
        }
    },

    mounted() {
        // this.queryUserList();
    }
};
</script>

<style>
    .loginContainer{
        border-radius: 15px;
        background-clip: padding-box;
        text-align: left;
        margin: auto;
        margin-top: 180px;
        width: 350px;
        padding: 15px 35px 15px 35px;
        background: aliceblue;
        border:1px solid blueviolet;
        box-shadow: 0 0 25px #f885ff;
    }
    .loginTitle{
        margin: 0px auto 48px auto;
        text-align: center;
        font-size: 40px;
    }
    .loginRemember{
        text-align: left;
        margin: 0px 0px 15px 0px;
    }
    .body{
        width: 100vw;
        height: 100vh;
        background-image: url("../assets/img/backgroud.png") ;
        background-size:100%;
       overflow: hidden;
    }
</style>
