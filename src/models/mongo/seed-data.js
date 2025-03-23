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
    beach: {
      title: "Beaches",
      userid: "->users.bart",
      img: "http://res.cloudinary.com/dl4yq0hkm/image/upload/v1742734786/x7rvpmjufdt6lbnrsq58.png",
    },
    greenway: {
      title: "Green Ways",
      userid: "->users.bart",
      img: "http://res.cloudinary.com/dl4yq0hkm/image/upload/v1742735353/slzjromkdkoqdduiftwj.png",
    },
    castle: {
      title: "Castles",
      userid: "->users.bart",
      img: "http://res.cloudinary.com/dl4yq0hkm/image/upload/v1742735360/hbh8qr2hjrrxz01n4ll6.png",
    },
    swimAndSauna: {
      title: "Swim and Sauna",
      userid: "->users.bart",
      img: "http://res.cloudinary.com/dl4yq0hkm/image/upload/v1742735366/ahhesv5ss6tjvb2fccji.png",
    },
    hike: {
      title: "Hikes",
      userid: "->users.bart",
      img: "http://res.cloudinary.com/dl4yq0hkm/image/upload/v1742735375/qbagsesdlqts3nivva8k.png",
    },
  },
  placemarks: {
    _model : "Placemark",
    ballybunionBeach : {
      name: "Ballybunion",
      description: "Amazing beach located in the North of Kerry",
      latitude: 52.513098,
      longitude: -9.676056,
      categoryid: "->categories.beach",
      img: "http://res.cloudinary.com/dl4yq0hkm/image/upload/v1742737895/fpjqjundyy46a9zmxkpn.png",
    },
    ballyheigueBeach : {
      name: "Ballyheigue",
      description: "Nice beach located just outside Tralee, Co Kerry",
      latitude: 52.387053,
      longitude: -9.834495,
      categoryid: "->categories.beach",
      img: "http://res.cloudinary.com/dl4yq0hkm/image/upload/v1742743027/ammvmhjvisjxyns2cgbu.png",
    },
    inchydoneyBeach : {
      name: "Inchydoney",
      description: "Inchydoney Blue Flag Beach near Clonakilty in West Cork",
      latitude: 51.596505,
      longitude: -8.865753,
      categoryid: "->categories.beach",
      img: "http://res.cloudinary.com/dl4yq0hkm/image/upload/v1742743011/wsb0izu9oiceg85rucy8.png",
    },
    clydaGreenway : {
      name: "Bother Glas",
      description: "Walkway along the river Clyda in Mourneabbey",
      latitude: 52.069913,
      longitude: -8.638435,
      categoryid: "->categories.greenway",
      img: "http://res.cloudinary.com/dl4yq0hkm/image/upload/v1742743260/d8snwaz9qdmzcibuntvu.png",
    },
    waterfordGreenway : {
      name: "Waterford Greenway",
      description: "Former railway track in Waterford now used for cycling and hiking",
      latitude: 52.26991,
      longitude: -7.138,
      categoryid: "->categories.greenway",
      img: "http://res.cloudinary.com/dl4yq0hkm/image/upload/v1742743418/ncvqpsuilxjodzpd7nsh.png",
    },
    blarneyCastle : {
      name: "Blarney Castle",
      description: "Blarney Castle is a medieval stronghold in Blarney, Co Cork",
      latitude: 51.92921,
      longitude: -8.57094,
      categoryid: "->categories.castle",
      img: "http://res.cloudinary.com/dl4yq0hkm/image/upload/v1742743728/vwteha6ygsqtshhj9qpg.png",
    },
    kanturkCastle : {
      name: "Kanturk Castle",
      description: "Castle built around 1601 for the Lord of Duhallow",
      latitude: 52.16431,
      longitude: -8.90279,
      categoryid: "->categories.castle",
      img: "http://res.cloudinary.com/dl4yq0hkm/image/upload/v1742743734/radmnckqwkmszvhpoazj.png",
    },
    kingJohnCastle : {
      name: "King John's Castle",
      description: "13th-century castle located on King's Island in Limerick",
      latitude: 52.66966,
      longitude: -8.62560,
      categoryid: "->categories.castle",
      img: "http://res.cloudinary.com/dl4yq0hkm/image/upload/v1742743740/rhnwnainogfwggic07nr.png",
    },
    ballyhassSwimSauna : {
      name: "Ballyhass Lakes",
      description: "Sauna and swim surrounded by a crystal clear lake",
      latitude: 52.16926,
      longitude: -8.79597,
      categoryid: "->categories.swimAndSauna",
      img: "http://res.cloudinary.com/dl4yq0hkm/image/upload/v1742743913/slrowsy5ckodwl5tfd6b.png",
    },
    oysterhavenSwimSauna : {
      name: "Oysterhaven",
      description: "Nestled in the heart of Oysterhaven Bay, Co.Cork",
      latitude: 51.69385,
      longitude: -8.44211,
      categoryid: "->categories.swimAndSauna",
      img: "http://res.cloudinary.com/dl4yq0hkm/image/upload/v1742743921/qhfrc1hrftn5blnfojpl.png",
    },
    bweengduffHike : {
      name: "Bweengduff",
      description: "Lovely mountain walk with a 12km loop located in county Cork",
      latitude: 52.06322,
      longitude: -8.77575,
      categoryid: "->categories.hike",
      img: "https://res.cloudinary.com/dl4yq0hkm/image/upload/v1742744115/imf1skl8jzwjs7oktoxy.png",
    },
    bearaWayHike : {
      name: "Beara Way",
      description: "Long-distance hike taking in ancient stone circles, woodland & mountains",
      latitude: 51.72602,
      longitude: -9.98316,
      categoryid: "->categories.hike",
      img: "https://res.cloudinary.com/dl4yq0hkm/image/upload/v1742744121/jqhw52cf1q8tpyi3olk4.png",
    },
  }
};
