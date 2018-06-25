
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
