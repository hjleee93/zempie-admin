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
                        <q-input v-model="account" label="계정" placeholder="Account" />

                        <q-input v-model="password" label="비밀번호" placeholder="Password" type="password" />

                        <div>
                            <q-btn label="로그인" id="login-btn" type="submit" color="primary" />
                        </div>
                    </q-form>
                </q-card-actions>
            </q-card>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Notify } from "quasar";

@Component
export default class extends Vue {
    account = "";
    password = "";

    async onSubmit(event: PageTransitionEvent) {
        event.preventDefault();
        if(this.account.trim() == "" || this.password.trim() == ""){
            
            return Notify.create({
                type: "negative",
                message: '내용을 전부 채워주시기 바랍니다.',
                position: "top",
            });
        }
        const result = await this.$store.dispatch("login", {account: this.account.trim(), password: this.password.trim()});

        if(result){
            Notify.create({
                type: "positive",
                message: '로그인 성공',
                position: "top",
            });
            await this.$store.dispatch("getAdminData");
            await this.$router.push("/");
        }else{
            Notify.create({
                type: "negative",
                message: '아이디 또는 비민번호가 일치하지 않습니다. 확인 후 다시 입력해 주시기 바랍니다.',
                position: "top",
            });
        }
    }

    created(){
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
