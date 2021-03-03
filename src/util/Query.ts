import gql from "graphql-tag";

export default class Query {
    static getAffiliateGameById = gql`
        query gameGet($id: Int) {
            gameGet(where: { category: 2 , id: $id}) {
                id
                title
                description
                pathname
                user{
                    id
                    name
                }
                version
                hashtags
                activated
                enabled
                pathname
                url_game
                url_thumb
                url_thumb_gif
                created_at
            }
        }
    `;
    static getAffiliateGameTable = ( order: string, limit: number, offset: number) => `
        query gameGet {
            gameGet(where: { category: 2 }, order: "${order}", limit: ${limit}, offset: ${offset}) {
                id
                title
                user{
                    id
                    name
                }
                version
                enabled
                url_thumb
                created_at
            }
    
            gameCount(where: { category: 2 })
        }
    `;

    static getChallengeGameById = gql`
    query projectGet($game_id: Int) {
        projectGet(where: {game_id: $game_id}) {
        id
            name
            state
            picture
            picture2
            picture_webp
            description
            hashtags
            created_at
            
            projectVersions {
                id
                version
                state
                url
                size
                reason
            }
            
            game {
                id
                category
                pathname
                count_over
                count_heart
                url_game
                enabled
                emotions {
                    e1
                    e2
                    e3
                    e4
                    e5
                }
                user{
                    id
                    name
                }
            }
        }
    }
    `;
    static getChallengeGameTable = ( order: string, limit: number, offset: number) => `
        query gameGet {
            gameGet(where: {category: 0, userId : { not : null }}, order: "${order}", limit: ${limit}, offset: ${offset}) {
                id
                title
                user{
                    id
                    name
                }
                version
                enabled
                url_thumb
                count_over
                count_heart
                created_at
            }
    
            gameCount(where: {category: 0, userId : { not : null }})
        }
    `;

    static getOfficialGameById = gql`
    query projectGet($game_id: Int) {
        projectGet(where: {game_id: $game_id}) {
            id
            name
            state
            picture
            picture2
            picture_webp
            description
            hashtags
            created_at
            
            projectVersions {
                id
                version
                state
                url
                size
                reason
            }
            
            game {
                id
                category
                pathname
                count_over
                count_heart
                url_game
                enabled
                emotions {
                    e1
                    e2
                    e3
                    e4
                    e5
                }
                user{
                    id
                    name
                }
            }
        }
    }
    `;
    static getOfficialGameTable = ( order: string, limit: number, offset: number) => `
    query gameGet {
        gameGet(where: {category: 1}, order: "${order}", limit: ${limit}, offset: ${offset}) {
            id
            title
            user{
                id
                name
            }
            version
            enabled
            url_thumb
            count_over
            count_heart
            created_at
        }

        gameCount(where: {category: 1})
    }
`;

    static getReportTable = ( order: string, limit: number, offset: number) => `
        query userReportGet {
            userReportGet ( where : { target_type : 1 }, order: "${order}", limit: ${limit}, offset: ${offset} ) {
                id
                game {
                    title
                    category
                }
                target_id
                user_id
                reason
                reason_num
                is_done
                url_img
                created_at
            }
            userReportCount(where: { target_type : 1 })
        }
    `;

    static getUsers = gql`
        query userGet {
            userGet {
                id
            }
        }
    `;
    static getUserById = gql`
    query userGet($id: Int) {
        userGet(where: {id: $id}) {
            id
            name
            channel_id
            uid
            picture
            email
            email_verified
            created_at
            is_developer
            banned
            provider
            devGames{
                id
                title
                version
                enabled
                official
            }
        }
    }
    `;

    static getInquiryByUserId = gql`
    query userInquiryGet($user_id: Int) {
        userInquiryGet(where: {user_id: $user_id}) {
            id
            user_id
            title
            category
            response
            admin_id
            created_at
    
            admin{
                name
            }
        }
    }
    `;

    static getNoticeById = gql`
    query noticeGet($id: Int) {
        noticeGet(where: {id: $id}) {
            id
            title
            content
            category
            created_at
        }
    }
    `;

    static getBadWordTable = ( order: string, limit: number, offset: number) => `
        query badWordsGet {
            badWordsGet(order: "${order}", limit: ${limit}, offset: ${offset}) {
                id
                word
                activated
                created_at
            }
    
            badWordsCount
        }
    `;
    static getForbiddenWordTable = ( order: string, limit: number, offset: number) => `
        query forbiddenWordsGet {
            forbiddenWordsGet(order: "${order}", limit: ${limit}, offset: ${offset}) {
                id
                word
                activated
                created_at
            }
    
            forbiddenWordsCount
        }
    `;

    static getFaqById = gql`
    query faqGet($id: Int) {
        faqGet(where: {id: $id}) {
            id
            q
            a
            category
            created_at
        }
    }
    `;
    static getFaqTable = (order: string, limit: number, offset: number) => `
        query faqGet {
            faqGet(order: "${order}", limit: ${limit}, offset: ${offset}) {
                id
                q
                a
                category
                created_at
            }
    
            faqCount
        }
    `;
    static addFaq = gql`
        mutation faqAdd($category: Int, $q: String, $a: String) {
            faqAdd(faq: {category: $category, q: $q, a: $a}){
                id
            }
        }
    `;
    static deleteFaq = gql`
        mutation faqDelete($id: Int!){
            faqDelete(id: $id)
        }
    `;
    static updateFaq = gql`
        mutation faqEdit($id: Int, $category: Int, $q: String, $a: String) {
            faqEdit(faq: {id: $id, category: $category, q: $q, a: $a}){
                id
                q
                a
                category
            }
        }
    `;

    static getSurveyTable = (order: string, limit: number, offset: number) => `
        query faqGet {
            surveyGet(order: "${order}", limit: ${limit}, offset: ${offset}) {
                id
                form_url
                form_id
                start_at
                end_at
                activated
            }
    
            surveyCount
        }
    `;
}

