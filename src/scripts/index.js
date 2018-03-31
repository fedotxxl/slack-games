'use strict';

if (module.hot) {
  module.hot.accept();
}

import 'babel-polyfill';
import '../styles/index.scss';
import Slack from 'slack';

const slack = new Slack({token: 'xoxp-340228263783-339076710803-338487523664-4c1f18c49a0acc182e72e058eda9dae1'});

slack.api.test({hyper:'card'}).then(console.log);

// logs {args:{hello:'world'}}
// slack.apps.permissions.info({token: 'xoxp-340228263783-339076710803-338487523664-4c1f18c49a0acc182e72e058eda9dae1'}).then(function () {
//     console.log(3);
// });

// slack.groups.archive({channel: "abc-test-group"}).then(console.log);

console.log("123");

function getTestGroup() {
    return slack.groups.list().then(function (response) {
        let group = response.groups.filter(function (group) {
            return group.name == "abc-test-group";
        })[0];

        return group;
    });
}

function getTestUser() {
    return slack.users.lookupByEmail({email: "test@mymavenrepo.com"}).then(function (response) {
        return response.user;
    });
}

function postMessageTestGroupAs(message, username) {
    getTestGroup().then(function (group) {
        slack.chat.postMessage({channel: group.id, text: message, username: username});
    });
}

function inviteTestUserToTestGroup() {
    getTestUser().then(function (user) {
        if (user) {
            getTestGroup().then(function (group) {
                if (group) {
                    slack.groups.invite({channel: group.id, user: user.id});
                }
            });
        }
    });
}

function archiveTestGroup() {
    getTestGroup().then(function (group) {
        if (group) {
            slack.groups.archive({channel: group.id});
        }
    });
}

archiveTestGroup();

// inviteTestUserToTestGroup();

//
// slack.groups.list().then(function (response) {
//     let group = response.groups.filter(function (group) {
//         return group.name == "abc-test-group";
//     })[0];
//
//
//     console.log(group);
// });
//
// slack.users.list().then(function (response) {
//     let user = response.users.filter(function () {
//         return user.mail = "test@mymavenrepo.com"
//     });
//
//     if (user) {
//         slack.groups.invite({})
//     }
// })