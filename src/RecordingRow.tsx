import * as React from "react";
import {useCallback, useState} from "react";

import {usePlayer} from "ractive-player";

import type {RecorderPlugin} from "./types";

interface Props {
  data: {
    [key: string]: any;
  };
  pluginsByName: {
    [key: string]: RecorderPlugin;
  };
}

export default function RecordingRow(props: Props) {
  const player = usePlayer();
  const [name, setName] = useState("Untitled");

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const {data, pluginsByName} = props;

  return (
    <li className="recording-row">
      <input
        className="recording-name"
        onBlur={player.resumeKeyCapture}
        onFocus={player.suspendKeyCapture}
        onChange={onChange}
        type="text"
        value={name}
      />
      <table className="recording-results">
        <tbody>
          {Object.keys(data).map(pluginName => {
            const plugin = pluginsByName[pluginName],
                  SaveComponent = plugin.saveComponent;

            return (
              <tr key={pluginName}>
                <th key="head" scope="row">
                  <svg className="recorder-plugin-icon" height="36" width="36" viewBox="0 0 100 100">
                    <rect height="100" width="100" fill="#222"/>
                    {plugin.icon}
                  </svg>
                </th>
                <td key="cell">
                  <SaveComponent data={data[pluginName]}/>
                </td>
              </tr>);
          })}
        </tbody>
      </table>
    </li>
  );
}