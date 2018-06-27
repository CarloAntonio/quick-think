
import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://boba-shop-games.firebaseio.com/'
});

export const updateObjectInArray = (array, action, updatedProperties) => {
    return array.map( (item, index) => {
        if(index !== action.index) {
            // This isn't the item we care about - keep it as-is
            return item;
        }
        // Otherwise, this is the one we want - return an updated value
        return {
            ...item,
            ...updatedProperties
        };    
    });
}

export const addOneToObjectInArray = (array, action) => {
    return array.map( (item, index) => {
        if(index !== action.turn) {
            // This isn't the item we care about - keep it as-is
            return item;
        }
        // Otherwise, this is the one we want - return an updated value
        return {
            ...item,
            score: item.score + 1
        };    
    });
}

export const resetWithSameNames = (array, action, oldNames) => {
    return array.map( (item, index) => {
        return {
            name: oldNames[index],
            score: 0,
        };    
    });
}

export const shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}
