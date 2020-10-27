import Gate from "../util/Gate";

export default class Api{
    static host = "http://192.168.0.10:8299";

    static async getAdminList(limit = 50, offset = 0){
        try{
            const result = await Gate({
                method: "GET",
                url: `/api/v1/admin/admin/list?limit=${limit}&offset=${offset}`,
                headers: {
                    "Content-Type": "application/json",
                }
            });
            return result.data.result.admins;
        }catch(error){
            console.log(error);
            return [];
        }
    }

    static async addAdmin(account: string, password: string, name: string, level: number){
        const params = new URLSearchParams();
        params.append('name', name);
        params.append('password', password);
        params.append('level', level.toString());
        params.append('account', account);
        try{
            await Gate({
                method: "POST",
                url: `/api/v1/admin/admin/add`,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                },
                params
            });
            return true;
        }catch(error){
            console.log([error]);
            return false;
        }
    }

    static async getLogList(limit = 50, offset = 0){
        try{
            const result = await Gate({
                method: "GET",
                url: `/api/v1/admin/admin/logs?limit=${limit}&offset=${offset}`,
                headers: {
                    "Content-Type": "application/json",
                }
            });
            return result.data.result.logs;
        }catch(error){
            console.log(error);
            return [];
        }
    }

    static async getUserList(limit = 50, offset = 0){
        try{
            const result = await Gate({
                method: "GET",
                url: `/api/v1/admin/user/list?limit=${limit}&offset=${offset}`,
                headers: {
                    "Content-Type": "application/json",
                }
            });
            return result.data.result.users;
        }catch(error){
            console.log(error);
            return [];
        }
    }

    static async getUserData(id: string){
        try{
            const result = await Gate({
                method: "GET",
                url: `/api/v1/admin/user/list?limit=${1}&offset=${id}`,
                headers: {
                    "Content-Type": "application/json",
                }
            });
            return result.data.result.users;
        }catch(error){
            console.log(error);
            return [];
        }
    }

    static async getNoticeList(limit = 50, offset = 0){
        try{
            const result = await Gate({
                method: "GET",
                url: `/api/v1/admin/support/notices?limit=${limit}&offset=${offset}&no_answer=0`,
                headers: {
                    "Content-Type": "application/json",
                }
            });
            // return result.data.result.questions;
        }catch(error){
            console.log(error);
            return [];
        }
    }

    static async getQuestionList(limit = 50, offset = 0){
        try{
            const result = await Gate({
                method: "GET",
                url: `/api/v1/admin/support/notices?limit=${limit}&offset=${offset}&no_answer=0`,
                headers: {
                    "Content-Type": "application/json",
                }
            });
            return result.data.result.questions;
        }catch(error){
            console.log(error);
            return [];
        }
    }
}