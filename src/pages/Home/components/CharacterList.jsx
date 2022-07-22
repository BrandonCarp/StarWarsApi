import React from 'react';

export default function CharacterList({list}) {

    return (
        <div className="CharacterList">
            {
                list.map((data) => {
                    return (
                        <table key={data.name}>
                            <tbody>
                            <tr>
                                <th>{data.name}</th>
                                <th>{data.birthYear}</th>
                                <th>{data.height}</th>
                                <th>{data.mass}</th>
                                <th>{data.homeWorldName}</th>
                                <th>{data.species}</th>
                            </tr>
                            </tbody>
                        </table>
                    )
                })
            }

        </div>
    )
}