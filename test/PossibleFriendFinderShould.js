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
        const personUnknownPeople = unknownPeople();
        
        return _(_.uniq(personUnknownPeople)).maxBy( (notFriend) => notFriendOccurrences(personUnknownPeople, notFriend) );
    }


    function unknownPeople(){
        const personfriendsList = friendsList();

        return _.map(othersFriendships(), (relation) => _(personfriendsList).includes(relation[0]) ? relation[1] : relation[0])
                .filter( (person) => !_(personfriendsList).includes(person));
    }


    function friendsList(){
        return _(relations).filter( (relation) =>  relation[0] == focusPerson || relation[1] == focusPerson)
                           .map( (relation) => relation[0] == focusPerson ? relation[1] : relation[0]);
    }


    function othersFriendships () {
        return _.filter(relations, (relation) =>  !(relation[0] == focusPerson || relation[1] == focusPerson));

    }


    function notFriendOccurrences(personUnknownPeople, notFriend){
        return _.filter(personUnknownPeople, (people) => people == notFriend).length
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

