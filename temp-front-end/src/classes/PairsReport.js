import { sellsTogetherData } from '../connections/ReportFunctions'

/*
HOW TO CALL AND CREATE THE PAIRS REPORT
  
  const [pairsReport, setPairsReport] = useState(new PairCollection())
  useEffect(() => {
    async function generatePairs() {
        let report = new PairCollection()
        await report.sellsTogether(startTime, endTime)
        setPairsReport(report)
    }
    generatePairs();
  }, []);

THE DATES MUST BE FORMATTED LIKE WHAT IS SHOWN
report.getPairs will be an array of size 10, already sorted by rank, of pair objects
*/

/**
 * This class, Pair, holds all the information each Pair can hold
 * It also has constructor to create new Pair item and get and set functions to get the informations and modify information locally
 * 
 * @author Justin Van Nimwegen - 930005547 - Project 3
 *
 */
class Pair {
    private
        firstItemIndex = -1;
        secondItemIndex = -1;
        rank = -1;
        porportionPercent = 0.0;
    /**
     * Constructor to create a Pair Object
     * @param {Number} firstItemIndex - First item id
     * @param {Number} secondItemIndex - Second Item Id
     * @param {Number} rank - Compared to the others
     * @param {Number} porportionPercent - percantage that the second item is ordered when the first item is firstItemIndex
     * @return {Pair} a constructed local Pair
     */
    constructor(firstItemIndex, secondItemIndex, rank, porportionPercent) {
        this.firstItemIndex = firstItemIndex;
        this.secondItemIndex = secondItemIndex;
        this.rank = rank;
        this.porportionPercent = porportionPercent;
    }
    
    /**
     * Getter for firstItemIndex
     * @return {Number} firstItemIndex
     */
    get getFirstItemIndex() {
        return this.firstItemIndex
    }

    /**
     * Getter for secondItemIndex
     * @return {Number} secondItemIndex
     */
    get getSecondItemIndex() {
        return this.secondItemIndex
    }

    /**
     * Getter for rank
     * @return {Number} rank
     */
    get getRank() {
        return this.rank
    }

    /**
     * Getter for porportionPercent
     * @return {Number} porportionPercent
     */
    get getPorportionPercent() {
        return this.porportionPercent;
    }
}
/**
 * This class, PairCollection, holds all the information each PairCollection can hold
 * It also has constructor to create new PairCollectionitem and get and set functions to get the informations and modify information locally
 * 
 * @author Justin Van Nimwegen - 930005547 - Project 3
 *
 */
class PairCollection {
    private
        pairs = []

    /**
     * Constructor to create a PairCollection Object
     * @return {PairCollection} a constructed local PairCollection
     */
    constructor() {
        this.pairs = [];
    }
    
    /**
     * Getter for pairs
     * @return {Array} pairs
     */
    get getPairs() {
        return this.pairs
    }

    /**
     * Calculates and sets the pairs array
     * @param {String} startTime - Start Time
     * @param {String} endTime - End Time
     */
    async sellsTogether(startTime, endTime) {
        //Lines i think will fail: 72,75, 122, 163, 164
        let data = await sellsTogetherData(startTime, endTime);
        //console.log(data);
    
        const menuItemPairsMap = new Map(); // Map<Integer, Map<Integer, Integer>>
        const parrallelPorpotions = new Map(); // Map<Integer, Map<Integer, Double>>

        // calculacte main 2d array
        var currMeal = 0
        var menuIds = [];
        for(let i = 0; i < data.length; i ++) {
            let mealId = data[i].meal_id;
            let menuItemId = data[i].menu_item_id;
            if (currMeal == mealId) {
                menuIds.push(menuItemId);
            }else {
                if (menuIds.length > 1) {
                    for(let i = 0; i < menuIds.length; i++) { 
                        for(let j = 1; j < menuIds.length; j++) {
                            let currentIndexedMap = menuItemPairsMap.get(menuIds[0]);

                            if (currentIndexedMap == null) {
                                currentIndexedMap = new Map();
                                menuItemPairsMap.set(menuIds[0], currentIndexedMap);
                            }
                            if (currentIndexedMap.get(menuIds[j]) == null) {
                                
                                menuItemPairsMap.get(menuIds[0]).set(menuIds[j], 0); 
                            }
                            
                            currentIndexedMap.set(menuIds[j], currentIndexedMap.get(menuIds[j]) + 1); //increments the sub loop e value by 1
                            menuItemPairsMap.set(menuIds[0], currentIndexedMap); // updates the origional 2d map with the new incremented subMap 
                        }
                    }
                    let tempId = menuIds[0];
                    menuIds.shift();
                    menuIds.push(tempId);
                }
            
                //reset variables
                menuIds =[];

                //set new variables
                currMeal = mealId;
                menuIds.push(menuItemId);
            }

        }
        // process last meal
        if (menuIds.length != 1) {
            for(let i = 0; i < menuIds.length; i++) {
                for(let incrementMenuId in menuIds.slice(1, menuIds.length)) {
                    //stared line in psuedoCode:
                    var currentIndexedMap = menuItemPairsMap.get(menuIds[0]);
                    
                    if (currentIndexedMap == null) {
                        currentIndexedMap = new Map();
                        currentIndexedMap.set(incrementMenuId, 0);
                    }
                    if (currentIndexedMap.get(incrementMenuId) == null) {
                        menuItemPairsMap.get(menuIds[0]).set(incrementMenuId, 0); 
                    }

                    currentIndexedMap.set(incrementMenuId, currentIndexedMap.get(incrementMenuId) + 1); //increments the sub loop e value by 1
                    menuItemPairsMap.set(menuIds[0], currentIndexedMap); // updates the origional 2d map with the new incremented subMap 
                }
            }
            let tempId = menuIds[0];
            menuIds.shift();
            menuIds.push(tempId);
        }

        // run parallel loop
        //      - run through main 2d array, and sum for each item
        //      - add porportion value for every element in 2d array

        menuItemPairsMap.forEach (function(value, key) {
            let menuId = key;
            parrallelPorpotions.set(menuId, null)
            //let sum = sum of subMap array
            let sum = 0;  
            value.forEach (function(value2, key2){ 
                sum += value2;
            })
            
            value.forEach (function(value2, key2){
                let newMap = parrallelPorpotions.get(menuId)  //Map<Integer, Double>
                if (newMap == null) {
                    newMap = new Map();
                }

                newMap.set(key2, value2/sum);
                parrallelPorpotions.set(menuId, newMap);
            }) 

        })


        // find top 10 highest porportions
        //      - loop 10 times:
        //          - loop though 2D and find highest porportion
        //          - create and add new pair to final report and set porprtion to min
        for (let i =0; i < 10; i++) {
            //Find max porportion
            let currentMax = 0;
            let menuIdex1 = 0;
            let menuIdex2 = 0;



            parrallelPorpotions.forEach (function(value, key){
                let menuId = key;

                value.forEach (function(value2, key2){
                    let currPorportion = value2;
                    if (currPorportion > currentMax) {
                        currentMax = currPorportion;
                        menuIdex1 = menuId;
                        menuIdex2 = key2;
                    }
                })
            })

            if (parrallelPorpotions.has(menuIdex1)) {
                parrallelPorpotions.get(menuIdex1).set(menuIdex2, 0);
            }
            let newPair = new Pair(menuIdex1, menuIdex2, i + 1, (currentMax*1000)/10);
            this.pairs.push(newPair)
        }
    }
    
}

export { Pair, PairCollection } 