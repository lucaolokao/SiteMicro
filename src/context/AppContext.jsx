import { createContext, useContext, useReducer, useCallback } from 'react';

const AppContext = createContext(null);

const initialState = {
  cartItems: [],
  wishlist: [],
  searchQuery: '',
  selectedCategory: '',
  sortBy: 'popular',
  notifications: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload };
    case 'SET_CATEGORY':
      return { ...state, selectedCategory: action.payload };
    case 'SET_SORT':
      return { ...state, sortBy: action.payload };
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [
          ...state.notifications,
          { id: Date.now(), ...action.payload },
        ],
      };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter((n) => n.id !== action.payload),
      };
    case 'TOGGLE_WISHLIST': {
      const exists = state.wishlist.includes(action.payload);
      return {
        ...state,
        wishlist: exists
          ? state.wishlist.filter((id) => id !== action.payload)
          : [...state.wishlist, action.payload],
      };
    }
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setSearch = useCallback((q) => dispatch({ type: 'SET_SEARCH', payload: q }), []);
  const setCategory = useCallback((c) => dispatch({ type: 'SET_CATEGORY', payload: c }), []);
  const setSort = useCallback((s) => dispatch({ type: 'SET_SORT', payload: s }), []);
  const toggleWishlist = useCallback((id) => dispatch({ type: 'TOGGLE_WISHLIST', payload: id }), []);

  const notify = useCallback((msg, type = 'info') => {
    const id = Date.now();
    dispatch({ type: 'ADD_NOTIFICATION', payload: { message: msg, type, id } });
    setTimeout(() => dispatch({ type: 'REMOVE_NOTIFICATION', payload: id }), 3500);
  }, []);

  return (
    <AppContext.Provider value={{ ...state, setSearch, setCategory, setSort, toggleWishlist, notify }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
