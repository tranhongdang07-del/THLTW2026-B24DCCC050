import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const [destinations, setDestinations] = useState([
    {
      id: 1,
      name: "Hạ Long",
      type: "Biển",
      price: 200,
      rating: 5,
      desc: "Vịnh Hạ Long nổi tiếng",
      image: "https://picsum.photos/400/250?1",
    },
    {
      id: 2,
      name: "Sapa",
      type: "Núi",
      price: 150,
      rating: 4,
      desc: "Thị trấn vùng cao",
      image: "https://picsum.photos/400/250?2",
    },
    {
      id: 3,
      name: "Đà Nẵng",
      type: "Thành phố",
      price: 250,
      rating: 5,
      desc: "Thành phố biển hiện đại",
      image: "https://picsum.photos/400/250?3",
    },
  ]);

  const addDestination = (item) => {
    setDestinations([
      ...destinations,
      {
        ...item,
        id: Date.now(),
        rating: 4,
        image: "https://picsum.photos/400/250?random=" + Date.now(),
      },
    ]);
  };

  const deleteDestination = (id) => {
    setDestinations(destinations.filter((d) => d.id !== id));
  };

  return (
    <AppContext.Provider
      value={{ destinations, addDestination, deleteDestination }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);