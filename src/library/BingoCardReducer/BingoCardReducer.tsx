import React, { Dispatch, ReactElement, createContext, useContext, useReducer, useState } from "react"
import { useLocation, useParams } from "react-router-dom";

export interface BingoCardReducerProps {
    children: ReactElement;
}

export interface BingoCardState {
    name: string;
    freeSpace: boolean;
    words: string[];
    currentPositions: string[][] | undefined;
    currentSelected: boolean[][] | undefined;
}

export interface BingoCardAction {
    type: 'updateTitle' | 'toggleFreeSpace' | 'toggleSelected' | 'generateNewCard' | 'setWords';
    payload?: any;
}

export const BingoCardContext = createContext<{state?: BingoCardState, dispatch?: Dispatch<BingoCardAction>}>({});

function generateNewPositions(words: string[]) {
    const tempPositions: string[][] = [];
    const selectedWords: string[] = [];
    for (let i=0; i < 5; i++) {
        for (let ii=0; ii < 5; ii++) { 
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
                currentPositions: generateNewPositions(state.words),
                currentSelected: undefined
            }
        case 'setWords':
            return {
                ...state,
                words: action.payload,
            }
    }

    return state;
}

function BingoCardReducer(props: BingoCardReducerProps) {

    // const location = useLocation();
    // const encoded = location.pathname.substring(1);
    let tempState = {
            name: 'New Bingo Card',
            freeSpace: true,
            words: [],
            currentPositions: undefined,
            currentSelected: undefined
    }
    // if (encoded && encoded.length > 0) {
    //     const decoded = JSON.parse(atob(encoded));
    //     tempState = decoded;
    // }

    const [state, dispatch] = useReducer(
        bingoCardReducer,
        tempState
    )

    return (<BingoCardContext.Provider value={{state: state, dispatch: dispatch}}>{props.children}</BingoCardContext.Provider>)
}

export default BingoCardReducer;