import { useState } from "react";
import "./App.css";

function App() {
  const [engineType, setEngineType] = useState("classic");
  const [capacity, setCapacity] = useState("small");
  const [price, setPrice] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [taxPrice, setTaxPrice] = useState(0);

  const onSubmit = (event) => {
    event.preventDefault();
    const regex = new RegExp(/^\d*[1-9]\d*$/);
    if (regex.test(price)) {
      let tax = 0;
      switch (engineType) {
        case "classic":
          if (capacity === "small") tax = 3.1;
          else tax = 18.6;
          break;
        case "hybrid-HEV":
        case "hybrid-MHEV":
          if (capacity === "small") tax = 1.55;
          else if (capacity === "medium") tax = 9.3;
          else tax = 18.6;
          break;
        case "hybrid-PHEV":
        case "electric-REX":
          if (capacity === "small") tax = 3.1;
          else if (capacity === "medium") tax = 9.3;
          else tax = 18.6;
          break;
        case "electric":
          tax = 0;
          break;
        default:
      }

      setShowResult(true);
      setTaxPrice(Math.round((price * +tax) / 100));
    } else {
      setPrice(0);
      alert("Niewłasciwa cena. Pole moze zawierac tylko cyfry");
    }
  };

  return (
    <div className="container">
      <form>
        <div>
          <h2>Wartość samochodu</h2>
          <div>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Podaj wartosc samochodu w PLN"
            />
          </div>
        </div>
        <div>
          <h2>Rodzaj Napędu</h2>
          <div>
            <select
              className="select"
              id="engine"
              value={engineType}
              onChange={(e) => setEngineType(e.target.value)}
            >
              <option value="classic">Spalinowy</option>
              <option value="hybrid-HEV">Hybryda (HEV)</option>
              <option value="hybrid-MHEV">Miękkaa Hybryda (MHEV)</option>
              <option value="hybrid-PHEV">Hybryda plug-in (PHEV)</option>
              <option value="electric">Elektryczny</option>
              <option value="electric-REX">Elektryczny z REX</option>
            </select>
          </div>
        </div>

        {engineType !== "electric" && (
          <div>
            <h2>Pojemność Silnika</h2>
            <div>
              <select
                id="capacity"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
              >
                <option value="small">poniżej 2000 cm3</option>
                <option value="medium">od 2001 - 3500 cm</option>
                <option value="big">powyżej 3500 cm3</option>
              </select>
            </div>
          </div>
        )}

        <input type="submit" value="Oblicz akcyze" onClick={onSubmit}></input>
        {showResult && (
          <div>
            <h2>Koszt akcyzy to: {taxPrice} PLN</h2>
          </div>
        )}
      </form>
    </div>
  );
}

export default App;
