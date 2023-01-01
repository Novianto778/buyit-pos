import { useState } from 'react';
import { useAsyncDebounce } from 'react-table';

function GlobalFilter(props) {
    const { preGlobalFilteredRows, globalFilter, setGlobalFilter } = props;
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined);
    }, 200);

    return (
        <label className="flex gap-x-2 items-baseline">
            <span className="text-gray-700">Search: </span>
            <input
                type="text"
                className="rounded-md px-2 py-1 border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={value || ''}
                onChange={(e) => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`${count} records...`}
            />
        </label>
    );
}

export default GlobalFilter;
