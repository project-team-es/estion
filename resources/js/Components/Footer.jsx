import React from 'react';

export default function Footer() {
  return (
    <footer className="py-4 text-center text-xs text-black">
      <p>&copy; {new Date().getFullYear()} estion. All rights reserved.</p>
    </footer>
  );
}
