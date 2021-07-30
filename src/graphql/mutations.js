/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
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
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
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
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
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
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
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
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
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
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createProfile = /* GraphQL */ `
  mutation CreateProfile(
    $input: CreateProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    createProfile(input: $input, condition: $condition) {
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
  }
`;
export const updateProfile = /* GraphQL */ `
  mutation UpdateProfile(
    $input: UpdateProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    updateProfile(input: $input, condition: $condition) {
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
  }
`;
export const deleteProfile = /* GraphQL */ `
  mutation DeleteProfile(
    $input: DeleteProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    deleteProfile(input: $input, condition: $condition) {
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
  }
`;
export const createPostEditor = /* GraphQL */ `
  mutation CreatePostEditor(
    $input: CreatePostEditorInput!
    $condition: ModelPostEditorConditionInput
  ) {
    createPostEditor(input: $input, condition: $condition) {
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
export const updatePostEditor = /* GraphQL */ `
  mutation UpdatePostEditor(
    $input: UpdatePostEditorInput!
    $condition: ModelPostEditorConditionInput
  ) {
    updatePostEditor(input: $input, condition: $condition) {
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
export const deletePostEditor = /* GraphQL */ `
  mutation DeletePostEditor(
    $input: DeletePostEditorInput!
    $condition: ModelPostEditorConditionInput
  ) {
    deletePostEditor(input: $input, condition: $condition) {
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
