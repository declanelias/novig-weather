import {
    useLoadScript,
} from "@react-google-maps/api"
import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete"
import {
    Combobox,
    ComboboxInput, ComboboxList, ComboboxOption,
    ComboboxPopover,
} from "@reach/combobox";
import { useWeatherContext } from "../../../context/WeatherContext.tsx";
import {GOOGLE_MAPS_LIBRARIES} from "./constants.ts";
import locationIcon from "../../../assets/location.svg"
import styles from "./LocationSelector.module.css";

export const LocationSelector: React.FC = () => {

    const apiKey: string = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: apiKey,
        libraries: GOOGLE_MAPS_LIBRARIES,
    });

    return (
        <div className={styles.locationContainer}>
            <img src={locationIcon} className={styles.imgContainer}/>
            {isLoaded && <PlacesAutoComplete />}
        </div>
    )
}

const PlacesAutoComplete: React.FC = () => {
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions
    } = usePlacesAutocomplete();
    const { setLatLng } = useWeatherContext();

    const handleSelect = async (address: string) => {
        const results = await getGeocode({ address });
        const place = results[0];

        const displayName = place.address_components
            .filter((c) => {
                return c.types.includes("political") && !c.types.includes("administrative_area_level_2");
            })
            .slice(0, 2)
            .map(c => c.short_name)
            .join(", ")

        setValue(displayName, false);
        clearSuggestions();

        const { lat, lng } = getLatLng(place);
        setLatLng({ lat, lng });
    }

    return (
        <Combobox onSelect={handleSelect}>
            <ComboboxInput
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={!ready}
                placeholder={"Enter a location"}
            />
            <ComboboxPopover>
                <ComboboxList>
                    {status === "OK" &&
                        data.map(({ place_id, description }) => (
                            <ComboboxOption key={place_id} value={description}/>
                        ))
                    }
                </ComboboxList>
            </ComboboxPopover>
        </Combobox>
    )
}