import {Component, OnInit} from 'angular2/core';
import {VKService} from './service/vk.service';

@Component({
    selector: 'vk-friends-list',
    template: require('html!./views/friends-list.html'),
    providers: [VKService]
})
export class AppComponent implements OnInit {
    sortBy = {
        first_name: {
            active: true,
            asc: true,
        },
        last_name: {
            active: false,
            asc: true,
        }
    };
    activeSort:string;
    friends:Array<Object>;


    constructor(private _VKService:VKService) {
    }

    ngOnInit() {
        this.activeSort = localStorage.getItem('activeSort') || 'first_name';
        this.sortBy[this.activeSort].asc = localStorage.getItem('activeAsc') !== 'false';
        this._VKService.login((response) => this.afterLogin(response));
    }

    afterLogin(response) {
        this._VKService.getFriends({user_id: response.session.mid}).then(
                friends => this.friends = _.orderBy(friends, this.activeSort, this.sortBy[this.activeSort].asc ? 'asc' : 'desc')
        );
    }

    changeOrder(newSort) {
        if (newSort === this.activeSort) {
            this.sortBy[newSort].asc = !this.sortBy[newSort].asc;
        } else {
            this.sortBy[this.activeSort].active = false;
            this.sortBy[newSort].active = true;
            this.activeSort = newSort;
        }

        localStorage.setItem('activeSort', this.activeSort);
        localStorage.setItem('activeAsc', this.sortBy[this.activeSort].asc);
        this.friends = _.orderBy(this.friends, this.activeSort, this.sortBy[this.activeSort].asc ? 'asc' : 'desc');
    }
}