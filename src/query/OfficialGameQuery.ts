import gql from "graphql-tag";

const gameListGet = gql`
    query gameGet {
        gameGet(where: {official: true}) {
            id
            title
            user{
                id
                name
            }
            version
            enabled
            created_at
        }
    }
`;

const gameGetById =  gql`
query gameGet($id: Int) {
    gameGet(where: {official: true, id: $id}) {
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


const gameDelete = gql`
    mutation gameDelete($id: Int!){
        gameDelete(id: $id)
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
        gameEdit(game: {id: $id, official: false}){
            id
        }
    }
`;

export default {gameListGet, gameGetById, gameDelete, gameHide, gameShow, gameMoveChallenge};