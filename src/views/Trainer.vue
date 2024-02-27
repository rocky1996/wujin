<template>
    <div>
      <el-table :data="tableData" align="center" stripe style="width: 100%">

        <el-table-column prop="id" label="ID" width="120" align="center">
        </el-table-column>

        <el-table-column prop="trainerNickname" label="姓名" width="120" align="center">
          <template slot-scope="scope">
            <div @click="showFitnessUserInfo(scope.row.id)">
              <el-button v-if="scope.row.role == '教练'" type="primary" plain>{{scope.row.trainerNickname}}</el-button>
              <el-button v-if="scope.row.role == '管理员'" type="success" plain>{{scope.row.trainerNickname}}</el-button>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="trainerIntroduction" label="简介" width="350" align="center">
        </el-table-column>

        <el-table-column prop="role" label="角色" width="120" align="center">
          <template slot-scope="scope">
            <div @click="downFitnessUserInfoLog(scope.row.role)">
              <el-button v-if="scope.row.role == '教练'" type="primary" plain>{{scope.row.role}}</el-button>
              <el-button v-if="scope.row.role == '管理员'" type="success" plain>{{scope.row.role}}</el-button>
            </div>
          </template>
        </el-table-column>

        <div v-if="this.role_role == '0'">
          <el-table-column fixed="right" label="删除教练" width="120" align="center">
            <template slot-scope="scope">
                <el-button @click="deleteTrainer(scope.row.id)" type="danger" icon="el-icon-delete-solid"></el-button>
            </template>
          </el-table-column>
        </div>

        <el-table-column fixed="right" label="会员操作日志" width="120" align="center">
          <template slot-scope="scope">
            <el-button @click="downOperatorLog(scope.row.id)" type="primary" icon="el-icon-download"></el-button>
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="添加会员" width="120" align="center">
          <template slot-scope="scope">
            <el-button @click="openDrawer(scope.row.id)" type="primary" icon="el-icon-circle-plus"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-drawer title="新增会员" :visible.sync="drawer" :with-header="false">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="会员姓名" prop="userName">
            <el-input v-model="ruleForm.userName"></el-input>
          </el-form-item>
          <el-form-item label="购买课程/节" prop="currentCourse">
            <el-input v-model="ruleForm.currentCourse"></el-input>
          </el-form-item>
          <el-form-item label="会员性别" prop="gender">
            <el-radio-group v-model="ruleForm.gender">
              <el-radio label="0">男</el-radio>
              <el-radio label="1">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="submitForm('ruleForm')" type="primary" >立即新增</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-drawer>


      <el-dialog :visible.sync="dialogVisible" title="该教练下全部会员" style="width: 100%">
        <el-table :data="userTableData" stripe style="width: 100%" align="center">
          <el-table-column prop="id" label="ID" width="120" align="center">
          </el-table-column>

          <el-table-column prop="username" label="会员姓名" width="120" align="center">
          </el-table-column>

          <el-table-column prop="gender" label="会员性别" width="120" align="center">
            <template slot-scope="scope">
              <div>
                <el-button v-if="scope.row.gender == '女'" type="primary" plain>{{scope.row.gender}}</el-button>
                <el-button v-if="scope.row.gender == '男'" type="success" plain>{{scope.row.gender}}</el-button>
              </div>
          </template>
          </el-table-column>

          <el-table-column prop="phone" label="会员手机号" width="120" align="center">
          </el-table-column>

          <el-table-column prop="trainerName" label="教练姓名" width="120" align="center">
          </el-table-column>

          <el-table-column prop="currentCourse" label="当前课数" width="120" align="center">
            <template slot-scope="scope">
              <el-button type="primary">{{scope.row.currentCourse}}</el-button>
            </template>
          </el-table-column>

          <el-table-column prop="createTime" label="开始时间" width="200" align="center">
          </el-table-column>

          <el-table-column fixed="right" label="续课" width="120" align="center">
            <template slot-scope="scope">
              <el-button @click="xuke(scope.row.id, scope.row.trainerId)" type="primary">续课</el-button>
            </template>
          </el-table-column>

          <el-table-column fixed="right" label="扣课" width="120" align="center">
            <template slot-scope="scope">
              <el-button @click="kouke(scope.row.id, scope.row.trainerId)" type="primary">扣课</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>

    </div>

