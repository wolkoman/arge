import React, { useState } from "react";
import { Site } from "../components/Site";

export default function Mail({}) {
  const [state, setState] = useState();
  return (
    <Site>
      <div>
        <button
          onClick={() =>
            fetch("/api/send")
              .then(x => x.json())
              .then(x => setState(x))
          }
        >
          Test
        </button>
        <br />
        {JSON.stringify(state)}
      </div>
    </Site>
  );
}
