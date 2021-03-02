import gql from "graphql-tag";

const gameGetById =  gql`
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

const gameListGetOptionAxios = ( order: string, limit: number, offset: number) => `
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


export default {gameGetById, gameListGetOptionAxios};