</template>


<script>
import axios from "axios";

    export default {
      
      data() {
        return {
          role_role: '',

          tableData: [],
          userTableData: [],
          drawer: false,
          dialogVisible: false,  
          secondDrawer: false,

          traId: '',
          ruleForm: {
            userName: '',
            currentCourse: '',
            gender: '',
            phone: '',
          },
        }
      },

      created(){
        const trainerData= this.$route.query.trainerData;
        this.role_role = trainerData.role;

        let param = {
          userId: trainerData.id,
          roleId: trainerData.role
        } 
        axios.post('http://127.0.0.1:8051/gym/getTrainerInfo', param)
          .then(response => {
            this.tableData = response.data.data;
          })
      },

      methods: {
        handleClick(row) {
          console.log(row);
        },

        openDrawer(trainerId) {
          this.drawer = true;
          this.traId = trainerId;
        },


        submitForm(ruleForm) {
          let param = {
              userName: this.ruleForm.userName,
              currentCourse: this.ruleForm.currentCourse,
              gender: this.ruleForm.gender,
              phone: this.ruleForm.phone,
              trainerId: this.traId,
          }

          axios.post('http://127.0.0.1:8051/gym/shoppingCourse', param)
          .then(response => {
                    let code = response.data.code;
                    let msg = response.data.msg;

                    if(code != 0) {
                      alert(msg);
                    }else{
                      alert('添加会员成功！！！');
                    }
                    this.drawer = false;
                    this.$refs[ruleForm].resetFields();
                })
        },

        resetForm(ruleForm) {
          this.$refs[ruleForm].resetFields();
        },

        downOperatorLog(trainerId) {
          axios.get('http://127.0.0.1:8051/gym/downloadOperatorExcel', {
            params: {
              trainerId: trainerId
            }
          })
          .then(response => {
             let msg = response.data.msg;
             alert(msg)
          })
        },

        downFitnessUserInfoLog(role) {
            if(role === '教练') {
              alert('教练无权限导出全部会员信息!!!')
              return;
            }

            axios.get('http://127.0.0.1:8051/gym/downloadFitnessUserExcel')
            .then(response => {
              let msg = response.data.msg;
              alert(msg)
            })
        },

        showFitnessUserInfo(trainerId) {
          axios.get('http://127.0.0.1:8051/gym/getFitnessUserInfo', {
            params: {
              trainerId: trainerId
            }
          })
          .then(response => {
              this.userTableData = response.data.data;
              if(this.userTableData.length == 0){
                this.dialogVisible = false;
                alert('该教练下暂无会员！！！')
              }else{
                this.dialogVisible = true;
              }
          })
        },

        xuke(userId, trainerId) {
          this.$prompt('请输入续/扣课节数', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputType: Intl
          // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          // inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
          let param = {
              userId: userId,
              operatorId: 1,
              keCourse: value,
          }

          axios.post('http://127.0.0.1:8051/gym/operatorCourse', param)
          .then(response => {
              let code = response.data.code;
              let msg = response.data.msg;
              if(code != 0) {
                alert(msg);
              }else{
                alert('续课成功!!!')
                this.showFitnessUserInfo(trainerId);
              }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
        },

        kouke(userId, trainerId) {
          let param = {
              userId: userId,
              operatorId: 2,
              keCourse: 0,
          }

          axios.post('http://127.0.0.1:8051/gym/operatorCourse', param)
          .then(response => {
              let code = response.data.code;
              let msg = response.data.msg;
              if(code != 0) {
                alert(msg);
              }else{
                alert('扣课成功!!!')
                this.showFitnessUserInfo(trainerId);
              }
            })
          },

        deleteTrainer(trainerId) {
          axios.get('http://127.0.0.1:8051/gym/deleteTrainer', {
            params: {
              trainerId: trainerId
            }
          })
          .then(response => {
             let msg = response.data.msg;
             let code = response.data.code;
             alert(msg)

             if(code == 0) {
              let param = {
                userId: trainerId,
                roleId: this.role_role
              } 
              axios.post('http://127.0.0.1:8051/gym/getTrainerInfo', param)
                .then(response => {
                  this.tableData = response.data.data;
                })
             }
          })
        }
      }
    }
  </script>