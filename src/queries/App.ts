import { gql } from "urql";

export const APP_FRAGMENT = gql`
  fragment App on App {
    id
    name
    status
    store_url
    platform
    bundle_id
    adam_id
    register_at
    disable_at
    icon
    channels {
      ...Channel
    }
  }
`;
