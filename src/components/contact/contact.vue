<template>
    <div class="width">
        <el-card style="width: 100%;margin-top: 20px;" class="box-card" shadow="hover">
            <h3 style="font-size: 16px">CONTACT ME</h3>
            <div class="contact-content">
                <div class="contact-types">
                    <el-tooltip placement="top">
                        <div slot="content">https://github.com/DoGoodMore</div>
                        <a href="https://github.com/DoGoodMore">
                            <i class="icon-github"></i>
                        </a>
                    </el-tooltip>
                    <el-tooltip placement="top">
                        <div slot="content"><img
                            style="width: 170px;"
                            src="http://www.17sucai.com/preview/705993/2018-01-18/Blog_html/img/qrcode.jpg" alt="qq"></div>
                        <a href="javascript:;">
                            <i class="icon-qq"></i>
                        </a>
                    </el-tooltip>
                    <el-tooltip placement="top">
                        <div slot="content"><img
                            style="width: 170px;"
                            src="http://www.17sucai.com/preview/705993/2018-01-18/Blog_html/img/qrcode.jpg" alt="wechart"></div>
                        <a href="javascript:;">
                            <i class="icon-wechart"></i>
                        </a>
                    </el-tooltip>
                </div>
                <div class="contact-des">
                    FELL FREE TO CONTACT ME THE CORE OF YOUR MARKETING
                </div>
                <el-form :label-position="`left`"
                         :ref="`message`"
                         label-width="100px"
                         :rules="rules"
                         :model="form">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="form.username"
                                  placeholder="请输入你的用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="电子邮箱" prop="email">
                        <el-input v-model="form.email"
                                  placeholder="请输入你的邮箱地址"></el-input>
                    </el-form-item>
                    <el-form-item label="留言内容" prop="content">
                        <el-input type="textarea"
                                  rows="8"
                                  placeholder="请输入内容"
                                  v-model="form.content"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="submitMessage" class="send-message">
                            提交
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
    import { sendMessage } from "@/api/message";

    export default {
        name: "contact",
        data() {
            return {
                form: {
                    username: '',
                    email: '',
                    content: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入你的用户名', trigger: 'blur' },
                    ],
                    email: [
                        { required: true, message: '请输入你的邮箱地址', trigger: 'blur' },
                    ],
                    content: [
                        { required: true, message: '请输入你的留言内容', trigger: 'blur' },
                    ]
                }
            }
        },
        methods: {
            submitMessage() {
                this.$refs[ `message` ].validate((valid) => {
                    if ( valid ) {
                        if ( !/^\w{3,}@\w*\.com$/.test( this.form.email ) ) {
                            this.$message( {
                                message: '请输入正确的电子邮箱地址',
                                type: 'error'
                            } ) ;
                            return ;
                        }
                        sendMessage( this.form )
                            .then( res => {
                                const { status } = res ;
                                if ( status === 0 ) {
                                    this.$message( {
                                        message: '提交成功',
                                        type: 'success'
                                    } )
                                }
                                this.$refs[ `message` ].resetFields() ;
                            } )
                    }
                })
            }
        }
    }
</script>

<style scoped>
.contact-content {
    width: 750px;
    margin: 30px auto 0 auto ;
}
.contact-types {
    padding-left: 100px;
    margin-bottom: 30px;
}
.contact-types i {
    font-size: 25px;
    margin-right: 30px;
    color: #c0e3e7;
}
.contact-types i:hover {
    color: #000;
}
.send-message {
    display: inline-block;
    width: 200px;
    height: 40px;
    border-radius: 9px;
    border: none;
    color: #fff;
    background: linear-gradient(to right, #c0e3e7, #6EE4E7);
    text-align: center;
}
.send-message:hover {
    background: linear-gradient(to right, #6EE4E7, #c0e3e7);
}
.contact-des {
    padding-left: 100px;
    margin-bottom: 30px;
    font-weight: bold;
    font-size: 17px;
}
</style>
