import gql from "graphql-tag";

const faqGetById =  gql`
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

const faqGetTable = (order: string, limit: number, offset: number) => `
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

const faqAdd = gql`
    mutation faqAdd($category: Int, $q: String, $a: String) {
        faqAdd(faq: {category: $category, q: $q, a: $a}){
            id
        }
    }
`;

const faqDelete = gql`
    mutation faqDelete($id: Int!){
        faqDelete(id: $id)
    }
`;

const faqEdit = gql`
    mutation faqEdit($id: Int, $category: Int, $q: String, $a: String) {
        faqEdit(faq: {id: $id, category: $category, q: $q, a: $a}){
            id
            q
            a
            category
        }
    }
`;

export default { faqGetById, faqGetTable, faqAdd, faqDelete, faqEdit };