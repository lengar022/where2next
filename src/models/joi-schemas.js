import Joi from "joi";

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  })
  .label("JwtAuth");

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("maggie@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const SignUpSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Maggie").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserSignUpDetails");

export const UserSpec = UserCredentialsSpec.keys({
    firstName: Joi.string().example("Maggie").required(),
    lastName: Joi.string().example("Simpson").required(),
    scope: Joi.string().example("user").required(),
  }).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const PlacemarkSpec = Joi.object()
  .keys({
    name: Joi.string().required().example("Fountains Town"),
    description: Joi.string().required().example("Sauna and swim by a slip just outside cork city"),
    latitude: Joi.number().allow("").optional().example(14.22),
    longitude: Joi.number().allow("").optional().example(14.44),
    categoryid: IdSpec,
  })
  .label("Placemark");

export const PlacemarkSpecPlus = PlacemarkSpec.keys({
  img: Joi.string().allow("").optional().example("http://res.cloudinary.com/dl4yq0hkm/image/upload/v1742722758/ftmamg03urqomuxd65yf.jpg"),
  _id: IdSpec,
  __v: Joi.number(),
}).label("PlacemarkPlus");

export const PlacemarkArraySpec = Joi.array().items(PlacemarkSpecPlus).label("PlacemarkArray");

export const CategorySpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Cliff Walks"),
    userid: IdSpec,
  })
  .label("Category");

export const CategorySpecPlus = CategorySpec.keys({
  placemarks: PlacemarkArraySpec,
  img: Joi.string().example("http://res.cloudinary.com/dl4yq0hkm/image/upload/v1742722758/ftmamg03urqomuxd65yf.jpg"),
  _id: IdSpec,
  __v: Joi.number(),
}).label("CategoryPlus");

export const CategoryArraySpec = Joi.array().items(CategorySpecPlus).label("CategoryArray");

export const WeatherSpec = Joi.object()
  .keys({
    day: Joi.string().required().example("Tue"),
    icon: Joi.string().required().example("10d"),
    temp: Joi.number().required().example("20.34"),
  }).label("Weather");

export const WeatherArraySpec = Joi.array().items(WeatherSpec).required().label("WeatherArray");
