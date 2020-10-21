<template>
    <div id="login-layout" class="q-pa-md">
        <div class="fit row wrap justify-center items-center content-center">
            <q-card id="login-card" class="pa-xs">
                <q-card-section>
                    <div class="text-h6">Zempie admin page login</div>
                </q-card-section>

                <q-separator />

                <q-card-actions vertical>
                    <q-form @submit="onSubmit" class="q-gutter-md q-pa-md">
                        <q-input outlined v-model="account" label="계정" placeholder="Account" :dense="dense" />

                        <q-input outlined v-model="password" label="비밀번호" placeholder="Password" type="password" :dense="dense" />

                        <div>
                            <q-btn label="로그인" id="login-btn" type="submit" color="primary" />
                        </div>
                    </q-form>
                </q-card-actions>
            </q-card>
        </div>

        <q-dialog v-model="loginDialog" persistent transition-show="scale" transition-hide="scale">
            <q-card>
                <q-card-section>
                    <div class="text-h6">로그인 오류</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    아이디 또는 비밀번호가 일치하지 않습니다. 확인 후 다시 입력해주세요.
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="확인" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
    dense = null;
    loginDialog = false;
    account = "";
    password = "";

    onSubmit(event: PageTransitionEvent) {
        event.preventDefault();
        if(this.account == "admin" && this.password == "password"){
            this.$store.commit("login", {name: ""});
            this.$router.push("/");
        }else{
            this.loginDialog = true;
        }
    }

    mounted(){
        if(this.$store.getters.isLogin){
            this.$router.push("/");
        }
    }
}
</script>

<style scoped>
#login-form {
    width: 100px;
    height: 100px;
    border: 1px solid #000;
}

#login-layout {
    width: 100%;
    height: 100%;
}

#login-card {
    width: 400px;
    height: 300px;
}

#login-btn{
    width:100%;
}
</style>
