

export const menus = [
    // { name: 'Home', icon: <i className="fa-solid fa-house"></i>, path: '/', authorization: 'user' },
    { name: 'Dashboard', icon: <i className="fa-solid fa-table-columns"></i>, path: 'dashboardHome', authorization: 'user' },
    { name: 'My Orders', icon: <i className="fa-solid fa-cart-arrow-down"></i>, path: 'myOrders', authorization: 'user' },
    { name: 'Shop', icon: <i className="fa-solid fa-shop"></i>, path: 'shop', authorization: 'user' },
    { name: 'Manage Orders', icon: <i className="fa-solid fa-border-all"></i>, path: 'manageOrders', authorization: 'admin' },
    { name: 'Manage Users', icon: <i className="fa-solid fa-users"></i>, path: 'manageUsers', authorization: 'admin' },
    { name: 'Manage Products', icon: <i className="fa-brands fa-product-hunt"></i>, path: 'manageProducts', authorization: 'admin' },
    { name: 'MY Profile', icon: <i className="fa-solid fa-user-gear"></i>, path: 'myProfile', authorization: 'user' },
]