/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost($owner: String) {
    onCreatePost(owner: $owner) {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($owner: String) {
    onUpdatePost(owner: $owner) {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($owner: String) {
    onDeletePost(owner: $owner) {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment($owner: String) {
    onCreateComment(owner: $owner) {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment($owner: String) {
    onUpdateComment(owner: $owner) {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment($owner: String) {
    onDeleteComment(owner: $owner) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($owner: String) {
    onCreateUser(owner: $owner) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($owner: String) {
    onUpdateUser(owner: $owner) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($owner: String) {
    onDeleteUser(owner: $owner) {
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
export const onCreateProfile = /* GraphQL */ `
  subscription OnCreateProfile($username: String) {
    onCreateProfile(username: $username) {
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
export const onUpdateProfile = /* GraphQL */ `
  subscription OnUpdateProfile($username: String) {
    onUpdateProfile(username: $username) {
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
export const onDeleteProfile = /* GraphQL */ `
  subscription OnDeleteProfile($username: String) {
    onDeleteProfile(username: $username) {
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
export const onCreatePostEditor = /* GraphQL */ `
  subscription OnCreatePostEditor($owner: String) {
    onCreatePostEditor(owner: $owner) {
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
export const onUpdatePostEditor = /* GraphQL */ `
  subscription OnUpdatePostEditor($owner: String) {
    onUpdatePostEditor(owner: $owner) {
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
export const onDeletePostEditor = /* GraphQL */ `
  subscription OnDeletePostEditor($owner: String) {
    onDeletePostEditor(owner: $owner) {
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
