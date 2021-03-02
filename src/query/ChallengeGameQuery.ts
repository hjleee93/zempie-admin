import gql from "graphql-tag";


const gameListGetOptionAxios = ( order: string, limit: number, offset: number) => `
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
const projectGet =  gql`
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


export default {gameListGetOptionAxios, projectGet};