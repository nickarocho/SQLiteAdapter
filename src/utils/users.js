import {User} from '../models';
import {DataStore} from 'aws-amplify';

export const allUsers = DataStore.query(User);

export const dummyUsers = [
  {
    id: '1',
    username: 'joeshmoe',
    profileID: 'a6cea45e-24c8-41d7-8e5c-d9821a444648',
    profile: 'PROFILE',
    posts: [],
  },
  {
    id: '2',
    username: 'janeshmoe',
    profileID: '58e8afe4-2533-4c11-a657-cd4b9fd0c879',
    profile: 'PROFILE',
    posts: [
      {body: 'post 1', id: '0dd10599-5039-4f7e-8bd8-92373b8aba9c'},
      {body: 'post 2', id: '7cfa1f9e-b911-49a6-871e-cf34c2822d08'},
      {body: 'post 3', id: 'a799f365-d021-4b3e-9749-38ef4972977e'},
      {body: 'post 4', id: '8eb9bb18-845a-43b7-ae6b-dfc45cd8c534'},
      {body: 'post 5', id: 'f20955e1-8e34-4718-a2b7-7482fe7b744c'},
    ],
  },
  {
    id: '3',
    username: 'nicaroch',
    profileID: 'b285345e-3514-4ea8-aba9-69ad71a3d33e',
    profile: 'PROFILE',
    posts: [
      {body: 'post 1', id: 'e95de4a6-47a7-469c-8724-a9f904bf8741'},
      {body: 'post 2', id: '8f7b868f-6458-4e44-a366-51f9439a8a9e'},
    ],
  },
  {
    id: '4',
    username: 'ivaartem',
    profileID: '45a28c1a-4b09-4dd3-ab7a-5a0f1b519899',
    profile: 'PROFILE',
    posts: [
      {body: 'post 1', id: 'bacd9cca-ae8a-4962-a9a9-f6b8a6826a59'},
      {body: 'post 2', id: '651a5e93-5109-45f9-b2b3-d95b97546b97'},
      {body: 'post 2', id: 'd8aab36d-c0b8-46af-952a-53a59a841625'},
    ],
  },
  {
    id: '5',
    username: 'manuelig',
    profileID: 'a0d0d48e-e9a6-45ec-bb96-fab28b38c13d',
    profile: 'PROFILE',
    posts: [{body: 'post 1', id: '13938032-fadc-4d25-b771-bfb5892c02b5'}],
  },
];
