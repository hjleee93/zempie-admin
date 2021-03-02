import gql from "graphql-tag";

const badWordsListGet = gql`
    query badWordsGet {
        badWordsGet {
            id
            word
            activated
            created_at
        }
    }
`;

const badWordsListGetOption = gql`
    query badWordsGet($order: String, $limit: Int, $offset: Int) {
        badWordsGet(order: $order, limit: $limit, offset: $offset) {
            id
            word
            activated
            created_at
        }

        badWordsCount
    }
`;

const badWordsListGetOptionAxios = ( order: string, limit: number, offset: number) => `
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



const forbiddenWordsListGet = gql`
    query forbiddenWordsGet {
        forbiddenWordsGet {
            id
            word
            activated
            created_at
        }
    }
`;

const forbiddenWordsListGetOption = gql`
    query forbiddenWordsGet($order: String, $limit: Int, $offset: Int) {
        forbiddenWordsGet(order: $order, limit: $limit, offset: $offset) {
            id
            word
            activated
            created_at
        }

        forbiddenWordsCount
    }
`;

const forbiddenWordsListGetOptionAxios = ( order: string, limit: number, offset: number) => `
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



export default {
    badWordsListGet,
    badWordsListGetOption,
    badWordsListGetOptionAxios,
    forbiddenWordsListGet,
    forbiddenWordsListGetOption,
    forbiddenWordsListGetOptionAxios,
};