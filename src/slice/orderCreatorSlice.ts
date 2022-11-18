import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';



export type CartItem = {
  id: number;
  name: string;
  count: number;
  price: number;
  total: number;
  title: string;
  array: string;
  productsName: string;
}

export type Good = {
  id: number;
  price: number;
  title: string;
  imgSrc: string;
  rating: string;
  // count: 0;
}



export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface OrderCreatorState {
  likes: number;
  totalPrice: number;
  countGood: number;
  status: Status;
  error: string;
  productsName: string;
  cartItems: CartItem[];
  beverages: Good[];
  vegetables: Good[];
  nuts: Good[];
  eggs: Good[];
  fruits: Good[];
  // newArr: string;
}


const initialState: OrderCreatorState = {
  beverages: [],
  vegetables: [],
  nuts: [],
  eggs: [],
  fruits: [],
  cartItems: [],
  likes: 0,
  totalPrice: 0,
  countGood: 0,
  status: Status.LOADING, // loading, success, error
  error: '',
  productsName: '',
};

// type FetchGoodsArg = Record<string, string>

export const fetchGoods = createAsyncThunk<Good[], Record<string, string>>(
  'orderCreator/fetchGoodsStatus',
  async (params) => {

    const { newArr } = params;
    const { data } = await axios.get<Good[]>(newArr);

    return data;
  }
)


const orderCreatorSlice = createSlice({
  name: "orderCreator",
  initialState,
  reducers: {
    beverages: (state, action: PayloadAction<Good[]>) => {
      const currentName = adaptedName(action.type)
      state.beverages = action.payload;
      state.productsName = currentName;
    },
    eggs: (state, action: PayloadAction<Good[]>) => {
      const currentName = adaptedName(action.type)
      state.eggs = action.payload;
      state.productsName = currentName;
    },
    fruits: (state, action: PayloadAction<Good[]>) => {
      // const currentName = adaptedName(action.type)
      state.fruits = action.payload;
      // state.productsName = currentName;
    },
    vegetables: (state, action: PayloadAction<Good[]>) => {
      // const currentName = adaptedName(action.type)
      state.vegetables = action.payload;
      // state.productsName = currentName;
    },
    nuts: (state, action: PayloadAction<Good[]>) => {
      // const currentName = adaptedName(action.type)

      state.nuts = action.payload;
      // state.productsName = currentName;
      // console.log(action.type,state.productsName)
    },
    addedGoodInCart: (state, action: PayloadAction<Good>) => {
      const resultState = updatingCart(state, action);
      state.cartItems = resultState.cartItems;
      return state;

    },
    removeGoodInCart: (state, action) => {
      // const resultState = apdateItem(state, action, -1);
      // state.cartItems = resultState.cartItems;
      // return state;
    },
    addGoodInCart: (state, action) => {
      // const resultState = apdateItem(state, action, 1);
      // state.cartItems = resultState.cartItems;
      // return state;
    },

    addLikes: (state) => {
      state.likes += 1
      return state;
    },
    decLikes: (state) => {
      state.likes -= 1
      return state;
    },
    deleteGood: (state, action: PayloadAction<CartItem>) => {
      // const results = del(state, action);
      // state.cartItems = results.cartItems;
      // return state;
    },
  },
  // extraReducers: {
  //   [fetchGoods.fulfilled]: (state, action) => {
  //     state.beverages = action.payload;
  //     state.nuts = action.payload;
  //     state.fruits = action.payload;
  //     state.vegetables =  action.payload;
  //     state.eggs =  action.payload;
  //     state.status = 'success';

  //     state.productsName = action.meta.arg.newArr.substring(44,action.length).split('?')[0]
  //   },
  //   [fetchGoods.pending]: (state) => {
  //     state.status = 'loading';
  //     state.beverages =  [];
  //     state.nuts =  [];
  //     state.fruits =  [];
  //     state.vegetables =  [];
  //     state.eggs =  [];

  //   },
  //   [fetchGoods.rejected]: (state) => {
  //     state.status = 'error';
  //     state.beverages =  [];
  //     state.nuts =  [];
  //     state.fruits =  [];
  //     state.vegetables =  [];
  //     state.eggs =  [];
  //   }
  // }
  extraReducers: (builder) => {
    builder.addCase(fetchGoods.pending, (state) => {
      state.status = Status.LOADING;
      state.beverages = [];
      state.nuts = [];
      state.fruits = [];
      state.vegetables = [];
      state.eggs = [];
    })

    builder.addCase(fetchGoods.fulfilled, (state, action) => {
      state.beverages = action.payload;
      state.nuts = action.payload;
      state.fruits = action.payload;
      state.vegetables = action.payload;
      state.eggs = action.payload;
      state.status = Status.SUCCESS;
    })

    builder.addCase(fetchGoods.rejected, (state) => {
      state.status = Status.ERROR;
      state.beverages = [];
      state.nuts = [];
      state.fruits = [];
      state.vegetables = [];
      state.eggs = [];
    })

  },
})

// const apdateItem = (state: RootState, action: PayloadAction<CartItem>, amount: number) => {
//   const goodInCart = state.cartItems.find((item: CartItem) => action.payload.id === item.id);

//   if (goodInCart) {
//     const cartItems = state.cartItems.map((item: CartItem) => {
//       if (item.id === goodInCart.id) {
//         item.count += 1 * amount;
//         item.total += item.price * amount;
//         state.totalPrice += item.price * amount;
//       }
//       return item;
//     });
//     if (!goodInCart.count) {
//       return {
//         ...state,
//         cartItems: state.cartItems.filter((item: CartItem) => item.id !== goodInCart.id)
//       }
//     }
//     return {
//       ...state,
//       cartItems,
//     };
//   }
// }



// const del = (state: any, action: PayloadAction<CartItem>) => {
//   const goodId = action.payload.id;

//   // const good = state[state.productsName].find((item) => goodId === item.id);
//   const count = state.cartItems.find((item) => goodId === item.id);

//   // state.totalPrice -= (count.price * count.count);
//   const cartItems = state.cartItems.filter((item: CartItem) => item.id !== goodId)
//   return {
//     ...state,
//     cartItems,
//   }
// }



const updatingCart = (state, action: PayloadAction<Good>) => {
  const goodId = action.payload.id ;
  console.log(goodId)
  const count = action.payload.count;

  const good = state[state.productsName].find((item:any) => goodId === item.id);


  const newItem = {
    id: good.id,
    name: good.title,
    count: count || 1,
    price: good.price,
    total: good.price * count,
    array: state.productsName,
  };


const cartItems = state.cartItems.concat(newItem);

  const goodInCart = state.cartItems.find((item: CartItem) => goodId === item.id);

  if (goodInCart) {
    const cartItems = state.cartItems.map((item: CartItem) => {
      if (item.id === goodId) {
        item.count += count;
        item.total += item.price * count;
        state.totalPrice += item.price * count;
      }
      return item;
    });
    return {
      ...state,
      cartItems,
    };
  } else {
    state.totalPrice += (good.price * count);
  }

  return {
    ...state,
    cartItems,
  };
};
const adaptedName = (actionName: string) => {
  return actionName.substring(13, actionName.length);
}

export const { beverages, addedGoodInCart, removeGoodInCart, addLikes, decLikes, deleteGood, nuts, vegetables, fruits, eggs, addGoodInCart } =
  orderCreatorSlice.actions;

export default orderCreatorSlice.reducer;


