export const columns = [
  { name: "Ism", uid: "name" },
  { name: "Ta'rif", uid: "tarif" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

export const columnsTarif = [
   { name: "Ta'rif turi", uid: "tariff_name" },
   { name: "Ta'rif narxi", uid: "tariff_price" },
   { name: "Ta'rif kutish narxi", uid: "price_for_expectation" },
   { name: "Ta'rif tekin kutish vaqti", uid: "expectation" },
   { name: "ACTIONS", uid: "actions" },
 ];


 export const columnsCar = [
  { name: "Avtomobil turi", uid: "typeCar" },
  { name: "ACTIONS", uid: "actions" },
];

export const users = [
  {
    id: 1,
    name: "Olimjon Nishanaliyev",
    phoneNumber: "+998903713153",
    carNumber: "10 O 534 JA",
    status: "active",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    key: "olimjon-nish",
    tarif: "Business",
  },
  {
    id: 2,
    name: "Anvarov Bahtibek",
    phoneNumber: "+998908557527",
    status: "paused",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    key: "bahtibek-an",
    tarif: "Business",
  },
  {
    id: 3,
    name: "Muhammadsodiq Nabijonov",
    phoneNumber: "+998943943433",
    carNumber: "10 A 505 SA",
    status: "active",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    key: "muhammadsodiq-nab",
    tarif: "Business",
  },
  {
    id: 4,
    name: "Mahmud Mahmudov",
    phoneNumber: "+998943943433",
    carNumber: "10 A 505 SA",
    status: "paused",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    key: "mahmud-mah",
    tarif: "Business",
  },
];


 export const cars = [
  {
    id: 1,
    typeCar: "Kia K5",
  },
  {
    id: 2,
    typeCar: "Malibu",
  },
  {
    id: 3,
    typeCar: "Altima",
  },
];
 
