<template>
    <div class="width" style="margin-bottom: 50px;margin-top: 20px;">
        <el-card class="box-card" shadow="hover">
            <h3 class="about-title">ABOUT ME</h3>
            <div class="introduction clear-fix">
                <h4 class="title">Helo, I’m Ola Lowe!</h4>
                <p>
                    Logo or your Company Name, unless of course you are Microsoft or the Yellow Pages online directorye core of your marketing, the central theme around your products and services. Your brand is not your Logo or your Company Name, unless of course you are Microsoft or the Yellow Pages online directory.
                </p>
                <img src="http://119.23.19.145/img/uploads/signature.png" alt="img">
            </div>
            <div class="info">
                <el-row :gutter="20">
                    <el-col :span="12">
                       <h4 class="title">personal information</h4>
                        <ul class="info-list">
                            <li>
                                <span class="label">
                                    FULL NAME
                                </span>
                                <span>Ola Maria Lowe</span>
                            </li>
                            <li>
                                <span class="label">
                                    D.O.B.
                                </span>
                                <span>05 Sep 1986</span>
                            </li>
                            <li>
                                <span class="label">
                                    ADDRESS
                                </span>
                                <span>24058, Belgium, Brussels, Liutte 27, BE</span>
                            </li>
                            <li>
                                <span class="label">
                                    E-MAIL
                                </span>
                                <span>robertsmith@company.com</span>
                            </li>
                            <li>
                                <span class="label">
                                    PHONE
                                </span>
                                <span>+1 256 254 84 56</span>
                            </li>
                            <li>
                                <span class="label">
                                    FREELANCE
                                </span>
                                <span>Available</span>
                            </li>
                        </ul>
                    </el-col>
                    <el-col :span="12">
                        <h4 class="title">languages</h4>

                    </el-col>
                </el-row>
            </div>
            <div class="skills">
                <el-row :gutter="20">
                    <el-col :span="12">
                       <h4 class="title">professional skills</h4>
                        <ul>
                            <li>
                                <div class="skill-type clear-fix">
                                    <span>Php & MySQL</span>
                                    <span>90%</span>
                                </div>
                                <el-progress :percentage="90"
                                             :show-text="false"
                                             color="#8e71c7"></el-progress>
                            </li>
                            <li>
                                <div class="skill-type clear-fix">
                                    <span>Javascript</span>
                                    <span>80%</span>
                                </div>
                                <el-progress :percentage="80"
                                             :show-text="false"
                                             color="#8e71c7"></el-progress>
                            </li>
                            <li>
                                <div class="skill-type clear-fix">
                                    <span>UX Design</span>
                                    <span>80%</span>
                                </div>
                                <el-progress :percentage="80"
                                             :show-text="false"
                                             color="#8e71c7"></el-progress>
                            </li>
                        </ul>
                    </el-col>
                    <el-col :span="12">
                        <h4 class="title" style="margin-bottom: 10px;">personal characteristics</h4>
                        <el-row>
                            <el-col style="text-align: center;" :span="8">
                                <el-progress type="circle"
                                             style="margin-top: 20px;margin-bottom: 10px;"
                                             :percentage="80"
                                             color="#8e71c7"></el-progress>
                                <h5>UX Design</h5>
                            </el-col>
                            <el-col style="text-align: center;" :span="8">
                                <el-progress type="circle"
                                             style="margin-top: 20px;margin-bottom: 10px;"
                                             :percentage="80"
                                             color="#8e71c7"></el-progress>
                                <h5>UX Design</h5>
                            </el-col>
                            <el-col style="text-align: center;" :span="8">
                                <el-progress type="circle"
                                             style="margin-top: 20px;margin-bottom: 10px;"
                                             :percentage="80"
                                             color="#8e71c7"></el-progress>
                                <h5>UX Design</h5>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </div>
            <div class="interests">
                <h4 class="title">interests</h4>
                <ul class="list clear-fix">
                    <li>
                        <i class="el-icon-edit"></i>
                        North Adella
                    </li>
                    <li>
                        <i class="el-icon-edit"></i>
                        North Adella
                    </li>
                    <li>
                        <i class="el-icon-edit"></i>
                        North Adella
                    </li>
                    <li>
                        <i class="el-icon-edit"></i>
                        North Adella
                    </li>
                    <li>
                        <i class="el-icon-edit"></i>
                        North Adella
                    </li>
                    <li>
                        <i class="el-icon-edit"></i>
                        North Adella
                    </li>
                    <li>
                        <i class="el-icon-edit"></i>
                        North Adella
                    </li>
                    <li>
                        <i class="el-icon-edit"></i>
                        North Adella
                    </li>
                    <li>
                        <i class="el-icon-edit"></i>
                        North Adella
                    </li>
                    <li>
                        <i class="el-icon-edit"></i>
                        North Adella
                    </li>
                </ul>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "about"
    }
</script>

<style scoped>
h3.about-title {
    font-size: 23px
}
.introduction {
    margin-top: 30px;
    border-bottom: 1px solid #e6e6e6;
}
.introduction h4 {
    font-size: 17px;
    margin-bottom: 10px;
    font-weight: normal;
}
.introduction p {
    font-size: 15px;
    line-height: 22px;
    letter-spacing: 2px;
    margin-bottom: 10px;
    font-weight: normal;
}
.introduction > img {
    float: right;
    margin-bottom: 20px;
}
.info {
    padding-bottom: 20px;
    margin-top: 20px;
    border-bottom: 1px solid #e6e6e6;
}
.info h4 {
    margin-bottom: 20px;
}
.label {
    display: inline-block;
    width: 100px;
    font-weight: bold;
}
.info-list li {
    line-height: 30px;
}
.info-list li > span:not(.label) {
    font-size: 14px;
    letter-spacing: 1px;
}
.skills {
    padding-top: 20px;
}
.skills h4 {
}
.skill-type {
    font-weight: bold;
    font-size: 13px;
    margin-bottom: 20px;
    margin-top: 20px;
}
.skill-type span:nth-of-type(1) {
    float: left;
}
.skill-type span:nth-of-type(2) {
    float: right;
}
.interests {
    margin-top: 20px;
}
.interests h4 {
    margin-bottom: 10px;
}

.interests .list li {
    color: #c0e3e7;
    margin-top: 20px;
    font-size: 16px;
    float: left;
    width: 25%;
}
</style>
