// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Post, PostEditor, User, Profile, Comment, Avatar } = initSchema(schema);

export {
  Post,
  PostEditor,
  User,
  Profile,
  Comment,
  Avatar
};