import gql from "graphql-tag";


const gameReportGetOptionAxios = ( order: string, limit: number, offset: number) => `
    query userReportGet {
        userReportGet ( where : { target_type : 1 }, order: "${order}", limit: ${limit}, offset: ${offset} ) {
            id
            user {
                name
            }
            game {
                title
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
export default {gameReportGetOptionAxios};