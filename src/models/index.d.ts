import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class Avatar {
  readonly url?: string;
  readonly label?: string;
  constructor(init: ModelInit<Avatar>);
}

type PostMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PostEditorMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ProfileMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CommentMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Post {
  readonly id: string;
  readonly title: string;
  readonly views?: number;
  readonly metadata?: string;
  readonly draft?: boolean;
  readonly rating?: number;
  readonly editors?: (PostEditor | null)[];
  readonly comments?: (Comment | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Post, PostMetaData>);
  static copyOf(source: Post, mutator: (draft: MutableModel<Post, PostMetaData>) => MutableModel<Post, PostMetaData> | void): Post;
}

export declare class PostEditor {
  readonly id: string;
  readonly post: Post;
  readonly editor: User;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<PostEditor, PostEditorMetaData>);
  static copyOf(source: PostEditor, mutator: (draft: MutableModel<PostEditor, PostEditorMetaData>) => MutableModel<PostEditor, PostEditorMetaData> | void): PostEditor;
}

export declare class User {
  readonly id: string;
  readonly username: string;
  readonly profileID: string;
  readonly profile?: Profile;
  readonly posts?: (PostEditor | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class Profile {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly avatar?: Avatar;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Profile, ProfileMetaData>);
  static copyOf(source: Profile, mutator: (draft: MutableModel<Profile, ProfileMetaData>) => MutableModel<Profile, ProfileMetaData> | void): Profile;
}

export declare class Comment {
  readonly id: string;
  readonly post?: Post;
  readonly content: string;
  readonly owner?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Comment, CommentMetaData>);
  static copyOf(source: Comment, mutator: (draft: MutableModel<Comment, CommentMetaData>) => MutableModel<Comment, CommentMetaData> | void): Comment;
}