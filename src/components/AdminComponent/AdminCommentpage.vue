<template>
  <div id="Commenttemp">


    <div class="Comemnttitle">
      <ul>
        <li v-for="(item,index) in CheckComment" :class="{'liLight':lightflag==index}" @click="lightflag=index">
          <span>{{item}}</span>
        </li>
      </ul>
    </div>
    <div class="CommentMessage" v-show="lightflag==0">
      <table cellspacing="0">
        <thead>
        <tr>
          <th>用户名</th>
          <th>手机名称</th>
          <th>评分</th>
          <th>评论内容</th>
          <th>评论日期</th>
          <th>管理</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in UnauditedList" :key="index">
          <td><span :title="item.userName" class="phonetr">{{item.userName}}</span></td>
          <td><span :title="item.phonename" class="phonetr1">{{item.phonename}}</span></td>
          <td>{{item.scores}}</td>
          <td><span :title="item.comments" class="phonetr2">{{item.comments}}</span></td>
          <td>{{item.createTime}}</td>
          <td>
            <span @click="sure(item)">通过</span>
            <span @click="querymess(item)">驳回</span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <!--  已审核界面  -->
    <div class="CommentMessage" v-show="lightflag==1">
      <table cellspacing="0">
        <thead>
        <tr>
          <th>用户名</th>
          <th>手机名称</th>
          <th>评分</th>
          <th>评论内容</th>
          <th>评论日期</th>
          <th>管理</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in AuditedList" :key="index">
          <td><span :title="item.userName" class="phonetr">{{item.userName}}</span></td>
          <td><span :title="item.phonename" class="phonetr1">{{item.phonename}}</span></td>
          <td>{{item.scores}}</td>
          <td><span :title="item.comments" class="phonetr2">{{item.comments}}</span></td>
          <td>{{item.createTime}}</td>
          <td>
            <span @click="querymess(item)">修改</span>
            <span @click="deleComment(item)">删除</span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="feedbacks" v-for="(item,index) in rejectMess" :key="index" v-show="feedflag">
      <div>
        <ul>
          <li><p>该评论在{{item.createTime}}评论</p></li>
          <li><span>手机名称:</span><span>{{item.phonename}}</span></li>
          <li><span>评分:</span><span>{{item.scores}}</span></li>
          <li><span>评论信息:</span><span>{{item.comments}}</span></li>
          <li><span>驳回理由:</span><textarea rows="7" v-model="rejectReason"></textarea></li>
        </ul>
      </div>
      <div class="feedBtns">
        <span @click="Reject(item)">驳回</span>
        <span @click="cancels()">取消</span>
      </div>
    </div>

  </div>
</template>

<script>
  import axios from 'axios';
  import urlkit from '../../url/urlkit';

  export default {
    name: "AdminCommentpage",
    data() {
      return {
        CheckComment: ['未审核', '已审核'],
        lightflag: 0,
        PhoneSelect: ['名字', '类型'],
        AuditedList: [],  //已审核
        UnauditedList: [],  //未审核
        rejectMess: [],//单个信息显示
        feedflag: true,  //驳回弹窗
        rejectReason: '',// 驳回原因
      }
    },
    created() {
    },
    mounted() {
      this.GetComment(0); //未审核
      this.GetComment(1); //已审核
    },
    methods: {
      //评论信息获取
      GetComment(types) {
        let type = types;
        let url = urlkit + '/api/AdminProduct/CommentGet';
        axios.post(url, {type}).then(res => {
          if (res.status === 200) {
            // console.log(res);
            if (type == 0) {
              this.UnauditedList = res.data;
            } else {
              this.AuditedList = res.data;
            }
          }
        }).catch(err => {
          console.log(err);
        });
      },
      querymess(item) {
        let cid = item.cid;
        this.feedflag = true;
        let url = urlkit + '/api/AdminProduct/SingeComment';
        axios.post(url, {cid}).then(res => {
          if (res.status === 200) {
            this.rejectMess = res.data;
          }
        });
      },
      //审核通过
      sure(obj) {
        let cid = obj.cid;
        let url = urlkit + '/api/AdminProduct/PassComment';
        axios.post(url, {cid}).then(res => {
          if (res.status === 200) {
            alert('审核成功');
            this.GetComment(0); //未审核
            this.GetComment(1); //已审核
            // console.log(res);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      //驳回
      Reject(obj) {
        this.feedflag = false;
        let cid = obj.cid;
        let rejectReason = this.rejectReason;
        // console.log(rejectReason, cid);
        let url = urlkit + '/api/AdminProduct/rejectComment';
        axios.post(url, {cid, rejectReason}).then(res => {
          if (res.status === 200) {
            alert('操作成功');
            this.GetComment(0); //未审核
            this.GetComment(1); //已审核
            this.rejectReason = '';
          }
        }).catch(err => {
          console.log(err);
        });
      },
      deleComment(item) {
        if (confirm('是否删除')) {
          let cid = item.cid;
          let url = urlkit + '/api/AdminProduct/deleComment';
          axios.post(url, {cid}).then(res => {
            if (res.status === 200) {
              // console.log('删除成功', res);
              alert('删除成功');
              this.GetComment(0); //未审核
              this.GetComment(1); //已审核
            }
          }).catch(err => {
            console.log(err);
          });
        }
      },
      //用户取消驳回信息反馈
      cancels() {
        this.feedflag = false;
      }
    },
  }
</script>

<style scoped>
  #Commenttemp {
    position: relative;
    margin-bottom: 10px;
  }

  .Comemnttitle ul {
    display: flex;
    margin-left: 45px;
    /*margin-top: 30px;*/
  }

  .Comemnttitle ul li {
    padding: 5px;
  }

  .liLight {
    background-color: #d1caca;
  }

  .CommentMessage {
    width: 90%;
    margin: auto;
    /*border: 1px solid gray;*/
  }

  .CommentMessage tbody, table, thead {
    width: 100%;
    margin: auto;
    /*border: 1px solid gray;*/
  }

  .CommentMessage tr {

  }

  .CommentMessage tr td, th {
    height: 30px;
    line-height: 30px;
    border: 1px solid #c5c5c5;
  }

  .CommentMessage span {
    /*width: 150px;*/
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    display: inline-block;
    justify-content: center;
    vertical-align: middle;
  }

  .phonetr {
    width: 80px;
  }

  .phonetr1 {
    width: 150px;
  }

  .phonetr2 {
    width: 250px;
  }

  /*  信息驳回列表 */
  .feedbacks {
    position: absolute;
    width: 100%;
    height: 300px;
    left: 0px;
    right: 0px;
    background-color: rgb(118, 142, 182);
    top: 100px;
    z-index: 1000;
    margin: auto;
    box-shadow: 5px 5px 3px #6f7a86;
    padding: 5px;
  }

  .feedbacks ul li {
    display: flex;
    margin-top: 10px;
    justify-content: center
  }

  .feedbacks ul li span {
    vertical-align: middle;
    display: inline-block;
    padding: 2px;
  }

  .feedbacks ul li span:nth-child(2n+1) {
    width: 80px;
    height: 20px;
    /*background-color: darkgrey;*/
  }

  .feedbacks ul li span:nth-child(2n) {
    width: 260px;
    word-break: break-all;
    background-color: #aebcc3;
    text-align: left;
  }

  .feedBtns {
    margin: 20px auto;
  }

  .feedBtns span {
    padding: 5px 20px;
    background-color: #414e63;
    cursor: pointer;
    color: #ffffff;
  }

  textarea {
    width: 255px;
    resize: none;
    padding: 5px;
  }
</style>
