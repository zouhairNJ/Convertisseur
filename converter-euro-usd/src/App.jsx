import { useState, useEffect } from "react";

const Convertisseur = () => {
  const [TauxChange, setTauxChange] = useState(1.1); // Taux de change EUR/USD
  const [TauxUser, setTauxUser] = useState(""); // Valeur du taux de change personnalisé
  const [EurValue, setEurValue] = useState(0); // Valeur en EUR
  const [UsdValue, setUsdValue] = useState(0); // Valeur en USD
  const [isEurToUsd, setIsEurToUsd] = useState(true); // Etat du switch : true = EUR -> USD, false = USD -> EUR

  useEffect(() => {
    const interval = setInterval(() => {
      if (!TauxUser) {
        setTauxChange((prevChange) => {
          const randomNumber = (Math.random() * 0.1 - 0.05).toFixed(2);
          return Math.max(
            0.01,
            (prevChange + parseFloat(randomNumber)).toFixed(2)
          );
        });
      }
    }, [3000]);

    return () => clearInterval(interval); // nettoyer l'intervalle, pour évite fuite memoire
  }, [TauxUser]);

  // Utiliser le taux de change personnalisé si défini, sinon utiliser le taux par défaut
  const TauxActive = TauxUser ? parseFloat(TauxUser) : TauxChange;

  // Mettre à jour la valeur en USD ou en EUR en fonction du switch
  useEffect(() => {
    if (isEurToUsd) {
      setUsdValue((EurValue * TauxActive).toFixed(4)); // Conversion EUR -> USD
    } else {
      setEurValue((UsdValue / TauxActive).toFixed(4)); // Conversion USD -> EUR
    }
  }, [TauxActive, EurValue, UsdValue, isEurToUsd]); // Ce useEffect se déclenche quand l'un des états change

  const handleEurChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setEurValue(value);
  };
  const handleUsdChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setUsdValue(value);
  };

  const toggleSwitch = () => {
    setIsEurToUsd((prev) => !prev); // Bascule entre EUR -> USD et USD -> EUR
  };

  const handleTauxChange = (e) => {
    const value = e.target.value;
    setTauxUser(value); // Mettre à jour le taux de change personnalisé
  };
  return (
    <div className="flex flex-col items-center p-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-xl shadow-lg text-white max-w-md mx-auto">
      <h2 className="text-3xl font-extrabold mb-4">Taux de Change EUR/USD</h2>
      <p className="text-xl font-semibold mt-2 mb-6">
        Taux de change actuel :{" "}
        <span className="text-yellow-400">{TauxActive}</span>
      </p>

      {/* Section de saisie du taux personnalisé */}
      <div className="mt-4 mb-6">
        <input
          type="number"
          value={TauxUser}
          onChange={handleTauxChange}
          className="w-full p-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all"
          placeholder="Fixer un taux de change"
        />
        <p className="text-sm mt-2 text-gray-200">
          Entrez un taux de change personnalisé (ex: 1.12). Laisser vide pour
          utiliser le taux aléatoire.
        </p>
      </div>

      {/* Section du switch */}
      <div className="flex items-center mb-6">
        <span className="mr-2 text-lg font-medium">
          {isEurToUsd ? "EUR -> USD" : "USD -> EUR"}
        </span>
        <label className="switch">
          <input
            type="checkbox"
            checked={isEurToUsd}
            onChange={toggleSwitch}
            className="hidden"
          />
          <span className="slider rounded-full w-12 h-6 bg-gray-300 cursor-pointer transition-all"></span>
        </label>
      </div>

      {/* Section de saisie du montant */}
      <input
        type="number"
        value={isEurToUsd ? EurValue : UsdValue}
        onChange={isEurToUsd ? handleEurChange : handleUsdChange}
        className="w-full p-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all mb-4"
        placeholder={isEurToUsd ? "Montant en EUR" : "Montant en USD"}
      />

      {/* Résultat */}
      <p className="text-2xl font-bold mt-2">
        Valeur en {isEurToUsd ? "USD" : "EUR"}:{" "}
        <span className="text-yellow-400">
          {isEurToUsd ? UsdValue : EurValue}
        </span>
      </p>
    </div>
  );
};

export default Convertisseur;
