import {
    Listbox,
    ListboxPopover,
    ListboxList,
    ListboxOption,
} from "@reach/listbox";

interface DropdownProps {
    options: string[];
    onChange: (value: string) => void;
    value: string;
    label: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onChange, value, label }) => {
    return (
        <Listbox aria-labelledby={label} defaultValue={value} onChange={onChange}>
            <ListboxPopover>
                <ListboxList>
                    {options.map((option, index) => (
                        <ListboxOption value={option} key={index} >
                            {option}
                        </ListboxOption>
                    ))}
                </ListboxList>
            </ListboxPopover>
        </Listbox>
    );
};

export default Dropdown;
