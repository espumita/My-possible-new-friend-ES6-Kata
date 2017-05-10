import _ from 'lodash';

function PossibleFriendFinder (focusPerson, relations) {
    
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

export { PossibleFriendFinder }
