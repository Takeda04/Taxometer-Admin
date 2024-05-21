export const columns = [
  { name: "Ism", uid: "name" },
  { name: "Ta'rif", uid: "tarif" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

export const columnsTarif = [
   { name: "Ta'rif turi", uid: "tarif" },
   { name: "Ta'rif narxi", uid: "narx" },
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

 export const tarifs = [
   {
     id: 1,
     tarif: "Start",
     narx: "5000",
   },
   {
     id: 2,
     tarif: "Econom",
     narx: "7000",
   },
   {
     id: 3,
     tarif: "Comfort",
     narx: "10000",
   },
   {
     id: 4,
     tarif: "Business",
     narx: "15000",
   },
   {
     id: 5,
     tarif: "Delivery",
     narx: "11000",
   },
   {
     id: 6,
     tarif: "Load",
     narx: "13000",
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
 
