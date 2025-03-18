export const seedData = {
  users: {
    _model: "User",
    admin: {
      firstName: "Garrett",
      lastName: "Lenihan",
      email: "admin@where2next.com",
      password: "admin",
      scope: "admin"
    },
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "secret",
      scope: "user"
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "secret",
      scope: "user"
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "secret",
      scope: "user"
    }
  },
  categories: {
    _model: "Category",
    greenway: {
      title: "Green Ways",
      userid: "->users.bart"
    }
  },
  tracks: {
    _model : "Placemark",
    placemark1 : {
      name: "Bother Glas",
      description: "Walkway along the river Clyda in Mourneabbey",
      latitude: 52.069913,
      longitude: -8.638435,
      categoryid: "->categories.greenway"
    },
    placemark2 : {
      name: "Waterford Greenway",
      description: "Former railway track in Waterford now used for cycling and hiking",
      latitude: 52.26991,
      longitude: -7.138,
      categoryid: "->categories.greenway"
    },
  }
};
