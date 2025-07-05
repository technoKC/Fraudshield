import React, { useState } from 'react';

function UploadBox({ onUpload }) {
  const [file, setFile] = useState(null);

  return (
    <div className="upload-box">
      <h3>📁 Upload your transactions</h3>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={() => onUpload(file)}>🚀 Analyze</button>
    </div>
  );
}

export default UploadBox;
