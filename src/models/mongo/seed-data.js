export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "secret"
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "secret"
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "secret"
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
      latitude: 12.22,
      longitude: 12.44,
      categoryid: "->categories.greenway"
    },
  }
};
