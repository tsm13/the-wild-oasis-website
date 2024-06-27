"use client";
import React, { useState } from "react";

type Props = {
  users: any;
};

export default function Counter({ users }: Props) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>There are {users.length} users</p>
      <button onClick={() => setCount((count) => count + 1)}>Add</button>
      {count}
    </div>
  );
}
