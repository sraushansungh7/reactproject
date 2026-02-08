import React from "react";

export default function Password(){
const [length, setLength] = useState(8);
  const [numberAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");e

  // ref hook
  const passwordref = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "@#$!&";

    for (let i = 0; i < length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordClip = useCallback(() => {
    passwordref.current?.select();
    window.navigator.clipboard.writeText(password);

    setCopied(true); // show popup
    setTimeout(() => setCopied(false), 2000); // hide popup
  }, [password]);

  // auto-generate when options change
  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator]);


  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-800">
      <div className="w-full max-w-md bg-gray-700 p-6 rounded-lg shadow-lg">
        
        <div className="flex mb-4">
       <input
  type="text"
  value={password}
  readOnly
  ref={passwordref}
  placeholder="password"
  className="w-full px-3 py-2 rounded-l-md outline-none 
             bg-gray-600 text-white placeholder-white"
/>

          <button
            onClick={copyPasswordClip}
            className="bg-blue-600 text-white px-4 rounded-r-md"
          >
            Copy
          </button>
        </div>

        <div className="flex items-center gap-2 text-white mb-2">
          <input
            type="range"
            min={6}
            max={20}
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <span>Length: {length}</span>
        </div>

        <div className="flex items-center gap-2 text-white">
          <input
            type="checkbox"
            checked={numberAllowed}
            onChange={() => setNumAllowed((prev) => !prev)}
          />
          <label>Numbers</label>
        </div>

        <div className="flex items-center gap-2 text-white">
          <input
            type="checkbox"
            checked={charAllowed}
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <label>Special Characters</label>
        </div>

      </div>
    </div>
  );
}
