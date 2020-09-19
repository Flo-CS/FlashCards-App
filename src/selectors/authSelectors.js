export function isAuthenticatedSelector(state) {
    return state.auth.isAuthenticated
}
export function isAuthLoadingSelector(state){
    return state.auth.isAuthLoading
}