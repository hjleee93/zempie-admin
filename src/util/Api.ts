import Gate from "../util/Gate";

export default class Api{
    static host = "http://192.168.0.10:8299";

    /* 관리자 */
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

    static async setAdmin(id: number, name: string, password: string, level: number|null, activated: boolean|null){
        const params = new URLSearchParams();
        params.append('id', id.toString());
        params.append('name', name);
        params.append('password', password);
        if(level != null){
            params.append('level', level.toString());
        }
        if(activated != null){
            params.append('activated', activated.toString());
        }
        
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
            return [];
        }
    }
    /* 관리자 */

    /* 회원관리 */
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
    /* 커뮤니티 */
}