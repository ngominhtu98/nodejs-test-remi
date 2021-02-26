module.exports = [
  {
    '_id': '5da0aac8400f905028bb04dd',
    description: 'system admin',
    name: "ADMIN",
    permissions: [
    ],
    menu: [
      {
        name: 'Users',
        url: 'users',
        icon: '',
        sub: [],
      },
      {
        name: 'Categories',
        url: 'users',
        icon: '',
        sub: [],
      },
      {
        name: 'Categories',
        url: 'users',
        icon: '',
        sub: [],
      },
      {
        name: 'Auth',
        url: 'auth',
        icon: '',
        sub: [
          {
            name: 'Permission',
            url: 'auth/permission',
            icon: '',
          },
          {
            name: 'Menu',
            url: 'auth/menu',
            icon: '',
          }
        ],
      }
    ]
  },
  {
    '_id': '5da0aac87cf653de663ec44d',
    description: 'accountant',
    name: "ACCOUNTANT_CP",
    permissions: [
      '5f597d8d18fcf1202a69967b',
      '5f597d8d18fcf1202a69967d',
      '5f597d8d18fcf1202a699680',
    ],
    menu: [
      {
        name: 'Users',
        url: 'users',
        icon: '',
        sub: [],
      },
      {
        name: 'Categories',
        url: 'users',
        icon: '',
        sub: [],
      },
      {
        name: 'Auth',
        url: 'auth',
        icon: '',
        sub: [],
      }
    ]
  },
  {
    '_id': '5da0aac8c6d2aea864f5f516',
    name: "ACCOUNTANT_BR",
    permissions: [
     
    ],
    menu: [
      {
        name: 'Users',
        url: 'users',
        icon: '',
        sub: [],
      },
      {
        name: 'Categories',
        url: 'users',
        icon: '',
        sub: [],
      },
      {
        name: 'Auth',
        url: 'auth',
        icon: '',
        sub: [],
      }
    ]
  },
  {
    '_id': '5da0aac80927c5ba59a9a210',
    name: "DISTRICT_CHIEF",
    permissions: [
    ],
    menu: [
      {
        name: 'Users',
        url: 'users',
        icon: '',
        sub: [],
      },
      {
        name: 'Categories',
        url: 'users',
        icon: '',
        sub: [],
      },
      {
        name: 'Auth',
        url: 'auth',
        icon: '',
        sub: [],
      }
    ]

  },
  {
    '_id': '5da0aac8584e423c79efdac3',
    name: "EMPLOYEE",
    permissions: [
    ],
    menu: [
      {
        name: 'Users',
        url: 'users',
        icon: '',
        sub: [],
      },
      {
        name: 'Categories',
        url: 'users',
        icon: '',
        sub: [],
      },
      {
        name: 'Auth',
        url: 'auth',
        icon: '',
        sub: [],
      }
    ]
  }
];
