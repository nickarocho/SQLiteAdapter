describe('SQLiteAdapter', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  // UTILITY FNS

  function generateUniqueUser(length = 6) {
    const alphabetArray = 'abcdefghijklmnopqrstuvwxyz'.split('');
    let [firstName, lastName] = ['', ''];
    for (let i = 0; i < length; i++) {
      let randomLetter =
        alphabetArray[Math.floor(Math.random() * alphabetArray.length)];
      firstName += randomLetter;
    }
    lastName = firstName.split('').reverse().join('');
    // appending Date.now() to ensure uniqueness
    // will return something like ['txkwegby', 'ybgewkxt', 'txkwegby1619554506763']
    return [firstName, lastName, firstName + Date.now()];
  }

  async function signIn() {
    // TODO: check if already signed in for subsequent tests
    try {
      await element(by.label('Log In')).tap();
      await element(by.id('aws-amplify__auth--username-input')).typeText(
        'joeshmoe',
      );
      await element(by.id('aws-amplify__auth--password-input')).typeText(
        'password',
      );
      await element(by.id('aws-amplify__auth--sign-in-button')).tap();
      await waitFor(
        element(by.id('aws-amplify__auth--greeting-signed-in-text')),
      )
        .toHaveText('Hello joeshmoe')
        .withTimeout(60000);
    } catch (err) {
      console.error('signIn error: ', err);
    }
  }

  async function dismissNotification() {
    try {
      await element(by.id('btn-notification-close')).tap();
      await waitFor(element(by.id('notification-container'))).toHaveText('');
    } catch (err) {
      console.error(err);
    }
  }

  // CREATE

  async function createNewUser() {
    const [firstName, lastName, username] = generateUniqueUser();
    try {
      await element(by.label('Users')).tap();
      await element(by.id('btn-navigate-new-user')).tap();
      await element(by.id('new-user-username-input')).typeText(username);
      await element(by.id('new-user-first-name-input')).typeText(firstName);
      await element(by.id('new-user-last-name-input')).typeText(lastName);
      await element(by.id('new-user-avatar-url-input')).typeText(
        `/${firstName}.jpg`,
      );
      await element(by.id('new-user-avatar-label-input')).typeText(
        `${firstName} avatar`,
      );
      await element(by.id('btn-create-user')).tap();
    } catch (err) {
      console.error('createNewUser error: ', err);
    }
  }

  async function createNewPost(title = 'New default post') {
    try {
      await element(by.label('Posts')).tap();
      await element(by.id('btn-navigate-new-post')).tap();
      await element(by.id('new-post-title-input')).typeText(title);
      await element(by.id('new-post-views-input')).typeText('123');
      await element(by.id('new-post-draft-toggle')).tap();
      await element(by.id('new-post-rating-input')).tap();
      await element(by.id('new-post-rating-input')).typeText('123');
      await element(by.id('new-post-body')).tap();
      // TODO: check to make sure there are users first
      await element(by.id('new-post-editors-checkbox-0')).tap();
      await element(by.id('btn-create-post')).tap();
    } catch (err) {
      console.error('createNewPost error: ', err);
    }
  }

  async function commentOnPost(
    postIndex = 0,
    commentBody = 'new default comment',
  ) {
    try {
      await element(by.label('Posts')).tap();
      await element(by.id(`btn-view-post-${postIndex}`)).tap();
      await element(by.id('add-comment-input')).typeText(commentBody);
      await element(by.id('icon-submit-comment')).tap();
    } catch (err) {
      console.error(err);
    }
  }

  // UPDATE

  async function editPost(postIndex = 0, field, value) {
    try {
      await element(by.label('Posts')).tap();
      await element(by.id(`btn-view-post-${postIndex}`)).tap();
      await element(by.id('switch-toggle-edit-post')).tap();
      await element(by.id(`edit-post-${field}`)).typeText(value);
      await element(by.id('switch-toggle-edit-post')).tap();
      await element(by.text('Save')).tap();
    } catch (err) {
      console.error(err);
    }
  }

  async function editUserProfile(userIndex = 0, field, value) {
    try {
      await element(by.label('Users')).tap();
      await element(by.id(`btn-view-user-${userIndex}`)).tap();
      await element(by.id('switch-toggle-edit-user-profile')).tap();
      await element(by.id(`edit-profile-${field}`)).replaceText(value);
      await element(by.id('switch-toggle-edit-user-profile')).tap();
      await element(by.text('Save')).tap();
    } catch (err) {
      console.error(err);
    }
  }

  async function editComment(postIndex = 0, commentIndex = 0, value) {
    try {
      await element(by.label('Posts')).tap();
      await element(by.id(`btn-view-post-${postIndex}`)).tap();
      await element(by.id('switch-toggle-edit-post')).tap();
      await element(by.id(`icon-edit-comment-${commentIndex}`)).tap();
      await element(by.id(`edit-comment-${commentIndex}`)).replaceText(value);
      await element(by.id(`icon-edit-comment-${commentIndex}`)).tap();
    } catch (err) {
      console.error(err);
    }
  }

  // DELETE

  async function deleteComment(postIndex = 0, commentIndex) {
    try {
      await element(by.label('Posts')).tap();
      await element(by.id(`btn-view-post-${postIndex}`)).tap();
      await element(by.id(`icon-delete-comment-${commentIndex}`)).tap();
    } catch (err) {
      console.error(err);
    }
  }

  async function deletePost(postIndex = 0) {
    try {
      await element(by.label('Posts')).tap();
      await element(by.id(`btn-delete-post-${postIndex}`)).tap();
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteUser(userIndex = 0) {
    try {
      await element(by.label('Users')).tap();
      await element(by.id(`btn-delete-user-${userIndex}`)).tap();
    } catch (err) {
      console.error(err);
    }
  }

  async function deletePostEditor(postEditorIndex = 0) {
    try {
      await element(by.label('Post Editors')).tap();
      await element(by.id(`btn-delete-postEditor-${postEditorIndex}`)).tap();
    } catch (err) {
      console.error(err);
    }
  }

  // TESTS

  // Unauthed:
  // TODO (after 2-5)
  // 1. Sync down data for each model (will have some pre-loaded data that does not get changed while test runs)

  // Log-in
  // 2. Create records for each model; TODO: [ensure there are no mutation errors]
  // 3. Update records for each model; TODO: [ensure no errors]
  // 4. Query records from local store; TODO: validate data; versions etc.
  // 5. Delete * parent records for logged-in user; TODO: validate cascade behavior; TODO: validate no errors

  it('CREATE: signs in and creates: 1 new user, 1 new post', async () => {
    await signIn();

    // Create a user first to be able to select a "postEditor" when making a new post
    await createNewUser();
    await waitFor(element(by.id('notification-container')))
      .toBeVisible()
      .withTimeout(2000);
    await expect(element(by.id('notification-message'))).toHaveText(
      'Successfully created new user!',
    );

    await dismissNotification();

    await createNewPost();
    await waitFor(element(by.id('notification-container')))
      .toBeVisible()
      .withTimeout(2000);
    await expect(element(by.id('notification-message'))).toHaveText(
      'Successfully created new post!',
    );
    await dismissNotification();

    await commentOnPost(0, 'Very cool!');
    await waitFor(element(by.id('notification-container')))
      .toBeVisible()
      .withTimeout(2000);
    await expect(element(by.id('notification-message'))).toHaveText(
      'Successfully created new comment!',
    );
    await dismissNotification();
  });

  it('UPDATE: edits/updates posts, user profiles, and comments', async () => {
    // TODO: fix "undefined is not an object" error (app)
    // I think it's the postEditors logic in ViewPostScreen
    // - no asssigned postEditor before toggling edit, but there IS one assigned
    await editPost(0, 'title', 'NEWLY UPDATED post');
    await waitFor(element(by.id('notification-container')))
      .toBeVisible()
      .withTimeout(2000);
    await expect(element(by.id('notification-message'))).toHaveText(
      'Successfully updated post!',
    );
    await dismissNotification();

    await editUserProfile(0, 'username', 'newEDITEDUser1234');
    await waitFor(element(by.id('notification-container')))
      .toBeVisible()
      .withTimeout(2000);
    await expect(element(by.id('notification-message'))).toHaveText(
      'Successfully updated user profile!',
    );
    await dismissNotification();

    await editComment(0, 0, 'EDITED comment');
    await waitFor(element(by.id('notification-container')))
      .toBeVisible()
      .withTimeout(2000);
    await expect(element(by.id('notification-message'))).toHaveText(
      'Successfully updated comment!',
    );
    await dismissNotification();
  });

  it('DELETE: deletes posts, users, post editors, and comments', async () => {
    await deleteComment(0, 0);
    await waitFor(element(by.id('notification-container')))
      .toBeVisible()
      .withTimeout(2000);
    await expect(element(by.id('notification-message'))).toHaveText(
      'Successfully deleted comment!',
    );
    await dismissNotification();
    await element(by.id('navigate-back-all-users')).tap();

    await deletePostEditor(0);
    await waitFor(element(by.id('notification-container')))
      .toBeVisible()
      .withTimeout(2000);
    await expect(element(by.id('notification-message'))).toHaveText(
      'Successfully deleted post editor!',
    );
    await dismissNotification();

    await deleteUser(0);
    await waitFor(element(by.id('notification-container')))
      .toBeVisible()
      .withTimeout(2000);
    await expect(element(by.id('notification-message'))).toHaveText(
      'Successfully deleted user!',
    );
    await dismissNotification();

    // TODO: fix this, detox tests break here

    await deletePost(0);
    await waitFor(element(by.id('notification-container')))
      .toBeVisible()
      .withTimeout(2000);
    await expect(element(by.id('notification-message'))).toHaveText(
      'Successfully deleted post!',
    );
    await dismissNotification();
  });
});
