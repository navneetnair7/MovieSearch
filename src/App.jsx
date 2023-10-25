import { useState } from "react";
import axios from "axios";
import { setDefaults, geocode, RequestType } from "react-geocode";
import Maps from "./components/Maps";

function App() {
  const [theaters, setTheaters] = useState([]);
  const [city, setCity] = useState("");
  const [movie, setMovie] = useState("");
  const [test, setTest] = useState(0);

  setDefaults({
    key: "AIzaSyAf0AeEkPJYv5CjCDbxNWQ-H0MS6IwfFEo",
    language: "en",
    region: "IN",
  });

  const showMap = async (e) => {
    e.preventDefault();
    await axios
      .get("http://localhost:5000", {
        params: {
          addressName: city,
          placeName: movie + " movie theaters",
        },
      })
      .then((res) => {
        // console.log(res.data);
        console.log(res.data.showtimes[0].theaters);
        res.data.showtimes[0].theaters.map((theater) => {
          // console.log(theater);
          // console.log(theater.address);
          geocode(RequestType.ADDRESS, theater.address)
            .then(({ results }) => {
              const { lat, lng } = results[0].geometry.location;
              console.log(lat, lng);
              theater.lat = lat;
              theater.lng = lng;
            })
            .catch(console.error);
        });
        setTheaters(res.data.showtimes[0].theaters);
        setTest(1);
        // console.log(theaters);
      });
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
    setTest(0);
  };

  const handleMovieChange = (e) => {
    setMovie(e.target.value);
    setTest(0);
  };

  return (
    <>
      <div className="flex justify-center text-5xl bg-red-200 h-20 text-center p-2 font-mono">MovieSearch</div>
      <form onSubmit={showMap}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleCityChange}
          className="rounded h-10 m-5 p-2 w-60 border border-black hover:h-12"
        />
        <input
          type="text"
          placeholder="Enter movie name"
          value={movie}
          onChange={handleMovieChange}
          className="rounded h-10 m-5 p-2 w-60 border border-black hover:h-12"
        />
        <button
          type="submit"
          onClick={showMap}
          className="bg-blue-500 h-10 w-20 rounded-lg text-white shadow-lg hover:shadow-none hover:translate-y-1"
        >
          Submit
        </button>
      </form>
      <div className="flex">
        <div className="grid grid-cols-2 w-2/3">
          {theaters.map((theater) => (
            <div
              key={theater.name}
              className="border-black m-5 border h-32 p-2 rounded-xl shadow-lg hover:translate-y-2 hover:shadow-none hover:bg-black hover:text-white"
            >
              <p className="text-xl">Theater: {theater.name}</p>
              <p>Address: {theater.address}</p>
            </div>
          ))}
        </div>
        <div className="flex ml-20">
          {test > 0 && <Maps theaters={theaters} />}
        </div>
      </div>
    </>
  );
}

export default App;
