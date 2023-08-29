import { User } from "../../models/user.model";

const state = {
    user: null as User | unknown | null, // User is not authenticated initially
    token: null as string | null,
};

const mutations = {
    setUser(state: { user: User }, user: User) {
        state.user = user;
    },
    clearUser(state: { user: User | null }) {
        state.user = null;
    },
    setToken(state: { token: String }, token: string) {
        state.token = token;
    },
    clearToken(state: { token: String | null }) {
        state.token = null;
    },
};

const actions = {
    login({ commit }, userData: any) {
        commit('setUser', userData.user);
        commit('setToken', userData.token);
    },
    logout({ commit }) {
        commit('clearUser');
        commit('clearToken');
        localStorage.clear();
    },
};

const getters = {
    isAuthenticated: (state: any) => !!state.user,
    user: (state: any) => state.user,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
