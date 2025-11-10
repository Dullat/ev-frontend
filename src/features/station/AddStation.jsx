import {
  Unplug,
  EvCharger,
  PlugZap,
  UtilityPole,
  Building2,
  ChartColumnStacked,
  SatelliteDish,
  DollarSign,
} from "lucide-react";
import { Form } from "react-router-dom";
import StandardInput from "../../components/StandardInput";
import StandardDropDown from "../../components/StandardDropDown";
import StandardCheckBoxGroup from "../../components/StandradCheckBoxGroup";

const AddStation = () => {
  const plugTypes = [
    { value: "ec2", label: "EC2" },
    { value: "emac2", label: "Emac2" },
    { value: "ahdf", label: "kadf" },
  ];

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
          <Form className="flex flex-col space-y-4">
            <div className="flex flex-col">
              {/* <h2 className="text-slate-600 font-bold text-xl">Name:</h2> */}
              <StandardInput
                name={"name"}
                placeholder={"Your Station's name"}
                label={"Station Name"}
                Icon={EvCharger}
              />
            </div>

            <div className="flex flex-col w-full">
              {/* <h2 className="text-slate-600 font-bold text-xl">Address:</h2> */}
              <div className="space-y-4 flex flex-col w-full">
                <div className="flex flex-col w-full md:flex-row gap-4">
                  <StandardInput
                    name={"street"}
                    placeholder={"Street name"}
                    label={"Street"}
                    Icon={UtilityPole}
                  />
                  <StandardInput
                    name={"city"}
                    placeholder={"City name"}
                    label={"City"}
                    Icon={Building2}
                  />
                </div>
                <div className="flex flex-col w-full md:flex-row space-y-4 space-x-4">
                  <StandardInput
                    name={"state"}
                    placeholder={"State name"}
                    label={"State"}
                    Icon={ChartColumnStacked}
                  />
                  <StandardInput
                    name={"country"}
                    placeholder={"Country name"}
                    label={"Country"}
                    Icon={SatelliteDish}
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
                  defaultValue={""}
                />
                <StandardInput
                  name={"pricePerKwh"}
                  placeholder={"Price per Kwh"}
                  label={"Price"}
                  Icon={DollarSign}
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
              <button type="none" className="btn-accent w-full">
                Cancle
              </button>
              <button type="submit" className="btn-secondary w-full">
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
