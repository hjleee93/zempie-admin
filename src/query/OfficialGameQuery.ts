import gql from "graphql-tag";


const gameListGetOptionAxios = ( order: string, limit: number, offset: number) => `
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


const gameGetById =  gql`
query gameGet($id: Int) {
    gameGet(where: {category: 1, id: $id}) {
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
        count_over
        count_heart
        emotions {
            e1
            e2
            e3
            e4
            e5
        }
        created_at
    }
}
`;

const projectGet =  gql`
query projectGet($game_id: Int) {
    projectGet(where: {game_id: $game_id}) {
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


const gameHide = gql`
    mutation gameEdit($id: Int) {
        gameEdit(game: {id: $id, enabled: false, activated: false}){
            id
        }
    }
`;
const gameShow = gql`
    mutation gameEdit($id: Int) {
        gameEdit(game: {id: $id, enabled: true, activated: true}){
            id
        }
    }
`;

const gameMoveChallenge = gql`
    mutation gameEdit($id: Int) {
        gameEdit(game: {id: $id, category: 0}){
            id
        }
    }
`;

export default {gameListGetOptionAxios, projectGet, gameGetById, gameHide, gameShow, gameMoveChallenge};