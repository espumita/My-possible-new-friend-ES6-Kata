import { expect } from 'chai';
import _ from 'lodash';


describe('Possible friend finder finds a possible friend when', () => {
    
    it('my friend only have a friend', () => {
        const me = Person('David');
        const jhon = Person("Jhon");
        const mike = Person('Mike');
        const relations = [ [ me, jhon ],
                            [ jhon, mike ]
                         ];        
        const posibleFriendFinder = PosibleFriendFinder(me, relations);

        const possibleFriend = posibleFriendFinder.find();

        expect(possibleFriend).to.be.deep.equal(mike);
    });


    it('my friends only have the same friend', () => {
        const me = Person('David');
        const jhon = Person("Jhon");
        const thomas = Person("Thomas");
        const mike = Person('Mike');
        const relations = [ [ me, jhon ],
                            [ me, thomas ],
                            [ jhon, mike ],
                            [ thomas, mike ]
                         ];        
        const posibleFriendFinder = PosibleFriendFinder(me, relations);

        const possibleFriend = posibleFriendFinder.find();

        expect(possibleFriend).to.be.deep.equal(mike);
    });

    
    it('my friends only have the same friend and they are friends', () => {
        const me = Person('David');
        const jhon = Person("Jhon");
        const thomas = Person("Thomas");
        const mike = Person('Mike');
        const relations = [ [ me, jhon ],
                            [ me, thomas ],
                            [ jhon, mike ],
                            [ thomas, mike ],
                            [ thomas, jhon ]
                         ];        
        const posibleFriendFinder = PosibleFriendFinder(me, relations);

        const possibleFriend = posibleFriendFinder.find();

        expect(possibleFriend).to.be.deep.equal(mike);
    });
});



function PosibleFriendFinder (focusPerson, relations) {
    
    function friendsList(){
        return _.filter(relations, (relation) =>  relation[0] == focusPerson || relation[1] == focusPerson)
                .map((relation) => relation[0] == focusPerson ? relation[1] : relation[0]);
    }

    function find () {
        const personfriendsList = friendsList();

        const myFriendsOthersFriendships = _.filter(relations, (relation) =>  !(relation[0] == focusPerson || relation[1] == focusPerson));

        const UnknownPeople = _.map(myFriendsOthersFriendships, (relation) => {
            return _.includes(personfriendsList, relation[0]) ? relation[1] : relation[0];
        }).filter( (person) => {
            return !_.includes(personfriendsList, person);
        });

        const myNewPossibleFriend = _.maxBy(_.uniq(UnknownPeople), (notFriend) => {
            return _.filter(UnknownPeople, (people) => people == notFriend).length;
        })

        return myNewPossibleFriend;
    }

    return {
        find
    }
}    


function Person (name) {
    

    return {
        name
    }
}

