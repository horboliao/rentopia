'use client';

import Select from 'react-select'

import useCountries from '@/app/hooks/useCountries';

export type CountrySelectValue = {
    flag: string; // Flag image URL for the country
    label: string; // Country label/name
    latlng: number[]; // Latitude and longitude coordinates of the country
    region: string; // Region of the country
    value: string; // Unique value for the country
}

interface CountrySelectProps {
    value?: CountrySelectValue; // Current selected value of the country select
    onChange: (value: CountrySelectValue) => void; // Function to handle the change event of the country select
}

const CountrySelect: React.FC<CountrySelectProps> = ({
                                                         value,
                                                         onChange
                                                     }) => {
    const { getAll } = useCountries(); // Custom hook to retrieve all country options


    return (
        <div>
            <Select
                placeholder="Anywhere"
                isClearable
                options={getAll()}
                value={value}
                onChange={(value) => onChange(value as CountrySelectValue)}
                formatOptionLabel={(option: any) => (
                    <div className="
          flex flex-row items-center gap-3">
                        <div>{option.flag}</div>
                        <div>
                            {option.label},
                            <span className="text-neutral-500 ml-1">
                {option.region}
              </span>
                        </div>
                    </div>
                )}
                classNames={{
                    control: () => 'p-3 border-2',
                    input: () => 'text-lg',
                    option: () => 'text-lg'
                }}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary: 'black',
                        primary25: '#ffe4e6'
                    }
                })}
            />
        </div>
    );
}

export default CountrySelect;