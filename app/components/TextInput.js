export default function TextInput({ inputType, string, placeholder, onUpdate, error }) {
  return (
    <>
        <input
            type={inputType}
            value={string || ''}
            placeholder={placeholder}
            autoComplete='off'
            onChange={(event) => onUpdate(event.target.value)}
            className='block w-full bg-[#f1f1f1] text-gray-800 border border-gray-300 rounded-md focus:outline-none px-3 py-2.5' 
        />

        <div className='font-semibold text-[16px] text-red-500'>
            {error}
        </div>
    </>
  );
}
