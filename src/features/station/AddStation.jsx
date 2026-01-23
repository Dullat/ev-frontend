import React from "react";
import {
  Unplug,
  EvCharger,
  PlugZap,
  UtilityPole,
  Building2,
  ChartColumnStacked,
  SatelliteDish,
  DollarSign,
  ServerCrash,
  Globe,
  User,
} from "lucide-react";
import { Form, useParams, useNavigate } from "react-router-dom";
import StandardInput from "../../components/StandardInput";
import StandardDropDown from "../../components/StandardDropDown";
import StandardCheckBoxGroup from "../../components/StandradCheckBoxGroup";
import { useAddStationMutation } from "./stationApi";
import { FormHeaderError } from "../../components/Errors";
import { useSelector } from "react-redux";
import { selectUser } from "../user/userSlice.js";
import PleaseLogin from "../../components/PleaseLogin.jsx";

const validateURL = (value) => {
  if (!value) return "URL is required";

  try {
    const url = new URL(value);
    if (!url.hostname.includes(".")) {
      return "URL must include a domain (e.g., .com, .org)";
    }
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return "URL must start with http:// or https://";
    }
    return true;
  } catch (err) {
    return "Invalid URL format";
  }
};

const AddStation = () => {
  const [addStation, { data, error, isLoading, isSuccess, isError }] =
    useAddStationMutation();

  const [errorMessage, setErrorMessage] = React.useState(null);
  const [emptyFields, setEmptyFields] = React.useState([]);

  const [fieldValidity, setFieldValidity] = React.useState({});

  const user = useSelector(selectUser);

  const { lat, lon } = useParams();

  const navigate = useNavigate();

  const plugTypes = [
    { value: "Type2", label: "Type 2 (AC, common in India)" },
    { value: "CCS2", label: "CCS2 (Fast DC, modern EVs)" },
    { value: "CHAdeMO", label: "CHAdeMO (Japanese DC fast charger)" },
    { value: "GB/T", label: "GB/T (Bharat DC-001 chargers)" },
    { value: "BharatAC001", label: "Bharat AC-001 (AC for light EVs)" },
    { value: "BharatDC001", label: "Bharat DC-001 (DC for light EVs)" },
  ];

  const handleFieldValidation = (name, isValid) => {
    setFieldValidity((prev) => ({ ...prev, [name]: isValid }));
  };

  const handleSubmit = async (e) => {
    const formData = new FormData(e.target);
    const plugTypes = formData.getAll("plugTypes");

    const {
      name,
      street,
      city,
      state,
      country,
      chargerType,
      pricePerKwh,
      ownerName,
      ownerLink,
    } = Object.fromEntries(formData);

    const requiredFields = [
      "name",
      "street",
      "city",
      "state",
      "country",
      "chargerType",
      "pricePerKwh",
      "ownerLink",
      "ownerName",
    ];

    const empty = requiredFields.filter((f) => !formData.get(f));

    if (empty.length > 0) {
      setEmptyFields(empty);
      setErrorMessage("Please fill in all the fields...");
      return;
    } else {
      setErrorMessage(null);
      setEmptyFields([]);
    }

    const allValid = Object.values(fieldValidity).every(Boolean);
    if (!allValid) {
      setErrorMessage("Please fix invalid fields before submitting.");
      return;
    }

    try {
      const res = await addStation({
        name,
        street,
        city,
        state,
        country,
        chargerType,
        pricePerKwh,
        ownerName,
        ownerLink,
        coordinates: { lat, lon },
      }).unwrap();

      navigate(`/${lat}/${lon}`);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    isError && setErrorMessage(error.data.error);
    isSuccess && setErrorMessage(null);
  }, [isError, fieldValidity]);

  if (!user) return <PleaseLogin />;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full max-w-7xl flex-col space-y-8 items-center m-4 sm:mx-8 pb-4">
        <div className="w-full flex flex-col md:flex-row items-center gap-4">
          <div className="h-20 w-20 inline-flex bg-gradient-to-br from-blue-500 to-blue-800 rounded-2xl items-center justify-center m-0 animate-fade-in">
            <Unplug className="h-10 w-10 text-white animate-pulse" />
          </div>
          <div className="text-center md:text-start animate-fade-in">
            <h2 className="text-slate-800 text-2xl font-bold">
              Add an Ev-Station
            </h2>
            <p className="text-slate-600 text-sm">
              Enter valid infromation and continue
            </p>
          </div>
        </div>

        <div className="animate-slide-up w-full">
          <Form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            {errorMessage && (
              <FormHeaderError
                message={errorMessage}
                onClose={setErrorMessage}
              />
            )}
            <div className="flex flex-col">
              {/* <h2 className="text-slate-600 font-bold text-xl">Name:</h2> */}
              <StandardInput
                name={"name"}
                placeholder={"Your Station's name"}
                label={"Station Name"}
                Icon={EvCharger}
                isEmpty={emptyFields.includes("name")}
              />
            </div>

            <div className="flex flex-col w-full">
              {/* <h2 className="text-slate-600 font-bold text-xl">Address:</h2> */}
              <div className="space-y-4 flex flex-col w-full">
                <div className="flex flex-col w-full md:flex-row gap-4">
                  <StandardInput
                    name={"ownerName"}
                    placeholder={"Who owns this station"}
                    label={"Owner Name"}
                    Icon={User}
                    isEmpty={emptyFields.includes("ownerName")}
                  />
                  <StandardInput
                    name={"ownerLink"}
                    placeholder={"https://example.com"}
                    label={"Owner Link"}
                    Icon={Globe}
                    isEmpty={emptyFields.includes("ownerLink")}
                    validate={validateURL}
                    onValidateChange={handleFieldValidation}
                  />
                </div>
                <div className="flex flex-col w-full md:flex-row gap-4">
                  <StandardInput
                    name={"street"}
                    placeholder={"Street name"}
                    label={"Street"}
                    Icon={UtilityPole}
                    isEmpty={emptyFields.includes("street")}
                  />
                  <StandardInput
                    name={"city"}
                    placeholder={"City name"}
                    label={"City"}
                    Icon={Building2}
                    isEmpty={emptyFields.includes("city")}
                  />
                </div>
                <div className="flex flex-col w-full md:flex-row space-y-4 space-x-4">
                  <StandardInput
                    name={"state"}
                    placeholder={"State name"}
                    label={"State"}
                    Icon={ChartColumnStacked}
                    isEmpty={emptyFields.includes("state")}
                  />
                  <StandardInput
                    name={"country"}
                    placeholder={"Country name"}
                    label={"Country"}
                    Icon={SatelliteDish}
                    isEmpty={emptyFields.includes("country")}
                  />
                </div>
              </div>
            </div>

            <div className="w-full">
              <div className="w-full flex flex-col md:flex-row gap-4">
                <StandardDropDown
                  label={"Charger Type"}
                  name={"chargerType"}
                  options={[
                    { value: "fast", label: "Fast" },
                    { value: "normal", label: "Normal" },
                  ]}
                  placeholder={"Select a charger type"}
                  defaultValue={"normal"}
                />
                <StandardInput
                  name={"pricePerKwh"}
                  placeholder={"Price per Kwh"}
                  label={"Price"}
                  Icon={DollarSign}
                  type={"number"}
                  isEmpty={emptyFields.includes("pricePerKwh")}
                />
              </div>
            </div>
            <StandardCheckBoxGroup
              label={"Select Plug Types"}
              name={"plugTypes"}
              options={plugTypes}
              defaultValue={[]}
            />
            <div className="w-full flex flex-col md:flex-row gap-4 mt-2">
              <button type="none" className="btn-accent rounded w-full">
                Cancle
              </button>
              <button type="submit" className="btn-secondary rounded w-full">
                Add Station
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddStation;
