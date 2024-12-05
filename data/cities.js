export const cities = [
  {
    name: "Nairobi",
    regions: [
      { name: "Westlands", pricing: { "door-delivery": 150, "pickup-station": 50 } },
      { name: "Kilimani", pricing: { "door-delivery": 200, "pickup-station": 70 } },
      { name: "CBD", pricing: { "door-delivery": 120, "pickup-station": 40 } },
    ],
  },
  {
    name: "Mombasa",
    regions: [
      { name: "Nyali", pricing: { "door-delivery": 180, "pickup-station": 60 } },
      { name: "Likoni", pricing: { "door-delivery": 200, "pickup-station": 80 } },
      { name: "Mombasa Island", pricing: { "door-delivery": 150, "pickup-station": 50 } },
    ],
  },
  {
    name: "Kisumu",
    regions: [
      { name: "Milimani", pricing: { "door-delivery": 170, "pickup-station": 60 } },
      { name: "Nyalenda", pricing: { "door-delivery": 200, "pickup-station": 70 } },
      { name: "Kondele", pricing: { "door-delivery": 180, "pickup-station": 50 } },
    ],
  },
  {
    name: "Nakuru",
    regions: [
      { name: "Lanet", pricing: { "door-delivery": 160, "pickup-station": 50 } },
      { name: "Nakuru CBD", pricing: { "door-delivery": 130, "pickup-station": 40 } },
      { name: "Free Area", pricing: { "door-delivery": 180, "pickup-station": 60 } },
    ],
  },
  {
    name: "Eldoret",
    regions: [
      { name: "Elgon View", pricing: { "door-delivery": 190, "pickup-station": 70 } },
      { name: "Kapsoya", pricing: { "door-delivery": 160, "pickup-station": 50 } },
      { name: "CBD", pricing: { "door-delivery": 140, "pickup-station": 40 } },
    ],
  },
];

// Delivery days data
export const deliveryDays = {
  Nairobi: {
    "Westlands": 1,
    "Kilimani": 1,
    "CBD": 1,
  },
  Mombasa: {
    "Nyali": 2,
    "Likoni": 3,
    "Mombasa Island": 2,
  },
  Kisumu: {
    "Milimani": 2,
    "Nyalenda": 3,
    "Kondele": 2,
  },
  Nakuru: {
    "Lanet": 2,
    "Nakuru CBD": 1,
    "Free Area": 2,
  },
  Eldoret: {
    "Elgon View": 3,
    "Kapsoya": 2,
    "CBD": 1,
  },
};
