/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      title
      views
      metadata
      draft
      rating
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
      comments {
        items {
          id
          postID
          content
          owner
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      editors {
        items {
          id
          postID
          editorID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        views
        metadata
        draft
        rating
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
        comments {
          nextToken
          startedAt
        }
        editors {
          nextToken
          startedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const syncPosts = /* GraphQL */ `
  query SyncPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPosts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        title
        views
        metadata
        draft
        rating
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
        comments {
          nextToken
          startedAt
        }
        editors {
          nextToken
          startedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      postID
      content
      owner
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      post {
        id
        title
        views
        metadata
        draft
        rating
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
        comments {
          nextToken
          startedAt
        }
        editors {
          nextToken
          startedAt
        }
      }
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        postID
        content
        owner
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        post {
          id
          title
          views
          metadata
          draft
          rating
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const syncComments = /* GraphQL */ `
  query SyncComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncComments(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        postID
        content
        owner
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        post {
          id
          title
          views
          metadata
          draft
          rating
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      profileID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
      profile {
        id
        firstName
        lastName
        avatar {
          url
          label
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        username
      }
      posts {
        items {
          id
          postID
          editorID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        profileID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
        profile {
          id
          firstName
          lastName
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          username
        }
        posts {
          nextToken
          startedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        username
        profileID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
        profile {
          id
          firstName
          lastName
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          username
        }
        posts {
          nextToken
          startedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const getProfile = /* GraphQL */ `
  query GetProfile($id: ID!) {
    getProfile(id: $id) {
      id
      firstName
      lastName
      avatar {
        url
        label
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      username
    }
  }
`;
export const listProfiles = /* GraphQL */ `
  query ListProfiles(
    $filter: ModelProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        lastName
        avatar {
          url
          label
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        username
      }
      nextToken
      startedAt
    }
  }
`;
export const syncProfiles = /* GraphQL */ `
  query SyncProfiles(
    $filter: ModelProfileFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncProfiles(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        firstName
        lastName
        avatar {
          url
          label
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        username
      }
      nextToken
      startedAt
    }
  }
`;
export const getPostEditor = /* GraphQL */ `
  query GetPostEditor($id: ID!) {
    getPostEditor(id: $id) {
      id
      postID
      editorID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      post {
        id
        title
        views
        metadata
        draft
        rating
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
        comments {
          nextToken
          startedAt
        }
        editors {
          nextToken
          startedAt
        }
      }
      editor {
        id
        username
        profileID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
        profile {
          id
          firstName
          lastName
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          username
        }
        posts {
          nextToken
          startedAt
        }
      }
      owner
    }
  }
`;
export const listPostEditors = /* GraphQL */ `
  query ListPostEditors(
    $filter: ModelPostEditorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostEditors(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        postID
        editorID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        post {
          id
          title
          views
          metadata
          draft
          rating
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
        editor {
          id
          username
          profileID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncPostEditors = /* GraphQL */ `
  query SyncPostEditors(
    $filter: ModelPostEditorFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPostEditors(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        postID
        editorID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        post {
          id
          title
          views
          metadata
          draft
          rating
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
        editor {
          id
          username
          profileID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
        owner
      }
      nextToken
      startedAt
    }
  }
`;
