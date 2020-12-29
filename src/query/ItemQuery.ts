import gql from "graphql-tag";

const itemGet = gql`
    query itemGet {
        itemGet {
            id
            name
            period
            used_type
            is_used
            created_at
            updated_at
            deleted_at
        }
    }
`;

const itemAdd = gql`
    mutation itemAdd($name: String, $used_type: Int, $period: Int, $is_used: Boolean) {
        itemAdd(item: {name: $name, used_type: $used_type, period : $period, is_used: $is_used}){
            id
        }
    }
`;


const itemDelete = gql`
    mutation itemDelete($id: Int!){
        itemDelete(id: $id)
    }
`;

const itemEdit = gql`
    mutation itemEdit($id: Int, $name: String, $used_type: Int, $period: Int, $is_used: Boolean) {
        itemEdit(item: {id: $id, name: $name, used_type: $used_type, period : $period, is_used: $is_used}){
            id
            name
            used_type
            period
            is_used
        }
    }
`;

export default {itemGet, itemAdd, itemDelete, itemEdit};