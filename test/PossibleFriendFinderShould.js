import { expect } from 'chai';
import _ from 'lodash';

import  { PossibleFriendFinder }  from '../src/PossibleFriendFinder.js';
import { Person } from '../src/Person';

describe('Possible friend finder finds a possible friend when', () => {
    
    it('my friend only have a friend', () => {
        const me = Person('David');
        const jhon = Person("Jhon");
        const mike = Person('Mike');
        const relations = [ [ me, jhon ],
                            [ jhon, mike ]
                         ];        
        const posibleFriendFinder = PossibleFriendFinder(me, relations);

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
        const posibleFriendFinder = PossibleFriendFinder(me, relations);

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
        const posibleFriendFinder = PossibleFriendFinder(me, relations);

        const possibleFriend = posibleFriendFinder.find();

        expect(possibleFriend).to.be.deep.equal(mike);
    });

});
