import React from 'react';
import './Button.css';

export default function Button({ text, loading }) {
  return (
    <button className="btn-component">
      {text && text}
      {loading && <div className="loader-small"></div>}
    </button>
  );
}