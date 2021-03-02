import gql from "graphql-tag";

// api 로 변경

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

export default { noticeGetById };