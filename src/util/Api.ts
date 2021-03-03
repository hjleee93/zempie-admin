import Gate from "@/util/Gate";
import { Notify } from "quasar";

export default class Api{
    static async request( method : string, url : string, data : any ): Promise<any> {
        try {
            // @ts-ignore
            const result = await Gate({
                method : method,
                url,
                data
            }  );
            return {
                data : result.data,
                isError : false,
                error : null,
            };
        }
        catch (error) {
            return {
                data : null,
                isError : true,
                error : error && error.response && error.response.data || {
                    error : error.message || error,
                }
            };
        }
    }

    /* 관리자 */
    static async addAdmin(account: string, password: string, name: string, level: number){
        const result = await this.request( 'POST', '/admin/admin/add', { name, password, level, account } );
        if( result.isError ) {
            Notify.create({
                type: "negative",
                message: `관리자 생성 도중 문제가 발생하였습니다.`,
                position: "top",
            });
        } else {
            Notify.create({
                type: "positive",
                message: `관리자 생성에 성공하였습니다.`,
                position: "top",
            });
        }
        return !result.isError;
    }

    static async setAdminLevel(id: number, level: number){
        const result = await this.request( 'POST', '/admin/admin/mod', { id, level, sub_level : level } );
        if( result.isError ) {
            Notify.create({
                type: "negative",
                message: "변경하는 도중에 문제가 발생하였습니다.",
                position: "top",
            });
        } else {
            Notify.create({
                type: "positive",
                message: "변경에 성공했습니다.",
                position: "top",
            });
        }
        return !result.isError;
    }

