import Gate from "../util/Gate";

export default class Api{
    /* 관리자 */
    static async getAdminList(limit = 10, offset = 0, sort = "id", dir= "asc"){
        try{
            if(sort == null){
                sort = "id";
            }
            limit *= 2;
            const result = await Gate({
                method: "GET",
                url: `/api/v1/admin/admin/list?limit=${limit}&offset=${offset}&sort=${sort}&dir=${dir}`,
                headers: {
                    "Content-Type": "application/json",
                }
            });
            return result.data.result;
        }catch(error){
            return [];
        }
    }

    static async addAdmin(account: string, password: string, name: string, level: number, subLevel: number){
        const params = new URLSearchParams();
        params.append('name', name);
        params.append('password', password);
        params.append('level', level.toString());
        // params.append('sub_level', subLevel.toString());
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
            return false;
        }
    }

    static async setAdminLevel(id: number, level: number, subLevel: number){
        const params = new URLSearchParams();
        params.append('id', id.toString());
        params.append('level', level.toString());
        params.append('sub_level', level.toString());
        
        try{
            await Gate({
                method: "POST",
                url: `/api/v1/admin/admin/mod`,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                },
                params
            });
            return true;
        }catch(error){
            return false;
        }
    }

    static async setAdmin(id: number, name: string, password: string){
        const params = new URLSearchParams();
        params.append('id', id.toString());
        params.append('name', name);
        params.append('password', password);
        
        try{
            await Gate({
                method: "POST",
                url: `/api/v1/admin/admin/mod`,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                },
                params
            });
            return true;
        }catch(error){
            return false;
        }
    }

    static async getLogList(limit = 10, offset = 0, sort = "id", dir= "asc"){
        try{
            if(sort == null){
                sort = "id";
            }
            limit *= 2;
            const result = await Gate({
                method: "GET",
                url: `/api/v1/admin/admin/logs?limit=${limit}&offset=${offset}&sort=${sort}&dir=${dir}`,
                headers: {
                    "Content-Type": "application/json",
                }
            });
            return result.data.result;
        }catch(error){
            return [];
        }
    }
    /* 관리자 */

    /* 회원관리 */
    static async getUserList(limit = 50, offset = 0, sort = "id", dir = "asc"){
        try{
            if(sort == null || sort == ""){
                sort = "id";
            }
            limit *= 2;
            const result = await Gate({
                method: "GET",
                url: `/api/v1/admin/user/list?limit=${limit}&offset=${offset}&sort=${sort}&dir=${dir}`,
                headers: {
                    "Content-Type": "application/json",
                }
            });
            return result.data.result;
        }catch(error){
            return [];
        }
    }

    static async getUserQuestion(limit = 50, offset = 0, sort = "id", dir = "asc", id: number){
        try{
            const result = await Gate({
                method: "GET",
                url: `/api/v1/admin/user/questions?limit=${limit}&offset=${offset}&user_id=${id}&no_answer=${0}&sort=${sort}&dir=${dir}`,
                headers: {
                    "Content-Type": "application/json",
                }
            });
            return result.data.result;
        }catch(error){
            return [];
        }
    }
    /* 회원관리 */

    /* 커뮤니티 */
    static async getNoticeList(limit = 50, offset = 0){
        try{
            const result = await Gate({
                method: "GET",
                url: `/api/v1/admin/support/notices?limit=${limit}&offset=${offset}&no_answer=0`,
                headers: {
                    "Content-Type": "application/json",
                }
            });
            return result.data.result.notices;
        }catch(error){
            return [];
        }
    }

    static async getQuestionList(limit = 50, offset = 0){
        try{
            const result = await Gate({
                method: "GET",
                url: `/api/v1/admin/support/questions?limit=${limit}&offset=${offset}&no_answer=0`,
                headers: {
                    "Content-Type": "application/json",
                }
            });
            return result.data.result.questions;
        }catch(error){
            return [];
        }
    }

    static async addNotice(title: string, content: string){
        const params = new URLSearchParams();
        params.append('title', title);
        params.append('content', content);
        const type = 0;
        params.append('img_link', "https://img.animalplanet.co.kr/news/2020/02/19/700/1365a2q9p47avck7n98j.jpg");
        params.append('type', type.toString());
        params.append('start_at', "2020-10-29T07:55:28.000Z");
        params.append('end_at', "2020-10-29T07:55:28.000Z");
        try{
            await Gate({
                method: "POST",
                url: `/api/v1/admin/support/notice`,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                },
                params
            });
            return true;
        }catch(error){
            return false;
        }
    }

    static async deleteNotice(id: number){
        const params = new URLSearchParams();
        params.append('id', id.toString());
        try{
            await Gate({
                method: "POST",
                url: `/api/v1/admin/support/notice/del`,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                },
                params
            });
            return true;
        }catch(error){
            return false;
        }
    }

    static async modifyNotice(id: number, title: string, content: string){
        const params = new URLSearchParams();
        params.append('id', id.toString());
        params.append('title', title);
        params.append('content', content);
        const type = 0;
        params.append('img_link', "https://img.animalplanet.co.kr/news/2020/02/19/700/1365a2q9p47avck7n98j.jpg");
        params.append('type', type.toString());
        params.append('start_at', "2020-10-29T07:55:28.000Z");
        params.append('end_at', "2020-10-29T07:55:28.000Z");
        try{
            await Gate({
                method: "POST",
                url: `/api/v1/admin/support/notice/mod`,
                params,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                },
            });
            return true;
        }catch(error){
            return false;
        }
    }
    /* 커뮤니티 */
}