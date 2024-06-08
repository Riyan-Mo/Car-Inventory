require("dotenv/config");
const mongoose = require("mongoose");
const Car = require("./models/Car");
const CarType = require("./models/CarType");
const Company = require("./models/Company");

const carTypesArr = [];
const carsArr = [];
const companiesArr = [];

const carTypes = [
  {
    name: "Sedan",
    description: `A sedan is a type of passenger car. They are characterized by a characteristic notchback line. It is specially designed for passenger transport. The shape of the body and its size are designed for elegance, comfort and ride comfort. Taking along equipment, equipment or goods is limited to personal needs.`,
    photoUrl: `https://bestforchoose.com/image/cache/catalog/Cars/What-is-a-Sedan-Car/What-is-a-Sedan-Car-Toyota%20Camry-680x400.jpg`,
  },
  {
    name: "Hatchback",
    description: `A hatchback is a car body configuration with a rear door that swings upward to provide access to the main interior of the car as a cargo area, rather than just to a separated trunk. Hatchbacks often feature fold-down second-row seating, allowing the interior to be reconfigured to prioritize either passenger or cargo volume1. These practical, efficient, and affordable cars are popular choices, especially for families, due to their decent boot size and roomy interiors. If you're looking for a vehicle with easy boot access, consider exploring the wide range of hatchbacks available on our platform.`,
    photoUrl: `https://static1.topspeedimages.com/wordpress/wp-content/uploads/jpg/201512/2015-ford-focus-hatchback.jpg?q=50&fit=contain&w=1140&h=&dpr=1.5`,
  },
  {
    name: "SUV",
    description: `A sport utility vehicle (SUV) is a car classification that combines elements of road-going passenger cars with features from off-road vehicles, such as raised ground clearance and four-wheel drive.`,
    photoUrl: `https://www.carbuyer.co.uk/2019-mercedes-glc-suv-arrives-with-improved-safety-and-tech-pictures`,
  },
  {
    name: "Sports Car",
    description: `A sports car is a low, fast car designed for dynamic performance, emphasizing handling, acceleration, top speed, and the thrill of driving. These vehicles originated in Europe during the early 1910s and are produced by various manufacturers worldwide1. They typically have room for only two people and prioritize performance over carrying capacity.`,
    photoUrl:
      "https://i0.wp.com/www.cleantechloops.com/wp-content/uploads/2021/03/disadvantages-of-sports-car.jpg?resize=1680%2C630&ssl=1",
  },
];

async function createCarTypes() {
  await Promise.all(carTypes.map(async (type, index) => {
    const savedType = await new CarType(type).save();
    carTypesArr[index] = savedType;
    console.log(`Added type: ${savedType.name}`);
  }));
}

const cars = [
  {
    model: "Celica Supra",
    company: "Toyota",
    type: "Sports Car",
    stock: 3,
    maxSpeed: 196,
    horsepower: 110,
    year: 1980,
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxikh_0qDNbNOOlFQnC6Dn1tjNe9UkgT-G1Q&s",
  },
  {
    model: "Model S",
    company: "Tesla", // Tesla
    type: "Sedan",
    stock: 0,
    maxSpeed: 336,
    horsepower: 1100,
    year: 2012,
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYKFpV-FsKoNta7ZMOkwZ222YSIpt2aOxNVQ&s",
  },
  {
    model: "Mustang",
    company: "Ford", // Ford
    type: "Sports Car",
    stock: 3,
    maxSpeed: 249,
    horsepower: 480,
    year: 1964,
    imgUrl:
      "https://imgd.aeplcdn.com/1280x720/cw/ec/23766/Ford-Mustang-Exterior-126883.jpg?wm=0&q=80",
  },
  {
    model: "Camry",
    company: "Toyota", // Toyota
    type: "Sedan",
    stock: 10,
    maxSpeed: 226,
    horsepower: 203,
    year: 1982,
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqDUXgIPGwCtByjar5yyNtPvrqsiYBA8lX9Q&s",
  },
  {
    model: "Model X",
    company: "Tesla", // Tesla
    type: "SUV",
    stock: 7,
    maxSpeed: 249,
    horsepower: 1020,
    year: 2015,
    imgUrl:
      "https://stimg.cardekho.com/images/carexteriorimages/930x620/Tesla/Model-X/5253/1611841733029/front-left-side-47.jpg",
  },
];

async function createCars() {
  await Promise.all(cars.map(async (car, index) => {
    const company = companiesArr.find((c) => c.name === car.company);
    car.company = company;
    const type = carTypesArr.find((ct) => ct.name === car.type);
    car.type = type;
    const savedCar = await new Car(car).save();
    carsArr[index] = savedCar;
    console.log(`Added car: ${savedCar.model}`);
    return savedCar;
  }));
}

const companies = [
  {
    name: "Tesla",
    established: 2003,
    country: "United States",
    description:
      "Tesla, Inc. designs and manufactures electric vehicles, battery energy storage from home to grid-scale, solar panels and solar roof tiles, and related products and services.",
  },
  {
    name: "Ford",
    established: 1903,
    country: "United States",
    description:
      "Ford Motor Company is an American multinational automaker that has been a major manufacturer of cars, trucks, SUVs, luxury vehicles, and commercial vehicles throughout the world.",
  },
  {
    name: "Toyota",
    established: 1937,
    country: "Japan",
    description:
      "Toyota Motor Corporation is a Japanese multinational automotive manufacturer headquartered in Toyota, Aichi, Japan. It is one of the world's largest manufacturers of vehicles.",
  },
];

async function createCompanies() {
  await Promise.all(companies.map(async (company, index) => {
    const savedcompany = await new Company(company).save();
    companiesArr[index] = savedcompany;
    console.log(`Added company: ${savedcompany.name}`);
    return savedcompany;
  }));
}

async function main() {
  const MONGODB_URI = process.env.MONGODB_URI;
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MONGODB");
  await deleteAll();
  await populate();
  await mongoose.connection.close();
}

async function populate() {
  await createCarTypes();
  console.log("Created all car types");
  await createCompanies();
  console.log("Created all car companies");
  await createCars();
  console.log("Created all cars");
  console.log("Populated data to database");
}

async function deleteAll() {
  await Company.deleteMany({});
  console.log("Deleted companies");
  await Car.deleteMany({});
  console.log("Deleted all cars");
  await CarType.deleteMany({});
  console.log("Deleted all car types");
}

main();
