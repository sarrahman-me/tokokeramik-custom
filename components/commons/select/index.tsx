"use client";
import React, { useEffect, useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { GetDataApi } from "@/utils/fetcher";
import { IoIosArrowDown } from "react-icons/io";

interface SelectProps {
  value?: any;
  setValue: (value: any) => void;
  staticData?: boolean;
  lists?: any[];
  urlDataApi?: string;
  keyValue: {
    key: string;
    value: string;
  };
  placeholder?: string;
  label?: string;
}

const Select = ({
  setValue,
  value,
  placeholder,
  lists = [],
  keyValue,
  label,
  urlDataApi,
  staticData,
}: SelectProps) => {
  const [dataApi, setDataApi] = useState<any>([]);
  const [selectedItem, setSelected] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      if (urlDataApi) {
        const { data } = await GetDataApi(urlDataApi);

        setDataApi(data.data);
      }
    };

    fetchData();
  }, [urlDataApi]);

  const dataToUse: any[] = staticData ? lists : dataApi;

  useEffect(() => {
    if (value && keyValue && dataToUse.length > 0) {
      const selectedItemFromValue = dataToUse.find(
        (item) => item[keyValue.key] === value
      );
      if (selectedItemFromValue) {
        setSelected(selectedItemFromValue);
      }
    } else {
      setSelected({});
    }
  }, [value, keyValue, dataToUse]);

  const handleSelectChange = (selectedItem: any) => {
    const selectedKey = selectedItem[keyValue.key];
    setValue(selectedKey);
    setSelected(selectedItem);
  };

  return (
    <div className={`${dataToUse.length === 0 ? "hidden" : ""}`}>
      {label && (
        <label
          htmlFor={label}
          className="block text-sm md:text-base font-medium text-primary-700"
        >
          {label}
        </label>
      )}

      <Listbox value={selectedItem} onChange={handleSelectChange}>
        {/* tombol untuk pilih data */}
        <ListboxButton className="flex justify-between items-center border text-black bg-white focus:border-primary-600 p-1.5 outline-none disabled:border-gray-500 disabled:cursor-not-allowed w-full rounded-md">
          <p>{selectedItem[keyValue.value] || placeholder}</p>
          <IoIosArrowDown />
        </ListboxButton>

        {/* pilihan listbox */}
        <ListboxOptions className="mt-2 p-1.5 border border-primary-600 ring-primary-600 bg-white rounded-md shadow-md max-h-48 overflow-scroll outline-none">
          {dataToUse.map((list, i) => (
            <ListboxOption key={i} value={list}>
              {({ focus, selected }) => (
                <div
                  className={`${
                    selected
                      ? "bg-primary-500 text-white"
                      : focus
                      ? "bg-primary-50 text-primary-800"
                      : "bg-white text-black"
                  } cursor-pointer select-none p-1.5 rounded-md`}
                >
                  {list[keyValue.value]}
                </div>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
};

export default Select;
