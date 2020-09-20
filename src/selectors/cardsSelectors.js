export function cardsSelectors(state) {
    return state.cards
}

export function cardSelector(state, cardId) {
    return state.cards.filter((card) => card.id === cardId)
}