import gql from "graphql-tag";

const gameListGet = gql`
    query gameGet {
        gameGet(where: {category: 0, userId : { not : null }}) {
            id
            title
            user{
                id
                name
            }
            version
            count_over
            count_heart
            enabled
            created_at
        }
    }
`;
const gameGetById =  gql`
    query gameGet($id: Int) {
        gameGet(where: {category: 0, userId : { not : null }, id: $id}) {
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

const gameMoveOfficial = gql`
    mutation gameEdit($id: Int) {
        gameEdit(game: {id: $id, category: 1, userId : { not : null }}){
            id
        }
    }
`;

export default {gameListGet, gameGetById, gameListGetOptionAxios, gameDelete, gameHide, gameShow, gameMoveOfficial};