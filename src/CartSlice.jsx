import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // 初始化购物车商品为空数组
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      // 根据 action.payload 的名称从购物车中移除商品
      state.items = state.items.filter(item => item.name !== action.payload);
    },
    updateQuantity: (state, action) => {
      // 从 action.payload 中提取 name 和 quantity
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        // 更新找到的商品的数量
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

// 选择器：计算购物车中的商品总数
export const selectTotalItems = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

// 导出 action creators 以便在 ProductList.jsx 和 CartItem.jsx 中使用
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// 导出 reducer，默认用于 store.js
export default CartSlice.reducer;
