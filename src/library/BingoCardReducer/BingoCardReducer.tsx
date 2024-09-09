import React, { Dispatch, ReactElement, createContext, useContext, useReducer, useState } from "react"
import { useLocation, useParams } from "react-router-dom";
import { DrinkRule, RandomDrinkRule } from "../CardChip/CardChipDrinkRule";

export interface BingoCardReducerProps {
    children: ReactElement;
}

export interface BingoCardState {
    name: string;
    freeSpace: boolean;
    words: string[];
    currentPositions: string[][];
    currentSelected: boolean[][];
    currentDrinkRules: DrinkRule[][];
    currentDrinkRulesRatios: Map<DrinkRule, number>;
    drinkingGame: boolean;
    size: number;
}

export interface BingoCardAction {
    type: 'updateTitle' | 'toggleFreeSpace' | 'toggleSelected' | 'generateNewCard' | 'setWords' | 'setSize' | 'toggleDrinkingGame' | 'setDrinkRulesRatios';
    payload?: any;
}

export const BingoCardContext = createContext<{state?: BingoCardState, dispatch?: Dispatch<BingoCardAction>}>({});

export function GenerateDrinkRules(size: number, drinkingGame: boolean, ratios: Map<DrinkRule, number>) {
    const tempDrinkRules: DrinkRule[][] = [];
    for (let i=0; i < size; i++) {
        for (let ii=0; ii < size; ii++) {
            if (ii === 0) {
                tempDrinkRules.push([(drinkingGame ? RandomDrinkRule(ratios) : DrinkRule.None)]);
            } else {
                tempDrinkRules[i].push(drinkingGame ? RandomDrinkRule(ratios) : DrinkRule.None);
            }
        }
    }
    return tempDrinkRules;
}

export function GenerateDrinkRulesRatios() {
    let ratioMap = new Map<DrinkRule, number>();

    ratioMap.set(DrinkRule.Buddy, 1);
    ratioMap.set(DrinkRule.Boys, 1);
    ratioMap.set(DrinkRule.Girls, 1);
    ratioMap.set(DrinkRule.Death, 1);
    ratioMap.set(DrinkRule.Chug, 1);
    ratioMap.set(DrinkRule.Drink, 3);
    ratioMap.set(DrinkRule.Drink2, 1);
    ratioMap.set(DrinkRule.Gift, 1);
    ratioMap.set(DrinkRule.WaterShot, 3);
    ratioMap.set(DrinkRule.None, 5);

    return ratioMap;
}

export function GenerateNewPositions(words: string[], size: number) {
    const tempPositions: string[][] = [];
    const selectedWords: string[] = [];
    for (let i=0; i < size; i++) {
        for (let ii=0; ii < size; ii++) { 
            let randomWord: string = '';
            let wordFound = false;
            while(!wordFound && selectedWords.length < words.length) {
                const randomTemp = words[Math.floor(Math.random() * words.length)];
                if (!selectedWords.includes(randomTemp)) {
                    selectedWords.push(randomTemp)
                    wordFound = true;
                    randomWord = randomTemp;
                }
            }
            
            if (ii === 0) {
                tempPositions.push([randomWord]);
            } else {
                tempPositions[i].push(randomWord);
            }
        }
    }
    return tempPositions;
}

export function GenerateSelected(size: number, freeSpace: boolean) {
    const tempSelected: boolean[][] = [];
    for (let i=0; i < size; i++) {
        for (let ii=0; ii < size; ii++) { 
            if (ii === 0) {
                tempSelected.push([false]);
            } else if (freeSpace && Math.floor(size / 2) === i && Math.floor(size / 2) === ii) {
                tempSelected[i].push(true)
            } else {
                tempSelected[i].push(false);
            }
        }}
        return tempSelected;
}

function bingoCardReducer(state: BingoCardState, action: BingoCardAction) {
    switch(action.type) {
        case 'updateTitle':
            return {
                ...state,
                name: action.payload
            };
        case 'toggleFreeSpace':
            return {
                ...state,
                freeSpace: !state.freeSpace
            };
        case 'toggleSelected':
            return {
                ...state,
                currentSelected: action.payload
            }
        case 'generateNewCard':
            return {
                ...state,
                currentPositions: GenerateNewPositions(state.words, state.size),
                currentSelected: GenerateSelected(state.size, state.freeSpace),
                currentDrinkRules: GenerateDrinkRules(state.size, state.drinkingGame, state.currentDrinkRulesRatios),
            }
        case 'setWords':
            return {
                ...state,
                words: action.payload,
            }
        case 'setSize':
            return {
                ...state,
                size: action.payload
            }
        case 'toggleDrinkingGame':
            return {
                ...state,
                drinkingGame: !state.drinkingGame
            }
        case 'setDrinkRulesRatios':
            return {
                ...state,
                currentDrinkRulesRatios: action.payload
            }
    }

    return state;
}

function BingoCardReducer(props: BingoCardReducerProps) {

    let tempState = {
        name: 'New Bingo Card',
        freeSpace: true,
        words: [],
        currentPositions: GenerateNewPositions([], 5),
        currentSelected: GenerateSelected(5, true),
        currentDrinkRules: GenerateDrinkRules(5, false, GenerateDrinkRulesRatios()),
        currentDrinkRulesRatios: GenerateDrinkRulesRatios(),
        drinkingGame: false,
        size: 5
}
    const location = window.location.href
    if (location.includes('?')) {
        const encoded = location.replace(/.*[?]/g, '').replace('board=', '');
        if (encoded && encoded.length > 0) {
            const decoded = JSON.parse(atob(encoded));
            tempState = decoded;
        }
    }
   
    const [state, dispatch] = useReducer(
        bingoCardReducer,
        tempState
    )

    return (<BingoCardContext.Provider value={{state: state, dispatch: dispatch}}>{props.children}</BingoCardContext.Provider>)
}

export default BingoCardReducer;