import { gql } from "apollo-boost";

export const ALL_CATS_QUERY = gql`
    query {
        Cat {
            id
            name
            imgUrl
            clickCount
            breed
        }
    }
`;

export const UPDATE_CAT_CLICK = gql`
    mutation UpdateCatClick($id: ID!, $clickCount: Int!) {
        UpdateCat(id: $id, clickCount: $clickCount) {
            id
            name
            breed
            imgUrl
            clickCount
        }
    }
`;

export const DELETE_CAT = gql`
    mutation DeleteCat($id: ID!) {
        DeleteCat(id: $id) {
            id
        }
    }
`;

export const MAKE_NEW_CAT = gql`
    mutation MakeNewCat($parent1ID: ID!, $parent2ID: ID!, $name: String!, $imgUrl: String!) {
        breedCats(cat1ID: $parent1ID, cat2ID: $parent2ID, newCat: { name: $name, imgUrl: $imgUrl }) {
            id
            name
            breed
            clickCount
            imgUrl
        }
    }
`;