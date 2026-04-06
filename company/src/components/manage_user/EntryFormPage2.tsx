import React, { useState, useEffect } from "react";
import type { ApplicationData } from "./AddEntryForm";
import api from "../../api/Axios";

interface State {
  id: number;
  name: string;
}

interface City {
  id: number;
  name: string;
}

interface Props {
  data: ApplicationData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const PersonalDatails: React.FC<Props> = ({ data, handleChange }) => {
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  // Fetch states on mount
  useEffect(() => {
    const fetchStates = async () => {
      setLoadingStates(true);
      try {
        const myToken = window.localStorage.access_token;
        const response = await api.get("/crm/states/", {
          params: { page: "", page_size: 100, search: "" },
          headers: {
            Authorization: `Bearer ${myToken}`,
          },
        });
        if (response.data && response.data.data && response.data.data.results) {
          setStates(response.data.data.results);
        } else if (Array.isArray(response.data)) {
          setStates(response.data);
        }
      } catch (error) {
        console.error("Error fetching states:", error);
      } finally {
        setLoadingStates(false);
      }
    };

    fetchStates();
  }, []);

  // Fetch cities when state selection changes
  useEffect(() => {
    if (data.state_id) {
      const fetchCities = async () => {
        setLoadingCities(true);
        try {
          const myToken = window.localStorage.access_token;
          const response = await api.get(`/crm/states/${data.state_id}/cities/`, {
            params: { page: "", page_size: 100, search: "" },
            headers: {
              Authorization: `Bearer ${myToken}`,
            },
          });
          if (response.data && response.data.data && response.data.data.results) {
            setCities(response.data.data.results);
          } else if (Array.isArray(response.data)) {
            setCities(response.data);
          }
        } catch (error) {
          console.error("Error fetching cities:", error);
          setCities([]);
        } finally {
          setLoadingCities(false);
        }
      };

      fetchCities();
    } else {
      setCities([]);
    }
  }, [data.state_id]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <input
          name="first_name"
          placeholder="First Name"
          value={data.first_name}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />

        <input
          name="last_name"
          placeholder="Last Name"
          value={data.last_name}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <input
        name="mobile_number"
        placeholder="Mobile Number"
        value={data.mobile_number}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      />

      <div className="grid grid-cols-2 gap-4">
        <select
          name="state_id"
          value={data.state_id}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 bg-white"
        >
          <option value="">Select State</option>
          {loadingStates && <option>Loading...</option>}
          {!loadingStates &&
            states.map((state) => (
              <option key={state.id} value={state.id.toString()}>
                {state.name}
              </option>
            ))}
        </select>

        <select
          name="city_id"
          value={data.city_id}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 bg-white"
          disabled={!data.state_id}
        >
          <option value="">Select City</option>
          {loadingCities && <option>Loading...</option>}
          {!loadingCities && !data.state_id && <option>Please select a state first</option>}
          {!loadingCities &&
            cities.map((city) => (
              <option key={city.id} value={city.id.toString()}>
                {city.name}
              </option>
            ))}
        </select>
      </div>

      <input
        name="address"
        placeholder="Address"
        value={data.address}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      />
    </div>
  );
};

export default PersonalDatails;