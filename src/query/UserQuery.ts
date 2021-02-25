import gql from "graphql-tag";

const userGet = gql`
    query userGet {
        userGet {
            id
        }
    }
`;

const userGetById =  gql`
query userGet($id: Int) {
    userGet(where: {id: $id}) {
        id
        name
        channel_id
        uid
        picture
        email
        email_verified
        created_at
        is_developer
        banned
        provider
        devGames{
            id
            title
            version
            enabled
            official
        }
    }
}
`;

const userInquiryGetByUserId =  gql`
query userInquiryGet($user_id: Int) {
    userInquiryGet(where: {user_id: $user_id}) {
        id
        user_id
        title
        category
        response
        admin_id
        created_at

        admin{
            name
        }
    }
}
`;

export default {
    userGet,
    userGetById,
    userInquiryGetByUserId
};