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



const badWordsDelete = gql`
    mutation badWordsDelete($id: Int!){
        badWordsDelete(id: $id)
    }
`;

const badWordsCreate = gql`
    mutation badWordsAdd($word: String){
        badWordsAdd(badWords: {word: $word}){
            id
        }
    }
`;

const badWordsHide = gql`
    mutation badWordsEdit($id: Int) {
        badWordsEdit(badWords: {id: $id, activated: false}){
            id
        }
    }
`;

const badWordsShow = gql`
    mutation badWordsEdit($id: Int) {
        badWordsEdit(badWords: {id: $id, activated: true}){
            id
        }
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



const forbiddenWordsDelete = gql`
    mutation forbiddenWordsDelete($id: Int!){
        forbiddenWordsDelete(id: $id)
    }
`;

const forbiddenWordsCreate = gql`
    mutation forbiddenWordsAdd($word: String){
        forbiddenWordsAdd(forbiddenWords: {word: $word}){
            id
        }
    }
`;

const forbiddenWordsHide = gql`
    mutation forbiddenWordsEdit($id: Int) {
        forbiddenWordsEdit(forbiddenWords: {id: $id, activated: false}){
            id
        }
    }
`;

const forbiddenWordsShow = gql`
    mutation forbiddenWordsEdit($id: Int) {
        forbiddenWordsEdit(forbiddenWords: {id: $id, activated: true}){
            id
        }
    }
`;


export default {badWordsListGet, badWordsListGetOption, badWordsListGetOptionAxios, badWordsDelete, badWordsCreate, badWordsHide, badWordsShow,
                forbiddenWordsListGet, forbiddenWordsListGetOption, forbiddenWordsListGetOptionAxios, forbiddenWordsDelete, forbiddenWordsCreate, forbiddenWordsHide, forbiddenWordsShow,};