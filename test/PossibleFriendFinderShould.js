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
    
    function find () {
        const unknownPeople = allFriendsFriends();

        return _(_.uniq(unknownPeople)).maxBy( (notFriend) => notFriendOccurrences(unknownPeople, notFriend) );
    }


    function allFriendsFriends(){
        const friends = focusPersonFriends();
        const relationsWithUnknownPeople = removeRelationsBettweenFocusPersonFriends(friends, notFocusPersonRelations());

        return _.map(relationsWithUnknownPeople, (relation) => _(friends).includes(relation[0]) ? relation[1] : relation[0]);
    }

    function focusPersonFriends(){
        return _(relations).filter( (relation) =>  relation[0] == focusPerson || relation[1] == focusPerson)
                           .map( (relation) => relation[0] == focusPerson ? relation[1] : relation[0]);
    }


    function notFocusPersonRelations () {
        return _.filter(relations, (relation) =>  !(relation[0] == focusPerson || relation[1] == focusPerson));

    }


    function removeRelationsBettweenFocusPersonFriends(friends, notFocusPersonRelations){
        return _.filter(notFocusPersonRelations, (relation) => !(_(friends).includes(relation[0]) && _(friends).includes(relation[1])) );
    }


    function notFriendOccurrences(unknownPeople, notFriend){
        return _.filter(unknownPeople, (people) => people == notFriend).length
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

