import {Injectable} from 'angular2/core';

@Injectable()
export class VKService {

    login(callback) {
        VK.Auth.login(callback);
    }

    getFriends(params) {
        params.fields = 'nickname, bdate, city';
        return new Promise((resolve) => {
            VK.Api.call('friends.get', params, (data) => {
                resolve(data.response);
            });
        });
    }
}