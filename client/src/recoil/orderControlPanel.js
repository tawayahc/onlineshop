import { atom, selector } from 'recoil';

export const ordersState = atom({
  key: 'ordersState',
  default: [],
});

export const selectedOrdersState = atom({
  key: 'selectedOrdersState',
  default: [],
});

export const searchTermState = atom({
  key: 'searchTermState',
  default: '',
});

export const selectedStatusState = atom({
  key: 'selectedStatusState', 
  default: 'All', 
});

export const orderSortByState = atom({
  key: 'orderSortByState', 
  default: 'default',
});

export const orderCurrentPageState = atom({
  key: 'orderCurrentPageState', 
  default: 1,
});

export const ordersPerPageState = atom({
  key: 'ordersPerPageState',
  default: 20,
});

export const filteredOrdersState = selector({
  key: 'filteredOrdersState',
  get: ({ get }) => {
    const orders = get(ordersState);
    const searchTerm = get(searchTermState);
    const selectedStatus = get(selectedStatusState);
    const sortBy = get(orderSortByState);

    let filteredOrders = orders.filter(order => {
      if (selectedStatus !== 'All' && order.status !== selectedStatus) {
        return false;
      }
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const orderDate = order.expectedDate ? order.expectedDate.toLowerCase() : '';
        const productNames = order.products.map(product => product.name.toLowerCase()).join(' ');
        if (!orderDate.includes(searchLower) && !productNames.includes(searchLower)) {
          return false;
        }
      }
      return true;
    });

    filteredOrders = filteredOrders.sort((a, b) => {
      switch (sortBy) {
        case 'orderIdAsc':
          return a.id - b.id;
        case 'orderIdDesc':
          return b.id - a.id;
        case 'dateAsc':
          return new Date(a.expectedDate) - new Date(b.expectedDate);
        case 'dateDesc':
          return new Date(b.expectedDate) - new Date(a.expectedDate);
        default:
          return 0;
      }
    });

    return filteredOrders;
  },
});

export const currentOrdersState = selector({
  key: 'currentOrdersState',
  get: ({ get }) => {
    const filteredOrders = get(filteredOrdersState);
    const currentPage = get(orderCurrentPageState);
    const ordersPerPage = get(ordersPerPageState);

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    return filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  },
});