    static async setAdmin(id: number, name: string, password: string){
        const result = await this.request( 'POST', '/admin/admin/mod', { id, name, password } );
        if( result.isError ){
            Notify.create({
                type: "negative",
                message: "변경하는 도중에 문제가 발생하였습니다.",
                position: "top",
            });
        } else {
            Notify.create({
                type: "positive",
                message: "변경에 성공하였습니다.",
                position: "top",
            });
        }
        return !result.isError;
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
                url: `/admin/user/list?limit=${limit}&offset=${offset}&sort=${sort}&dir=${dir}`,
                headers: {
                    "Content-Type": "application/json",
                }
            });
            return result.data.result;
        }catch(error){
        }
    }
    /* 회원관리 */

    /* 고객센터 */

    static async addNotice(title: string, content: string, category: number){
        const result = await this.request( 'POST', '/admin/support/notice', {
            title,
            content,
            category,
            img_link : '',
            start_at : '2021-02-03T02:10:16.000Z',
            end_at : '2021-02-03T02:10:16.000Z',
        } );
        if( result.isError ) {
            Notify.create({
                type: "negative",
                message: "공지사항을 작성하는 도중에 문제가 발생하였습니다.",
                position: "top",
            });
        } else {
            Notify.create({
                type: "positive",
                message: "공지사항이 성공적으로 작성되었습니다.",
                position: "top",
            });
        }
        return !result.isError;
    }

    static async deleteNotice(id: number){
        const result = await this.request( 'POST', '/admin/support/notice/del', { id } );
        if( result.isError ) {
            Notify.create({
                type: "negative",
                message: "공지사항을 삭제하는 도중에 문제가 발생하였습니다.",
                position: "top",
            });
        }else {
            Notify.create({
                type: "positive",
                message: "공지사항이 성공적으로 삭제되었습니다.",
                position: "top",
            });
        }
        return !result.isError;
    }

    static async modifyNotice(id: number, title: string, content: string, category: number){
        const result = await this.request( 'POST', '/admin/support/notice/mod', { id, title, content, category } );
        if( result.isError ) {
            Notify.create({
                type: "negative",
                message: "공지사항을 수정하는 도중에 문제가 발생하였습니다.",
                position: "top",
            });
        } else {
            Notify.create({
                type: "positive",
                message: "공지사항이 성공적으로 수정되었습니다.",
                position: "top",
            });
        }
        return !result.isError;
    }

    static async getInquiryItem(id: number){
        const params = new URLSearchParams();
        params.append("id", id.toString());
        try{
            const result = await Gate({
                method: "GET",
                url: `/admin/support/inquiry?${params.toString()}`,
                headers: {
                    "Content-Type": "application/json",
                }
            });
            return result.data.result;
        }catch(error){
        }
    }

    static async responseInquiry(id: number, response: string){
        const result = await this.request( 'POST', '/admin/support/response', { id, response } );
        if( result.isError ) {
            Notify.create({
                type: "negative",
                message: "답변을 작성하는 도중 오류가 발생하였습니다.",
                position: "top",
            });
        } else {
            Notify.create({
                type: "positive",
                message: "성공적으로 답변이 작성되었습니다.",
                position: "top",
            });
        }
        return !result.isError;
    }
    /* 고객센터 */


    /* 게임 심사 */
    static async getProjectItem(index: number){
        const params = new URLSearchParams();
        params.append("version_id", index.toString());
        try{
            const result = await Gate({
                method: "GET",
                url: `/admin/studio/version?${params.toString()}`,
                headers: {
                    "Content-Type": "application/json",
                }
            });
            return result.data.result;
        }catch(error){
        }
    }

    static async JudgeProject(state: string, id: number, reason: string, user_id : number){
        const data : any = {
            state,
            id,
        }
        if(state === "fail"){
            data.reason = reason;
            data.user_id = user_id;
        }
        const result = await this.request( 'POST', '/admin/studio/version', data );
        if( result.isError ) {
            Notify.create({
                type: "positive",
                message: "심사하는 도중 문제가 발생하였습니다.",
                position: "top",
            });
        } else {
            Notify.create({
                type: "positive",
                message: "성공적으로 심사가 적용되었습니다.",
                position: "top",
            });
        }
        return !result.isError;
    }

    /* 게임 심사 */


    /* 비속어 */
    static async addBadWord( word : string ) {
        const result = await this.request( 'POST', '/admin/filter/bad-word/c', { word } );
        if( result.isError ) {
            Notify.create({
                type: "negative",
                message: "비속어를 추가하는 도중에 문제가 발생하였습니다.",
                position: "top",
            });
        } else {
            Notify.create({
                type: "positive",
                message: "비속어가 성공적으로 추가되었습니다.",
                position: "top",
            });
        }
        return !result.isError;
    }

    static async deleteBadWord( id : number ) {
        const result = await this.request( 'POST', "/admin/filter/bad-word/d", { id } );
        return !result.isError;
    }

    static async updateBadWord( id : number, activated : boolean ) {
        const result = await this.request( 'POST', '/admin/filter/bad-word/u', { id, activated } );
        if( result.isError ) {
            Notify.create({
                type: "negative",
                message: "비속어를 수정하는 도중에 문제가 발생하였습니다.",
                position: "top",
            });
        }
        return !result.isError;
    }
    /* 비속어 */

    /* 금지어 */
    static async addForbiddenWord( word : string ) {
        const result = await this.request( 'POST', "/admin/filter/forbidden-word/c", { word } );
        if( result.isError ) {
            Notify.create({
                type: "negative",
                message: "금지어를 추가하는 도중에 문제가 발생하였습니다.",
                position: "top",
            });
        }
        return !result.isError;
    }

    static async deleteForbiddenWord( id : number ) {
        const result = await this.request( 'POST', "/admin/filter/forbidden-word/d", { id } );
        return !result.isError;
    }

    static async updateForbiddenWord( id : number, activated : boolean ) {
        const result = await this.request( 'POST', '/admin/filter/forbidden-word/u', { id, activated } );
        if( result.isError ) {
            Notify.create({
                type: "negative",
                message: "금지어를 수정하는 도중에 문제가 발생하였습니다.",
                position: "top",
            });
        }
        return !result.isError;
    }
    /* 금지어 */


    /* 유저 제재 */

    static async punishUser( user_id : number, category : string, reason : string, date : number ) {
        const result = await this.request( 'POST', '/admin/punish/user', { user_id, category, reason, date } );
        if( result.isError ) {
            Notify.create({
                type: "negative",
                message: "제재하는 도중에 문제가 발생하였습니다.",
                position: "top",
            });
        }
        return !result.isError;
    }

    static async releasePunishUser( id : number ) {
        const result = await this.request( 'POST', "/admin/punish/user/release", { id } );
        if( result.isError ) {
            Notify.create({
                type: "negative",
                message: "제재를 취소하는 도중에 문제가 발생하였습니다.",
                position: "top",
            });
        }
        return !result.isError;
    }
    /* 유저 제재 */



    /* 게임 제재 */
    static async punishGame( game_id : number, permanent : boolean, title : string, content : string, project_version_id : number = 0 ) {
        const result = await this.request( 'POST', '/admin/punish/game', { game_id, permanent, title, content, project_version_id } );
        if( result.isError ) {
            Notify.create({
                type: "negative",
                message: "제재하는 도중에 문제가 발생하였습니다.",
                position: "top",
            });
        } else {
            Notify.create({
                type: "positive",
                message: "성공적으로 제재되었습니다.",
                position: "top",
            });
        }
        return !result.isError;
    }

    static async releasePunishGame( id : number, project : boolean ) {
        let data : any;
        if( project ) {
            data = {
                project_id : id
            };
        } else {
            data = {
                project_version_id : id
            };
        }
        const result = await this.request( 'POST', '/admin/punish/game/release', data );
        if( result.isError ) {
            Notify.create({
                type: "negative",
                message: "제재를 취소하는 도중에 문제가 발생하였습니다.",
                position: "top",
            });
        } else {
            Notify.create({
                type: "positive",

                message: "성공적으로 제재가 취소되었습니다.",
                position: "top",
            });
        }
        return !result.isError;
    }
    /* 게임 제재 */




    /* 게임 관리 */
    static async updateCategoryGame(
        game_id : number,
        category : number,
    ) {
        const data = {
            game_id,
            official : (category == 1).toString(),
            category : category.toString(),
        };
        const result = await this.request( 'POST', "/admin/game/u", data );
        if( result.isError ) {
            Notify.create({
                type: "negative",
                message: '게임을 수정하는 도중에 문제가 발생하였습니다.',
                position: "top",
            });
        }
        return !result.isError;
    }

    static async updateActivatedGame(
        game_id : number,
        activated : boolean
    ) {
        const data = {
            game_id,
            enabled : activated.toString(),
            activated : activated.toString()
        };
        const result = await this.request( 'POST', "/admin/game/u", data );
        if( result.isError ) {
            Notify.create({
                type: "negative",
                message: '게임을 수정하는 도중에 문제가 발생하였습니다.',
                position: "top",
            });
        }
        return !result.isError;
    }


    static async addAffiliateGame(
        pathname : string,
        title : string,
        description : string,
        hashtags : string,
        url_game : string,
        url_thumb : string,
        url_thumb_webp : string,
        url_thumb_gif : string
    ) {
        const data = {
            pathname, title, description, hashtags, url_game, url_thumb, url_thumb_gif, url_thumb_webp
        }
        const result = await this.request( 'POST', '/admin/game/c/p', data );
        if( result.isError ) {
            Notify.create({
                type: "negative",
                message: "제휴게임을 생성하는 도중에 문제가 발생하였습니다.",
                position: "top",
            });
        } else {

            Notify.create({
                type: "positive",
                message: "성공적으로 제휴 게임이 추가되었습니다.",
                position: "top",
            });
        }
        return !result.isError;
    }

    static async updateAffiliateGame(
        game_id : number,
        pathname : string,
        title : string,
        description : string,
        hashtags : string,
        url_game : string,
        url_thumb : string,
        url_thumb_webp : string,
        url_thumb_gif : string
    ) {
        const data = {
            game_id,
            pathname,
            title,
            description,
            hashtags,
            url_game,
            url_thumb,
            url_thumb_webp : url_thumb_webp || '',
            url_thumb_gif : url_thumb_gif || '',
        };
        const result = await this.request( 'POST', '/admin/game/u/p', data );
        if( result.isError ) {
            Notify.create({
                type: "negative",
                message: '제휴게임을 수정하는 도중에 문제가 발생하였습니다.',
                position: "top",
            });
        } else {

            Notify.create({
                type: "positive",
                message: "성공적으로 제휴 게임이 수정되었습니다.",
                position: "top",
            });
        }
        return !result.isError;
    }

    static async deleteAffiliateGame( game_id : number ) {
        const result = await this.request( 'POST', '/admin/game/d/p', { game_id } );
        if( result.isError ) {
            Notify.create({
                type: "negative",
                message: '제휴게임을 삭제하는 도중에 문제가 발생하였습니다.',
                position: "top",
            });
        } else {
            Notify.create({
                type: "positive",
                message: "성공적으로 삭제되었습니다.",
                position: "top"
            })
        }
        return !result.isError;
    }
    /* 게임 관리 */

    /* 설문조사 관리 */

    static async addSurvey( form_id : string, form_url : string, start_at : number, end_at : number ) {
        const result = await this.request( 'POST', "/admin/studio/survey/c", { form_id, form_url, start_at, end_at } );
        if( result.isError ) {
            Notify.create({
                type: "negative",
                message: '설문조사를 추가하는 도중에 문제가 발생하였습니다.',
                position: "top",
            });
        } else {
            Notify.create({
                type: "positive",
                message: "성공적으로 설문조사가 추가되었습니다.",
                position: "top",
            });
        }
        return !result.isError;
    }

    static async deleteSurvey( id : number ) {
        const result = await this.request( 'POST', '/admin/studio/survey/d', { id } );
        if( result.isError ) {
            Notify.create({
                type: "negative",
                message: '설문조사를 삭제하는 도중에 문제가 발생하였습니다.',
                position: "top",
            });
        } else {
            Notify.create({
                type: "positive",
                message: "성공적으로 설문조사가 삭제되었습니다.",
                position: "top",
            });
        }
        return !result.isError;
    }

    static async updateSurveyActivated( id : number, activated : boolean ) {
        const result = await this.request('POST', "/admin/studio/survey/u", {id, activated : activated.toString()});
        if (result.isError) {
            Notify.create({
                type: "negative",
                message: '설문조사를 수정하는 도중에 문제가 발생하였습니다.',
                position: "top",
            });
        }
        return !result.isError;
    }

    /* 설문조사 관리 */

    
    static loading(){
        Notify.create({
            type: "negative",
            message: '서버 응답 대기중.',
            position: "top",
        });
    }

    static async getList( link : string, param : string ){
        try{
            const result = await Gate({
                method: "GET",
                url: `/admin/${link}?${param}`,
                headers: {
                    "Content-Type": "application/json",
                }
            });
            return result.data.result;
        }catch(error){
            return [];
        }
    }
}