import { expect } from 'chai';
import _ from 'lodash';


describe('Possible friend finder', () => {
    
    it('finds a possible friend when my friends only have a friend', () => {
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
});



function PosibleFriendFinder (focusPerson, relations) {
    
    function find () {
        const myRelationsWithMyFriends = _.filter(relations, (relation) =>  relation[0] == focusPerson || relation[1] == focusPerson);
        const myFriendsList = _.map(myRelationsWithMyFriends, (relation) => {
            return relation[0] == focusPerson ? relation[1] : relation[0]; 
        });

        const myFriendsOthersRelations = _.filter(relations, (relation) =>  !(relation[0] == focusPerson || relation[1] == focusPerson));

        const myNotFriendNameList = _.map(myFriendsOthersRelations, (relation) => {
            return _.includes(myFriendsList, relation[0]) ? relation[1] : relation[0]
        });

        const myNewPossibleFriend = _.maxBy(_.uniq(myNotFriendNameList), (notFriend) => {
            const ocurrences = _.filter(myNotFriendNameList, (notFrind2) => notFrind2 == notFriend).length;
            console.log(ocurrences);
            return ocurrences;
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

