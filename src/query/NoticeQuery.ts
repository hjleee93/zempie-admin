import gql from "graphql-tag";

const noticeGetById =  gql`
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

const noticeDelete = gql`
    mutation noticeDelete($id: Int!){
        noticeDelete(id: $id)
    }
`;

const noticeEdit = gql`
    mutation noticeEdit($id: Int, $title: String, $content: String, $category: Int) {
        noticeEdit(notice: {id: $id, title: $title, content: $content, category: $category}){
            id
            title
            content
            category
        }
    }
`;

export default { noticeGetById, noticeDelete, noticeEdit };